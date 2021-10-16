import {
  ADD_USER,
  DELETE_USER,
  GET_USERS,
  EDIT_USER,
  GET_SINGLE_USER,
} from "./userAction";
import axios from "axios";

const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};

const userAdded = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

const getUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    payload: user,
  };
};

const updateUser = () => {
  return {
    type: EDIT_USER,
  };
};

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((response) => {
        const users = response.data;
        dispatch(getUsers(users));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        console.log(response);
        dispatch(deleteUser());
        dispatch(loadUsers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        const user = response.data;
        console.log(response);
        dispatch(getUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((response) => {
        console.log(response);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user)
      .then((response) => {
        console.log(response);
        dispatch(updateUser());
        dispatch(loadUsers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
