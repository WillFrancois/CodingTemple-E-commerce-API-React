import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function handleSubmit(event) {
  const formData = event.target;
  console.log(formData);

  const c_id = Number(formData[0].value);
  const p_id = Number(formData[1].value);
  const address = formData[2].value;
  const instructions = formData[3].value;
  try {
    let promise = fetch("http://localhost:5000/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        c_id: c_id,
        p_id: p_id,
        address: address,
        instructions: instructions,
      }),
    }).catch((err) => {
      console.log(err);
    });

    return promise;
  } catch (error) {
    console.log(error);
  }
}

function retreiveProducts(func) {
  fetch("http://localhost:5000/product/all")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return {};
      }
    })
    .then((data) => {
      func(data);
    });
}

function PlaceOrder() {
  let [productList, setProductList] = useState(undefined);

  useEffect(() => {
    retreiveProducts(setProductList);
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e)
          .then((data) => {
            return data.json();
          })
          .then((json) => {
            if (json["message"] === "Success!") {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Customer ID:</Form.Label>
        <Form.Control required type="number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product:</Form.Label>
        <Form.Select>
          {productList !== undefined ? (
            productList.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address:</Form.Label>
        <Form.Control required type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instructions:</Form.Label>
        <Form.Control required type="text" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Place Order
      </Button>
    </Form>
  );
}

export default PlaceOrder;
