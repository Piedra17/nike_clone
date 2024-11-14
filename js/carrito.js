
class Carrito {
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProductos(producto);
        }
    }

    leerDatosProductos(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if (productosLS === infoProducto.id) {
            Swal.fire({
                icon: 'error',
                type: 'info',
                title: 'Oops....',
                text: 'El producto ya esta agregado',
                timer: 2000,
                showConfirmButton: false,
            })
        } else {
            //llamar un metodo dentro de otro metodo
            this.insertarCarrito(infoProducto)
        }

    }
    //Insertar de manera visual 
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100px">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle text-decoration-none" data-id="${producto.id}"></a>
            </td>
        `;
        document.querySelector('#lista-carrito tbody').appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }
    
    //La e es para cuando se da click 
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            //Guardala infromarcion del elemnto que se borra
            producto = e.target.parentElement.parentElement,
                //Obtiene el id del producto que se borra
                productoID = producto.querySelector('a').getAttribute('data-id');

        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }
    vaciarCarrito(e) {
        e.preventDefault();
        //mientras lisat producto tengaun primer hijo vaya a lista productos y remueva un hijo el que remueve es el que esta de primero 
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }
    //Medotos para el localStorage
    guardarProductosLocalStorage(producto) {
        let productos;
        //Si guarda productos primero deberia revisar si hay quien revisa si hay productos en el localstorage
        //Aqui el llamado al metodo se hace por medio de una variable porque al metodo que se llama retorna informacio 
        productos = this.obtenerProductosLocalStorage();
        //push es una  funcion que se usa para los arreglos a ese arreglo se le agregue lo que llego en producto 
        productos.push(producto);
        //Va al local y agrege un item con la informacion de productos y envie en JSON 
        //stringify convierte todo en texto 
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    obtenerProductosLocalStorage() {
        let productosLS;
        //Si va al local y hace un proceso de obtencion de items por medio de alguien que se llama productos y eso es completamente igual a null a productoLS se le asigna un arreglo vacio
        if (localStorage.getItem('productos') === null) {
            //Arreglo
            productosLS = [];
        }
        else {
            //Si no es null se parsea a JSON para que sea un objeto
            //Guarda la trasformacion a formato JSON de todo lo que este en el local
            //parse convertir 
            productosLS = JSON.parse(localStorage.getItem('productos'));
        }
        //Cuando se llama un metodo en otro se debe de retonar algo 
        return productosLS;
    }
    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        //forEach se ejecuta tantas veces como elementos hay 
        productosLS.forEach((productoLS, index) => {
            if (productoLS.id === productoID) {
                //splice elimina un elemento del arreglo el 1 define cuantos registros va a eliminar 
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                <img src="${productoLS.imagen}" width="100px">
                </td>
                <td>${productoLS.titulo}</td>
                <td>${productoLS.precio}</td>
                <td>
                <a href="#" class="borrar-producto fas fa-times-circle text-decoration-none" data-id="${productoLS.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }
    vaciarLocalStorage() {
        localStorage.clear();
    }
    procesarPedidos(e) {
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0) {

            Swal.fire({
                icon: 'error',
                type: 'info',
                title: 'Oops....',
                text: 'El carrito esta vacio, agrega algún producto',
                timer: 2000,
                showConfirmButton: false,
            })
        }
        else {
            location.href = "compra.html";
        }

    }

    llenartabla() {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width="100px">
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td><input type="number" class="form-control cantidad" value="${producto.cantidad}"></td>
                <td id="subtotales">${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle text-decoration-none" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }
    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, iva = 0;
        productoLS = this.obtenerProductosLocalStorage();
        //length saber cuantas posiciones tiene el arreglo
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        iva = parseFloat(total * 0.13).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);
        document.getElementById('subtotal').innerHTML = "$" + subtotal;
        document.getElementById('iva').innerHTML = "$" + iva;
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);
    }
    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
        }
    }
    // Función para procesar la compra
    procesarCompra(e) {
        e.preventDefault();

        // Verificar si hay productos en el carrito
        if (this.obtenerProductosLocalStorage().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos en tu carrito',
                timer: 2000,
                showConfirmButton: false,
            }).then(function() {
                window.location.href = 'Home.html'; // Redirigir a la página de inicio
            });
        } else {
            // Obtener los datos del cliente desde el formulario
            let cliente = document.getElementById('cliente').value;
            let correo = document.getElementById('correo').value;

            // Validar que los campos de cliente y correo no estén vacíos
            if (cliente === "" || correo === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios',
                    timer: 2000,
                    showConfirmButton: false,
                });
                return false;
            } else {
                // Obtener los productos del carrito
                let productos = this.obtenerProductosLocalStorage();

                // Preparar los datos a enviar al servidor
                const datos = {
                    cliente,
                    correo,
                    productos
                };

                // Enviar los datos al servidor para enviar el correo
                fetch('http://localhost:3000/enviar-correo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Correo enviado', data);
                    location.href = 'pedidolisto.html'; // Redirigir al cliente después de la compra
                })
                .catch(error => {
                    console.error('Error al enviar el correo', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Hubo un error al procesar tu compra.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                });
            }
        }
    }
}



