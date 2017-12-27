function user() {
    function cargarDatos(datos) {
        document.querySelector('.error-msg').innerHTML = "";    
        if (datos.error) {
            document.querySelector('.error-msg').innerHTML = datos.error;
        }
        else {
            document.querySelector('main').innerHTML = "Bienvenido";
        }
    };

    document.querySelector("#login").addEventListener("submit", function (ev) {
        ev.preventDefault();
        var formData = new FormData(ev.target);
        formData.append("module", "user");
        formData.append("action", "login");
        formData.append("vista", "json");
        var myInit = { method: 'POST', body: formData };
        var myRequest = new Request(ev.target.action, myInit);
        fetch(myRequest)
            .then(function (response) {
                if (response.status == 200) return response.json();
                else throw new Error('El API no está disponible');
            })
            .then(function (response) {
                cargarDatos(response.datos);

            })
            .catch(function (error) {
                console.error(error);
            });
    })
    loadFragment(document.getElementById("register"));
}
