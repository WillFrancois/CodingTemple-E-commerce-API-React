import { Form, Button } from "react-bootstrap";
import { useState } from "react";

function handleSubmit(e, setCus) {
  e.preventDefault();
  const name = e.target[0];
  const phone = e.target[1];
  const email = e.target[2];
  console.log(e);

  try {
    fetch("http://localhost:5000/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone_number: phone.value,
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
          setCus("Customer added successfully!");
        } else {
          setCus("An error has occurred, please try again.");
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function NewCustomerForm() {
  const [customerAdded, setCustomerAdded] = useState("");

  return (
    <>
      <Form
        onSubmit={(e, setCus) => {
          handleSubmit(e, setCustomerAdded);
        }}
      >
        <Form.Group className="mb-3" controlId="customerName">
          <Form.Label>Customer Name:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="customerPhone">
          <Form.Label>Customer Phone Number:</Form.Label>
          <Form.Control type="tel" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="customerEmail">
          <Form.Label>Customer Email Address:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {customerAdded !== "" ? (
          <h3 className="mt-3">{customerAdded}</h3>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
}

export default NewCustomerForm;
