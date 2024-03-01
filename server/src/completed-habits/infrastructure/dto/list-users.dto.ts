import { ListHabitsUseCase } from '@/habits/application/usecases/listhabits.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ListHabitsDto implements ListHabitsUseCase.Input {
  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  userId: string;
}
