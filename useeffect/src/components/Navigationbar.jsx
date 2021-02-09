import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext, Theme } from "../components/context/theme";
function Navigationbar() {
  const [theme] = useContext(ThemeContext);
  console.log(theme);
  return (
    <div>
      <Navbar
        className={`styled-navbar no-select text-white ${
          theme === Theme.dark ? "bg-dark" : "bg-primary"
        }`}
      >
        <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        <ThemeToggle />
      </Navbar>
      <br />
    </div>
  );
}

export default Navigationbar;
