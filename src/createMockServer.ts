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

      this.post("/api/orders/:id", (schema, request) => {
        const id = request.params.id;

        if (["unreachable-order-id"].includes(id)) {
          return new Response(
            500,
            {},
            { message: "order-id가 유효하지 않습니다." }
          );
        }
        return {
          id: request.params.id,
          status: "notified",
        };
      });
    },
  });
}
