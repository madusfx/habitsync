import { CompleteHabitUseCase } from '@/completed-habits/application/usecases/completehabit.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CompleteHabitDto implements CompleteHabitUseCase.Input {
  @ApiProperty({ description: 'ID do hábito' })
  @IsString()
  @IsNotEmpty()
  idHabit: string;

  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @ApiProperty({ description: 'Data em que o hábito foi completo' })
  @IsDate()
  @IsOptional()
  completedHabit?: Date;
}
