import AppRouter from './routes/Router.tsx';
import Modal from "./components/Modal/Modal.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Modal />
      </QueryClientProvider>
    </>
  )
}

export default App