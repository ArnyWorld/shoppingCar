
let clear = document.querySelector(".products__clear");
let accessories = document.querySelector(".accessories");
let deleteProd = document.querySelector("delete-p");
let products=[];
let total = document.querySelector(".products__total");

let table = document.querySelector(".products__table tbody");

let cardsShopping = document.querySelector(".cardsShopping");
let accumulated__price = document.querySelector(".accumulated__price");

//eventListener
cargarListener();
function cargarListener(){


    table.addEventListener("click", deleteProduct);

    clear.addEventListener("click",()=>{
        products=[];
        clearCar();
    } )

    //Mostrar productos del localStorage
    document.addEventListener("DOMContentLoaded",()=>{
        products = JSON.parse(localStorage.getItem('products')) || [];
        carShoppingTable();

    })

    accessories.addEventListener("click", addProduct);
}

function addProduct(e){
    if(e.target.classList.contains('fa-cart-plus')){
        let product = e.target.parentElement.parentElement;
        readProduct(product);
    }else{
        return false;
    }
}

function readProduct(productFound){
    //console.log(productFound.querySelector(".accessory"));
    let product={
        id:productFound.querySelector(".fa-cart-plus").getAttribute("data-id"),
        name:productFound.querySelector(".name").textContent,
        image:productFound.querySelector("img").src,
        quantity:1,
        price:productFound.querySelector(".success").textContent,
        discount: productFound.querySelector(".delete").textContent
    }

    
    const verify =  products.some(prod => prod.id === product.id)

    if(verify){
        const productsUpdated = products.map((prod)=>{
            if( prod.id === product.id ){
                prod.quantity++
                return prod;
            }else{
                return prod;
            }
        })
        products = [...productsUpdated];
        
    }else{
        products= [...products, product];
    }

    
    carShoppingTable();
    
}

function carShoppingTable(){

    clearCar();
    
    let result = 0;
    //console.log(typeof productsStorage);
    
   
    products.forEach(product =>{
        const {image, price,id,quantity,name} = product;
        const unitPrice = parseInt(price.split("$")[1]);
        
        result+=unitPrice*quantity;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            ${name}
        </td>
        <td>
            <img src='${image}' width='50px'>   
        </td>
        <td>
            ${quantity}
        </td>
        <td>
            $$ ${unitPrice* quantity} 
        </td>
        <td>
            <i class="delete-p fa-solid fa-circle-xmark" data-id=${id}></i>
        </td>  
        `
        table.appendChild(row);
        total.textContent = "$$"+result;
    })

    //Agregar localstorage
    syncStorage();    
}

function syncStorage(){
    localStorage.setItem("products",JSON.stringify(products));
}




function deleteProduct(e){
    if(e.target.classList.contains('delete-p')){
        const id = e.target.getAttribute('data-id')
        
        products = products.filter(prod => prod.id !== id)

        carShoppingTable();
    }
}

function clearCar(){
    while(table.firstChild){
        table.removeChild(table.firstChild)
    }
    // localStorage.removeItem("products");
    localStorage.setItem("products",[]);
    total.textContent="";
}


    // carrito.addEventListener("click",(e)=>{
    //     console.log(e.target.parentElement.parentElement);
    //     let tarjeta = e.target.parentElement.parentElement;
    //     // console.log(tarjeta.querySelector(".name").textContent);
    //     // console.log(tarjeta.querySelector("img").src);
    //     // console.log(tarjeta.querySelector(".success").textContent);

    //     let product={
    //         name:tarjeta.querySelector(".name").textContent,
    //         image:tarjeta.querySelector("img").src,
    //         cantidad:1,
    //         price:tarjeta.querySelector(".success").textContent
    //     }
        
    //     products.push(product);

    //     console.log(products);

    //     llenarCarrito();
    // })

    // function llenarCarrito(){
    //     let thead = table.querySelector("thead");
    //     let tbody = document.querySelector("tbody");
    //     let body = "";
    //     products.forEach(prod=>{
    //         body+= `
    //             <tr>
    //                 <td>
    //                     ${prod.name}
    //                 </td>
    //                 <td>
    //                    <img src='${prod.image}' width='50px'>   
    //                 </td>
    //                 <td>
    //                     ${prod.cantidad}
    //                 </td>
    //                 <td>
    //                     ${prod.price}
    //                 </td>
    //             </tr>
    //         `;

    //     })
    //     console.log(body);
    //     tbody.innerHTML= body;
    //     //table.insertBefore(thead, );
    
      
    // }

    // function clearShopping(){
    //     products = [];
    //     console.log(products);
    // }

    // clear.addEventListener("click",()=>{
    //     clearShopping();
    //     llenarCarrito();
    //     console.log("vaciar...");
    // })


// let cargarScroll = (entradas, observador)=>{
//     entradas.forEach((entrada) => {
//         console.log(entrada);
//         console.log(observador);
//         if(entrada.boundingClientRect.top <= 763){
//             goTop.style.display="flex";
//             console.log("Ahora si aparece");
//         }else{
//             goTop.style.display="none";
//             console.log("Desaparece");
//         }
//     });
// }
// const observador = new IntersectionObserver(cargarScroll,{
//     root:null,
//     rootMargin:'0px 0px 0px 0px',
//     threshold:0.5
// });



// observador.observe(parallax);
