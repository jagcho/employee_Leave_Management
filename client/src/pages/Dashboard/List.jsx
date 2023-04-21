import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const List = ({ employee, PFA }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee Id</th>
              <th> Date from </th>
              <th> Date To</th>
              <th>PFA [Please find attached]</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (
              employee.map((employee, i) => (
                <tr key={employee._id}>
                  <td>{i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.fromDate} </td>
                  <td>{employee.toDate} </td>
                  <td className="text-center">
                    <Button variant="success" onClick={handleShow}>
                            view reason
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>{`${employee.radioValue}`}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{`${employee.PFA}`}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>0</td>
                <td colSpan={10}>No employees</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default List;
