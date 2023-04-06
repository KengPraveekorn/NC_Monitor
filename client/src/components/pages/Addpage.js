import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const Addpage = () => {
  //   const handdleClick = async () => {
  //     const { value: formValues } = await Swal.fire({
  //       title: "Enter NCR",
  //       html:
  //         "<label>NCR NO<lable>" +
  //         "<br/>" +
  //         '<input id="swal-input1" class="swal2-input">' +
  //         "<label>Detech On<lable>" +
  //         "<br/>" +
  //         '<input id="swal-input2" class="swal2-input">' +
  //         "<label>Detech at<lable>" +
  //         "<br/>" +
  //         '<input id="swal-input3" class="swal2-input">' ,
  //       input: "textarea",
  //       inputLabel: "NC Detail",
  //       inputPlaceholder: "Type your message here...",
  //       inputAttributes: {
  //         "aria-label": "Type your message here",
  //       },
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         return [
  //           document.getElementById("swal-input1").value,
  //           document.getElementById("swal-input2").value,
  //           document.getElementById("swal-input3").value,
  //           document.getElementById("swal-input4").value,
  //         ];
  //       },
  //     });

  //     if (formValues) {
  //       Swal.fire({
  //         title: "Do you want to save the changes?",
  //         text: JSON.stringify(formValues),
  //         showDenyButton: true,
  //         showCancelButton: true,
  //         confirmButtonText: "Save",
  //         denyButtonText: `Don't save`,
  //       }).then((result) => {
  //         /* Read more about isConfirmed, isDenied below */
  //         if (result.isConfirmed) {
  //           Swal.fire("Saved!", "", "success");
  //         } else if (result.isDenied) {
  //           Swal.fire("Changes are not saved", "", "info");
  //         }
  //       });
  //     }
  //   };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handdleClick = () => {
    handleClose();
    Swal.fire({
      title: "Do you want to save the changes?",
      // text: JSON.stringify(formValues),
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="d-grid">
      <Button variant="success" onClick={handleShow}>
        Submit
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter NCR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>NCR NO</Form.Label>
              <Form.Control type="text" placeholder="Enter NCR NO" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Detech On</Form.Label>
              <Form.Control type="text" placeholder="Enter NCR NO" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Detech At</Form.Label>
              <Form.Control type="text" placeholder="Enter NCR NO" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>NC Detail</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handdleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Addpage;
