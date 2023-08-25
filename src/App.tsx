import "./App.css";
import { DirectToBoot } from "./DirectToBoot";
import { createMockServer } from "./createMockServer";

createMockServer();

function App() {
  return (
    <div className="App">
      <DirectToBoot orderId="order-id" />
    </div>
  );
}

export default App;
