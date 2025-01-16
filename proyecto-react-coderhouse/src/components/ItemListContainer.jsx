import Productos from './ProductosListados.jsx'

function ItemListContainer() {
    return(
        <>
            <div>
                <h3>Listado de productos</h3>
                <Productos nameProducto="Algo"></Productos>
                <Productos nameProducto="esto"></Productos>  
            </div>
        </>
    )
}

export default ItemListContainer