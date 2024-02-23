import { ChakraProvider } from '@chakra-ui/react';
import Chat from "./components/chat/Chat";
import LogoNavbar from "./components/navbar/Navbar";

function App() {
  return (
    <ChakraProvider> {/* Wrap your application with ChakraProvider */}
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LogoNavbar />
        <Chat />
      </div>
    </ChakraProvider>
  );
}

export default App;
