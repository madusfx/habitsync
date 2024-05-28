import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { getToken, getUserId } from '@/utils/auth';
import api from '@/utils/api';
import { Container, ContainerModal, Input, Title, Text, Button, ContainerTitle } from './styles';

type EditProfileModalProps = {
  setModalVisible: (boolean: boolean) => any;
}

type ProfileProps = {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
}

export default function EditProfileModal({ setModalVisible }: EditProfileModalProps) {
  const [profile, setProfile] = useState<ProfileProps>();
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleOldPasswordChange = (text: string) => {
    setOldPassword(text);
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
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
  }, [])

  async function editProfile() {
    const token = await getToken();
    const userId = await getUserId();
    if (name !== '') {
      const data = {
        name: name
      }
      try {
        const response = await api.put(`/users/${userId}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log("New name: ", response)
        Alert.alert("Successo", "Usuário editado com sucesso!");
        setModalVisible(false);
        return response;
      } catch (error) {
        console.error("Error editing name:", error);
        Alert.alert("Erro", "Falha ao editar nome do usuário, tente novamente.");
      }
    }
    if (newPassword !== '' && oldPassword !== '') {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
      try {
        const response = await api.patch(`/users/${userId}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        Alert.alert("Successo", "Senha atualizada com sucesso!");
        return response;
      } catch (error) {
        console.error("Error updating password:", error);
        Alert.alert("Erro", "Falha ao atualizar senha, tente novamente.");
      }
    }
    handleCloseModal();
  }

  return (
    <Container>
      <ContainerModal>
        <ContainerTitle>
          <Title>Editar perfil</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} color='white' />
          </TouchableOpacity>
        </ContainerTitle>
        <Text>Você pode alterar as informações de nome e/ou senha do seu perfil aqui. Não é possível alterar o e-mail cadastrado.</Text>
        <Input 
          placeholder={profile?.name} 
          value={name}
          onChangeText={handleNameChange}
        />
        <Input 
          placeholder={'Senha antiga'} 
          value={oldPassword}
          onChangeText={handleOldPasswordChange}
          secureTextEntry={true}
        />
        <Input 
          placeholder={'Nova senha'} 
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry={true}
        />
        <Button onPress={editProfile}>
          <Text>Confirmar</Text>
        </Button>
      </ContainerModal>
    </Container>
  );
}
