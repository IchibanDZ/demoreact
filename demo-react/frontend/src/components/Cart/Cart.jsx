import { Produit } from "../Produit/Produit";
import './Cart.css';

export function Cart({products, addToCart, removeFromCart}) {
    return (
        <div
          className="cart">
            <h2>Panier</h2>
            {products.map((product, index) => 
                <Produit key={index} product={product} addToCart={addToCart} removeFromCart={removeFromCart}/> 
            )}
             
        </div>
    )
}