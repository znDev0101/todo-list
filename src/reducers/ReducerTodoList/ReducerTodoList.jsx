import { GET_TODO_LIST } from '../../action/ActionTodoList';
import { ADD_TODO_LIST } from '../../action/ActionTodoList';
import { DELETE_TODO_LIST } from '../../action/ActionTodoList';
import { DETAIL_TODO_LIST } from '../../action/ActionTodoList';
import { UPDATE_TODO_LIST } from '../../action/ActionTodoList';
const initialState = {
  // GET TODO LIST
  getTodoListLoading: false,
  getTodoListResult: false,
  getTodoListError: false,

  // ADD TODO LIST
  addTodoListLoading: false,
  addTodoListResult: false,
  addTodoListError: false,

  // DELETE TODO LIST
  deleteTodoListLoading: false,
  deleteTodoListResult: false,
  deleteTodoListError: false,

  // DETAIL TODO LIST
  detailTodoListResult: false,

  // UPDATE TODO LIST
  updateTodoListLoading: false,
  updateTodoListResult: false,
  updateTodoListError: false,
};

const ReducerTodoList = (state = initialState, action) => {
  switch (action.type) {
    // GET TODO LIST
    case GET_TODO_LIST:
      return {
        ...state,
        getTodoListLoading: action.payload.loading,
        getTodoListResult: action.payload.data,
        getTodoListError: action.payload.errorMessage,
      };
    // ADD TODO LIST
    case ADD_TODO_LIST:
      return {
        ...state,
        addTodoListLoading: action.payload.loading,
        addTodoListResult: action.payload.data,
        addTodoListError: action.payload.errorMessage,
      };
    // DELETE TODO LIST
    case DELETE_TODO_LIST:
      return {
        ...state,
        deleteTodoListLoading: action.payload.loading,
        deleteTodoListResult: action.payload.data,
        deleteTodoListError: action.payload.errorMessage,
      };
    // DETAIL TODO LIST
    case DETAIL_TODO_LIST:
      return {
        ...state,
        detailTodoListResult: action.payload.data,
      };
    // UPDATE TODO LIST
    case UPDATE_TODO_LIST:
      return {
        ...state,
        updateTodoListLoading: action.payload.loading,
        updateTodoListResult: action.payload.data,
        updateTodoListError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default ReducerTodoList;
