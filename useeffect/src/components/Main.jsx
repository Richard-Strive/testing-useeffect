import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  ButtonGroup,
  DropdownButton,
  Pagination,
  Button,
} from "react-bootstrap";
import Book from "./Book";
import { ArrowCounterclockwise } from "react-bootstrap";
const categories = ["scifi", "romance", "horror", "history", "fantasy"];
const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

const myBooks = async () => {
  try {
    const resp = await fetch("https://strive-bookstore.herokuapp.com/books");
    const data = await resp.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

function Main() {
  const [categ, setCateg] = useState(categories[0]);

  useEffect(() => {
    myBooks();
    console.log("fired");
  }, [categ]);

  //useeffect  con la dependecies specificata in questo caso "[categ]" la funzione viene triggerata una sola volta con il
  // primo rendere e poi tutte le volte che nel mio state cioe' nell' HOOK il valore di categ cambia.

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {categ}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((cat, index) => (
            <Dropdown.Item
              key={index}
              href="#/action-1"
              onClick={() => setCateg(cat)}
            >
              {cat}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Main;
