import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { getToken, getUserId } from '@/utils/auth';
import api from '@/utils/api';
import { globalStyles } from '@/constants/globalStyles';
import { View } from '@/components/Themed';
import ExcludeProfileModal from '@/components/ExcludeProfileModal';
import EditProfileModal from '@/components/EditProfileModal';
import { 
  Container, 
  Button, 
  ButtonText,
  Text, 
  TitleApp, 
  ButtonsContainer
} from './styles';

type ProfileProps = {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
}

const goToLogin = (navigation: any) => {
  navigation.navigate('Login');
};

export default function ProfileScreen({ navigation }: any) {
  const [profile, setProfile] = useState<ProfileProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSelected, setModalSelected] = useState(null);

  const handleButtonPress = (modalType: any) => {
    setModalVisible(true);
    setModalSelected(modalType);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken();
      const userId = await getUserId();
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setProfile(response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchProfile();
  }, [modalVisible]) 
  
  function formatData(dataString: string) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
  
    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;
  
    return `${diaFormatado}/${mesFormatado}/${ano}`;
  }

  return (
    <>
    <View style={globalStyles.container}>
    <TitleApp>HABITSYNC - Perfil</TitleApp>
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
      {modalSelected === 'editProfileModal' ? (
        <EditProfileModal setModalVisible={setModalVisible} />
      ) : null}

      {modalSelected === 'excludeProfileModal' ? (
        <ExcludeProfileModal setModalVisible={setModalVisible} />
      ) : null}
        
        
      </Modal>

      <Text>Nome: {profile?.name}</Text>
      <Text>E-mail: {profile?.email}</Text>
      <Text>Conta criada em: {profile?.createdAt && formatData(profile.createdAt.toString())}</Text>

      <ButtonsContainer>
        <Button onPress={() => handleButtonPress('editProfileModal')}>
          <ButtonText>Editar perfil</ButtonText>
        </Button>
        <Button onPress={() => goToLogin(navigation)}>
          <ButtonText>Deslogar</ButtonText>
        </Button>
        <Button onPress={() => handleButtonPress('excludeProfileModal')}>
          <ButtonText>Excluir conta</ButtonText>
        </Button>
      </ButtonsContainer>
    </Container>
    </View>
    </>
  );
}