import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Container, ContainerModal, Input, Title, Text, Button, ContainerTitle, ButtonText } from './styles';
import { View } from '@/components/Themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '@/utils/api';
import { getToken, getUserId } from '@/utils/auth';
import DropDownComponent from '../DropDownComponent';

type CreateHabitModalProps = {
  setModalVisible: (boolean: boolean) => any;
}

export default function CreateHabitModal({ setModalVisible }: CreateHabitModalProps) {
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const [name, setName] = useState('');
  const [value, setValue] = useState([]);

  async function createHabit() {
    const userId = await getUserId();
    const token = await getToken();
    console.log(userId, token);
    const data = {
      userId: userId,
      name: name.toString(),
      weekDays: value,
    }
    console.log(data);
    axios
    api.post('/habits', data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    })
    .then(function (response) {
      console.log(response);
      handleCloseModal();
      Alert.alert('Sucesso', 'Hábito criado com sucesso.');
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao criar hábito, tente novamente.');
    });
  }

  return (
    <Container>
      <ContainerModal>
        <ContainerTitle>
          <Title>Criar um novo hábito</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} color='white' />
          </TouchableOpacity>
        </ContainerTitle>
        <Text>Digite o título do seu novo hábito</Text>
        <Input 
          value={name}
          onChangeText={(e: any) => setName(e)}
          placeholder='Digite o nome do seu hábito'
        />
        <Text>Selecione os dias da semana que você gostaria de cumprir o hábito:</Text>
      <DropDownComponent />
        <Button onPress={createHabit}>
          <ButtonText>Criar hábito</ButtonText>
        </Button>
      </ContainerModal>
    </Container>
  );
}
