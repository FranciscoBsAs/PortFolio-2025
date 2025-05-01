import { createContext } from "react"
import { useState } from "react"
import { getProductStockFromFS } from "../Firebase/Firebase";

export const CartContextCreated = createContext();

export default function CartProvider( {children} ){

    const [cartContent, setCartContent] = useState([])
    const maxQuantity = 6
    

      async function addProductToCart(newItem) {
        const stopStock = await getProductStockFromFS(newItem.id)

        setCartContent((prevCartContent) => {
            const existingItem = prevCartContent.find((itemIterator1) => itemIterator1.id === newItem.id);
            
            if (existingItem) {
                const updatedQuantity = existingItem.quantity + newItem.quantity;
                
                if (updatedQuantity > stopStock) {
                    alert(`No puedes añadir mas del tope de stock: ${stopStock} unidades `)
                    return(
                        prevCartContent.map((itemIterator2) =>
                        itemIterator2.id === newItem.id ? { ...itemIterator2, quantity: stopStock } : itemIterator2
                        )
                    )
                }
    
                return( 
                    prevCartContent.map( (itemIterator3) => itemIterator3.id === newItem.id
                      ? { ...itemIterator3, quantity: updatedQuantity }
                      : itemIterator3
                    )
                )
            } else {
              if (newItem.quantity > stopStock) {
                alert(`No puedes añadir más del stock disponible: ${stopStock} unidades.`);
                return [...prevCartContent, { ...newItem, quantity: stopStock }];
              } 
              else{

              return [...prevCartContent, newItem]
              }
              }
      
              
            
        })
      }
        
    




    function removeProductFromCart (productID) {
      setCartContent((prevCart) =>
        prevCart.filter(item => item.id !== productID)
      );
    };

      // Función para vaciar el carrito
    function clearCart () {
      setCartContent([]);
    };
      
    return(
        <CartContextCreated.Provider value={[ cartContent, setCartContent, addProductToCart, maxQuantity, removeProductFromCart, clearCart ]}>
            {children}
        </CartContextCreated.Provider>
    )
    
}



