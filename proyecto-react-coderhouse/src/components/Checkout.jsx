import { useContext, useState } from 'react';
import { CartContextCreated } from '../Contexts/CartProvider.jsx';
import { collection, addDoc } from 'firebase/firestore';
import { dbCoffeHouse, reduceStock } from '../Firebase/Firebase.js';

function Checkout() {
    const [ cartContent,  ,  ,  ,  ,  clearCart ] = useContext(CartContextCreated);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ email, setEmail ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [orderId, setOrderId] = useState(null);
    
    const handleCheckout = async ()=>{
        if (!nombre || !apellido || !email || !telefono ) {
            alert('Por favor, ingresa tu nombre, apellido, telefono y email.');
            return;
        }
        
        const order = {
            comprador: {
                nombre,
                apellido,
                email,
                telefono
            },
            productos: cartContent.map( (item) => item.name),
            cantidad: cartContent.map( (item) => item.quantity),
            precioFinal: cartContent.reduce((total, item) => total + item.price * item.quantity, 0),
            items: cartContent.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total: cartContent.reduce((total, item) => total + item.price * item.quantity, 0),
            date: new Date().toISOString()
        };
        
        try {
            const docRef = await addDoc(collection(dbCoffeHouse, 'Checkout'), order);
            
            await reduceStock( cartContent )

            setOrderId(docRef.id);
            clearCart();
            alert(`Compra realizada con éxito. ID de la orden: ${docRef.id}`);
        } catch (error) {
            console.error('Error al registrar la compra:', error);
        }
    };
    
    const handleNombre = (e)=> {
        setNombre( e.target.value )
    }
    const handleApellido = (e)=> {
        setApellido( e.target.value )
    }
    const handleEmail = (e)=> {
        setEmail( e.target.value )
    }
    const handleTelefono = (e)=> {
        setTelefono( e.target.value )
    }


    return (
        <div>
            <h1>Finalizar Compra</h1>
            <input 
                type="text" 
                placeholder="Nombre" 
                value={nombre} 
                onChange={handleNombre}
            >
            </input>
            <input 
                type="text" 
                placeholder="Apellido" 
                value={apellido} 
                onChange={handleApellido}
            >
            </input>
            <input
                type='text'
                placeholder='Email'
                value={ email }
                onChange={handleEmail}
            >
            </input>
            <input
                type='tel'
                placeholder='Telefono'
                value={ telefono }
                onChange={ handleTelefono }
            >            
            </input>

            <button onClick={handleCheckout}>Confirmar Compra</button>
            {orderId && <p>Compra registrada con éxito. ID de la orden: {orderId}</p>}
        </div>
    );
}

export default Checkout;
