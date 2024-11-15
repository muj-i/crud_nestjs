import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodo } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/get-todo-list')
  getTodoList() {
    return this.todoService.getTodoList();
  }

  @Post('/create-todo')
  createTodo(@Body() data: CreateTodo) {
    return this.todoService.createTodo(data);
  }
}
