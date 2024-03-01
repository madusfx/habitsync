import { HabitRepository } from '@/habits/domain/repositories/habit.repository';
import { HabitOutput, HabitOutputMapper } from '../dtos/habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace GetHabitUseCase {
  export type Input = {
    id: string;
  };

  export type Output = HabitOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private habitRepository: HabitRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.habitRepository.findById(input.id);
      return HabitOutputMapper.toOutput(entity);
    }
  }
}
