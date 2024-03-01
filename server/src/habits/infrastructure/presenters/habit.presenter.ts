import { HabitOutput } from '@/habits/application/dtos/habit-output';
import { ListHabitsUseCase } from '@/habits/application/usecases/listhabits.usecase';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class HabitPresenter {
  @ApiProperty({ description: 'Identificação do hábito' })
  id: string;

  @ApiProperty({ description: 'Identificação do usuário' })
  userId: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Dias da semana do hábito' })
  weekDays: Array<number>;

  @ApiProperty({ description: 'Data de criação do usuário' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: HabitOutput) {
    this.id = output.id;
    this.userId = output.userId;
    this.name = output.name;
    this.weekDays = output.weekDays;
    this.createdAt = output.createdAt;
  }
}

export class HabitCollectionPresenter {
  constructor(private habits: HabitOutput[]) {}

  present() {
    return this.habits;
  }
}
