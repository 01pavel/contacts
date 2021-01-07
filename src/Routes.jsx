import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/Contacts/ContactsPage/ContactsPage';
import NotFound from './components/NotFound/NotFound';
import LoginPage from './components/Login/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
