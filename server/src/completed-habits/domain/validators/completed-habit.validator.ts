import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { CompletedHabitProps } from '../entities/completed-habit.entity';

export class CompletedHabitRules {
  @IsString()
  idHabit: string;

  @IsString()
  idUser: string;

  @IsDate()
  @IsOptional()
  completedHabit?: Date;

  constructor({ idHabit, idUser, completedHabit }: CompletedHabitProps) {
    Object.assign(this, { completedHabit, idHabit, idUser });
  }
}

export class CompletedHabitValidator extends ClassValidatorFields<CompletedHabitRules> {
  validate(data: CompletedHabitProps): boolean {
    return super.validate(
      new CompletedHabitRules(data ?? ({} as CompletedHabitProps)),
    );
  }
}

export class CompletedHabitValidatorFactory {
  static create(): CompletedHabitValidator {
    return new CompletedHabitValidator();
  }
}
