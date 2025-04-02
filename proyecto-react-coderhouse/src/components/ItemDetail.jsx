import { useParams } from "react-router-dom";
import { getSingleProductFromFS } from "../Firebase/Firebase";
import { memo, useEffect, useState } from "react";
import "./ItemListContainer.css";
import "./ItemList.css";
import ItemCount from "./ItemCount";
import "./ItemDetailedContainer.css";
import ReactLoading from 'react-loading';

function ItemDetail() {
    const { id } = useParams();
    const [detailed, setDetailed] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            getSingleProductFromFS(id).then((product) => {
                setDetailed(product);
                setLoading(false);
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [id]);

    return (
        <>
            { loading ? (
                <ReactLoading type="bubbles" color="orange" width="100px" height="50px" />
            ) : (
                <article className="Item-Detail-Container">
                    <div className="header-detail">
                        <h2>Vista al detalle</h2>
                        <h1> {detailed?.name} </h1>
                    </div>
                    <div className="content-detail">
                        <img src={detailed?.image} className="img-detail" alt={detailed?.name} />
                        <div className="text-detail">
                            <p> {detailed?.description} </p>
                            <h2> ${detailed?.price} </h2>
                        </div>
                    </div>
                    <br />
                    <div>
                        <ItemCount productNameAlert={ detailed?.name } productToCartProp={detailed} />
                    </div>
                </article>
            )}
        </>
    );
}
export default memo(ItemDetail);
