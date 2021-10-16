import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/addUser' component={AddUser} />
        <Route exact path='/editUser/:id' component={EditUser} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
