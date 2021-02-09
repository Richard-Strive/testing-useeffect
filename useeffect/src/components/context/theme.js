import { createContext } from "react";

export const ThemeContext = createContext();

export const Theme = {
  dark: "DARK",
  light: "LIGHT",
};

export const initialState = Theme.light;
