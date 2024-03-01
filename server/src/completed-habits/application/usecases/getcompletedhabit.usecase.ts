import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';
import {
  CompletedHabitOutput,
  CompletedHabitOutputMapper,
} from '../dtos/completed-habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace GetCompletedsHabitUseCase {
  export type Input = {
    userId: string;
  };

  export type Output = CompletedHabitOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private completedHabitRepository: CompletedHabitRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.completedHabitRepository.findById(input.userId);
      return CompletedHabitOutputMapper.toOutput(entity);
    }
  }
}
