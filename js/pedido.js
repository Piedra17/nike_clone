 //Cuando se crea una instancia se hace porque quiero crear esta constante para utlizar todo lo que quiero ejecutar 
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos =  document.getElementById('lista-productos');
//Se hace de esta maera porque aqui es donde se ubica cada uno de los productos busca el primer tbody que este dentro de ese ID 
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritos = document.getElementById('vaciar-carrito') ;
const procesarPedidoBtn = document.getElementById('procesar-pedido');


cargarEventos();
function cargarEventos(){
    //Evalua sobre quien se dan los eventos
    //Para poder utlizar comprarProducto solo se puede hacer por medio de carro(se puede decir que es un intermediario )
    productos.addEventListener('click',(e)=>{carro.comprarProducto(e)});
    carrito.addEventListener('click',(e)=>{carro.eliminarProducto(e)});
    vaciarCarritos.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});   
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    procesarPedidoBtn.addEventListener('click',(e)=>{carro.procesarPedidos(e)});
}


