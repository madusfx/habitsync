import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { CompletedHabitsController } from './completed-habits.controller';
import { CompletedHabitPrismaRepository } from './database/prisma/repositories/completed-habit-prisma.repository';
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user-prisma.repository';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { CompleteHabitUseCase } from '../application/usecases/completehabit.usecase';
import { GetCompletedHabitUseCase } from '../application/usecases/getcompletedhabit.usecase';
import { CompletedHabitRepository } from '../domain/repositories/completed-habit.repository';

@Module({
  imports: [AuthModule],
  controllers: [CompletedHabitsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'CompletedHabitRepository',
      useFactory: (prismaService: PrismaService) => {
        return new CompletedHabitPrismaRepository(prismaService);
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
      provide: CompleteHabitUseCase.UseCase,
      useFactory: (
        completeHabitUseCase: CompletedHabitRepository.Repository,
      ) => {
        return new CompleteHabitUseCase.UseCase(completeHabitUseCase);
      },
      inject: ['CompletedHabitRepository'],
    },
    {
      provide: GetCompletedHabitUseCase.UseCase,
      useFactory: (
        getCompletedHabitUseCase: CompletedHabitRepository.Repository,
      ) => {
        return new GetCompletedHabitUseCase.UseCase(getCompletedHabitUseCase);
      },
      inject: ['CompletedHabitRepository'],
    },
  ],
})
export class CompletedHabitsModule {}
