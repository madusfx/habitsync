import { CompleteHabitUseCase } from '@/completed-habits/application/usecases/completehabit.usecase';
import { FindCompletedHabitUseCase } from '@/completed-habits/application/usecases/findcompletedhabit.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class FindCompleteHabitsDto implements FindCompletedHabitUseCase.Input {
  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @ApiProperty({ description: 'Data em que o hábito foi completo' })
  @IsDate()
  completedHabit: Date;
}
