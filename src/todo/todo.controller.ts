import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodo } from './dto/create.todo.dto';
import { UpdateTodo } from './dto/update.todo.dto';
import { TodoService } from './todo.service';

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

  @Patch('/update-todo/:id')
  async updateTodo(
    @Param('id') id: string, // Route params are strings
    @Body() reqBody: UpdateTodo,
  ) {
    if ('id' in reqBody) {
      throw new BadRequestException(
        'ID should not be included in the request body.',
      );
    }
    return await this.todoService.updateTodo(id, reqBody);
  }

  @Delete('/delete-todo/:id')
  deleteTodo(
    @Param('id') id: string, // Route params are strings
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Delete('/delete-all-todo')
  deleteAllTodo() {
    return this.todoService.deleteAllTodo();
  }
}
