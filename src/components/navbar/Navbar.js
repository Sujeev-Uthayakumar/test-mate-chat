import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ScienceIcon from "@mui/icons-material/Science";
import "./styles.css"; // Your custom dark mode styles

function LogoNavbar() {
  return (
    <div className="main-container">
      <Navbar className="bg-body-tertiary logo-navbar">
        <Container>
          <Navbar.Brand href="#home" className="brand-navbar">
            <ScienceIcon fontSize="large" />
            Test Mate
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default LogoNavbar;
