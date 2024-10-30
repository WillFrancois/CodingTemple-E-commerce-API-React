import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function handleSubmit(e, uid) {
  e.preventDefault();
  const name = e.target[0];
  const phone = e.target[1];
  const email = e.target[2];

  try {
    let promise = fetch(`http://localhost:5000/customer/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone_number: phone.value,
      }),
    });
    return promise;
  } catch (error) {
    console.log(error);
  }
}

function handleDelete(uid) {
  try {
    let promise = fetch(`http://localhost:5000/customer/${uid}`, {
      method: "DELETE",
    });
    return promise;
  } catch (error) {
    console.log(error);
  }
}

function CustomerUpdate() {
  let { id } = useParams();

  return (
    <>
      <h3 className="mt-5">Update Info:</h3>
      <div>
        <Form
          onSubmit={(e) => {
            handleSubmit(e, id).then(() => {
              window.location.reload();
            });
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

          <Button
            variant="danger"
            onClick={() => {
              handleDelete(id).then(() => {
                window.location.replace("/customer");
              });
            }}
          >
            Delete
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CustomerUpdate;
