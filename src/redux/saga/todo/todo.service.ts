import { networkProvider } from '@/src/providers/network.provider';
import { TodoTaskEntity, TodoEntity } from "@/src/entities/todo.entity";
import {
  CreateTaskDto,
  CreateTodoDto,
  DeleteTodoDto,
  DeleteTaskTodoDto,
  EditTodoDto,
  EditTaskDto,
  ShareTaskDto,
} from "@/src/dto";

export class TodoService {
  async getTodoList(): Promise<TodoTaskEntity[]> {
    const taskList = await networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      '/task_lists', {
      method: "GET"
    });

    return await Promise.all(taskList.map(async (item) => {
      return {
        ...item,
        todos: await networkProvider.requestWithCredentials<TodoEntity[]>(
          `/task_lists/${item.id}/todos`, {
          method: 'GET',
        }),
      }
    }))
  }
  async getTodoListShared(): Promise<TodoTaskEntity[]> {
    const taskList = await networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      '/shared', {
      method: "GET"
    });

    return await Promise.all(taskList.map(async (item) => {
      return {
        ...item,
        todos: await networkProvider.requestWithCredentials<TodoEntity[]>(
          `/task_lists/${item.id}/todos`, {
          method: 'GET',
        }),
      }
    }))
  }

  async newTask(createTaskDto: CreateTaskDto): Promise<TodoTaskEntity[]> {
    return networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      '/task_lists', {
      method: "POST",
      data: createTaskDto,
    }
    );
  }
  
  async newTaskShared(createTaskDto: CreateTaskDto): Promise<TodoTaskEntity[]> {
    return networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      '/task_lists', {
      method: "POST",
      data: createTaskDto,
    }
    );
  }
  
  async editTask(editTaskDto: EditTaskDto): Promise<TodoTaskEntity[]> {
    return networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      `/task_lists/${editTaskDto.taskId}`, {
      method: "PATCH",
      data: editTaskDto as Omit<EditTaskDto, "taskId">,
    }
    );
  }
  
  async shareTask(shareTaskDto: ShareTaskDto): Promise<TodoTaskEntity[]> {
    return networkProvider.requestWithCredentials<TodoTaskEntity[]>(
      `/task_lists/${shareTaskDto.taskId}/share`, {
      method: "POST",
      data: shareTaskDto,
    }
    );
  }

  async deleteTask(deleteTaskDto: DeleteTaskTodoDto): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      `/task_lists/${deleteTaskDto.taskId}`, {
      method: "DELETE",
    }
    );
  }

  async newTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return networkProvider.requestWithCredentials<TodoEntity>(
      `/task_lists/${createTodoDto.taskId}/todos`, {
      method: "POST",
      data: createTodoDto as Omit<CreateTodoDto, "taskId">,
    }
    );
  }
  
  async editTodo(editTodoDto: EditTodoDto): Promise<TodoEntity> {
    return networkProvider.requestWithCredentials<TodoEntity>(
      `/task_lists/${editTodoDto.taskId}/todos/${editTodoDto.todoId}`, {
      method: "PATCH",
      data: editTodoDto as Omit<EditTodoDto, "taskId" | "todoId">,
    }
    );
  }

  async deleteTodo(deleteTodoDto: DeleteTodoDto): Promise<unknown> {
    return networkProvider.requestWithCredentials<unknown>(
      `/task_lists/${deleteTodoDto.taskId}/todos/${deleteTodoDto.todoId}`, {
      method: "DELETE",
    });
  }
}

export const todoService = new TodoService();
