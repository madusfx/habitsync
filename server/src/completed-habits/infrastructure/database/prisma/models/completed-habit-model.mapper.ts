import { CompletedHabitEntity } from '@/completed-habits/domain/entities/completed-habit.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { CompletedHabit } from '@prisma/client';

export class CompletedHabitModelMapper {
  static toEntity(model: CompletedHabit) {
    const data = {
      idHabit: model.idHabit,
      idUser: model.idUser,
      completedHabit: model.completedHabit,
    };

    try {
      return new CompletedHabitEntity(data, model.id);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
