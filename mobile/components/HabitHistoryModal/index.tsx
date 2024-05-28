import { TouchableOpacity } from 'react-native';
import { Container, ContainerModal, Title, Text, Card, Header } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getToken, getUserId } from '@/utils/auth';
import api from '@/utils/api';

type HabitHistoryModalProps = {
  setModalVisible: (boolean: boolean) => any;
  selectedDay: string;
}

interface CompletedHabit {
  id: string;
  idHabit: string;
  idUser: string;
  completedAt: Date;
}

export default function HabitHistoryModal({ setModalVisible, selectedDay }: HabitHistoryModalProps) {
  const [completedHabitsByDate, setCompletedHabitsByDate] = useState<CompletedHabit[]>([]);
  const [habitNames, setHabitNames] = useState<string[]>([]);
  const formatedDate = formatData(selectedDay);
  const formateDateToISO = formatDateToISO(formatedDate);

  useEffect(() => {
    const fetchHabitNames = async () => {
      try {
        const names = await Promise.all(completedHabitsByDate.map(async (habit) => {
          const habitName = await foundNameOfHabit(habit.idHabit);
          return habitName;
        }));
        setHabitNames(names);
      } catch (error) {
        console.error("Error fetching habit names:", error);
      }
    };
  
    fetchHabitNames();
  }, [completedHabitsByDate]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  function formatData(dataString: string) {
    const data = new Date(dataString);
    const dia = data.getDate() + 1;
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
  
    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;
  
    return `${diaFormatado}/${mesFormatado}/${ano}`;
  }

  function formatDateToISO(dataString: string) {
    const partesData = dataString.split('/');
    const dia = partesData[0];
    const mes = partesData[1];
    const ano = partesData[2];
    const data = new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`);
    const dataISO = data.toISOString();

    return dataISO;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const response = await api.get(`/completed-habits?idUser=${userId}&completedHabit=${formateDateToISO}`);
        setCompletedHabitsByDate(response.data.data);        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [])

  async function foundNameOfHabit(idHabit: string) {
    try {
      const token = await getToken();
      const response = await api.get(`/habits/${idHabit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data.name;    
    } catch (error) {
      return;
    }
  }

  return (
    <Container>
      <ContainerModal>
        <Header>
          <Title>Hábitos concluídos em {formatedDate}</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} color='white' />
          </TouchableOpacity>
        </Header>

        <>
          {habitNames.length > 0 ? (
            <>
              {habitNames.map((habitName, index) => (
                <Card key={index}>
                  <Text>{habitName}</Text>
                </Card>
              ))}
            </>
          ) : (
            <Text>Poxa, parece que você não completou nenhum hábito nesse dia.</Text>
          )}
        </>

      </ContainerModal>
    </Container>
  );
}
