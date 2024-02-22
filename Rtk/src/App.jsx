import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTER.Home} exact element={<Home />} />
        <Route path={ROUTER.AddProduct} element={<AddProduct />} />
        <Route
          path={ROUTER.UpdateProduct + "/:id"}
          element={<UpdateProduct />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
