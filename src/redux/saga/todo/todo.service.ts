import { networkProvider } from '@/src/providers/network.provider';

export class TodoService {
  async getTodoList(): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      '/task_lists', {
      method: "GET"
    });
  }

  async getTodo(todoListId: string): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      `/task_lists/${todoListId}`, {
      method: 'GET',
    });
  }
}

export const todoService = new TodoService();
