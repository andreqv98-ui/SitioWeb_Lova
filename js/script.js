const formulario = document.getElementById("formContacto");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const apellidos = document.getElementById("apellidos").value;
            const correo = document.getElementById("correo").value;
            const telefono = document.getElementById("telefono").value;
            const motivo = document.getElementById("motivo").value;
            const mensaje = document.getElementById("mensaje").value;

            if (
                nombre === "" ||
                apellidos === "" ||
                correo === "" ||
                telefono === "" ||
                motivo === "" ||
                mensaje === ""
            ) {
                alert("Debe completar todos los campos.");
            } else {
                alert("Formulario enviado correctamente.");
                formulario.reset();
            }
        });
    }





    document.addEventListener("DOMContentLoaded", () => {
    const selectProducto = document.getElementById("select-producto");
    const inputCantidad = document.getElementById("input-cantidad");
    
    const previewImg = document.getElementById("preview-img");
    const previewNombre = document.getElementById("preview-nombre");
    const previewPrecio = document.getElementById("preview-precio");
    
    const resSubtotal = document.getElementById("res-subtotal");
    const resDescuento = document.getElementById("res-descuento");
    const resIva = document.getElementById("res-iva");
    const resTotal = document.getElementById("res-total");

    const btnToggleInfo = document.getElementById("btn-toggle-info");
    const infoDiscrecion = document.getElementById("info-discrecion");

    function actualizarCotizacion() {
        if (!selectProducto || !inputCantidad) return;
        const opcionSeleccionada = selectProducto.options[selectProducto.selectedIndex];
        const nombre = opcionSeleccionada.value;
        const precioUnitario = parseFloat(opcionSeleccionada.getAttribute("data-precio")) || 0;
        const imagen = opcionSeleccionada.getAttribute("data-img");
        const cantidad = parseInt(inputCantidad.value) || 1;

        if (nombre) {
            previewNombre.textContent = nombre;
            previewPrecio.textContent = `Precio unitario: ₡${precioUnitario.toLocaleString()}`;
            previewImg.src = imagen;
        } else {
            previewNombre.textContent = "Ningún producto seleccionado";
            previewPrecio.textContent = "Precio unitario: ₡0";
            previewImg.src = "img/Logo.jpeg";
        }

        let tasaDescuento = 0;
        if (cantidad >= 5) {
            tasaDescuento = 0.05;
        }

        const subtotal = precioUnitario * cantidad;
        const montoDescuento = subtotal * tasaDescuento;
        const subtotalConDescuento = subtotal - montoDescuento;
        const iva = subtotalConDescuento * 0.13;
        const totalFinal = subtotalConDescuento + iva;

        resSubtotal.textContent = `₡${subtotal.toLocaleString()}`;
        resDescuento.textContent = `-₡${montoDescuento.toLocaleString()} (${(tasaDescuento * 100)}%)`; // 👈 Corregido con el asterisco (*)
        resIva.textContent = `₡${iva.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        resTotal.textContent = `₡${totalFinal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    if (selectProducto) {
        selectProducto.addEventListener("change", actualizarCotizacion);
        inputCantidad.addEventListener("input", actualizarCotizacion);
    }

    if (btnToggleInfo && infoDiscrecion) {
        btnToggleInfo.addEventListener("click", () => {
            if (infoDiscrecion.style.display === "none") {
                infoDiscrecion.style.display = "block";
                btnToggleInfo.textContent = "Ocultar notas de discreción";
            } else {
                infoDiscrecion.style.display = "none";
                btnToggleInfo.textContent = "Mostrar / Ocultar notas de discreción";
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const sesion = localStorage.getItem("sesionLova");
    const esPaginaLogin = window.location.href.includes("login.html");

    if ((!sesion || sesion !== "activo") && !esPaginaLogin) {
        alert("Acceso restringido: Debes iniciar sesión en Lova para continuar.");
        window.location.href = "login.html";
    }

   
    const formLogin = document.getElementById("formLogin");
    const errorLogin = document.getElementById("error-login");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const correo = document.getElementById("login-correo").value;
            const password = document.getElementById("login-password").value;

            if (correo === "lovasexshop@gmail.com" && password === "lova123") {
                localStorage.setItem("sesionLova", "activo");
                window.location.href = "index.html"; // Al entrar con éxito, lo manda al inicio
            } else {
                if (errorLogin) errorLogin.style.display = "block";
            }
        });
    }

  
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("sesionLova");
            alert("Has cerrado sesión en Lova.");
            window.location.href = "login.html";
        });
    }
});





