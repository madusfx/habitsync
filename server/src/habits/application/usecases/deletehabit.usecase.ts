import { HabitRepository } from '@/habits/domain/repositories/habit.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace DeleteHabitUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private habitRepository: HabitRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.habitRepository.delete(input.id);
    }
  }
}
