import test from 'ava';

import { GET, RestClient } from './index';

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
    return [];
  }
}

test('Test', async (t) => {
  const test = new Test();
  const todos = await test.getAllTodos();

  t.log(todos[0]);
  t.is(todos.length, 200);
});
