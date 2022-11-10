import React, { useEffect } from 'react';
import { useState } from 'react';
// IMPORT COMPONENT REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

import { addTodoList } from '../../action/ActionTodoList';
import { useDispatch, useSelector } from 'react-redux';

const ModalComp = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { addTodoListResult, addTodoListError } = useSelector((state) => state.ReducerTodoList);
  const dispatch = useDispatch();

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodoList({ date: date, title: title, description: description }));
  };

  useEffect(() => {
    if (addTodoListResult) {
      setDate('');
      setTitle('');
      setDescription('');
    }
  }, [addTodoListResult]);

  useEffect(() => {
    if (!addTodoListResult) {
      setDate('');
      setTitle('');
      setDescription('');
    }
  }, []);

  return (
    <>
      <Button variant="primary" style={{ marginTop: '40px', fontWeight: 'bold' }} onClick={handleShow}>
        Add Your Plan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <FloatingLabel className="mb-4" label="Date">
              <Form.Control type="text" placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="mb-4" label="Title">
              <Form.Control type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="mb-4" label="Description">
              <Form.Control as="textarea" placeholder="Desription" style={{ height: '150px' }} value={description} onChange={(event) => setDescription(event.target.value)} />
            </FloatingLabel>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComp;
