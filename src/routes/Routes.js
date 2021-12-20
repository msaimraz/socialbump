import { BrowserRouter as Router, Route, Routes as AppRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Setting from "../pages/Setting";
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "../pages/ForgotPassword";
const Routes = () => {
    return (
        <>
            <Router>
                <AppRoutes>
                    {/* <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute> 
                } /> */}
                    {/* <Route element={<PrivateRoute />}> */}
                    <Route path="/" element={<Dashboard />} />
                    {/* </Route> */}
                    {/* <Route element={<PrivateRoute />}> */}
                    <Route path="/setting" element={<Setting />} />
                    {/* </Route> */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                </AppRoutes>
            </Router>
        </>
    )
}

export default Routes
