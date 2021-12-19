import anyTest, { TestFn } from 'ava';

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
  RestClient
} from './index';

const test = anyTest as TestFn<{
  client: TestClient;
}>;

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@RestClient('https://jsonplaceholder.typicode.com')
class TestClient {
  @GET('/todos')
  async getAllTodos(): Promise<Todo[]> {
    throw new Error('not implemented');
  }

  @GET('/todos')
  async getTodosForUser(@Query('userId') _userId: number): Promise<Todo[]> {
    throw new Error('not implemented');
  }

  @POST('/todos')
  async addTodo(@Body _todo: Omit<Todo, 'id'>): Promise<Todo> {
    throw new Error('not implemented');
  }

  @PUT('/todos/:id')
  async replaceTodo(
    @Path('id') _todoId: number,
    @Body _newTodo: Todo
  ): Promise<Todo> {
    throw new Error('not implemented');
  }

  // for test cov and unit testing debugging
  @Header('Test', 'Debugging time')
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

test.before(t => {
  t.context.client = new TestClient();
});

test('getting all todos', async (t) => {
  const todos = await t.context.client.getAllTodos();

  t.is(todos.length, 200);
});

test('getting todos for user', async (t) => {
  const todos = await t.context.client.getTodosForUser(1);

  t.is(todos.length, 20);
});

test('adding todo', async (t) => {
  const todo = await t.context.client.addTodo({
    userId: 1,
    title: 'test',
    completed: false
  });

  t.is(todo.id, 201);
});
