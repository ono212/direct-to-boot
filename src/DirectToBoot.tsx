import { getMessage } from "./utils";
import { useFetchOrder } from "./useFetchOrder";

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
  const { status, notifyStore } = useFetchOrder(orderId);
  const onClick = () => notifyStore(orderId);

  return (
    <div>
      <h1>트렁크로 간편 배송 서비스</h1>
      <p>{getMessage(status)}</p>
      {createButton(status, onClick)}
    </div>
  );
};
