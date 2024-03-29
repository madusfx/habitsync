import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace DeleteCompletedHabitUseCase {
  export type Input = {
    idCompletedHabit: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private completedHabitRepository: CompletedHabitRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.completedHabitRepository.delete(input.idCompletedHabit);
    }
  }
}
