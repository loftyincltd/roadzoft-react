import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Projects from './pages/Projects';
import AddUser from './pages/AddUser';
import CreateProject from './pages/CreateProject';
import SingleUser from './pages/SingleUser';
import Log from './pages/Log';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Notifications from './pages/Notifications';
import Inquiry from './pages/Inquiry';
import CitizenDashboard from './pages/citizen/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/reports" exact component={Reports} />
          <Route path="/inquiries" exact component={Inquiry} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/notifications" exact component={Notifications} />
          <Route path="/create-project" exact component={CreateProject} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/users" exact component={Users} />
          <Route path="/user-profile/:id" exact component={SingleUser} />
          <Route path="/log" exact component={Log} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/messages" exact component={Messages} />
          <Route path="/add-user" exact component={AddUser} />
          <Route path="/citizen/dashboard" exact component={CitizenDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
