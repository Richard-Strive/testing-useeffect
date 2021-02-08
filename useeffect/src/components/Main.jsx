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
import { ArrowCounterclockwise } from "react-bootstrap";
import Book from "./Book";
const categories = ["scifi", "romance", "horror", "history", "fantasy"];
const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

function Main() {
  const [categ, setCateg] = useState(categories[0]);
  const [offset, setOffset] = useState();
  const [limit, setLimit] = useState(10);
  const [books, setBooks] = useState([]);
  const [pages, setPage] = useState(1);
  //Page e utitle a capire quante pagine dovro' avere per visualizzare i dati e poi lo abbiamo usato nella paginazione
  const [selPages, setSelPages] = useState(1);
  //SEL PAGE CI SERVER PER FARE LA ROBA ESTETICA DI ACTIVE A LINEA 69

  //useeffect  con la dependecies specificata in questo caso "[categ]" la funzione viene triggerata una sola volta con il
  // primo rendere e poi tutte le volte che nel mio state cioe' nell' HOOK il valore di categ cambia.

  /*1 limit signfica come la porla suggerisce, IMPONIAMO UN LIMITE. Cioe' quando fetchiamo un dato di 
tot grandezza ad esempio un array di 150 elementi ed impostiamo un limit di 10 invece di ricevere tutto i 150 elementi ne riceviamo 10(una porzione) */

  const myBooks = useCallback(async () => {
    try {
      let query = `?offset=${offset}`;
      limit && (query += `&limit=${limit}`);
      categ && (query += `&category=${categ}`);

      const resp = await fetch(
        "https://strive-bookstore.herokuapp.com/books" + query
      );
      const { data, numberOfItems } = await resp.json();

      if (resp.ok) {
        setBooks(data);
        setPage(Math.floor(numberOfItems / limit));
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [offset, limit, categ]);

  useEffect(() => {
    myBooks();
    setOffset(limit * (selPages - 0));
    selPages > pages && setSelPages(pages);
    console.log("fired");
  }, [categ, limit, offset, selPages]);

  return (
    <Container>
      <Row>
        <Col xs={12} className="d-flex">
          {/* <Col xs={12} md={4} lg={2}> */}
          {/* * Testando il responsivess xs dicimao alla colonna di prendere
          tutta la pagina con md diciamo alla colonna di prendere meta' pagina e
          con lg diciamo alla pagina di prendere solo 1/4 della pagina */}
          {(() => {
            let items = [];
            for (let pageN = 1; pageN <= pages; pageN++) {
              items.push(
                <Pagination.Item
                  key={pageN}
                  active={pageN === selPages}
                  onClick={() => setSelPages(pageN)}
                >
                  {pageN}
                </Pagination.Item>
              );
            }
            return items;
          })()}
        </Col>
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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {limit}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[5, 10, 20, 30, 40].map((items, index) => (
              <Dropdown.Item
                key={index}
                href="#/action-1"
                onClick={() => setLimit(items)}
              >
                {items}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      {books.map((book, i) => (
        <Book book={book} index={i} offset={offset} />
      ))}
    </Container>
  );
}

export default Main;
