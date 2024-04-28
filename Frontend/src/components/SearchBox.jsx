import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  return (
    <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
    <input type='text' placeholder='Search Product here' className='w-full outline-none'></input>
    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
    <CiSearch />
    </div>
  </div>
  )
}

export default SearchBox
