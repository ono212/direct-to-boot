import { render, screen } from "@testing-library/react";
import { DirectToBoot } from "./DirectToBoot";

describe("Direct To Boot", () => {
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
});
