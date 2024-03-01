import { CreateHabitUseCase } from '@/habits/application/usecases/createhabit.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateHabitDto implements CreateHabitUseCase.Input {
  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Nome do hábito' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Dias da semana do hábito' })
  @IsArray()
  @IsNotEmpty()
  weekDays: Array<number>;
}
