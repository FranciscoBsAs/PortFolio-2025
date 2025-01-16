//import imagenLogo from '../../src/images/coffee-house-logo.png'
//import '../App.css'
import './navBar.css'
import BotonCategorias from './Button.jsx'
import CartWidget from './CartWidget.jsx'

function BarraNav() {
    return(
    
        <nav style={
            { 
                position: "fixed",
                top:0, 
                left:0,
                width:"100%",
                height:"50px",
                padding:"50px",
                //justifyContent: "space-between",
                background: "darkolivegreen",
                display:'flex'

            }
        }>  
            <img className='imgLogo'  src="../../src/images/coffee-house-logo.png" alt="este es el logo"></img>
            <h1 className='titulo'>Coffee House</h1>

            <BotonCategorias txt="Cafés"/>
            <BotonCategorias txt="Tés"/>
            <BotonCategorias txt="Postres"/>
            <BotonCategorias txt="Sándwiches"/>

            <CartWidget></CartWidget>

        
        </nav>
        
    )
}

export default BarraNav