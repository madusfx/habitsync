import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { HabitProps } from '../entities/habit.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

export class HabitRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  weekDays: Array<number>;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ name, weekDays, createdAt }: HabitProps) {
    Object.assign(this, { name, weekDays, createdAt });
  }
}

export class HabitValidator extends ClassValidatorFields<HabitRules> {
  validate(data: HabitProps): boolean {
    return super.validate(new HabitRules(data ?? ({} as HabitProps)));
  }
}

export class HabitValidatorFactory {
  static create(): HabitValidator {
    return new HabitValidator();
  }
}
