import { UpdateHabitUseCase } from '@/habits/application/usecases/updatehabit.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto implements Omit<UpdateHabitUseCase.Input, 'id'> {
  @ApiProperty({ description: 'Nome novo do hábito' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Dias da semana do hábito' })
  @IsArray()
  @IsOptional()
  weekDays?: Array<number>;
}
