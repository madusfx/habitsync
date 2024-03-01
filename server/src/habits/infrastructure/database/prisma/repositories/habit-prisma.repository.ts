import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { HabitModelMapper } from '../models/habit-model.mapper';
import { HabitEntity } from '@/habits/domain/entities/habit.entity';
import { HabitRepository } from '@/habits/domain/repositories/habit.repository';

export class HabitPrismaRepository implements HabitRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: HabitEntity): Promise<void> {
    await this.prismaService.habit.create({
      data: entity.toJSON(),
    });
  }

  findById(id: string): Promise<HabitEntity> {
    return this._get(id);
  }

  async findAllByUserId(userId: string): Promise<HabitEntity[]> {
    const models = await this.prismaService.habit.findMany({
      where: { userId: userId },
    });
    return models.map(model => HabitModelMapper.toEntity(model));
  }

  async update(entity: HabitEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.habit.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.habit.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<HabitEntity> {
    try {
      const habit = await this.prismaService.habit.findUnique({
        where: { id },
      });
      return HabitModelMapper.toEntity(habit);
    } catch {
      throw new NotFoundError(`HabitModel not found using ID ${id}`);
    }
  }
}
