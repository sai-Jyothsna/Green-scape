let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket= JSON.parse(localStorage.getItem("data")) || []

let increment = (id) => {
  let selectedItem=id
  let search= basket.find((x) => x.id === selectedItem.id)
  search.item+=1
  let concernedItem=shopItemsData.find((y)=>y.id===selectedItem.id)
  let itemPriceTotalById = document.getElementById(`item-price-total-${selectedItem.id}`)
  itemPriceTotalById.innerHTML= `${concernedItem.price*search.item}/-`
  update(selectedItem.id)
}

let decrement = (id) => {
  let selectedItem=id
  let search= basket.find((x) => x.id === selectedItem.id)
  if(search===undefined){
    return
  } else if (search.item===0){
    return
  }else {
    search.item-=1
  }
  update(selectedItem.id)
  generateCartItems()
}

let update = (id) => {
  let search =  basket.find((x)=>x.id===id)
  document.getElementById(id).innerHTML=search.item
  if(search.item===0){
    const objWithIdIndex = basket.findIndex((obj) => obj.id === search.id);
    basket.splice(objWithIdIndex, 1);
  }
  calculation()
  totalAmount()
  localStorage.setItem("data",JSON.stringify(basket))
}  

let removeItem=(selectedItem)=>{
  let objWithIdIndex =  basket.findIndex((x)=>x.id===selectedItem.id)
  basket.splice(objWithIdIndex, 1);
  localStorage.setItem("data",JSON.stringify(basket))
  totalAmount()
  calculation()
  generateCartItems()
}

let calculation=()=>{
    let cartIcon = document.getElementById("cartAmount")
    let totalItems=(basket.map((x)=>x.item)).reduce((x,y)=>x+y,0)
    cartIcon.innerHTML=totalItems
}
  
let clearCart=()=>{
  basket=[]
  generateCartItems()
  calculation()
  localStorage.setItem("data",JSON.stringify(basket))
}


let checkOutFunction=()=>{
  alert("Thank you for buying our products");
  clearCart();
}

calculation()

let generateCartItems = () =>{
  if(basket.length !=0){
    shoppingCart.innerHTML=basket.map((x)=>{
      let {id,item}=x
      let search=shopItemsData.find((y)=>y.id===id) || []
      return (`
      <div class="cart-item">
        <img src=${search.img} width="150" height="150 alt="">
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${search.name}</p>
              <p class="cart-item-price"> ${search.price}/-</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${x.id} class="quantity">
              ${item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3 id=item-price-total-${id}> ${item * search.price}/-</h3>
        </div>
        </div>
        `)
        }).join("")

  } else{
    label.innerHTML=`
    <h2>Cart is Empty</h2>
    <a href="indexPage.html">
      <button class='homeBtn'>Back to shop</button>
    </a>
    `
    shoppingCart.innerHTML=``
  }
}

let totalAmount=()=>{
  if (basket.length!==0){
    let amount = basket.map((x)=>{
      let {item,id}=x
      let search=shopItemsData.find((y)=>y.id===id) || []
      return item*search.price
    }).reduce((x,y)=>x+y,0)
    // console.log(amount)
    label.innerHTML=`
    <h2>Total Bill : ${amount} Rupees</h2>
    <button class="checkout" onclick="checkOutFunction()">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `
  }
  else return
}

totalAmount()

generateCartItems()