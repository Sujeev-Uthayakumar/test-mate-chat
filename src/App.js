import Chat from "./components/chat/Chat";
import LogoNavbar from "./components/navbar/Navbar";

function App() {
  return (
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
  );
}

export default App;
