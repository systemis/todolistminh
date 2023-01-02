import { IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  name?: string;
}

export class EditTaskDto extends CreateTaskDto {
  @IsString()
  taskId: string;
}

export class CreateTodoDto {
  @IsString()
  name?: string;

  @IsString()
  taskId: string;
}

export class DeleteTaskTodoDto {
  @IsString()
  taskId: string;
}

export class DeleteTodoDto {
  @IsString()
  taskId: string;

  @IsString()
  todoId: string;
}

export class EditTodoDto extends CreateTodoDto {
  todoId: string;
  done?: boolean;
};
