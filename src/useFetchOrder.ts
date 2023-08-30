import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchOrder = (orderId: string) => {
  return axios.get(`/api/orders/${orderId}`).then((res) => {
    if (res.data.status === "ready") {
      return res.data;
    } else {
      throw new Error("fetch error");
    }
  });
};

const sendNotifyStore = (orderId: string) => {
  return axios.post(`/api/orders/${orderId}`, { id: orderId });
};

export const useFetchOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>("initialized");

  useQuery(["fetchOrder"], () => fetchOrder(orderId), {
    retry: 3,
    refetchOnWindowFocus: false,
    onError: () => setStatus("error"),
    onSuccess: () => setStatus("ready"),
  });

  const { mutate: notifyStore } = useMutation(
    ["sendNotifyStore"],
    sendNotifyStore,
    {
      onSuccess: () => setStatus("notified"),
    }
  );

  return { status, notifyStore };
};
