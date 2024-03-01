import { CompletedHabitEntity } from '../entities/completed-habit.entity';

export namespace CompletedHabitRepository {
  export interface Repository {
    complete(input: {
      idHabit: string;
      idUser: string;
      completedHabit?: Date;
    }): Promise<void>;
    findById(id: string): Promise<CompletedHabitEntity>;
  }
}
