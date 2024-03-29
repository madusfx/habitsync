import { Card, Container, HabitSquare, Input, Text, Title } from './styles';
import { useEffect, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Modal } from 'react-native';
import CreateHabitModal from '../../../components/CreateHabitModal';
import { getToken, getUserId } from '@/utils/auth';
import axios from 'axios';
import api from '@/utils/api';

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

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const handleButtonPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
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
      console.log("teste", response.data);
      setCompletedHabits([...completedHabits, response.data]);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const token = await getToken();
        const response = await api.get(`/habits/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setHabits(response.data.data.habits);
      } catch (error) {
        console.log(error);
      }
    };

    // const getCompletedHabits = async () => {
    //   const currentDate = new Date();
    //   currentDate.setUTCHours(0, 0, 0, 0); 

    //   const formattedDate = currentDate.toISOString();

    //   console.log(formattedDate)
    //   try {
    //     const userId = await getUserId();
    //     const response = await api.get(`/completed-habits/?idUser=${userId}&completedHabit=${formattedDate}`);
    //     setCompletedHabits(response.data.data);
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    //}

    fetchData();
    // getCompletedHabits();
  }, [modalVisible, habits, completedHabits]);
  

  return (
    <Container>
      <Title>
        HabitSync - {day}/{month}/{year}
      </Title>

      <Input onPress={handleButtonPress}>
        <Text>
          Criar um novo hábito
        </Text>
      </Input>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <CreateHabitModal setModalVisible={setModalVisible} />
      </Modal>

      {habits.length > 0 ? habits.map((habit, index) => (
        <Card key={index} onPress={() => sendCompletedHabitRequest(habit.id)}>
          <HabitSquare>
            {completedHabits.some(completedHabit => completedHabit.idHabit?.toString() === habit.id) && (
              <FontAwesomeIcon icon={faCheck} size={24} color='green' />
            )}
          </HabitSquare>
          <Text>{habit.name}</Text>
        </Card>
      )) : 
        <Text>Você ainda não tem nenhum hábito criado. Vamos mudar isso? Crie um hábito agora clicando no botão abaixo</Text>
      }
    </Container>
  );
}