import { render, screen, waitFor } from "@testing-library/react";
import { DirectToBoot } from "./DirectToBoot";

import { createServer, Server } from "miragejs";

let server: Server;

describe("Direct To Boot", () => {
  beforeEach(() => {
    server = createServer({});
  });

  afterEach(() => {
    server.shutdown();
  });

  it("'트렁크로 간편 배송 서비스' 텍스트를 렌더링한다.", () => {
    render(<DirectToBoot orderId="order-id" />);

    expect(screen.getByText("트렁크로 간편 배송 서비스")).toBeInTheDocument();
    expect(
      screen.getByText("아직 주문 내역을 준비 중이에요!")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("주문이 준비 완료되면 버튼이 활성화된다.", async () => {
    server.get("/api/orders/:id", (schema, request) => {
      return {
        id: request.params.id,
        status: "ready",
      };
    });

    render(<DirectToBoot orderId="order-id" />);

    expect(screen.getByText("트렁크로 간편 배송 서비스")).toBeInTheDocument();
    expect(
      screen.getByText("아직 주문 내역을 준비 중이에요!")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await waitFor(() => expect(button).toBeEnabled(), { timeout: 3000 });
  });
});
