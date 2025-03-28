const productsArray = [
    { ID: 1, name:'Café Espresso', category:'Cafés', description: 'Tazas S, M, B ; 20% leche & 80% café', price: 15,
        image:'/productsImages/cafe-espresso.jpg', 
    },
    { ID: 2, name: 'Té Verde', category:'Tés', description: 'Tazas S, M, B ; Saqutio', price: 10,
        image:'/productsImages/te-verde.jpg'
    },
    { ID: 3, name:'Torta de chocolate', category:'Postres', description: 'Torta dulce de chocolate', price: 25,
        image:'/productsImages/chocolate-torta.jpg'
    },
    { ID: 4, name: 'Sándwich de pan miga', category:'Sándwiches', description: 'Pan de miga integral', price: 20,
        image:'/productsImages/sandwich-miga.jpg'
    },
    { ID: 5, name: 'Café Cappuccino', category:'Cafés', description: 'Tazas S, M, B ; 10% leche & 90% café', price: 20,
        image:'/productsImages/cappuccino.jpg'
    },
    { ID: 6, name: 'Sándwich de pan arabe', category:'Sándwiches', description: 'Con jamon, quesos, tomate, lechuga, morron y cebolla frita', price: 20,
        image:'/productsImages/sandwich-tostado-de-pan-arabe.jpg'
    },
    { ID: 7, name: 'Té Negro de hebras', category:'Tés', description: 'Tazas S, M, B ; 15% leche & 85% té', price: 15,
        image:'/productsImages/black-tea.jpg'
    },
    { ID: 8, name: 'Budin frutal "Bara Brith"', category:'Postres', description: 'Budín tradicional de Gales. Sus ingredientes son pasas, sultanas, ciruelas, té de hebras, azúcar moreno, miel, nuez moscada, canela, jengibre, entre otros', price: 20,
        image:'/productsImages/bara-brith.jpg', especialidad: 'Especialidad de la house'
    },
    { ID: 9, name: 'Té de chai', category:'Tés', description: 'Tazas S, M, B ; 5% leche & 95% té', price: 15,
         image:'/productsImages/te-chai.jpg'
    },
    { ID: 10, name: 'Café Caramel Macchiato', category:'Cafés', description: 'Tazas S, M, B', price: 25,
        image:'/productsImages/cafe-espresso.jpg'
    },
    { ID: 11, name: 'Alfajor de chocolate', category:'Postres', description: 'Con o sin dulce de leche, jengibre o azúcar', price: 7,
        image:'/productsImages/alfajor-chocolate.jpg' 
    },
    { ID: 12, name: 'Medialuna', category:'Postres', description: 'Con o sin jamon, queso, dulce de leche, jengibre o azúcar ; tostado o horneado ', price: 15,
        image:'/productsImages/medialuna.jpg'
    },
    { ID: 13, name: 'Café Qahwa', category:'Cafés', description: 'Tazas S, M, B ; 90% Café & 10% especias azafrán o canela y granos de cardamomo', price: 10,
        image:'/productsImages/arabic-coffe.jpg'
    },
    { ID: 14, name: 'Sándwich Baguette', category:'Sándwiches', description: 'Con o sin jamon, queso, dulce de leche, jengibre o azúcar ; tostado o horneado ', price: 10,
        image:'/productsImages/baguette.jpg'
    },
    { ID: 15, name: 'Té Negro', category:'Tés', description: 'Tazas S, M, B ; 10% leche & 90% té', price: 11,
        image:'/productsImages/te-negro.jpg'
    },
    { ID: 16, name: 'Café Bourbon', category:'Cafés', description: 'Tazas S, M, B ; 10% leche & 90% Café amargo', price: 35,
        image:'/productsImages/burbon-coffe.jpg'
    },
    { ID: 17, name: 'Té de manzanilla', category:'Tés', description: 'Tazas S, M, B ; 100% té', price: 10,
        image:'/productsImages/te-manzanilla.jpg'
    },
    { ID: 18, name: 'Café Mocha Chocolate', category:'Cafés', description: 'Tazas S, M, B ; 70% café & 20% chocolate & 10% leche ', price: 30,
        image:'/productsImages/mocha-chocolate-coffe.jpg'
    },



  ];
  
export function getProducts() {
    return (
        new Promise((resolve, reject)=>{
            setTimeout(()=>{

                resolve(productsArray)

            } , 500 )
        })
    )
}

export function getProductSingular(id) {
    return(
        productsArray.find((p)=> p.ID == id)
        //prodcuc.find((p)=> p.ID == id )
    )
}

export function getCategoryOfProduct(theCategory) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(
                productsArray.filter((p)=> p.category === theCategory)
            )
        }, 500 )
    })
}

export default productsArray