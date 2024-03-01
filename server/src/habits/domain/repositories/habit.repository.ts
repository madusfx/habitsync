import { HabitEntity } from '../entities/habit.entity';

export namespace HabitRepository {
  export interface Repository {
    findAllByUserId(userId: string): Promise<HabitEntity[]>;
    insert(habit: HabitEntity): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<HabitEntity>;
    update(input: { name?: string; weekDays?: Array<number> }): Promise<void>;
  }
}
