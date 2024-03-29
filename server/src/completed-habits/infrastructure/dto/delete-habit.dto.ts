import { DeleteCompletedHabitUseCase } from '@/completed-habits/application/usecases/deletecompletedhabit.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteCompletedHabitDto
  implements DeleteCompletedHabitUseCase.Input
{
  @ApiProperty({ description: 'ID do hábito' })
  @IsString()
  @IsNotEmpty()
  idCompletedHabit: string;
}
