import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getToken, getUserId } from '@/utils/auth';
import api from '@/utils/api';
import { globalStyles } from '@/constants/globalStyles';
import { View } from '@/components/Themed';
import CreateHabitModal from '../../../components/CreateHabitModal';

import { 
  Card, 
  Container, 
  HabitSquare, 
  Button, 
  Text, 
  TitleApp, 
  CardsContainer,
  ButtonsContainer
} from './styles';
import EditHabitModal from '@/components/EditHabitModal';

interface Habit {
  id: string;
  userId: string;
  name: string;
  weekDays: Array<number>;
}

interface CompletedHabit {
  id: string;
  idHabit: string;
  idUser: string;
  completedAt: Date;
}

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<CompletedHabit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSelected, setModalSelected] = useState(null);

  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const diaFormatado = dia < 10 ? '0' + dia : dia;
  const mesFormatado = mes < 10 ? '0' + mes : mes;

  useEffect(() => {
    fetchData();
    getCompletedHabits();
  }, [modalVisible]);
  
  async function fetchData() {
    try {
      const userId = await getUserId();
      const token = await getToken();
      const response = await api.get(`/habits/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response: ", response.data.data.habits);
      //const currentDayOfWeek = new Date().getDay() + 1; 
      //const filteredHabits = response.data.data.habits.filter((habit: Habit) =>
      //  habit.weekDays.includes(currentDayOfWeek)
      //);
      //console.log(filteredHabits);
      setHabits(response.data.data.habits);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = (modalType: any) => {
    fetchData();
    setModalVisible(true);
    setModalSelected(modalType);
  };

  const handleCloseModal = () => {
    fetchData();
    setModalVisible(false);
  };

  async function sendCompletedHabitRequest(idHabit: string) {
    const idUser = await getUserId();
    const data = {
      idUser: idUser,
      idHabit: idHabit,
    }
    try {
      const response = await api.post('/completed-habits', data);
      console.log(response.data);
      setCompletedHabits([...completedHabits, response.data]);
    } catch (error) {
      console.log(error);
    }
    getCompletedHabits();
  }


  async function getCompletedHabits() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    try {
      const userId = await getUserId();
      const response = await api.get(`/completed-habits?idUser=${userId}&completedHabit=${currentDate.toISOString()}`);
      setCompletedHabits(response.data.data);        
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <View style={globalStyles.container}>
    <TitleApp>HABITSYNC - {diaFormatado}/{mesFormatado}/{ano}</TitleApp>
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        {modalSelected === 'createHabitModal' ? (
          <CreateHabitModal setModalVisible={setModalVisible} />
        ) : null}

        {modalSelected === 'editHabitModal' ? (
          <EditHabitModal setModalVisible={setModalVisible} />
        ) : null}
      </Modal>
      <CardsContainer contentContainerStyle={{ alignItems: 'center' }}>
        {habits.length > 0 ? habits.map((habit, index) => (
          <Card key={index} onPress={() => sendCompletedHabitRequest(habit.id)}>
            <HabitSquare>            
              {completedHabits.some(completedHabit => completedHabit.idHabit?.toString() == habit.id) && (
                <FontAwesomeIcon icon={faCheck} size={20} color='white' />
              )}
            </HabitSquare>
            <Text>{habit.name}</Text>
          </Card>
        )) : 
          <Text>Você ainda não tem nenhum hábito criado.{"\n"} Vamos mudar isso? Crie um hábito agora clicando no botão abaixo.</Text>
        }
      </CardsContainer>

      <ButtonsContainer>
        <Button onPress={() => handleButtonPress('createHabitModal')}>
          <Text>
            Criar novo hábito
          </Text>
        </Button>
        <Button onPress={() => handleButtonPress('editHabitModal')}>
          <Text>
            Editar um hábito
          </Text>
        </Button>
      </ButtonsContainer>

    </Container>
    </View>
    </>
  );
}