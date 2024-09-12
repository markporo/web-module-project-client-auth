import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import FriendList from './components/friendList';
import Login from './components/login';
import Logout from './components/logout';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import { UserContext } from './components/userContext';



function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (

    <Router>
      <div className="App">
        <div><Link to="/">Home</Link></div>
        <div><Link to="/protected">Account</Link></div>
        <div><Link to="/login">Login</Link></div>
        <div><Link to="/logout"> Logout</Link></div>
      </div>

      <Switch>
        <UserContext.Provider value={{ isLoading, setIsLoading }}>
          <PrivateRoute exact path="/protected" component={FriendList} />
          {/* <FriendList isLoading={isLoading} />
        </PrivateRoute> */}
          <Route path="/login" component={Login} />
          {/* <Login isLoading={isLoading} setIsLoading={setIsLoading} /> </Route> */}
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Login} />
        </UserContext.Provider>
      </Switch>
    </Router>

  );
}

export default App;
