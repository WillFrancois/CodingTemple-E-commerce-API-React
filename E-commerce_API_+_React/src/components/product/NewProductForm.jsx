import { Form, Button } from "react-bootstrap";
import { useState } from "react";

function handleSubmit(e, setCus) {
  e.preventDefault();
  const name = e.target[0];
  const price = e.target[1];
  const description = e.target[2];
  console.log(e);

  try {
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        price: Number(price.value),
        description: description.value,
      }),
    })
      .then((res) => {
        if (res["status"] == 200) {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (json["message"] == "Success!") {
          setCus("Product added successfully!");
        } else {
          setCus("An error has occurred, please try again.");
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function NewProductForm() {
  const [productAdded, setProductAdded] = useState("");

  return (
    <>
      <Form
        onSubmit={(e, setCus) => {
          handleSubmit(e, setProductAdded);
        }}
      >
        <Form.Group className="mb-3" controlId="customerName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="customerPhone">
          <Form.Label>Product Price:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="customerEmail">
          <Form.Label>Product Description:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {productAdded !== "" ? <h3 className="mt-3">{productAdded}</h3> : <></>}
      </Form>
    </>
  );
}

export default NewProductForm;
