import React, { useState } from "react";
import { useAddNewProductMutation } from "../redux/slices/ApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/router";

const initialState = {
  title: "",
  price: 0,
  description: "",
  image: "",
};

const AddProduct = () => {
  const [addNewProduct, { error, isLoading }] = useAddNewProductMutation();
  const [newProduct, setNewProduct] = useState(initialState);
  const navigate = useNavigate();
  const isDisabled = Object.values(newProduct).some((value) => value === "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const addProduct = async () => {
    
    try {
      await addNewProduct(newProduct);
      toast.success("Product added successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1250);
    } catch (error) {
      console.log("error");
    }
  };
  if (error) {
    return <h1>ERRROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="my-4 ">
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          placeholder="Title"
          className="rounded-sm px-5 py-1"
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          className="rounded-sm px-5 py-1"
        />
      </div>
      <div className="my-4 ">
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          className="rounded-sm px-5 py-1"
        />
      </div>
      <div>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="rounded-sm px-5 py-1"
        />
      </div>
      <button
        className={`my-3 rounded-md px-5 py-1 font-bold w-[225px] mt-4 transition-all duration-500 ${
          isDisabled
            ? "bg-gray-800 cursor-not-allowed"
            : "bg-stone-500 hover:bg-stone-400"
        }`}
        onClick={addProduct}
        disabled={isDisabled}
      >
        Create
      </button>
    </div>
  );
};

export default AddProduct;
