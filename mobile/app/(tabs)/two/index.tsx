import CalendarComponent from '@/components/CalendarComponent';
import { Calendar, Container } from './styles';

export default function HabitsHistoryScreen() {
  return (
    <Container>
      <Calendar>
        <CalendarComponent />
      </Calendar>
    </Container>
  );
}
