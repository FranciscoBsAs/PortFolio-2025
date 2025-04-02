import { Link } from 'react-router-dom'
import './ItemList.css'
import './ItemListContainer.css'
import { CartContextCreated } from '../Contexts/CartProvider'
import { memo, useContext } from 'react'

function ItemList(props) {
    
    const [cartContent, setCartContent, addProductToCart] = useContext(CartContextCreated)
    
    function handleClickADD(){
        addProductToCart({ ...props.productListed, quantity: 1 })
    }

    return(
        <>
        <article > 
            <h2 className='color-product-name' >{ props.productListed.name  }</h2>
            <img src={ props.productListed.image } className='img-product' alt={ props.productListed.name } ></img>
            <h2 className='especialidad'>{ props.productListed.especialidad }</h2>
            <h3> $ {props.productListed.price} </h3>
            <button className='btn-detail' >
                <Link to= {`/detail-Product/${props.productListed.id}`}>
                    Más detalles
                </Link>
            </button>
            {' '}
            <button className='btn-detail' onClick={handleClickADD} >
                Añadir
            </button>
        </article>  
        </>    
    )
}
export default memo(ItemList)