import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import {
  CompletedHabitOutput,
  CompletedHabitOutputMapper,
} from '../dtos/completed-habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';

export namespace FindCompletedHabitUseCase {
  export type Input = {
    idUser: string;
    completedHabit: Date;
  };

  export type Output = CompletedHabitOutput[];

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private completedHabitRepository: CompletedHabitRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { idUser, completedHabit } = input;
      if (!idUser || !completedHabit) {
        throw new BadRequestError('Input data not provided');
      }
      const completedHabits =
        await this.completedHabitRepository.findCompleted(input);
      return completedHabits;
    }
  }
}
