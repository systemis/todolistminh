import { networkProvider } from '@/src/providers/network.provider';
import { LoginDto, RegisterDto } from '@/src/dto';

export class UserService {
  async login(loginDto: LoginDto): Promise<any> {
    return networkProvider.request<any>(
      '/auth/sign_in', {
      method: 'POST',
      data: loginDto,
      responseHeader: true,
    });
  }

  async register(registerDto: RegisterDto): Promise<unknown> {
    return networkProvider.request<unknown>(
      '/auth', {
      method: 'POST',
      data: registerDto,
    });
  }
  
  async getUsers(): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      '/users', {
      method: 'GET'
    });
  }
}

export const userService = new UserService();
