import { HabitOutput, HabitOutputMapper } from '../dtos/habit-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { HabitRepository } from '@/habits/domain/repositories/habit.repository';

export namespace UpdateHabitUseCase {
  export type Input = {
    id: string;
    name?: string;
    weekDays?: Array<number>;
  };

  export type Output = HabitOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private habitRepository: HabitRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name && !input.weekDays) {
        throw new BadRequestError('Data not provided');
      }
      const entity = await this.habitRepository.findById(input.id);
      entity.update(input);
      await this.habitRepository.update(entity);
      return HabitOutputMapper.toOutput(entity);
    }
  }
}
