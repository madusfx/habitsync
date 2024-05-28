import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Container, ContainerModal, Input, Title, Text, Button, ContainerTitle, ButtonsContainer } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import api from '@/utils/api';
import { getToken, getUserId } from '@/utils/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownComponent from '../DropDownComponent';

type EditHabitModalProps = {
  setModalVisible: (visible: boolean) => void;
  navigation?: any; // Adjust the type based on your navigation props
};

type HabitProps = {
  createdAt: Date;
  id: string;
  name: string;
  userId: string;
  weekDays: number[];
};

const EditHabitModal: React.FC<EditHabitModalProps> = ({ setModalVisible }) => {
  const [habit, setHabit] = useState<HabitProps | null>(null);
  const [habits, setHabits] = useState<HabitProps[]>([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<{ label: string; value: string; }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const fetchHabits = useCallback(async () => {
    const token = await getToken();
    const userId = await getUserId();
    try {
      const response = await api.get(`/habits/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setHabits(response.data.data.habits);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch habits");
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  useEffect(() => {
    if (habits.length > 0) {
      const habitItems = habits.map(habit => ({
        label: habit.name,
        value: habit.id
      }));
      setItems(habitItems);
    }
  }, [habits]);

  useEffect(() => {
    if (value) {
      const fetchHabit = async () => {
        const token = await getToken();
        try {
          const response = await api.get(`/habits/${value}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setHabit(response.data.data);
        } catch (error) {
          Alert.alert("Error", "Failed to fetch habit details");
        }
      };
      fetchHabit();
    }
  }, [value]);

  const editHabit = async () => {
    setLoading(true);
    const token = await getToken();
    const userId = await getUserId();
    const data = { name, weekDays: habit?.weekDays || [] };
    try {
      await api.put(`/habits/${value}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      Alert.alert("Successo", "Hábito Editado com sucesso!");
      handleCloseModal();
    } catch (error) {
      Alert.alert("Erro", "Falha ao editar hábito, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const excludeHabit = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      await api.delete(`/habits/${value}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      Alert.alert("Successo", "Hábito deletado com sucesso");
      handleCloseModal();
    } catch (error) {
      Alert.alert("Erro", "FFalha ao deletar hábito, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContainerModal>
        <ContainerTitle>
          <Title>Editar ou excluir hábito</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} color='white' />
          </TouchableOpacity>
        </ContainerTitle>
        <Text>Você pode alterar as informações de um hábito, como o nome e os dias em que ele deve ser realizado. Ou você pode excluir um hábito.</Text>
        <View style={{ zIndex: 9999 }}>
          <DropDownPicker
            placeholder='Selecione o hábito'
            multiple={false}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ backgroundColor: 'white', zIndex: 100000 }}
          />
        </View>
        <Text> Alterar nome (opcional)</Text>
        <Input
          placeholder={habit?.name}
          value={name}
          onChangeText={handleNameChange}
        />
        <Text>Alterar dias da semana (opcional)</Text>
        <DropDownComponent />

        <ButtonsContainer>
          <Button onPress={excludeHabit} disabled={loading}>
            {loading ? <ActivityIndicator color='white' /> : <Text>Excluir Hábito</Text>}
          </Button>
          <Button onPress={editHabit} disabled={loading}>
            {loading ? <ActivityIndicator color='white' /> : <Text>Editar Hábito</Text>}
          </Button>
        </ButtonsContainer>
      </ContainerModal>
    </Container>
  );
};

export default EditHabitModal;