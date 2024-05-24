import { useEffect, useState, useCallback,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const {fetchUserAddToCart}=useContext(Context)

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const navigate=useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
    setZoomImage(true);
  }, []);

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    e.preventDefault(); // Prevent default action if triggered by a form element
    try {
        await addToCart(e, id); // Ensure the product is added to the cart
        await fetchUserAddToCart(); // Update the cart state
        navigate('/cart'); // Navigate to the cart page
    } catch (error) {
        console.error("Error buying product:", error); // Handle errors
    }
};

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-2">
        {/* productImage */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative mx-auto lg:mx-0 p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={() => setZoomImage(false)}
            />
            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute overflow-hidden min-w-[400px] min-h-[500px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"loadingImage" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgUrl, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgUrl}
                  >
                    <img
                      src={imgUrl}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                      onClick={() => handleMouseEnterProduct(imgUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* productDetails */}
        {loading ? (
          <div className="grid gap-1 w-full mt-4 md:mt-0">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-3/4 rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-2/3"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-1/2"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-1/2"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-1/2">
              <p className="text-red-600 bg-slate-200 w-1/2"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-1/2"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-1/3"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-1/3"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-2/3"></p>
              <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-3/4"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 mt-4 md:mt-0">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data.productName}
            </h2>
            <p className="capitalize text-slate-400">{data.category}</p>
            <div className="flex text-red-600 items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" onClick={(e)=>handleBuyProduct(e,data._id)}>
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium bg-red-600 text-white hover:bg-white hover:text-red-600" onClick={(e)=>handleAddToCart(e,data._id)}>
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      {!loading && data.category && (
        <CategoryWiseProductDisplay category={data.category} heading={"Recommended Products"} />
      )}
    </div>
  );
};

export default ProductDetails;
