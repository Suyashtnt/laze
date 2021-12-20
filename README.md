# laze

A **tiny** typed class-based REST client based on
[ohmyfetch](https://github.com/unjs/ohmyfetch).

## usage

```ts
// deno
import { ... } from "https://deno.land/x/laze@0.1.0/mod.ts"
// node/npm
// use this for react/vue/svelte/a bundler
import { ... } from "laze-rest"
// browser via skypack (get a pinned URL for production)
// https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized
import { ... } from "https://www.skypack.dev/laze-rest"
// browser bundle containing all dependencies + laze (only ~9kb)
import { ... } from "https://github.com/Suyashtnt/laze/releases/download/version/bundle.js"

// use your own api base path, typicode is the example
// NOTE: types are obviously for typescript only
// (why would you use this without typescript anyways?)
@RestClient("https://jsonplaceholder.typicode.com")
class TestClient {
  @GET("/todos")
  // laze automatically parses JSON for you into an object
  getAllTodos(): Promise<Todo[]> {
    // this gets replaced at runtime
    // this shouldn't:tm: be bad for performance
    throw new Error("not implemented");
  }

  @GET("/todos")
  // use a query for ?query=whatever
  getTodosForUser(@Query("userId") userId: number): Promise<Todo[]> {
    throw new Error("not implemented");
  }

  @POST("/todos")
  // bodies are automatically serialized using JSON
  addTodo(@Body todo: Omit<Todo, "id">): Promise<Pick<Todo, "id">> {
    throw new Error("not implemented");
  }

  // prefix a path variable with :
  @PUT("/todos/:id")
  replaceTodo(
    // and use an argument to give it a value
    @Path("id") todoId: number,
    @Body newTodo: Todo,
  ): Promise<Todo> {
    throw new Error("not implemented");
  }

  // Headers go before the method because of the way decorators work 
  @Header("Test", "Use wireshark or something to see it being sent")
  @PATCH("/todos/:id")
  updateTodo(
    @Path("id") _todoId: number,
    @Body _newTodo: Partial<Todo>,
  ): Promise<Todo> {
    throw new Error("not implemented");
  }

  @DELETE("/todos/:id")
  deleteTodo(@Path("id") _todoId: number): Promise<void> {
    throw new Error("not implemented");
  }
}

// create a client whenever you want to use it
const client = new TestClient();

// just use it like a method, supplying your arguments if needed
console.log(client.getAllTodos())
```
