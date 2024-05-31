import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/verticalProductCard"

const Home=()=>{
    return (
    <div>
       <CategoryList/>
       <BannerProduct/>
       <HorizontalCardProduct category={'airpodes'}heading={"Top Airpodes"}/>
       <HorizontalCardProduct category={'watches'} heading={"Top Watches"}/>
       <HorizontalCardProduct category={'earphones'}heading={"Top earphones"}/>
       <VerticalCardProduct category={'mobiles'} heading={"Top Mobile Phones"}/>
       <VerticalCardProduct category={'Mouse'} heading={"Mouse"}/>
       <VerticalCardProduct category={'televisions'} heading={"Televisions"}/>
       <VerticalCardProduct category={'camera'} heading={"Camera & Photography"}/>
       <VerticalCardProduct category={'speakers'} heading={"Bluetooth Speakers"}/>
       <VerticalCardProduct category={'refrigerator'} heading={"Refrigerator"}/>
       <VerticalCardProduct category={'trimmers'} heading={"Trimmers"}/>
    </div>
    )
}

export default Home