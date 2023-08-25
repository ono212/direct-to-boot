import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>("initialized");

  useEffect(() => {
    axios
      .get(`/api/orders/${orderId}`)
      .then((res) => {
        if (res.data.status === "ready") {
          setStatus("ready");
        }
      })
      .catch((e) => {
        setStatus("error");
      });
  }, [orderId]);

  return { status };
};
