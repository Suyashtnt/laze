import { GET, Header, RestClient } from "../mod.ts";
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
  } catch (_e) {
    // the header decorator should throw an error and reach here
  }
});
