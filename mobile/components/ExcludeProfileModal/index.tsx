import { Alert, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { getToken, getUserId } from '@/utils/auth';
import api from '@/utils/api';
import { Container, ContainerModal, Title, Text, Button, ContainerTitle } from './styles';

type ExcludeProfileModalProps = {
  setModalVisible: (boolean: boolean) => any;
}

const goToLogin = (navigation: any) => {
  navigation.navigate('Login');
};

export default function ExcludeProfileModal({ setModalVisible }: ExcludeProfileModalProps, { navigation }: any) {
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  async function removeProfile() {
    const token = await getToken();
    const userId = await getUserId();
    try {
      await api.delete(`/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      Alert.alert("Successo", "Usuário deletado com sucesso!");
      return;
    } catch (error) {
      console.error("Error deleting profile:", error);
      Alert.alert("Erro", "Erro ao deletar usuário, tente novamente.");
    }
    goToLogin(navigation);
  }

  return (
    <Container>
      <ContainerModal>
        <ContainerTitle>
          <Title>Excluir conta</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} color='white' />
          </TouchableOpacity>
        </ContainerTitle>
        <Text>Tem certeza que deseja excluir sua conta?{'\n'} Ao excluir sua conta, todos os dados de hábitos criados e hábitos concluídos serão perdidos.</Text>
        <Button onPress={removeProfile}>
          <Text>Sim, quero deletar a conta</Text>
        </Button>
        <Button onPress={handleCloseModal}>
          <Text>Não, quero voltar</Text>
        </Button>
      </ContainerModal>
    </Container>
  );
}
