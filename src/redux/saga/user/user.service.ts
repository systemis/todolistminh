import { networkProvider } from '@/src/providers/network.provider';
import { LoginDto, RegisterDto } from '@/src/dto';

export class UserService {
  async login(loginDto: LoginDto): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      '/auth/sign_in', {
      method: 'POST',
      data: loginDto,
    });
  }

  async register(registerDto: RegisterDto): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      '/auth', {
      method: 'POST',
      data: registerDto,
    });
  }
}

export const userService = new UserService();
