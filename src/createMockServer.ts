import { createServer, Response } from "miragejs";

export function createMockServer() {
  return createServer({
    routes() {
      this.get("/api/orders/:id", (schema, request) => {
        if (["error-id"].includes(request.params.id)) {
          return new Response(500, {}, { error: "뭔가 잘못됐어요!" });
        }
        return {
          id: request.params.id,
          status: "ready",
        };
      });
    },
  });
}
