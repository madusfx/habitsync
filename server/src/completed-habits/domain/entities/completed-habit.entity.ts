import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CompletedHabitValidatorFactory } from '../validators/completed-habit.validator';

export type CompletedHabitProps = {
  idHabit: string;
  idUser: string;
  completedHabit?: Date;
};

export class CompletedHabitEntity extends Entity<CompletedHabitProps> {
  constructor(
    public readonly props: CompletedHabitProps,
    id?: string,
  ) {
    CompletedHabitEntity.validate(props);
    super(props, id);
    this.props.completedHabit = this.props.completedHabit ?? new Date();
  }

  get idHabit() {
    return this.props.idHabit;
  }

  private set idHabit(value: string) {
    this.props.idHabit = value;
  }

  get idUser() {
    return this.props.idUser;
  }

  private set idUser(value: string) {
    this.props.idUser = value;
  }

  get completedHabit() {
    return this.props.completedHabit;
  }

  private set completedHabit(value: Date) {
    this.props.completedHabit = value;
  }

  static validate(props: CompletedHabitProps) {
    const validator = CompletedHabitValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
