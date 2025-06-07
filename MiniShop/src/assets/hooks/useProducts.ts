import { useState, useEffect } from "react";
import type { Product } from "../utils/Product";

const useProducts = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        setLoading(true);

        const fetchProducts = async () => {
            
            try{
                const url = "https://fakestoreapi.com/products"
                const response = await fetch(url);
                const data = await response.json();

                if(response.ok){
                    setProducts(data);
                    setError(null);
                } else {
                    setError(data.message);
                }
            }
            catch (err){
                setError("Network Error");
            }
            finally{
                setLoading(false);
            }
                
            }

        fetchProducts();

        },[])
        return {products, loading, error}
    }
    



export default useProducts;
