import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { CompletedHabitsController } from './completed-habits.controller';
import { CompletedHabitPrismaRepository } from './database/prisma/repositories/completed-habit-prisma.repository';
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user-prisma.repository';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { CompleteHabitUseCase } from '../application/usecases/completehabit.usecase';
import { CompletedHabitRepository } from '../domain/repositories/completed-habit.repository';
import { DeleteCompletedHabitUseCase } from '../application/usecases/deletecompletedhabit.usecase';
import { FindCompletedHabitUseCase } from '../application/usecases/findcompletedhabit.usecase';

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
      provide: DeleteCompletedHabitUseCase.UseCase,
      useFactory: (
        deleteCompletedHabitUseCase: CompletedHabitRepository.Repository,
      ) => {
        return new DeleteCompletedHabitUseCase.UseCase(
          deleteCompletedHabitUseCase,
        );
      },
      inject: ['CompletedHabitRepository'],
    },
    {
      provide: FindCompletedHabitUseCase.UseCase,
      useFactory: (
        findCompletedHabitUseCase: CompletedHabitRepository.Repository,
      ) => {
        return new FindCompletedHabitUseCase.UseCase(findCompletedHabitUseCase);
      },
      inject: ['CompletedHabitRepository'],
    },
  ],
})
export class CompletedHabitsModule {}
