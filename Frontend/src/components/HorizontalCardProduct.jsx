import { useEffect, useState,useContext } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const {fetchUserAddToCart}=useContext(Context)

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
 }


  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[320px] max-w-[350px] h-36 bg-gray-200 rounded-sm shadow flex animate-pulse"
              >
                <div className="bg-gray-300 h-full p-4 min-w-[145px] animate-pulse"></div>
                <div className="p-4 flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link to={'/product/'+product?._id}
                className="w-full min-w-[320px] max-w-[350px] h-40 bg-white rounded-sm shadow flex"
                key={index}
              >
                <div className="bg-slate-200 h-full p-4 min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all"
                    alt={product.productName}
                  />
                </div>
                <div className="p-4 flex-1 grid">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="text-sm bg-red-600 hover:bg-red-700  text-white px-3 py-0.5 rounded-full"onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
