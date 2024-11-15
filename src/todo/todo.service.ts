import { Injectable } from '@nestjs/common';
import { CreateTodo } from './dto/todo.dto';

@Injectable()
export class TodoService {
  private todoList = [];

  createTodo(data: CreateTodo) {
    const item = {
      id: new Date().getTime,
      ...data,
      status: `todo`,
    };
    this.todoList.push(item);
    console.log(this.todoList);
    return {
      message: 'success',
      item,
    };
  }

  getTodoList() {
    return {
      message: 'success',
      data: this.todoList,
    };
  }

  updateTodo() {}

  deleteTodo() {}
}
