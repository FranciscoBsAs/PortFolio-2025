import { useContext, useEffect, useState } from "react";
import { memo } from "react";
import { CartContextCreated } from "../Contexts/CartProvider";
import { getProductStockFromFS } from "../Firebase/Firebase";

function ItemCount( { productNameAlert, productToCartProp } ) {
    
    const [cartContent, setCartContent, addProductToCart, maxQuantity] = useContext(CartContextCreated)
    
    const [ varValue, setVarValue] = useState(1)
    const [ stockProduct, setStockProduct ] = useState(0)
    
    let IteratorOfStock
    
    
    useEffect( ()=>{
        async function loadStock() {
            IteratorOfStock = await getProductStockFromFS( productToCartProp.id )
            setStockProduct( IteratorOfStock ?? 0 )
        }

        loadStock()

    }, [ productToCartProp.id ] )
    
    
    function handleChange(e) {
        const inputValue = parseInt(e.target.value)
        
        
        if(!isNaN(inputValue)){
            //setVarValue(inputValue > stockProduct ? stockProduct : inputValue)
            setVarValue(inputValue)
        }
    
    }
    function handleClick(){
        if (varValue > stockProduct )  {
            alert(`No puedes añadir más del stock disponible: ${stockProduct}`);
            return ( setVarValue(1) )
        }
        else{
        alert(`Agregaste ${varValue} unidades de "${productNameAlert}" al carrito de compras`);
        addProductToCart({...productToCartProp, quantity:varValue })
        }
        //addProductToCart(setCartContent())
       // setCartContent([...cartContent, productToCartProp])
    }

 


    return(
        <>
            <input
                type="number"
                //max={stockProduct}
                min={1}
                value={varValue}
                onChange={handleChange}
            >
            </input>
            <input type="button" value={`Añade +${varValue}`} onClick={handleClick} ></input>  

            <h3>Tope de stock: {stockProduct} unidades</h3>

        </>
    )

}
export default memo(ItemCount)