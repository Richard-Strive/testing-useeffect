import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext, Theme } from "../components/context/theme";

function ThemeToggle() {
  const [theme, setTheme] = useContext(ThemeContext);
  console.log(theme);
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="dark-mode"
        checked={theme === Theme.dark}
        onChange={() =>
          setTheme(theme === Theme.dark ? Theme.light : Theme.dark)
        }
      />
    </Form>
  );
}

export default ThemeToggle;
