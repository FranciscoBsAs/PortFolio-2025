import './BotonCategorico.css'
import './CartWidget.css'
import './BarNav.css'
import ButtonCategory from './ButtonCategory.jsx'
import CartWidget from './CartWidget.jsx'
import { Link } from 'react-router-dom'
import productsArray from '../assets/asyinckMockGetters'

function getSpecificCategories() {
    const mapCategory = productsArray.map(specificProduct => specificProduct.category)
    return [...new Set(mapCategory)];
                                            //const uniqueCategories = categories.filter((category, index, self) => self.indexOf(category) === index);
  };


function NavBar() {
    const specificCategory = getSpecificCategories()
    return(
        <nav className='Nav-Bar-Style'>  
            <Link to='/'>
                <img className='img-home' src="/images/home.png"></img>
            </Link>
            <Link to='/'>
                <img className='imgLogo'  src="/images/coffee-house-logo.png" alt="este es el logo"></img>
            </Link> 
            
            <h1 className='titulo'>Coffee House</h1>

            {specificCategory.map( (categ, catIndex) => (
                <Link key={catIndex} to={`/categories/${encodeURIComponent(categ)}`}>
                    <ButtonCategory txt={categ}/>
                </Link>
            ))}
            
                <CartWidget></CartWidget>
            

        
        </nav>
        
    )
}
export default NavBar

{/*
    function NavBar() {
    return(
    
        <nav className='Nav-Bar-Style'>  
            <Link to='/'>
                <img className='imgLogo'  src="../../src/images/coffee-house-logo.png" alt="este es el logo"></img>
            </Link>
            <h1 className='titulo'>Coffee House</h1>
            <Link to='/categories/Cafés'>
                <ButtonCategory txt="Cafés"/>
            </Link>
                                    {/* OJO CON LOS TILDES!!  EN LAS URLS DE LINK el escrito tiene que coincidir con el valor del atributo category del productsArray[] 

                                    <Link to='/categories/Tés'>
                                    <ButtonCategory txt="Tés"/>
                                </Link>
                    
                                <Link to='/categories/Postres'>
                                    <ButtonCategory txt="Postres"/>
                                </Link>
                    
                                <Link to='/categories/Sándwiches'>
                                    <ButtonCategory txt="Sándwiches"/>
                                </Link>
                    
                                <CartWidget></CartWidget>
                    
                            
                            </nav>
                            
                        )
                    }
                    
                    export default NavBar
*/}