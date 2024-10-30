import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CustomerUpdate from "./CustomerUpdateForm";

function CustomerDetails() {
  const [uName, setUName] = useState("Loading...");
  const [uEmail, setUEmail] = useState("");
  const [uPhone, setUPhone] = useState("");
  let { id } = useParams();

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/customer/${id}`)
        .then((res) => {
          if (res["status"] == 200) {
            return res.json();
          }
        })
        .then((json) => {
          if (json !== undefined) {
            console.log(json);
            setUName(json["name"]);
            setUPhone(json["phone number"]);
            setUEmail(json["email"]);
          } else {
            setUName("undefined");
            setUPhone("undefined");
            setUEmail("undefined");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>Name:</h1>
      <h3>{uName}</h3>
      <h1>E-mail Address:</h1>
      <h3>{uEmail}</h3>
      <h1>Phone Number:</h1>
      <h3>{uPhone}</h3>
      <CustomerUpdate />
    </>
  );
}

export default CustomerDetails;
