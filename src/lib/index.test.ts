import test from 'ava';

import {
  Body,
  DELETE,
  GET,
  Header,
  PATCH,
  Path,
  POST,
  PUT,
  Query,
  RestClient,
} from './index';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@RestClient('https://jsonplaceholder.typicode.com')
class Test {
  @GET('/todos')
  async getAllTodos(): Promise<Todo[]> {
    throw new Error('not implemented');
  }

  @GET('/todos')
  async getTodosForUser(@Query('userId') _userId: number): Promise<Todo[]> {
    throw new Error('not implemented');
  }

  @Header('Content-Type', 'application/json; charset=UTF-8')
  @POST('/todos')
  async addTodo(@Body _todo: Todo): Promise<Todo> {
    throw new Error('not implemented');
  }

  @Header('Content-Type', 'application/json; charset=UTF-8')
  @PUT('/todos/:id')
  async replaceTodo(
    @Path('id') _todoId: number,
    @Body _newTodo: Todo
  ): Promise<Todo> {
    throw new Error('not implemented');
  }

  @Header('Content-Type', 'application/json; charset=UTF-8')
  @PATCH('/todos/:id')
  async updateTodo(
    @Path('id') _todoId: number,
    @Body _newTodo: Partial<Todo>
  ): Promise<Todo> {
    throw new Error('not implemented');
  }

  @DELETE('/todos/:id')
  async deleteTodo(@Path('id') _todoId: number): Promise<void> {
    throw new Error('not implemented');
  }
}

test('Test', async (t) => {
  const test = new Test();
  const todos = await test.getAllTodos();

  t.log(todos[0]);
  t.is(todos.length, 200);
});
