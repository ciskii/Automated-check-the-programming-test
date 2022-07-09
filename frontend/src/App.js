import React from "react";
import Quiz from "pages/quiz/Quiz";
import "./app.css";
import Navbar from "components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "pages/dashboard/Dashboard";
import Login from "pages/login/Login";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  const RequireAuth = (props) => {
    // let auth = useAuth();
    let location = useLocation();

    if (!user) {
      return <Navigate to='/login' replace />;
    } else {
      return props.children;
    }
  };
  console.log("App {user}: ", user);
  return (
    <Router>
      <div className='app'>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route exact path='/'>
            <>{user ? <Navigate to='/login' /> : <Dashboard />}</>
          </Route> */}
          <Route
            path='/'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {/* <Route path='/' element={<Dashboard />}></Route> */}
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/login' element={<Login login={true} />}></Route>
          <Route path='/signup' element={<Login login={false} />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

//   return children;
// }

export default App;
