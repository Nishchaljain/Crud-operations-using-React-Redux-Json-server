import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser, loadUsers } from "../redux/user/userActionCreators";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const Home = () => {
  const classes = useStyles();
  const { userData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the user")) {
      dispatch(removeUser(id));
    }
  };
  return (
    <div>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push("/addUser")}
        >
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          sx={{ minWidth: 700 }}
          aria-label='customized table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='center'>Email</StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Contact</StyledTableCell>
              <StyledTableCell align='center'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData &&
              userData.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component='th' scope='row'>
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{user.email}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <ButtonGroup
                      variant='contained'
                      aria-label='outlined primary button group'
                    >
                      <Button
                        style={{ marginRight: "5px" }}
                        color='primary'
                        onClick={() => history.push(`/editUser/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color='secondary'
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
