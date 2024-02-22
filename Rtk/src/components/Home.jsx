import React, {useEffect } from "react";
import {
  useGetAllProductQuery,
  useDeleteProductMutation,
} from "../redux/slices/ApiSlice";
import { ROUTER } from "../constant/router";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const { data, isError, isLoading , refetch} = useGetAllProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully!", {
        autoClose: 1000,
      });
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  useEffect(() => {
    refetch();
  }, []); 
  if (isError) {
    return <h1>OOOhNoooo we got an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="h-screen w-full flex justify-center">
        <div className="w-10/12  grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((product) => (
            <div className="card mt-6 bg-base-100  " key={product.id}>
              <img
                src={product.image}
                alt="product.images"
                className="h-[200px] w-full object-cover rounded-t-lg"
              />

              <div className="bg-stone-800 text-stone-300 p-6 text-xl rounded-b-lg capitalize font-semibold">
                <h2 className="card-title">{product.title}!</h2>
                <p className="my-2">{product.description.slice(0, 50)}</p>
                <div className="flex justify-between items-center">
                  <p>$ {product.price}</p>
                  <div className="flex justify-center items-center my-2 ">
                    <MdEdit
                      onClick={() =>
                        navigate(`${ROUTER.UpdateProduct}/${product.id}`)
                      }
                      className="text-2xl text-cyan-200 cursor-pointer hover:scale-110 transition-all duration-500  "
                    />
                    <MdDelete
                      onClick={() => handleDeleteProduct(product.id)}
                      className="mx-2 text-2xl text-red-200 cursor-pointer hover:scale-110 transition-all duration-500  "
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
