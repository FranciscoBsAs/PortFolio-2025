import Productos from './ProductosListados.jsx'

function ItemListContainer() {
    return(
        <>
            <div>
                <h2>Listado de productos</h2>
                <Productos nameProducto="Algo"></Productos>
                <Productos nameProducto="esto"></Productos>  
            </div>
        </>
    )
}

export default ItemListContainer