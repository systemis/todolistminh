export class TodoTaskEntity {
  description?: string = "";
  done_count?: number = 0;
  id?: number | string;
  is_write?: boolean = false;
  name?: string;
  share_count?: number = 0;
  todo_count?: number = 0;
  todos?: TodoEntity[] = [];
}

export class TodoEntity {
  id?: string;
  name: string;
  done?: boolean;
  description?: string;
  task_list_id?: string;
  created_at?: string;
  updated_at?: string;
  get completed(): boolean {
    return this.done;
  }

  set completed(value: boolean) {
    this.done = value;
  }
}