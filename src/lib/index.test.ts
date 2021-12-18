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
  const todo = await test.getAllTodos();

  t.is(todo.length, 200);
});
