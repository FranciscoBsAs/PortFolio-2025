import './App.css'
import NavBar from './components/NavBar.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetail.jsx';
import CartContainer from './components/CartContainer.jsx';
import Checkout from './components/Checkout.jsx';
//import { addStockFieldToAllDocuments } from './Firebase/Firebase.js';
//import { addAllProductsToDB } from './Firebase/Firebase.js';
//import { UpdateOneItemField } from './Firebase/Firebase.js';

function App() {
  return (
    <>

    <BrowserRouter>
      <header>
        <NavBar></NavBar>
      </header>
      
      <Routes>
      
      <Route exact path='/' element={<ItemListContainer greeting="Bienvenidos a Coffee House" />}> </Route>
      <Route exact path='/categories/:dynamicCategories' element={<ItemListContainer></ItemListContainer> }></Route>
      <Route exact path='/detail-Product/:id' element={<ItemDetailContainer></ItemDetailContainer>} ></Route>


      <Route exact path='/cartContainer/' element={<CartContainer></CartContainer>}></Route>
      <Route path="/checkout" element={<Checkout />} />

      </Routes>

      <br /> <br /> <br /> <br /> <br /><br />
      
      {/*
      <button onClick={handleADDAllProductsToFS}> ADD doc hardcodeado to DB </button>
      */}
      
      {/*
      <button onClick={handleAddStockField} >Añadir campo "stock" a todos los produtos </button>
      */}

      {/*
      <button onClick={handleFieldUpdate} > Actulizar un campo </button>
      */}

    </BrowserRouter>

    </>
  )
}
export default App


/*
const handleADDAllProductsToFS= ()=>{
  addAllProductsToDB()
}
*/

/*
const handleAddStockField = ()=>{
  addStockFieldToAllDocuments()
}
*/

/*
const handleFieldUpdate = () => {
  UpdateOneItemField( 'UDOAr9Dj29lEHv9DhH9w', 28 )
*/

