// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ruta para enviar el correo
app.post('/enviar-correo', async (req, res) => {
    const { cliente, correo, productos } = req.body;

    // Si no vienen productos en la solicitud, asignar productos de ejemplo
    const productosEjemplo = productos || [
        { nombre: 'Nike Air Zoom', cantidad: 1, precio: 120 },
        { nombre: 'Nike T-shirt', cantidad: 2, precio: 30 },
        { nombre: 'Nike Shorts', cantidad: 1, precio: 40 }
    ];

    // Crear mensaje para el correo
    const mensaje = {
        from: 'kendallpiedraperez@gmail.com',  // Tu dirección de correo
        to: correo,  // El correo del cliente
        subject: 'Confirmación de Compra - Nike The Store',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f7f7f7;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: white;
                        }
                        h2 {
                            text-align: center;
                            color: #111;
                        }
                        .table {
                            width: 100%;
                            margin-top: 20px;
                            border-collapse: collapse;
                        }
                        .table th, .table td {
                            padding: 12px;
                            text-align: left;
                            border-bottom: 1px solid #ddd;
                        }
                        .table th {
                            background-color: #222;
                            color: white;
                        }
                        .total {
                            font-size: 18px;
                            font-weight: bold;
                            margin-top: 20px;
                            text-align: right;
                        }
                        .footer {
                            margin-top: 40px;
                            text-align: center;
                            font-size: 12px;
                            color: #888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Confirmación de tu Compra en Nike The Store</h2>
                        <p>Hola ${cliente},</p>
                        <p>Gracias por tu compra en **Nike The Store**. A continuación, te proporcionamos los detalles de tu pedido:</p>
    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productosEjemplo.map(producto => {
                                    // Asegurarse de que el precio sea un número
                                    const precio = parseFloat(producto.precio);
                                    const subtotal = (producto.cantidad * precio).toFixed(2);
                                    return `
                                    <tr>
                                        <td>${producto.titulo}</td>
                                        <td>${producto.cantidad}</td>
                                        <td>$${precio.toFixed(2)}</td>
                                        <td>$${subtotal}</td>
                                        <td><img class="product-image" src="${producto.imagen}" alt="${producto.titulo}"></td>
                                    </tr>
                                `;
                                }).join('')}
                            </tbody>
                        </table>
    
                        <div class="total">
                            <p><strong>Subtotal:</strong> $${productosEjemplo.reduce((total, producto) => total + (producto.cantidad * parseFloat(producto.precio)), 0).toFixed(2)}</p>
                            <p><strong>IVA (18%):</strong> $${(productosEjemplo.reduce((total, producto) => total + (producto.cantidad * parseFloat(producto.precio)), 0) * 0.18).toFixed(2)}</p>
                            <p><strong>Total:</strong> $${(productosEjemplo.reduce((total, producto) => total + (producto.cantidad * parseFloat(producto.precio)), 0) * 1.18).toFixed(2)}</p>
                        </div>
    
                        <div class="footer">
                            <p>Si tienes alguna pregunta sobre tu compra, no dudes en contactarnos.</p>
                            <p>Gracias por confiar en **Nike**.</p>
                        </div>
                    </div>
                    <style>
                        .product-image {
                            width: 100px; /* Ajusta el tamaño */
                            height: 70px;
                        }
                    </style>

                </body>
            </html>
        `,
    };
    
    try {
        // Configurar el transporte para el correo
        const transport = nodemailer.createTransport({
            service: 'Gmail', // Usando Gmail, puedes cambiarlo según el proveedor
            auth: {
                user: 'kendallpiedraperez@gmail.com', // Tu dirección de correo
                pass: 'qknt zqdv yjuj xcag', // Tu contraseña (o aplicación de contraseña si usas Gmail)
            },
        });

        // Enviar el correo
        await transport.sendMail(mensaje);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar el correo', error);
        res.status(500).json({ error: 'Hubo un problema al enviar el correo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