document.addEventListener("DOMContentLoaded", () => {

   
    const inventarioInicial = [
        { codigo: "P001", nombre: "Cuerda para bondage", precio: 9000, existencia: 15 },
        { codigo: "P002", nombre: "Collares y Gargantillas BDSM", precio: 12000, existencia: 10 },
        { codigo: "P003", nombre: "Vela corporal", precio: 15000, existencia: 18 },
        { codigo: "P004", nombre: "Lubricante base agua", precio: 6500, existencia: 25 },
        { codigo: "P005", nombre: "Aceites para masaje", precio: 9000, existencia: 12 },
        { codigo: "P006", nombre: "Venda para ojos", precio: 5000, existencia: 20 },
        { codigo: "P007", nombre: "Esposas de tela", precio: 7000, existencia: 14 },
        { codigo: "P008", nombre: "Perfume de Feromonas", precio: 12500, existencia: 16 },
        { codigo: "P009", nombre: "Lencería Roleplay", precio: 15000, existencia: 22 },
        { codigo: "P010", nombre: "Conjunto Lencería Encaje", precio: 15000, existencia: 25 }
    ];



    let inventario;

    try {
        inventario = JSON.parse(localStorage.getItem("inventarioLova"));
    } catch (error) {
        inventario = null;
    }

    if (!Array.isArray(inventario)) {
        inventario = inventarioInicial.map(producto => ({ ...producto }));
        localStorage.setItem("inventarioLova", JSON.stringify(inventario));
    }

    function guardarInventario() {
        localStorage.setItem("inventarioLova", JSON.stringify(inventario));
    }

    // MOSTRAR EL INVENTARIO EN LA TABLA DE SISTEMA.HTML
    function actualizarTablaInventario() {
        const tabla = document.getElementById("tabla-inventario");

        if (!tabla) return;

        tabla.innerHTML = "";

        inventario.forEach(producto => {
            const fila = document.createElement("tr");

            const estado = producto.existencia > 0
                ? "Disponible"
                : "Agotado";

            fila.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>₡${producto.precio.toLocaleString("es-CR")}</td>
                <td>${producto.existencia}</td>
                <td>${estado}</td>
            `;

            tabla.appendChild(fila);
        });
    }

    actualizarTablaInventario();

    
    
    let carrito;

    try {
        carrito = JSON.parse(localStorage.getItem("carritoLova")) || [];
    } catch (error) {
        carrito = [];
    }

    if (!Array.isArray(carrito)) {
        carrito = [];
    }

    const btnFlotante = document.getElementById("btn-carrito-flotante");
    const modalCarrito = document.getElementById("modal-carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const listaItems = document.getElementById("lista-carrito-items");

    const carSubtotal = document.getElementById("car-subtotal");
    const carDescuento = document.getElementById("car-descuento");
    const carIva = document.getElementById("car-iva");
    const carTotal = document.getElementById("car-total");

    const btnFinalizar = document.getElementById("btn-finalizar-pedido");
    const btnSeguirComprando = document.getElementById("btn-seguir-comprando");

    function guardarCarrito() {
        localStorage.setItem("carritoLova", JSON.stringify(carrito));
    }


    if (btnFlotante && modalCarrito) {
        btnFlotante.addEventListener("click", () => {
            modalCarrito.style.display = "flex";
        });
    }

    if (cerrarCarrito && modalCarrito) {
        cerrarCarrito.addEventListener("click", () => {
            modalCarrito.style.display = "none";
        });
    }

    if (btnSeguirComprando && modalCarrito) {
        btnSeguirComprando.addEventListener("click", () => {
            modalCarrito.style.display = "none";
        });
    }

    
    
   

    let modalCantidad = null;

    function cerrarVentanaCantidad() {
        if (modalCantidad) {
            modalCantidad.remove();
            modalCantidad = null;
        }
    }

    function mostrarVentanaCantidad(producto, disponibles) {
        cerrarVentanaCantidad();

        modalCantidad = document.createElement("div");
        modalCantidad.className = "cantidad-modal";

        const contenido = document.createElement("div");
        contenido.className = "cantidad-contenido";

        const titulo = document.createElement("h3");
        titulo.textContent = "Agregar al carrito";

        const cerrar = document.createElement("button");
        cerrar.type = "button";
        cerrar.className = "cantidad-cerrar";
        cerrar.textContent = "×";
        cerrar.setAttribute("aria-label", "Cerrar ventana");

        const nombre = document.createElement("p");
        nombre.className = "cantidad-nombre";
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.className = "cantidad-precio";
        precio.textContent =
            `Precio por unidad: ₡${producto.precio.toLocaleString("es-CR")}`;

        const etiqueta = document.createElement("label");
        etiqueta.className = "cantidad-etiqueta";
        etiqueta.textContent = "¿Cuántas unidades deseas?";
        etiqueta.setAttribute("for", "cantidad-elegida");

        const input = document.createElement("input");
        input.type = "number";
        input.id = "cantidad-elegida";
        input.min = "1";
        input.max = String(disponibles);
        input.step = "1";
        input.value = "1";
        input.required = true;

        const existencia = document.createElement("p");
        existencia.className = "cantidad-disponible";
        existencia.textContent = `Disponibles: ${disponibles} unidades`;

        const subtotal = document.createElement("div");
        subtotal.className = "cantidad-subtotal";

        const textoSubtotal = document.createElement("p");
        textoSubtotal.textContent = "Subtotal:";

        const montoSubtotal = document.createElement("strong");
        montoSubtotal.textContent =
            `₡${producto.precio.toLocaleString("es-CR")}`;

        textoSubtotal.appendChild(document.createElement("br"));
        textoSubtotal.appendChild(montoSubtotal);
        subtotal.appendChild(textoSubtotal);

        const acciones = document.createElement("div");
        acciones.className = "cantidad-acciones";

        const cancelar = document.createElement("button");
        cancelar.type = "button";
        cancelar.className = "cantidad-cancelar";
        cancelar.textContent = "Cancelar";

        const confirmar = document.createElement("button");
        confirmar.type = "button";
        confirmar.textContent = "Agregar al carrito";

        function actualizarSubtotal() {
            const cantidad = Number(input.value);

            if (
                Number.isInteger(cantidad) &&
                cantidad >= 1 &&
                cantidad <= disponibles
            ) {
                montoSubtotal.textContent =
                    `₡${(producto.precio * cantidad).toLocaleString("es-CR")}`;
            } else {
                montoSubtotal.textContent = "Cantidad no válida";
            }
        }

        input.addEventListener("input", actualizarSubtotal);

        function confirmarCantidad() {
            const respuesta = input.value.trim();
            const cantidad = Number(respuesta);

            if (
                respuesta === "" ||
                !Number.isInteger(cantidad) ||
                cantidad < 1 ||
                cantidad > disponibles
            ) {
                alert(`Elegí una cantidad entre 1 y ${disponibles}.`);
                input.focus();
                return;
            }

            const productoEnCarrito = carrito.find(
                item => item.nombre === producto.nombre
            );

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += cantidad;
            } else {
                carrito.push({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: cantidad
                });
            }

            guardarCarrito();
            actualizarCarritoVisual();
            cerrarVentanaCantidad();

            if (modalCarrito) {
                modalCarrito.style.display = "flex";
            }
        }

        confirmar.addEventListener("click", confirmarCantidad);
        cancelar.addEventListener("click", cerrarVentanaCantidad);
        cerrar.addEventListener("click", cerrarVentanaCantidad);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                confirmarCantidad();
            }

            if (event.key === "Escape") {
                cerrarVentanaCantidad();
            }
        });

        modalCantidad.addEventListener("click", event => {
            if (event.target === modalCantidad) {
                cerrarVentanaCantidad();
            }
        });

        acciones.appendChild(cancelar);
        acciones.appendChild(confirmar);

        contenido.appendChild(cerrar);
        contenido.appendChild(titulo);
        contenido.appendChild(nombre);
        contenido.appendChild(precio);
        contenido.appendChild(etiqueta);
        contenido.appendChild(input);
        contenido.appendChild(existencia);
        contenido.appendChild(subtotal);
        contenido.appendChild(acciones);

        modalCantidad.appendChild(contenido);
        document.body.appendChild(modalCantidad);

        input.focus();
    }

   
    document.addEventListener("click", event => {
        const boton = event.target.closest(".btn-agregar");

        if (!boton) return;

        const nombre = boton.getAttribute("data-nombre");

        const producto = inventario.find(
            item => item.nombre === nombre
        );

        if (!producto) {
            alert("No se encontró este producto en el inventario.");
            return;
        }

        if (producto.existencia <= 0) {
            alert("Este producto está agotado.");
            return;
        }

        const productoEnCarrito = carrito.find(
            item => item.nombre === nombre
        );

        const cantidadEnCarrito = productoEnCarrito
            ? productoEnCarrito.cantidad
            : 0;

        const disponibles = producto.existencia - cantidadEnCarrito;

        if (disponibles <= 0) {
            alert("Ya agregaste todas las unidades disponibles al carrito.");
            return;
        }

        mostrarVentanaCantidad(producto, disponibles);
    });


    

 
    function actualizarCarritoVisual() {
        if (!listaItems) return;

        listaItems.innerHTML = "";

        let totalUnidades = 0;
        let subtotalGeneral = 0;

        if (carrito.length === 0) {
            listaItems.innerHTML = "<p>El carrito está vacío.</p>";

            if (carSubtotal) carSubtotal.textContent = "₡0";
            if (carDescuento) carDescuento.textContent = "₡0";
            if (carIva) carIva.textContent = "₡0";
            if (carTotal) carTotal.textContent = "₡0";
            if (contadorCarrito) contadorCarrito.textContent = "0";

            return;
        }

        carrito.forEach((item, index) => {
            totalUnidades += item.cantidad;
            subtotalGeneral += item.precio * item.cantidad;

            const fila = document.createElement("div");
            fila.classList.add("carrito-item-fila");

            const nombre = document.createElement("span");
            nombre.textContent = `${item.nombre} (x${item.cantidad})`;

            const precio = document.createElement("span");
            precio.textContent =
                `₡${(item.precio * item.cantidad).toLocaleString("es-CR")}`;

            const botonQuitar = document.createElement("button");
            botonQuitar.classList.add("btn-quitar");
            botonQuitar.setAttribute("data-index", index);
            botonQuitar.setAttribute("type", "button");
            botonQuitar.textContent = "❌";

            fila.appendChild(nombre);
            fila.appendChild(precio);
            fila.appendChild(botonQuitar);

            listaItems.appendChild(fila);
        });

        if (contadorCarrito) {
            contadorCarrito.textContent = totalUnidades;
        }

        const tasaDescuento = totalUnidades >= 5 ? 0.05 : 0;
        const montoDescuento = subtotalGeneral * tasaDescuento;
        const subtotalConDescuento = subtotalGeneral - montoDescuento;
        const iva = subtotalConDescuento * 0.13;
        const totalFinal = subtotalConDescuento + iva;

        if (carSubtotal) {
            carSubtotal.textContent =
                `₡${subtotalGeneral.toLocaleString("es-CR")}`;
        }

        if (carDescuento) {
            carDescuento.textContent =
                `-₡${montoDescuento.toLocaleString("es-CR")} (${tasaDescuento * 100}%)`;
        }

        if (carIva) {
            carIva.textContent =
                `₡${iva.toLocaleString("es-CR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
        }

        if (carTotal) {
            carTotal.textContent =
                `₡${totalFinal.toLocaleString("es-CR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
        }
    }

    
    document.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-quitar");

        if (!boton) return;

        const indice = Number(boton.getAttribute("data-index"));

        if (!Number.isInteger(indice) || indice < 0 || indice >= carrito.length) {
            return;
        }

        carrito.splice(indice, 1);

        guardarCarrito();
        actualizarCarritoVisual();
    });

  
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

           
            for (const item of carrito) {
                const producto = inventario.find(
                    p => p.nombre === item.nombre
                );

                if (!producto || producto.existencia < item.cantidad) {
                    alert(
                        `No hay suficientes existencias de ${item.nombre}.`
                    );
                    return;
                }
            }



            
         
            const subtotalVenta = carrito.reduce(
                (suma, item) => suma + item.precio * item.cantidad,
                0
            );

            const unidadesVenta = carrito.reduce(
                (suma, item) => suma + item.cantidad,
                0
            );

            const descuentoVenta =
                unidadesVenta >= 5 ? subtotalVenta * 0.05 : 0;

            const ivaVenta = (subtotalVenta - descuentoVenta) * 0.13;
            const totalVenta = subtotalVenta - descuentoVenta + ivaVenta;

            let ventasGuardadas = [];

            try {
                ventasGuardadas =
                    JSON.parse(localStorage.getItem("ventasLova")) || [];
            } catch (error) {
                ventasGuardadas = [];
            }

            if (!Array.isArray(ventasGuardadas)) {
                ventasGuardadas = [];
            }

            const numeroVenta = ventasGuardadas.length + 1;

            ventasGuardadas.push({
                numero: "V" + String(numeroVenta).padStart(3, "0"),
                fecha: new Date().toLocaleString("es-CR"),
                productos: carrito.map(item => ({
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad
                })),
                subtotal: subtotalVenta,
                descuento: descuentoVenta,
                iva: ivaVenta,
                total: totalVenta
            });

            localStorage.setItem(
                "ventasLova",
                JSON.stringify(ventasGuardadas)
            );



            carrito.forEach(item => {
                const producto = inventario.find(
                    p => p.nombre === item.nombre
                );

                producto.existencia -= item.cantidad;
            });

            guardarInventario();
            actualizarTablaInventario();

            
            carrito = [];
            guardarCarrito();
            actualizarCarritoVisual();

            if (modalCarrito) {
                modalCarrito.style.display = "none";
            }

            alert(
                "¡Pedido registrado con éxito! Las existencias se actualizaron."
            );
        });
    }

    
    actualizarCarritoVisual();

});





document.addEventListener("DOMContentLoaded", () => {

   
    function obtenerDatos(clave) {
        try {
            const datos = JSON.parse(localStorage.getItem(clave));
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    }

  
    const formProducto = document.getElementById("form-registro-producto");

    if (formProducto) {
        formProducto.addEventListener("submit", event => {
            event.preventDefault();

            const codigo = document.getElementById("nuevo-codigo")
                .value.trim().toUpperCase();
            const nombre = document.getElementById("nuevo-nombre")
                .value.trim();
            const precio = Number(document.getElementById("nuevo-precio").value);
            const existencia = Number(document.getElementById("nuevo-stock").value);

            let inventario = obtenerDatos("inventarioLova");

            if (!codigo || !nombre || precio <= 0 ||
                !Number.isInteger(precio) ||
                !Number.isInteger(existencia) || existencia < 0) {
                alert("Revisa los datos ingresados. El precio debe ser positivo y las existencias no pueden ser negativas.");
                return;
            }

            const codigoExiste = inventario.some(
                producto => producto.codigo.toUpperCase() === codigo
            );

            if (codigoExiste) {
                alert("Ya existe un producto con ese código.");
                return;
            }

            const nombreExiste = inventario.some(
                producto => producto.nombre.toLowerCase() === nombre.toLowerCase()
            );

            if (nombreExiste) {
                alert("Ya existe un producto con ese nombre.");
                return;
            }

            inventario.push({
                codigo: codigo,
                nombre: nombre,
                precio: precio,
                existencia: existencia
            });

            localStorage.setItem("inventarioLova", JSON.stringify(inventario));

            formProducto.reset();

            actualizarInventarioNuevo();
            actualizarReportes();

            alert("Producto registrado correctamente.");
        });
    }

   
    function actualizarInventarioNuevo() {
        const tabla = document.getElementById("tabla-inventario");

        if (!tabla) return;

        const inventario = obtenerDatos("inventarioLova");
        tabla.innerHTML = "";

        inventario.forEach(producto => {
            const fila = document.createElement("tr");

            [
                producto.codigo,
                producto.nombre,
                `₡${Number(producto.precio).toLocaleString("es-CR")}`,
                producto.existencia,
                producto.existencia > 0 ? "Disponible" : "Agotado"
            ].forEach(valor => {
                const celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);
            });

            tabla.appendChild(fila);
        });
    }

   
    const formCliente = document.getElementById("form-registro-cliente");

    if (formCliente) {
        formCliente.addEventListener("submit", event => {
            event.preventDefault();

            const cedula = document.getElementById("cliente-cedula")
                .value.trim();
            const nombre = document.getElementById("cliente-nombre")
                .value.trim();
            const telefono = document.getElementById("cliente-telefono")
                .value.trim();
            const correo = document.getElementById("cliente-correo")
                .value.trim();

            const clientes = obtenerDatos("clientesLova");

            if (clientes.some(cliente => cliente.cedula === cedula)) {
                alert("Ya existe un cliente con esa identificación.");
                return;
            }

            clientes.push({
                cedula: cedula,
                nombre: nombre,
                telefono: telefono,
                correo: correo
            });

            localStorage.setItem("clientesLova", JSON.stringify(clientes));

            formCliente.reset();
            mostrarClientes();

            alert("Cliente registrado correctamente.");
        });
    }

  
    function mostrarClientes() {
        const tabla = document.getElementById("tabla-clientes");

        if (!tabla) return;

        const clientes = obtenerDatos("clientesLova");
        tabla.innerHTML = "";

        clientes.forEach(cliente => {
            const fila = document.createElement("tr");

            [
                cliente.cedula,
                cliente.nombre,
                cliente.telefono,
                cliente.correo
            ].forEach(valor => {
                const celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);
            });

            tabla.appendChild(fila);
        });
    }

    
    function actualizarReportes() {
        const inventario = obtenerDatos("inventarioLova");
        const ventas = obtenerDatos("ventasLova");

        const cantidadVentas = document.getElementById("reporte-cantidad-ventas");
        const ingresos = document.getElementById("reporte-ingresos");
        const existencias = document.getElementById("reporte-existencias");
        const agotados = document.getElementById("reporte-agotados");
        const tablaVentas = document.getElementById("tabla-ventas");

        if (cantidadVentas) {
            cantidadVentas.textContent = ventas.length;
        }

        if (ingresos) {
            const totalIngresos = ventas.reduce(
                (suma, venta) => suma + Number(venta.total || 0), 0
            );

            ingresos.textContent =
                `₡${totalIngresos.toLocaleString("es-CR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
        }

        if (existencias) {
            const totalExistencias = inventario.reduce(
                (suma, producto) => suma + Number(producto.existencia || 0), 0
            );

            existencias.textContent = totalExistencias;
        }

        if (agotados) {
            agotados.textContent = inventario.filter(
                producto => Number(producto.existencia) === 0
            ).length;
        }

        if (tablaVentas) {
            tablaVentas.innerHTML = "";

            ventas.forEach(venta => {
                const fila = document.createElement("tr");

                const productos = (venta.productos || [])
                    .map(item => `${item.nombre} (x${item.cantidad})`)
                    .join(", ");

                [
                    venta.numero,
                    venta.fecha,
                    productos,
                    `₡${Number(venta.total).toLocaleString("es-CR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`
                ].forEach(valor => {
                    const celda = document.createElement("td");
                    celda.textContent = valor;
                    fila.appendChild(celda);
                });

                tablaVentas.appendChild(fila);
            });
        }
    }


    actualizarInventarioNuevo();
    mostrarClientes();
    actualizarReportes();

});





document.addEventListener("DOMContentLoaded", () => {
    const botonReiniciar = document.getElementById("btn-reiniciar-sistema");

    if (!botonReiniciar) return;

    botonReiniciar.addEventListener("click", () => {
        const confirmar = confirm(
            "¿Estás segura de que querés reiniciar todo el sistema? Se borrarán los clientes registrados, las ventas, el carrito y los productos agregados. Los productos iniciales volverán a sus cantidades originales."
        );

        if (!confirmar) return;


        localStorage.removeItem("inventarioLova");
        localStorage.removeItem("clientesLova");
        localStorage.removeItem("ventasLova");
        localStorage.removeItem("carritoLova");

        alert("El sistema se reiniciará con los datos iniciales.");

        location.reload();
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formLogin");
    const confirmacionEdad = document.getElementById("confirmar-edad");

    if (!formulario || !confirmacionEdad) return;

    formulario.addEventListener("submit", (evento) => {
        if (!confirmacionEdad.checked) {
            evento.preventDefault();
            alert("Debes confirmar que tienes 18 años o más para ingresar.");
        }
    });
});
