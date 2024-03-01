import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { HabitPrismaRepository } from './database/prisma/repositories/habit-prisma.repository';
import { HabitsController } from './habits.controller';
import { CreateHabitUseCase } from '../application/usecases/createhabit.usecase';
import { GetHabitUseCase } from '../application/usecases/gethabit.usecase';
import { ListHabitsUseCase } from '../application/usecases/listhabits.usecase';
import { UpdateHabitUseCase } from '../application/usecases/updatehabit.usecase';
import { DeleteHabitUseCase } from '../application/usecases/deletehabit.usecase';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user-prisma.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { HabitRepository } from '../domain/repositories/habit.repository';

@Module({
  imports: [AuthModule],
  controllers: [HabitsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'HabitRepository',
      useFactory: (prismaService: PrismaService) => {
        return new HabitPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: CreateHabitUseCase.UseCase,
      useFactory: (habitRepository: HabitRepository.Repository) => {
        return new CreateHabitUseCase.UseCase(habitRepository);
      },
      inject: ['HabitRepository'],
    },
    {
      provide: GetHabitUseCase.UseCase,
      useFactory: (habitRepository: HabitRepository.Repository) => {
        return new GetHabitUseCase.UseCase(habitRepository);
      },
      inject: ['HabitRepository'],
    },
    {
      provide: ListHabitsUseCase.UseCase,
      useFactory: (habitRepository: HabitRepository.Repository) => {
        return new ListHabitsUseCase.UseCase(habitRepository);
      },
      inject: ['HabitRepository'],
    },
    {
      provide: UpdateHabitUseCase.UseCase,
      useFactory: (habitRepository: HabitRepository.Repository) => {
        return new UpdateHabitUseCase.UseCase(habitRepository);
      },
      inject: ['HabitRepository'],
    },
    {
      provide: DeleteHabitUseCase.UseCase,
      useFactory: (habitRepository: HabitRepository.Repository) => {
        return new DeleteHabitUseCase.UseCase(habitRepository);
      },
      inject: ['HabitRepository'],
    },
  ],
})
export class HabitsModule {}
