import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/get-todo-list')
  getTodoList() {
    return this.todoService.getTodoList();
  }
}
