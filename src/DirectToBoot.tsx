import axios from "axios";
import { useEffect, useState } from "react";

function getMessage(status: string) {
  switch (status) {
    case "initialized":
      return "아직 주문 내역을 준비 중이에요!";
    case "ready":
      return "가게에 도착하셨다면 버튼을 눌러주세요! 주문하신 물건을 저희 직원이 가져다 드리겠습니다!";
  }
}

export const DirectToBoot = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState<string>("initialized");

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`).then((res) => {
      if (res.data.status === "ready") {
        setStatus("ready");
      }
    });
  }, [orderId]);

  return (
    <div>
      <h1>트렁크로 간편 배송 서비스</h1>
      <p>{getMessage(status)}</p>
      <button disabled={status !== "ready"}>가게에 도착해있어요!</button>
    </div>
  );
};
