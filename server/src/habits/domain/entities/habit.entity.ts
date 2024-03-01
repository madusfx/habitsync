import { Entity } from '@/shared/domain/entities/entity';
import { HabitValidatorFactory } from '../validators/habit.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type HabitProps = {
  id: string;
  userId: string;
  name: string;
  weekDays: Array<number>;
  createdAt: Date;
};

export type UpdateHabitProps = {
  name?: string;
  weekDays?: Array<number>;
};

export class HabitEntity extends Entity<HabitProps> {
  constructor(
    public readonly props: HabitProps,
    id?: string,
  ) {
    HabitEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update({ name, weekDays }: UpdateHabitProps): void {
    if (name !== undefined) {
      HabitEntity.validate({ ...this.props, name });
      this.name = name;
    }
    if (weekDays !== undefined) {
      HabitEntity.validate({ ...this.props, weekDays });
      this.weekDays = weekDays;
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get weekDays() {
    return this.props.weekDays;
  }

  private set weekDays(value: Array<number>) {
    this.props.weekDays = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static validate(props: HabitProps) {
    const validator = HabitValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
