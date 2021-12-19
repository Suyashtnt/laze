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
} from "./mod.ts";

import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts";

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@RestClient("https://jsonplaceholder.typicode.com")
class TestClient {
  @GET("/todos")
  getAllTodos(): Promise<Todo[]> {
    throw new Error("not implemented");
  }

  @GET("/todos")
  getTodosForUser(@Query("userId") _userId: number): Promise<Todo[]> {
    throw new Error("not implemented");
  }

  @POST("/todos")
  addTodo(@Body _todo: Omit<Todo, "id">): Promise<Pick<Todo, "id">> {
    throw new Error("not implemented");
  }

  @PUT("/todos/:id")
  replaceTodo(
    @Path("id") _todoId: number,
    @Body _newTodo: Todo
  ): Promise<Todo> {
    throw new Error("not implemented");
  }

  // for test cov and unit testing debugging
  @Header("Test", "Debugging time")
  @PATCH("/todos/:id")
  updateTodo(
    @Path("id") _todoId: number,
    @Body _newTodo: Partial<Todo>
  ): Promise<Todo> {
    throw new Error("not implemented");
  }

  @DELETE("/todos/:id")
  deleteTodo(@Path("id") _todoId: number): Promise<void> {
    throw new Error("not implemented");
  }
}

Deno.test("getting all todos", async () => {
  const todos = await new TestClient().getAllTodos();

  assertEquals(todos.length, 200);
});

Deno.test("getting todos for user", async () => {
  const todos = await new TestClient().getTodosForUser(1);

  assertEquals(todos.length, 20);
});

Deno.test("adding todo", async () => {
  const todo = await new TestClient().addTodo({
    userId: 1,
    title: "test",
    completed: false,
  });

  assertEquals(todo.id, 201);
});

Deno.test("replacing todo", async () => {
  const todo = await new TestClient().replaceTodo(1, {
    userId: 1,
    title: "test",
    completed: false,
    id: 1,
  });

  assertEquals(todo.title, "test");
  assertEquals(todo.userId, 1);
});

Deno.test("updating todo", async () => {
  const todo = await new TestClient().updateTodo(1, {
    title: "test",
  });

  assertEquals(todo.title, "test");
  assertEquals(todo.userId, 1);
});

Deno.test("deleting todo", async () => {
  await new TestClient().deleteTodo(1);
});
