import { render, screen, waitFor } from "@testing-library/react";
import { DirectToBoot } from "./DirectToBoot";

import { Server } from "miragejs";
import { createMockServer } from "./createMockServer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

let server: Server;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retryDelay: 0 },
  },
});

describe("Direct To Boot", () => {
  beforeEach(() => {
    server = createMockServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  const myRender = (ui: ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  it("초기 상태인 '트렁크로 간편 배송 서비스'를 렌더링한다.", () => {
    myRender(<DirectToBoot orderId="order-id" />);

    expect(screen.getByText("트렁크로 간편 배송 서비스")).toBeInTheDocument();
    expect(
      screen.getByText("아직 주문 내역을 준비 중이에요!")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("주문이 준비 완료되면 버튼이 활성화된다.", async () => {
    myRender(<DirectToBoot orderId="order-id" />);

    expect(screen.getByText("트렁크로 간편 배송 서비스")).toBeInTheDocument();
    expect(
      screen.getByText("아직 주문 내역을 준비 중이에요!")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await waitFor(() => expect(button).toBeEnabled(), { timeout: 3000 });
    await screen.findByText(
      "가게에 도착하셨다면 버튼을 눌러주세요! 주문하신 물건을 저희 직원이 가져다 드리겠습니다!"
    );
  });

  it("가게에 전화를 거는 폴백 버튼이 보인다.", async () => {
    myRender(<DirectToBoot orderId="error-order" />);

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(
      () =>
        expect(
          screen.getByText("문제가 생겼습니다. 이 번호로 전화를 걸어주세요.")
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );

    const button = screen.getByText("02-123-4567");
    await waitFor(() => expect(button).toBeInTheDocument(), {
      timeout: 3000,
    });
  });
});
