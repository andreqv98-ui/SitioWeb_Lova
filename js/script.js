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