import { createServer, Response } from "miragejs";

let count: number = 0;

export function createMockServer() {
  return createServer({
    routes() {
      this.get("/api/orders/:id", (schema, request) => {
        if (["error-order"].includes(request.params.id)) {
          return new Response(500, {}, { error: "뭔가 잘못됐어요!" });
        }

        if (["long-order"].includes(request.params.id)) {
          if (count < 3) {
            count += 1;
            return {
              id: request.params.id,
              status: "initialized",
            };
          } else {
            count = 0;
            return {
              id: request.params.id,
              status: "ready",
            };
          }
        }

        return {
          id: request.params.id,
          status: "ready",
        };
      });
    },
  });
}
