import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import {
  CompletedHabitOutput,
  CompletedHabitOutputMapper,
} from '../dtos/completed-habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { CompletedHabitEntity } from '@/completed-habits/domain/entities/completed-habit.entity';
import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';

export namespace CompleteHabitUseCase {
  export type Input = {
    idHabit: string;
    idUser: string;
    completedHabit?: Date;
  };

  export type Output = CompletedHabitOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private completedHabitRepository: CompletedHabitRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { idHabit, idUser } = input;
      if (!idHabit || !idUser) {
        throw new BadRequestError('Input data not provided');
      }
      const entity = new CompletedHabitEntity(Object.assign(input));
      await this.completedHabitRepository.complete(entity);
      return CompletedHabitOutputMapper.toOutput(entity);
    }
  }
}
