import CalendarComponent from '@/components/CalendarComponent';
import { Calendar, Container, TitleApp, Text } from './styles';
import { View } from '@/components/Themed';
import { globalStyles } from '@/constants/globalStyles';

export default function HabitsHistoryScreen() {
  return (
    <View style={globalStyles.container}>
    <TitleApp>HABITSYNC</TitleApp>
    <Text>Histórico de hábitos concluídos</Text>
    <Container>
      <Calendar>
        <CalendarComponent />
      </Calendar>
    </Container>
    </View>
  );
}
