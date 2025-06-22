import type { Product } from "../utils/Product";
import { Link } from "react-router-dom";

type props = {
    product: Product;
}

function ProductCard({product}:props) {
    return (
      <Link to = {`/product/${product.id}`}>
        <div className="gap-y-4 bg-white shadow-md hover:shadow-lg rounded-xl flex flex-col h-120 hover:scale-105 hover:border border-[#FFCCBC] justify-center transition-transform duration-200 cursor-pointer">
          <div className="flex items-center justify-center">
            <img src={product.image} className="h-60 w-auto mx-auto object-contain p-3"/>
          </div>
          <div className="px-4 border-t pt-6">
            <p className="text-[#5A3E36] font-semibold h-25">商品名稱: {product.title}</p>
            <p className="text-[#FF8360] text-xl font-bold pt-2 h-10">價錢: ${product.price}</p>
          </div>
        </div>
      </Link>
    )
    
}

export default ProductCard;