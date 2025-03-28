import './NavBar.css'
import { CartContextCreated } from '../Contexts/CartProvider'
import { useContext } from 'react'
import { Link } from 'react-router-dom';

function CartWidget(){

    const [ cartContent ] = useContext(CartContextCreated)
    const totalItems = cartContent.reduce((total, item) => total + item.quantity, 0);

    return(
        <>
            <div className="conten">
            <p className="notification-bubble">
                {totalItems}
            </p>
                    <Link to= {`/cartContainer`}>
                        <img src="/images/icono-carrito.jpg" alt="" className="imgCarrito">      
                        </img>
                    </Link>
            </div>
        </>
    )
}
export default CartWidget