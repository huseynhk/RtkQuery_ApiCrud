import React, { useState, useEffect } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/slices/ApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { IoChevronBackCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  price: 0,
  description: "",
  image: "",
};

const UpdateProduct = () => {
  const [editedProduct, setEditedProduct] = useState(initialState);
  const [updateProduct] = useUpdateProductMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const isDisabled = Object.values(editedProduct).some((value) => value === "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const editProduct = async () => {
    try {
      await updateProduct({ id, updatedProduct: editedProduct });
      toast.success("Product edited successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 3000);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    if (data) {
      setEditedProduct(data);
    }
  }, [data]);

  if (error) {
    return <h1>ERRROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <div className="my-4 ">
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            placeholder="Title"
            className="rounded-sm px-5 py-1"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            placeholder="Price"
            className="rounded-sm px-5 py-1"
          />
        </div>
        <div className="my-4 ">
          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            placeholder="Description"
            className="rounded-sm px-5 py-1"
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            value={editedProduct.image}
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
          onClick={editProduct}
          disabled={isDisabled}
        >
          Update
        </button>
      </div>

      <div className="card mt-6 bg-base-100 w-96 " key={data.id}>
        <img
          src={data.image}
          alt="product.images"
          className="h-[200px] w-full object-cover rounded-t-lg"
        />

        <div className="bg-stone-800 text-stone-300 p-6 text-xl rounded-b-lg capitalize font-semibold">
          <h2 className="card-title">{data.title}!</h2>
          <p className="my-2">{data.description.slice(0, 50)}</p>
          <div className="flex justify-between items-center">
            <p>$ {data.price}</p>
            <IoChevronBackCircle
              onClick={() => navigate(ROUTER.Home)}
              className="my-2 text-3xl text-cyan-200 cursor-pointer hover:scale-110 transition-all duration-500  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
