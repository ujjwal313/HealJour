import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useStore } from "./store";
const DepartmentDashboard = lazy(() => import("./pages/DepartmentDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

function App() {
  const token = useStore((state) => state.token);
  return (
    <Router>
      <Suspense
        fallback={
          <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              token ? <Dashboard /> : <Navigate to="/login" replace={true} />
            }
          />
          <Route
            path="/department/:id"
            element={
              token ? (
                <DepartmentDashboard />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
