import { GET, Header, Path, RestClient } from "../mod.ts";
import { Todo } from "./types.ts";

Deno.test("header error", async () => {
  try {
    @RestClient("https://jsonplaceholder.typicode.com")
    class TestClient {
      @GET("/todos")
      @Header("Test", "Debugging time")
      getAllTodos(): Promise<Todo[]> {
        throw new Error("not implemented");
      }
    }

    const client = new TestClient();
    await client.getAllTodos();
    throw new Error("should not reach here");
  } catch (err) {
    console.log(err.message);
    // the header decorator should throw an error and reach here
  }
});

Deno.test("header error 2", async () => {
  try {
    @RestClient("https://jsonplaceholder.typicode.com")
    class TestClient {
      // for the 2nd time the error can be thrown, an existing method must exist
      @GET("/todos/:id")
      getTodo(@Path("id") _id: number): Promise<Todo> {
        throw new Error("not implemented.");
      }

      @GET("/todos")
      @Header("Test", "Debugging time")
      getAllTodos(): Promise<Todo[]> {
        throw new Error("not implemented");
      }
    }

    const client = new TestClient();
    await client.getAllTodos();
    throw new Error("should not reach here");
  } catch (err) {
    console.log(err.message);
    // the header decorator should throw an error and reach here
  }
});
