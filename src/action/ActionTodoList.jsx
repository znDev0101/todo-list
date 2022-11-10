import Swal from 'sweetalert2';

export const GET_TODO_LIST = 'GET_TODO_LIST';
export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const DETAIL_TODO_LIST = 'DETAIL_TODO_LIST';
export const UPDATE_TODO_LIST = 'UPDATE_TODO_LIST';

// GET TODO LIST
export const getTodoList = () => {
  // loading
  return (dispatch) => {
    dispatch({
      type: GET_TODO_LIST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    fetch(`http://localhost:3004/todoList`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json.Response === 'False') {
          throw Swal.fire({
            icon: 'error',
            title: 'GAGAL',
            text: 'DATA GAGAL DI TAMBAHKAN',
          });
        } else {
          dispatch({
            type: GET_TODO_LIST,
            payload: {
              loading: false,
              data: json,
              error: false,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_TODO_LIST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.errorMessage,
          },
        });
      });
  };
};

// ADD TODO LIST
export const addTodoList = (data) => {
  // loading
  return (dispatch) => {
    dispatch({
      type: ADD_TODO_LIST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    fetch(`http://localhost:3004/todoList`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(Swal.fire('GAGAL', 'DATA GAGAL DI TAMBAH KAN PESAN ERROR: ' + response.statusText, 'error'));
        }
        return response.json();
      })
      .then((json) => {
        Swal.fire('BERHASIL', 'data berhasil di tambah kan', 'success');
        dispatch({
          type: ADD_TODO_LIST,
          payload: {
            loading: false,
            data: json,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_TODO_LIST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.errorMessage,
          },
        });
      });
  };
};

// DELETE TODO LIST
export const deleteTodoList = (id) => {
  // loading
  return (dispatch) => {
    dispatch({
      type: DELETE_TODO_LIST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    fetch(`http://localhost:3004/todoList/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(Swal.fire('GAGAL', 'DATA GAGAL DI DELETE, PESAN ERROR : ' + response.statusText, 'error'));
        } else {
          return response.json();
        }
      })
      .then((json) => {
        dispatch({
          type: DELETE_TODO_LIST,
          payload: {
            loading: false,
            data: json,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_TODO_LIST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.errorMessage,
          },
        });
      });
  };
};

// DETAIL TODO LIST
export const detailTodoList = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({
      type: DETAIL_TODO_LIST,
      payload: {
        data: data,
      },
    });
  };
};

// UPDATE TODO LIST
export const updateTodoList = (data) => {
  // loading
  return (dispatch) => {
    dispatch({
      type: UPDATE_TODO_LIST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    fetch(`http://localhost:3004/todoList/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('GAGAL', 'DATA GAGAL DI UPDATE PESAN ERROR : ' + response.statusText, 'error');
        } else {
          return response.json();
        }
      })
      .then((json) => {
        Swal.fire({
          icon: 'success',
          title: 'BERHASIL',
          text: 'DATA BERHASIL DI UPDATE',
        });
        dispatch({
          type: UPDATE_TODO_LIST,
          payload: {
            loading: false,
            data: json,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'GAGAL',
          text: 'DATA GAGAL DI UPDATE',
        });
        dispatch({
          type: UPDATE_TODO_LIST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.errorMessage,
          },
        });
      });
  };
};
