import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { HabitOutput, HabitOutputMapper } from '../dtos/habit-output';
import { HabitRepository } from '@/habits/domain/repositories/habit.repository';

export namespace ListHabitsUseCase {
  export type Input = {
    userId: string;
  };

  export type Output = HabitOutput[];

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private habitRepository: HabitRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const habits = await this.habitRepository.findAllByUserId(input.userId);
      return habits.map(habit => HabitOutputMapper.toOutput(habit));
    }
  }
}
