import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { HabitOutput, HabitOutputMapper } from '../dtos/habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { HabitEntity } from '@/habits/domain/entities/habit.entity';
import { HabitRepository } from '@/habits/domain/repositories/habit.repository';

export namespace CreateHabitUseCase {
  export type Input = {
    userId: string;
    name: string;
    weekDays: Array<number>;
  };

  export type Output = HabitOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private habitRepository: HabitRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { name, weekDays, userId } = input;
      if (!name || !weekDays || !userId) {
        throw new BadRequestError('Input data not provided');
      }
      const entity = new HabitEntity(Object.assign(input));
      await this.habitRepository.insert(entity);
      return HabitOutputMapper.toOutput(entity);
    }
  }
}
