import "./ItemListContainer.css";
import "./ItemList.css";
import { memo, useEffect, useState } from 'react';
import { getProductsFS } from '../Firebase/Firebase';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList.jsx';
import ReactLoading from 'react-loading';

function ItemListContainer(props) {
    const [allProducts, setAllProducts] = useState([]);
    const { dynamicCategories } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            getProductsFS().then((products) => {
                if (dynamicCategories) {
                    setAllProducts(products.filter((p) => p.category === dynamicCategories ) );
                }
                else {
                    setAllProducts(products);
                }
                setLoading(false);
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [dynamicCategories]);

    return (
        <>          
            <h1 className='gretting-style'>{props.greeting}</h1> 
            <h2 className="dynamic-category"> {dynamicCategories} </h2>
            <br />
            <div className="div-container">
                { loading ? (
                    <ReactLoading type="bubbles" color="blue" width="100px" height="50px" />
                ) : (
                    allProducts?.map((productIterator) => (
                        <article key={productIterator.id} className="Item-List-Container">
                            <ItemList productListed={productIterator} />
                        </article>
                    ))
                )}
            </div>
        </>
    );
}

export default memo(ItemListContainer) 
