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
      const { idHabit, idUser, completedHabit } = input;
      if (!idHabit || !idUser) {
        throw new BadRequestError('Input data not provided');
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      const today = new Date(year, month, day);

      const existingCompletedHabit =
        await this.completedHabitRepository.findCompletedHabitByDate({
          idHabit,
          completedHabit: today,
        });

      if (existingCompletedHabit) {
        console.log('Habit already completed on this day');
        return null;
      } else {
        const entity = new CompletedHabitEntity(
          Object.assign(input, { completedHabit: today }),
        );
        await this.completedHabitRepository.complete(entity);
        return CompletedHabitOutputMapper.toOutput(entity);
      }
    }
  }
}
