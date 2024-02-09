import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";

function LogoNavbar() {
  return (
    <div className="main-container">
      <Navbar className="bg-body-tertiary logo-navbar">
        <Container>
          <Navbar.Brand
            href="#home"
            className="brand-navbar title-text"
            style={{ fontSize: "37px" }}
          >
            TestMate {/* Text added here */}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default LogoNavbar;