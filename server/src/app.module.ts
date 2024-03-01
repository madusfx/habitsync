import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { HabitsModule } from './habits/infrastructure/habits.module';
import { CompletedHabitsModule } from './completed-habits/infrastructure/completed-habits.module';

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    HabitsModule,
    CompletedHabitsModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
