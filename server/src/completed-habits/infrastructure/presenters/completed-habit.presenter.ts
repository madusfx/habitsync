import { CompletedHabitOutput } from '@/completed-habits/application/dtos/completed-habit-output';
import { ApiProperty } from '@nestjs/swagger';

export class CompletedHabitPresenter {
  @ApiProperty({ description: 'Identificação do hábito' })
  idHabit: string;

  @ApiProperty({ description: 'Identificação do usuário' })
  idUser: string;

  @ApiProperty({ description: 'Data em que o hábito foi completo' })
  completedHabit: Date;

  constructor(output: CompletedHabitOutput) {
    this.idHabit = output.idHabit;
    this.idUser = output.idUser;
    this.completedHabit = output.completedHabit;
  }
}

export class HabitCollectionPresenter {
  constructor(private completedHabits: CompletedHabitOutput[]) {}

  present() {
    return this.completedHabits;
  }
}
