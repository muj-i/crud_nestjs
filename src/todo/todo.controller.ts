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
    const numericId = Number(id); // Convert to number
    console.log('Received numeric id:', numericId);
    return await this.todoService.updateTodo(numericId, reqBody);
  }

  @Delete('/delete-todo/:id')
  deleteTodo(
    @Param('id') id: string, // Route params are strings
  ) {
    const numericId = Number(id); // Convert to number
    return this.todoService.deleteTodo(numericId);
  }

  @Delete('/delete-all-todo')
  deleteAllTodo() {
    return this.todoService.deleteAllTodo();
  }
}
