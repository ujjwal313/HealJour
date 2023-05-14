import { Flex, Spinner } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("./pages/HomePage"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

function App() {
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
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
