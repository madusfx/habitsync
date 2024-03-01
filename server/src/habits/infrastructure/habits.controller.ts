import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  HttpCode,
  Put,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { CreateHabitUseCase } from '../application/usecases/createhabit.usecase';
import { UpdateHabitUseCase } from '../application/usecases/updatehabit.usecase';
import { DeleteHabitUseCase } from '../application/usecases/deletehabit.usecase';
import { GetHabitUseCase } from '../application/usecases/gethabit.usecase';
import { ListHabitsUseCase } from '../application/usecases/listhabits.usecase';
import { HabitOutput } from '../application/dtos/habit-output';
import {
  HabitCollectionPresenter,
  HabitPresenter,
} from './presenters/habit.presenter';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';

@ApiTags('habits')
@Controller('habits')
export class HabitsController {
  @Inject(CreateHabitUseCase.UseCase)
  private createHabitUseCase: CreateHabitUseCase.UseCase;

  @Inject(DeleteHabitUseCase.UseCase)
  private deleteHabitUseCase: DeleteHabitUseCase.UseCase;

  @Inject(GetHabitUseCase.UseCase)
  private getHabitUseCase: GetHabitUseCase.UseCase;

  @Inject(ListHabitsUseCase.UseCase)
  private listHabitsUseCase: ListHabitsUseCase.UseCase;

  @Inject(UpdateHabitUseCase.UseCase)
  private updateHabitUseCase: UpdateHabitUseCase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase;

  static habitToResponse(output: HabitOutput) {
    return new HabitPresenter(output);
  }

  static listHabitsToResponse(output: ListHabitsUseCase.Output) {
    return new HabitCollectionPresenter(output);
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @Post()
  async create(@Body() createHabitDto: CreateHabitDto) {
    const { name, weekDays, userId } = createHabitDto;
    const userExists = await this.getUserUseCase.execute({ id: userId });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const output = await this.createHabitUseCase.execute({
      name,
      weekDays,
      userId,
    });
    return HabitsController.habitToResponse(output);
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
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getHabitUseCase.execute({ id });
    return HabitsController.habitToResponse(output);
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
  @UseGuards(AuthGuard)
  @Get('/user/:userId')
  async findAllByUserId(@Param('id') userId: string) {
    const output = await this.listHabitsUseCase.execute({ userId: userId });
    return HabitsController.listHabitsToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'ID não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    const output = await this.updateHabitUseCase.execute({
      id,
      ...updateHabitDto,
    });
    return HabitsController.habitToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Resposta de confirmação da exclusão',
  })
  @ApiResponse({
    status: 404,
    description: 'ID não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteHabitUseCase.execute({ id });
  }
}
