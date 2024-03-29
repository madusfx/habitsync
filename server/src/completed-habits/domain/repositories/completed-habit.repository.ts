import { CompletedHabitOutput } from '@/completed-habits/application/dtos/completed-habit-output';
import { CompletedHabitEntity } from '../entities/completed-habit.entity';

export namespace CompletedHabitRepository {
  export interface Repository {
    complete(input: {
      idHabit: string;
      idUser: string;
      completedHabit?: Date;
    }): Promise<void>;
    delete(idCompletedHabit: string): Promise<void>;
    findCompleted(input: {
      idUser: string;
      completedHabit: Date;
    }): Promise<CompletedHabitEntity[]>;
    findCompletedHabitByDate(input: {
      idHabit: string;
      completedHabit: Date;
    }): Promise<CompletedHabitEntity>;
  }
}
