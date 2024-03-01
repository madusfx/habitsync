import { HabitEntity } from '@/habits/domain/entities/habit.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Habit } from '@prisma/client';

export class HabitModelMapper {
  static toEntity(model: Habit) {
    const data = {
      id: model.id,
      userId: model.userId,
      name: model.name,
      weekDays: model.weekDays,
      createdAt: model.createdAt,
    };

    try {
      return new HabitEntity(data, model.id);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
