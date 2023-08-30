import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { DirectToBoot } from "./components/DirectToBoot";
import { createMockServer } from "./mocks/createMockServer";

createMockServer();

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <DirectToBoot orderId="order-id" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
