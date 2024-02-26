import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entities/entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const props = { prop1: 'value1', prop2: 1 };
    const entity = new StubEntity(props);

    expect(entity.props).toBe(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 1 };
    const id = 'b7f6014e-9b2e-412c-b702-6e53df02c7d5';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('should convert a entity to a javascript object', () => {
    const props = { prop1: 'value1', prop2: 1 };
    const id = 'b7f6014e-9b2e-412c-b702-6e53df02c7d5';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
