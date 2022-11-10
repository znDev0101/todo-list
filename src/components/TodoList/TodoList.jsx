import React, { useEffect, useState } from 'react';
import ModalComp from '../ModalComp/ModalComp';
import './TodoList.css';
// IMPORT BOOTSTRAP
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';

import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux';
import { deleteTodoList, detailTodoList, getTodoList, updateTodoList } from '../../action/ActionTodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const TodoList = () => {
  const { getTodoListLoading, getTodoListResult, getTodoListError, addTodoListResult, addTodoListError, deleteTodoListResult, detailTodoListResult, updateTodoListResult } = useSelector((state) => state.ReducerTodoList);
  const dispatch = useDispatch();

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodoList({ id: id, date: date, title: title, description: description }));
  };

  // GET TODO LIST
  useEffect(() => {
    dispatch(getTodoList());
  }, [getTodoList, dispatch]);

  // ADD TODO LIST
  useEffect(() => {
    if (addTodoListResult) {
      dispatch(getTodoList());
    }
  }, [addTodoListResult, , dispatch]);

  // DELETE TODO LIST
  useEffect(() => {
    if (deleteTodoListResult) {
      dispatch(getTodoList());
    }
  }, [deleteTodoListResult, dispatch]);

  // DETAIL TODO LIST
  useEffect(() => {
    if (detailTodoListResult) {
      setDate(detailTodoListResult.date);
      setTitle(detailTodoListResult.title);
      setDescription(detailTodoListResult.description);
      setId(detailTodoListResult.id);
    }
  }, [detailTodoListResult, dispatch]);

  // UPDATE TODO LIST
  useEffect(() => {
    if (updateTodoListResult) {
      dispatch(getTodoList());
    }
  }, [updateTodoListResult, dispatch]);

  return (
    <div className="todo-list">
      <h1>
        <span>What's your</span> plan for today
      </h1>
      <ModalComp />
      <div className="todo-ListContent">
        {/* TABLE */}
        <Table striped style={{ marginTop: '50px' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          {getTodoListResult ? (
            getTodoListResult.map((data) => {
              return (
                <tbody key={data.id}>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.date}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() =>
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deleteTodoList(data.id));
                              Swal.fire('Deleted!', 'Data berhasil di delete', 'success');
                            }
                          })
                        }
                        className="trash-icon"
                        size="lg"
                      />
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => {
                          handleShow();
                          dispatch(detailTodoList(data));
                        }}
                        className="edit-icon"
                        size="lg"
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : getTodoListLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getTodoListError ? getTodoListError : 'Data Kosong'}</p>
          )}
        </Table>
      </div>
      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo List</Modal.Title>
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
    </div>
  );
};

export default TodoList;
