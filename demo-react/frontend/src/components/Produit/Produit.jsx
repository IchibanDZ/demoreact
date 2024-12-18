import './Produit.css'

export function Produit({product, addToCart, removeFromCart}) {
    return (
        <article className="product-card">
            <img src={product.image} alt={product.nom} className="product-image"/>
            <h2 className="product-name">{product.nom}</h2>
            <p className="price">{product.prix}</p>
            {product.quantity 
                ? (
                <div className="d-flex center">
                    <button onClick={()=>removeFromCart(product)}>-</button>
                    <p className='quantity'>{product.quantity}</p>
                    <button onClick={()=>addToCart(product)}>+</button>
                </div>) 
                : (
                <button onClick={()=>addToCart(product)} className="add-to-cart">Ajouter au panier</button>
                )
            }
        </article>
    )
}