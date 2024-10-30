import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function DeleteProduct(id) {
  try {
    let promise = fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      console.log(error);
    });
    return promise;
  } catch (error) {
    console.log(error);
  }
}

function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((data) => setProductData(data));
  }, []);

  return (
    <>
      {productData !== undefined ? (
        <>
          <Button
            onClick={() => {
              DeleteProduct(id).then(() => {
                window.location.replace("/product");
              });
            }}
            style={{ float: "right" }}
            variant="danger"
            className="me-3"
          >
            Delete
          </Button>
          <h1 className="mb-3">Product: {productData["name"]}</h1>
          <h3 className="mb-5">Price: {productData["price"]}</h3>
          <h5>Description: {productData["description"]}</h5>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default ProductDetails;
