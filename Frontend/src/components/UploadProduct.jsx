import { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
const UploadProduct = ({onClose}) => {
  const[data,setData]=useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:'',
    descriptiom:'',
    price:'',
    selling:''
  })

  const handleOnChange =(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">  
    <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
      <div className="flex justify-between items-center pb-3">
      <h2 className="font-bold text-lg">UPLOAD PRODUCT</h2>
      <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
      <IoClose />
      </div>
      </div>

      <form className="grid p-4 gap-3 overflow-y-scroll h-full">
        <label htmlFor="productName">Product Name :</label>
        <input type='text' id='productName' placeholder='enter product name' name="productName" value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'></input>

        <label htmlFor="brandName" className="mt-3">Brand Name :</label>
        <input type='text' id='brandName' placeholder='enter brand name' value={data.productName} name="brandName" onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'></input>

        <label htmlFor="category" className="mt-3">Category :</label>
        <select value={data.category}  className='p-2 bg-slate-100 border rounded'>
          {
            productCategory.map((el,index)=>{
              return <option key={el.value+index} value={el.value}>{el.label}</option>
              })
          }
        </select>
        <label htmlFor="productImage" className="mt-3">Product Image :</label>
        <div className="p-2 bg-slate-100 border rounded h-32 w-full">

        </div>
      </form>
    </div> 
    </div>
  )
}

export default UploadProduct
