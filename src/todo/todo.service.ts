import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getTodoList() {
    return {
      message: 'Todo list',
      data: [
        {
          id: 1,
          title: 'Create a new project',
          description: 'Create a new project using NestJS',
        },
        {
          id: 2,
          title: 'Create a new module',
          description: 'Create a new module in the project',
        },
      ],
    };
  }
}
