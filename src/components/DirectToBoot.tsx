import { getMessage } from "../utils";
import { useOrder } from "../hooks/useOrder";

const createButton = (status: string, onClick: () => void) => {
  switch (status) {
    case "initialized":
      return <button disabled>가게에 도착해있어요!</button>;
    case "ready":
      return <button onClick={onClick}>가게에 도착해있어요!</button>;
    case "error":
      return <button>02-123-4567</button>;
    case "notified":
      return null;
  }
};

export const DirectToBoot = ({ orderId }: { orderId: string }) => {
  const { status, notifyStore } = useOrder(orderId);

  return (
    <div>
      <h1>트렁크로 간편 배송 서비스</h1>
      <p>{getMessage(status)}</p>
      {createButton(status, notifyStore)}
    </div>
  );
};
