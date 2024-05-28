import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { CompletedHabitPresenter } from './presenters/completed-habit.presenter';
import { CompletedHabitOutput } from '../application/dtos/completed-habit-output';
import { CompleteHabitUseCase } from '../application/usecases/completehabit.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { CompleteHabitDto } from './dto/complete-habit.dto';
import { DeleteCompletedHabitUseCase } from '../application/usecases/deletecompletedhabit.usecase';
import { FindCompletedHabitUseCase } from '../application/usecases/findcompletedhabit.usecase';

@ApiTags('completed-habits')
@Controller('completed-habits')
export class CompletedHabitsController {
  @Inject(CompleteHabitUseCase.UseCase)
  private completeHabitUseCase: CompleteHabitUseCase.UseCase;

  @Inject(DeleteCompletedHabitUseCase.UseCase)
  private deleteCompletedHabitUseCase: DeleteCompletedHabitUseCase.UseCase;

  @Inject(FindCompletedHabitUseCase.UseCase)
  private findCompletedHabitUseCase: FindCompletedHabitUseCase.UseCase;

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
    const { idUser } = completeHabitDto;
    const userExists = await this.getUserUseCase.execute({ id: idUser });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const output = await this.completeHabitUseCase.execute(completeHabitDto);
    return CompletedHabitsController.completedHabitToResponse(output);
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @Delete(':idCompletedHabit')
  async remove(@Param('idCompletedHabit') idCompletedHabit: string) {
    await this.deleteCompletedHabitUseCase.execute({
      idCompletedHabit,
    });
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @Get()
  async findAll(
    @Query('idUser') idUser: string,
    @Query('completedHabit') completedHabit: Date,
  ) {
    const output = await this.findCompletedHabitUseCase.execute({
      idUser,
      completedHabit,
    });
    return CompletedHabitsController.completedHabitListToResponse(output);
  }

  static completedHabitListToResponse(output: CompletedHabitOutput[]): any {
    return output.map(completedHabit => ({
      id: completedHabit.id,
      idHabit: completedHabit.idHabit,
      idUser: completedHabit.idUser,
      completedHabit: completedHabit.completedHabit,
    }));
  }
}
