import { memo, useContext } from 'react';
import { CartContextCreated } from '../Contexts/CartProvider';
import './CartContainer.css'
import ReactLoading from 'react-loading'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function CartContainer() {
  const [cartContent, , , , removeProductFromCart, clearCart] = useContext(CartContextCreated);

  const [ loadingAdedd, setLoadingAdedd ] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingAdedd(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cartContent]);
  
  const totalPrice = cartContent.reduce((total, itemIterator) => total + (itemIterator.price * itemIterator.quantity), 0);

  return (
    <div className="cart-container">
      <h1>Carrito de compras 🧺</h1>

        {cartContent.length === 0 ? (
            <p>No hay productos en el carrito</p>
        ) : (
            <div>
              {loadingAdedd
                  ? (<ReactLoading type="spinningBubbles" color="DarkGreen" width="50px" height="50px"></ReactLoading>) 
                  : ( 
                    <>
                      <ul>
                          {cartContent?.map((itemIterator, index) => (
                              <li key={index} className="cart-itemIterator">
                                <article className='article-iterator'>
                                <h2 className='title-product-cart' >• {itemIterator.name}</h2>
                                <br/>
                                <img className='cart-image' src={itemIterator.image} ></img>
                                <p>Cantidad: {itemIterator.quantity}</p>
                                <h3>Precio por unidad:  ${itemIterator.price}</h3>
                                <h2>Subtotal:  ${itemIterator.price * itemIterator.quantity}</h2>
                                                      {/* Botón para eliminar este producto individualmente */}
                                                      <button onClick={() => removeProductFromCart(itemIterator.id)}>
                                                        Borrar producto
                                                      </button>
                                </article>
                                <br></br>
                              </li>
                          ))}
                        </ul>
                        <div className="cart-total">
                          <h2>Total: ${totalPrice}</h2>
                        </div>
                        <br></br>

                                                      {/* Botón para vaciar todo el carrito */}
                                                      <button onClick={clearCart}>
                                                         Vaciar carrito
                                                      </button>
                    { ' ' }
                    <button>
                    <Link to="/checkout">
                        Ir al Checkout
                      </Link>
                    </button>
                    </>
                    )
              }
            
            </div>
        )}

    </div>
  );
}

export default memo(CartContainer);