import { HabitEntity } from '@/habits/domain/entities/habit.entity';

export type HabitOutput = {
  id: string;
  userId: string;
  name: string;
  weekDays: Array<number>;
  createdAt: Date;
};

export class HabitOutputMapper {
  static toOutput(entity: HabitEntity): HabitOutput {
    return entity.toJSON();
  }
}
