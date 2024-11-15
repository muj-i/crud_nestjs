import { Injectable } from '@nestjs/common';
import { CreateTodo } from './dto/create.todo.dto';
import { UpdateTodo } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
  private todoList = [];

  createTodo(data: CreateTodo) {
    const item = {
      id: new Date().getTime(),
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

  updateTodo(id: number, data: UpdateTodo) {
    console.log('Incoming id:', id);
    console.log('todoList before update:', this.todoList);

    const index = this.todoList.findIndex((todo) => todo.id === id);
    console.log('Found index:', index);

    if (index !== -1) {
      this.todoList[index] = {
        ...this.todoList[index],
        ...data,
      };
      console.log('Updated todo:', this.todoList[index]);
      return {
        message: 'success',
        data: this.todoList[index],
      };
    } else {
      console.error('Todo not found with id:', id);
      return {
        message: 'error',
        data: null,
      };
    }
  }

  deleteTodo(id: number) {
    console.log('Incoming id:', id);
    console.log('todoList before delete:', this.todoList);

    const index = this.todoList.findIndex((todo) => todo.id === id);
    console.log('Found index:', index);

    if (index !== -1) {
      this.todoList.splice(index, 1);
      console.log('Todo deleted');
      return {
        message: 'success',
      };
    } else {
      console.error('Todo not found with id:', id);
      return {
        message: 'error',
      };
    }
  }

  deleteAllTodo() {
    this.todoList = [];
    return {
      message: 'success',
    };
  }
}
