// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { addDoc, collection, doc, getDocs, getFirestore, getDoc, setDoc, updateDoc, increment, writeBatch } from "firebase/firestore";

import productsArray from "../assets/asyinckMockGetters";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMIAN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_FIRBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dbCoffeHouse = getFirestore(app) 


const itemsCollectionRef = collection(dbCoffeHouse, 'Items')
const documentRef = (respectiveID) => doc(dbCoffeHouse, 'Items', respectiveID)     // arrow function con render implicito




export async function addAllProductsToDB() {

  for (const product of productsArray) {
    try {
      // Agregar documento a Firestore y obtener la referencia con su ID generado
      const docRef = await addDoc(itemsCollectionRef, {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
        ...(product.especialidad && { especialidad: product.especialidad }) // Solo agrega si existe
      });

      // se actualiza el mismo documento con el ID generado
      await setDoc( doc(itemsCollectionRef, docRef.id), { id: docRef.id }, { merge: true } );

      console.log(`Producto agregado: ${product.name} con ID Firestore: ${docRef.id}`);
    } 
    catch (error) {
      console.error("Error al agregar producto", error);
    }
  }
}



export async function getSingleProductFromFS(id) {
  //const documentRef = doc(dbCoffeHouse, "Items", id);
  try {
    const snapshot = await getDoc( documentRef(id) );
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("El documento no existe!");
      return null;
    }
  }
  catch (error) {
    console.error("Error al obtener el documento:", error);
    return null;
  }
}


export async function getProductsFS() {
  try{
    const querySnapshot = await getDocs( collection(dbCoffeHouse, 'Items') )
    if (querySnapshot.size !== 0){
      const productsListFireStore = querySnapshot.docs.map( (docu)=>{
        return(
          { 
            id: docu.id,
            ...docu.data()
          }
        )
      } )
      return productsListFireStore

    } else{
    console.log('coleccion vacia')
  }

  }
  catch (typeError){
    console.error('tipo de error', typeError)
  }
}





export async function addStockFieldToAllDocuments() {

  try {
    const querySnapshot = await getDocs(itemsCollectionRef);
    querySnapshot.forEach( async (documentIterator) => {
      await updateDoc(doc(dbCoffeHouse, "Items", documentIterator.id), {
        stock: null,
      });

      console.log(`Documento con ID ${documentIterator.id} actualizado con campo stock`);
    });
  }
  catch (errorType) {
    console.error("Error al actualizar documentos:", errorType);
  }
}





// para stocks:  documentRef


export async function getProductStockFromFS(id) {
  //const documentRef = doc(dbCoffeHouse, "Items", id)
  try {
    const snapshot = await getDoc( documentRef(id) );
    if ( snapshot.exists() ) {
      
      return(
        snapshot.data().stock
      )

    } else {
      console.log("El producto no existe.");
      return 0;                                   // stock por defecto si no existe
    }
  }
  catch (typeError) {
    console.error("Error al obtener el stock:", typeError);
    return 0;
  }
}


export async function reduceStock( purchasedItems ) {
  try {
    purchasedItems.forEach( async (item)=> {
      //documentRef(item.id);
      let stockPrev
      let stockUpadated
      const snapshotPurchasedItems = await getDoc( documentRef( item.id ) )
      if ( snapshotPurchasedItems.exists() ){
        stockPrev = snapshotPurchasedItems.data().stock
        stockUpadated = stockPrev - item.quantity

        await updateDoc( documentRef(item.id), {
          stock: stockUpadated >= 0  ?  (stockUpadated)  :  0
        } )
        console.log(`Stock actualizado del producto ${item.name} `);
      }
      else{
        console.log(`Producto con ID ${item.id} no encontrado`)
      }
    } )
  } 
  catch (error) {
    console.log( error )
  }
}


export async function UpdateOneItemField( iD, amountToAdd ) {
  try{
    await updateDoc( documentRef(iD) , {stock: increment( amountToAdd ) } ) 
    
     console.log('Campo de doc actualizado')
  }
  catch( errorType ){
    console.error( 'Error al actulizar el doc', errorType )
  } 
}

export async function updateMultipleFields () {
  const theBatch = writeBatch( dbCoffeHouse )
    const firstItemRef = doc( dbCoffeHouse, 'Items', 'FF09SOLJrr3UgT6UVKFy' )
    const secondItemRef = doc( dbCoffeHouse, 'Items', 'hlyGhkUT07wmOt8IPy3l' )

    theBatch.update( firstItemRef,  { price: 24 } );
    theBatch.update( secondItemRef, { stock: increment( 100 ) } )

    try {
      await theBatch.commit()

      console.log('batch actualizado correctamente')
    }
    catch( typeError ){
      console.error( 'error de batch:' , typeError )
    }
}