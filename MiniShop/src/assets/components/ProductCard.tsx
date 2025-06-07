import type { Product } from "../utils/Product";
import { Link } from "react-router-dom";

type props = {
    product: Product;
}

function ProductCard({product}:props) {
    return (
      <Link to = {`/product/${product.id}`}>
        <div className="gap-y-4 bg-white shadow-md rounded-xl flex flex-col h-120 hover:scale-105 hover:border justify-center">
          <img src={product.image} className="w-1/3 h-auto mx-auto"/>
          <p className="">商品名稱: {product.title}</p>
          <p className="text-orange-500 ">價錢: {product.price}</p>
        </div>
      </Link>
    )
    
}

export default ProductCard;