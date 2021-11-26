// recuperar evento del boton 
// variables 
let allContainerCart=document.querySelector('.products'); // selector de todo el container
let containerBuycard=document.querySelector('.card-items')
let priceTotal= document.querySelector('.price-total');
//aqui vamos a hacer un arreglo  para poder ponerlo en la parte del carrito
let buyThings=[];
let totalCard= 0;
//funciones aqui vamos a hacer la funcion que agrupe a todos los listends

loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuycard.addEventListener('click', deleteproduct);
   
}
// la funcion del evento este evento tiene una funcion que se llama target
function addProduct(e){
    e.preventDefault();
     //especificar la funcionalidad que queremos entonces cuando se le unda en el
    //boton contenga la clase 
    if (e.target.classList.contains('btn-add-cart')) {
         // aqui vamos a recuperar los datos de la imagen para ponerlos en el carrito
   //parentelement lo que hace es mostrar todo el padre del elememento seleccionado    
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteproduct(e) {
    if (e.target.classList.contains('delete-product')) {
        // del producto que se hizo click ya se tiene el id
        const deleteId= e.target.getAttribute('data-id');
        // aqui lo que estamos haciendo es que segun la cantidad se multiplique el
        //precio
        buyThings.forEach(value =>{
            if (value.id == deleteId){
                let priceReduce = parseFloat(value.price)*parseFloat(value.amount);
                totalCard = totalCard- priceReduce;
                // se redonde el total
                totalCard =totalCard.toFixed(2);
            }
        })
        // recorrer el arreglo se filtran los productos menos el que se quiere eliminar
        buyThings= buyThings.filter(product=>product.id !== deleteId);

   }
   loadHtml();
}



function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
   // aqui vamos a hacer que se sume 
   totalCard=parseFloat(totalCard) + parseFloat(infoProduct.price); 
  // que solo lo redonde a dos decimales
   totalCard=totalCard.toFixed(2);
   
   
   //se va a hacer que si ya existe el id recorra el arreglo  y si el producto 
    // ya esta entonces que recorra los productos entonces si coincide
    // entonces que se añada y si no coincide que se retorne
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if(exist){
        // pro es un nuevo arreglo
        const pro= buyThings.map(product=>{
           if(product.id===infoProduct.id){
               product.amount++;
               return product;
           }else{
              return product;
           }

        });
        buyThings = [...pro];
    }else{
        //arreglo con los objetos
    buyThings=[...buyThings, infoProduct];
    }
    

    loadHtml();

    
}


//esta lo que va a hacer es recorrer el objeto por medio de un forach
 function loadHtml() {
    // estan todos los objetos apilados entonces vamos a hacer que eso no suceda
    clearHtml();
      buyThings.forEach(product => {
          //estos son los atributos que tiene el objeto
          const{image,title,price,amount,id}=product
          // crear estructura
          const row=document.createElement('div'); // esta es la etiqueta
          row.classList.add('item');// esta es la clase
      
          //esta nos permite añadir una cadena tambien se concatena la imagen el titulo precio y cantidad
          // esto seria dinamico
          row.innerHTML= `
          <img src="${image}" alt="">
          <div class="item-content">
              <h5>${title}</h5>
              <h5 class="cart-price">${price}$</h5>
              <h6>Amount: ${amount}</h6>
          </div>
          <span class="delete-product" data-id="${id}">X</span>
          `;
//Añadir un hijo al selector
          containerBuycard.appendChild(row);
          // aqui se va a mostrar el total

          priceTotal.innerHTML = totalCard;

         
     });
     
 }
 function clearHtml(){
    containerBuycard.innerHTML = '';
 }