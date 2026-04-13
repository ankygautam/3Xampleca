import { AppRouter } from "./router";
import { ToastProvider } from "./components/ui/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
