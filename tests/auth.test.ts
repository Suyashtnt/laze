import { assert } from "https://deno.land/std@0.109.0/testing/asserts.ts";
import { BasicAuth, GET, RestClient } from "../mod.ts";

function getUsernameAndPassword() {
  return {
    username: "admin",
    password: "test",
  };
}

@RestClient("https://httpbin.org/")
class TestAuthClient {
  @BasicAuth(
    getUsernameAndPassword().username,
    getUsernameAndPassword().password,
  )
  @GET("/basic-auth/admin/test")
  basicAuth(): Promise<{ authenticated: boolean }> {
    throw new Error("not implemented.");
  }
}

Deno.test("basic authorization", async () => {
  const client = new TestAuthClient();
  const response = await client.basicAuth();
  assert(response.authenticated);
});
