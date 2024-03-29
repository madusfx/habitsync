import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ContainerModal, Input, Title, Text, Button } from './styles';
import { View } from '@/components/Themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '@/utils/api';
import { getToken, getUserId } from '@/utils/auth';

type CreateHabitModalProps = {
  setModalVisible: (boolean: boolean) => any;
}

export default function CreateHabitModal({ setModalVisible }: CreateHabitModalProps) {
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [name, setName] = useState('');
  const [items, setItems] = useState([
    { label: 'Segunda-feira', value: 1 },
    { label: 'Terça-feira', value: 2 },
    { label: 'Quarta-feira', value: 3 },
    { label: 'Quinta-feira', value: 4 },
    { label: 'Sexta-feira', value: 5 },
    { label: 'Sábado', value: 6 },
    { label: 'Domingo', value: 7 },
  ]);

  const formatSelectedItems = () => {
    return value.map(val => {
      const item = items.find(item => item.value === val);
      return item?.value;
    }).join(', ');
  };

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
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container>
      <ContainerModal>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Title>Criar um novo hábito</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} />
          </TouchableOpacity>
        </View>
        <Text>Digite o título do seu novo hábito</Text>
        <Input 
          value={name}
          onChangeText={(e: any) => setName(e)}
        />
        <Text>Selecione os dias da semana que você gostaria de cumprir o hábito:</Text>
      <DropDownPicker
        placeholder='Selecione os dias da semana'
        multiple={true}
        min={0}
        max={7}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multipleText={formatSelectedItems()}
      />
        <Button onPress={createHabit}>
          <Text>Criar hábito</Text>
        </Button>
      </ContainerModal>
    </Container>
  );
}
