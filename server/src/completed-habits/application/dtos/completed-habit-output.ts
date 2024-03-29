import { CompletedHabitEntity } from '@/completed-habits/domain/entities/completed-habit.entity';

export type CompletedHabitOutput = {
  id: string;
  idHabit: string;
  idUser: string;
  completedHabit: Date;
};

export class CompletedHabitOutputMapper {
  static toOutput(entity: CompletedHabitEntity): CompletedHabitOutput {
    return entity.toJSON();
  }
}
