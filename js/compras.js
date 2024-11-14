//Cuando se crea una instancia se hace porque quiero crear esta constante para utlizar todo lo que quiero ejecutar 
const compra = new Carrito();
const carrito = document.getElementById('carrito');
//Se hace de esta maera porque aqui es donde se ubica cada uno de los productos busca el primer tbody que este dentro de ese ID 
const listaCompra = document.getElementById('lista-compras');
const procesarCompraBtn = document.getElementById('procesacompra');


cargarEventos();
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.llenartabla());
    carrito.addEventListener('click',(e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    carrito.addEventListener('change',(e)=>{compra.obtenerEvento(e)});
    procesarCompraBtn.addEventListener('click',(e)=>{compra.procesarCompra(e)});
    
}
