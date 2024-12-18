import { useState, useEffect } from 'react'
import './App.css'
// import { Button } from './components/Button/Button'
import { List } from './components/List/List'
import { Cart } from './components/Cart/Cart'

function App() {

  const [list, setList] = useState([])
  const [cart, setCart] = useState([])

  useEffect(()=>{
    //console.log('le composant a été rendu')
    fetch('http://localhost:5000/api/produits') //interroge l'url fournie en paramètre
      .then(response => response.json())
      .then(data => setList(data))
  },[])

  //Ajout au panier
  const addToCart = (product) => {
    //On met à jour la liste des produits avec la quantité
    const updatedListProducts = list.map((item) => {
      //on cherche le bon produit dans la boucle 
      if(item.nom === product.nom){
        //si sa quantité est déjà supérieure à 0, on l'augmente (spread operator)                               
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity+1}
          //sinon on la met à 1
        }else{
          return {...item, quantity:1}
        }
      } 
      //enfin on renvoie l'élément
      return item
      //à ce stade, j'ai un nouveau tableau mis à jour que je vais pouvoir envoyer à setList, il ne reste qu'à mettre en place la même chose pour le panier
    })

    const updatedCartProducts = cart.map((item) => {
      if(item.nom === product.nom){
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity+1}
        }else{
          return {...item, quantity:1}
        }
      } 
      return item
    })

    //Verification de la présence du produit dans le panier
    const existingCartProduct = cart.find((item) => item.nom === product.nom)
    //Si le produit ne se trouve pas dans le panier, on l'ajoute lui et on lui ajoute une propriété quantity à 1 (encore une fois avec le spread operator)
    if(!existingCartProduct){
      //equivalent à cartProducts.push()
      setCart([...cart, {...product, quantity:1}])
      setList(updatedListProducts)
    }else{
      setCart(updatedCartProducts)
      setList(updatedListProducts)
    }
  }

  //équivalent à function removeFromCart(product) {} 
  const removeFromCart = (product) => {
    //De même que précédemment
      const updatedListProducts = list.map((item) => {
        if(item.nom === product.nom){
          if(item.quantity > 0 ){
            return {...item, quantity:item.quantity-1}
          }else{
            return {...item, quantity:0}
          }
        } 
        return item
      })
  
      const updatedCartProducts = cart.map((item) => {
        if(item.nom === product.nom){
          if(item.quantity > 0 ){
            return {...item, quantity:item.quantity-1}
          }
        } 
        return item
      })
  
      //ici on vient filtrer le panier par rapport à la quantité du produit
      const filteredCart = updatedCartProducts.filter((item) => item.quantity > 0);
  
      //à ce stade, les produits pour lesquels la quantité est à 0 ont été retiré du tableau filteredCart que je peux simplement envoyer à setCart
      setCart(filteredCart)
      setList(updatedListProducts)
    }

  
  return (
    <div className='container'>
      <main>
        <h1>My Grocery Shop</h1>
        {/* rendu conditionnel, on test le booleen et on affiche le bouton que pour la valeur true 
        { booleen && <Button count={count} action={handleClick}/> }  
        <Button count={count} action={handleClick}/>*/}
        <List list={list} addToCart={addToCart} removeFromCart={removeFromCart}/>
      </main>
      <aside>
        <Cart products={cart} addToCart={addToCart} removeFromCart={removeFromCart}/>
      </aside>
    </div>
  )
}

export default App
