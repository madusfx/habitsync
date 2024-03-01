import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CompletedHabitPresenter } from './presenters/completed-habit.presenter';
import { CompletedHabitOutput } from '../application/dtos/completed-habit-output';
import { CompleteHabitUseCase } from '../application/usecases/completehabit.usecase';
import { GetCompletedHabitUseCase } from '../application/usecases/getcompletedhabit.usecase';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { CompleteHabitDto } from './dto/complete-habit.dto';

@ApiTags('completed-habits')
@Controller('completed-habits')
export class CompletedHabitsController {
  @Inject(CompleteHabitUseCase.UseCase)
  private completeHabitUseCase: CompleteHabitUseCase.UseCase;

  @Inject(GetCompletedHabitUseCase.UseCase)
  private getCompletedHabitUseCase: GetCompletedHabitUseCase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase;

  static completedHabitToResponse(output: CompletedHabitOutput) {
    return new CompletedHabitPresenter(output);
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @Post()
  async complete(@Body() completeHabitDto: CompleteHabitDto) {
    const { idHabit, idUser, completedHabit } = completeHabitDto;
    const userExists = await this.getUserUseCase.execute({ id: idUser });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const output = await this.completeHabitUseCase.execute({
      idHabit,
      idUser,
      completedHabit,
    });
    return CompletedHabitsController.completedHabitToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    description: 'ID não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getCompletedHabitUseCase.execute({ id });
    return CompletedHabitsController.completedHabitToResponse(output);
  }
}
