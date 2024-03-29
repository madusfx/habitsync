import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CompletedHabitEntity } from '@/completed-habits/domain/entities/completed-habit.entity';
import { CompletedHabitRepository } from '@/completed-habits/domain/repositories/completed-habit.repository';
import { CompletedHabitModelMapper } from '../models/completed-habit-model.mapper';
import { Prisma } from '@prisma/client';

export class CompletedHabitPrismaRepository
  implements CompletedHabitRepository.Repository
{
  async complete(entity: CompletedHabitEntity): Promise<void> {
    await this.prismaService.completedHabit.create({
      data: entity.toJSON(),
    });
  }

  async delete(idCompletedHabit: string) {
    await this._get(idCompletedHabit);
    await this.prismaService.completedHabit.delete({
      where: { id: idCompletedHabit },
    });
  }

  constructor(private prismaService: PrismaService) {}

  async findCompleted(input: {
    idUser: string;
    completedHabit: Date;
  }): Promise<CompletedHabitEntity[]> {
    const { idUser, completedHabit } = input;

    const year = completedHabit.getFullYear();
    const month = completedHabit.getMonth() + 1;
    const day = completedHabit.getDate();
    try {
      const findCompletedHabitByDate =
        await this.prismaService.completedHabit.findMany({
          where: {
            idUser: idUser,
            completedHabit: {
              gte: new Date(year, month - 1, day),
              lt: new Date(year, month - 1, day + 1),
            },
          },
        });
      const completedHabitEntities = findCompletedHabitByDate.map(item => {
        return new CompletedHabitEntity(item);
      });
      return completedHabitEntities;
    } catch {
      throw new NotFoundError(
        `CompletedHabitModel not found using user ID ${idUser}`,
      );
    }
  }

  async findCompletedHabitByDate(input: {
    idHabit: string;
    completedHabit: Date;
  }): Promise<CompletedHabitEntity> {
    const { idHabit, completedHabit } = input;
    const result = await this.prismaService.completedHabit.findFirst({
      where: {
        idHabit,
        completedHabit: {
          gte: new Date(new Date(completedHabit).setHours(0, 0, 0)),
          lt: new Date(new Date(completedHabit).setHours(23, 59, 59)),
        },
      },
    });

    if (result) {
      // Se o resultado existir, retorne-o
      return result as CompletedHabitEntity;
    } else {
      // Se não houver resultado, retorne null
      return null;
    }

    return result as CompletedHabitEntity;
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
