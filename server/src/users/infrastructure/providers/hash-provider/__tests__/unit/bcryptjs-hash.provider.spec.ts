import { UserEntity } from '@/users/domain/entities/user.entity';
import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider';

describe('BcryptjsHashProvider unit tests', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('should return encrypted password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    expect(hash).toBeDefined();
  });

  it('should return false on invalid password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash('fake', hash);
    expect(result).toBeFalsy();
  });

  it('should return true on valid password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash(password, hash);
    expect(result).toBeTruthy();
  });
});
