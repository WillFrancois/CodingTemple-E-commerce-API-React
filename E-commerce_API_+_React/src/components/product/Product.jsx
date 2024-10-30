import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function retreiveProducts(func) {
  fetch("http://localhost:5000/product/all")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        func(["Loading..."]);
      }
    })
    .then((data) => func(data));
}

function Product() {
  const [productObj, setProductObj] = useState(["Loading..."]);
  const [activeModal, setActiveModal] = useState(false);
  const [placeholderData, setPlaceholderData] = useState({});

  useEffect(() => {
    retreiveProducts(setProductObj);
  }, []);

  return (
    <>
      <Link to="/product/add">
        <Button className="me-3" style={{ float: "right" }} variant="primary">
          Add Product
        </Button>
      </Link>
      <ul>
        {productObj.map((product) => {
          return (
            <li
              className="mb-5"
              style={{ listStyle: "none" }}
              key={`${product["id"]}`}
            >
              <Button
                variant="secondary"
                className="me-3"
                style={{ float: "left" }}
                onClick={() => {
                  setActiveModal(true);
                  setPlaceholderData(product);
                }}
              >
                🖉
              </Button>
              <Link to={`/product/${product["id"]}`}>
                <h2>{product["name"]}</h2>
              </Link>
            </li>
          );
        })}
      </ul>

      <Modal
        show={activeModal}
        onHide={() => {
          setActiveModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ProductName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                placeholder={placeholderData["name"]}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductPrice">
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder={placeholderData["price"]}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductDescription">
              <Form.Label>Product Description:</Form.Label>
              <Form.Control
                placeholder={placeholderData["description"]}
                type="text"
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const name = e.target.form[0].value;
                const price = Number(e.target.form[1].value);
                const description = e.target.form[2].value;

                fetch(
                  `http://localhost:5000/product/${placeholderData["id"]}`,
                  {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      name: name,
                      price: price,
                      description: description,
                    }),
                  },
                )
                  .then(() => {
                    setActiveModal(false);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              Submit
            </Button>
            <Button
              variant="danger"
              style={{ float: "right" }}
              onClick={() => {
                fetch(
                  `http://localhost:5000/product/${placeholderData["id"]}`,
                  { method: "DELETE" },
                )
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Product;
