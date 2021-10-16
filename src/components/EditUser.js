import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUser, getSingleUser } from "../redux/user/userActionCreators";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "45ch",
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const { name, email, address, contact } = formData;
  const { id } = useParams();
  const { user, userData } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = userData.find(
      (user) => user.id != parseInt(id) && user.email === email
    );
    if (checkEmail) {
      return alert(
        "This email already exists. Please enter a different email address"
      );
    }

    const checkContactNumber = userData.find(
      (user) => user.id != parseInt(id) && user.contact === parseInt(contact)
    );
    if (checkContactNumber) {
      return alert(
        "This contact number already exists. Please enter a different contact number"
      );
    }
    if (!name || !email || !address || !contact) {
      setError("Please fill all the input fields");
    } else {
      dispatch(editUser(formData, id));
      history.push("/");
      setError("");
    }
  };

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <h2>Edit User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='standard-basic'
          label='Name'
          variant='standard'
          type='text'
          value={name}
          name='name'
          //onChange={(e) => setName(e.target.value)}
          onChange={handleFormInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Email'
          variant='standard'
          type='email'
          value={email}
          name='email'
          //onChange={(e) => setEmail(e.target.value)}
          onChange={handleFormInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Address'
          variant='standard'
          type='text'
          value={address}
          name='address'
          //onChange={(e) => setAddress(e.target.value)}
          onChange={handleFormInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Contact'
          variant='standard'
          type='number'
          value={contact}
          name='contact'
          //onChange={(e) => setContact(e.target.value)}
          onChange={handleFormInputChange}
        />
        <br />
        <br />
        <Button
          style={{ width: "100px" }}
          variant='contained'
          color='primary'
          type='submit'
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
