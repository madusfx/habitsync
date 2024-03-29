import { TouchableOpacity } from 'react-native';
import { Container, ContainerModal, Title, Text, Card, HabitSquare, Header } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

type CreateHabitModalProps = {
  setModalVisible: (boolean: boolean) => any;
}

export default function HabitHistoryModal({ setModalVisible }: CreateHabitModalProps) {
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Container>
      <ContainerModal>
        <Header>
          <Title>Histórico de Hábitos - 15/03</Title>
          <TouchableOpacity onPress={handleCloseModal}>
            <FontAwesomeIcon icon={faX} />
          </TouchableOpacity>
        </Header>

        <Card>
          <HabitSquare>
            <FontAwesomeIcon icon={faCheck} size={24} color='green' />
          </HabitSquare>
          <Text>Beber 2L Água</Text>
        </Card>

        <Card>
          <HabitSquare>
            
          </HabitSquare>
          <Text>Ir para a academia</Text>
        </Card>

        <Card>
          <HabitSquare>
            <FontAwesomeIcon icon={faCheck} size={24} color='green' />
          </HabitSquare>
          <Text>Ler 10 páginas de um livro</Text>
        </Card>

      </ContainerModal>
    </Container>
  );
}
