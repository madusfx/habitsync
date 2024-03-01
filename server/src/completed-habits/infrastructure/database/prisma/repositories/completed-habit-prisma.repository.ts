import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CompletedHabitEntity } from '@/completed-habits/domain/entities/completed-habit.entity';
import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';
import { CompletedHabitModelMapper } from '../models/completed-habit-model.mapper';

export class CompletedHabitPrismaRepository
  implements CompletedHabitRepository.Repository
{
  constructor(private prismaService: PrismaService) {}

  async complete(entity: CompletedHabitEntity): Promise<void> {
    await this.prismaService.completedHabit.create({
      data: entity.toJSON(),
    });
  }

  findById(id: string): Promise<CompletedHabitEntity> {
    return this._get(id);
  }

  protected async _get(id: string): Promise<CompletedHabitEntity> {
    try {
      const completedHabit = await this.prismaService.completedHabit.findUnique(
        {
          where: { id },
        },
      );
      return CompletedHabitModelMapper.toEntity(completedHabit);
    } catch {
      throw new NotFoundError(`CompletedHabitModel not found using ID ${id}`);
    }
  }
}
