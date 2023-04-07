import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Modal,
  Container,
} from "react-bootstrap";

import { listnc } from "../functions/auth";
import { removenc } from "../functions/auth";

const Listdata = () => {
//   const [value, setValue] = useState([]);
//   const [q, setQ] = useState("");

//   const [serachParam] = useState(["ncr_no"]);

//   useEffect(() => {
//     loadData();
//     // console.log(value.length);
//   }, []);

//   const loadData = () => {
//     listnc().then((res) => {
//       console.log("res", res.data);
//       setValue(res.data);
//     });
//   };



//   const handdleRemove = (id) => {
//     removenc(id)
//       .then(() => {
//         console.log(id);
//         // loadData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  return (
    <div>
      
    </div>
  );
};

export default Listdata;
