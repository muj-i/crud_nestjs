import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTodo } from './dto/create.todo.dto';
import { UpdateTodo } from './dto/update.todo.dto';
import { Todo } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(data: CreateTodo) {
    try {
      this.todoModel.create(data);
      console.log(this.todoModel);
      return {
        message: 'success',
        data,
      };
    } catch (error) {
      return {
        message: 'error',
        error,
      };
    }
  }

  async getTodoList() {
    try {
      const todo = await this.todoModel.find().sort({ createdAt: -1 });
      return {
        message: 'success',
        data: todo,
      };
    } catch (error) {
      console.error('Error fetching todo:', error);
      return {
        message: 'error',
        error,
      };
    }
  }

  async updateTodo(id: string, data: UpdateTodo) {
    console.log('Incoming id:', id);
    try {
      const todo = await this.todoModel.findOne({
        _id: new Types.ObjectId(id),
      });
      console.log('Found todo:', todo);

      Object.assign(todo, data); // Update fields
      await todo.save(); // Save changes
      console.log('Updated todo:', todo);
      return {
        message: 'success',
        data: todo,
      };
    } catch (error) {
      console.error('Todo not found with id:', id);
      return {
        message: 'error',
        error,
      };
    }
  }

  async deleteTodo(id: string) {
    console.log('Incoming id:', id);
    console.log('todoList before delete:', this.todoModel);
    try {
      const result = await this.todoModel.deleteOne({
        _id: new Types.ObjectId(id),
      });
      console.log('Delete result:', result);

      if (result.deletedCount > 0) {
        console.log('Todo deleted');
        return {
          message: 'success',
          data: result,
        };
      } else {
        console.error('Todo not found with id:', id);
        return {
          message: 'error',
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'error',
        error,
      };
    }
  }

  async deleteAllTodo() {
    try {
      const result = await this.todoModel.deleteMany({});
      console.log('Delete operation result:', result);

      if (result.deletedCount > 0) {
        return {
          message: 'success',
          deletedCount: result.deletedCount,
        };
      } else {
        return {
          message: 'No todo found to delete.',
          deletedCount: 0,
        };
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      return {
        message: 'error',
        error: error.message,
      };
    }
  }
}
