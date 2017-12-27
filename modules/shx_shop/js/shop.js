function shop(){
var myInit = { method: 'GET'};  
var urlNavesJSON = window.location.origin + "/"
                + window.location.pathname.split("/")[1] 
                + "/?module=shop&vista=json";

function main(datos) {

    // comprobar que el navegador soporta templates
    if (document.querySelector('template').content) { 
        
        var t = document.querySelector('template');
        var target = document.querySelector(".naves");
        var clone;
        
        var name = t.content.querySelector(".name");
        var descr = t.content.querySelector(".descr");
        var image = t.content.querySelector("img");
        var price = t.content.querySelector(".price");
        var health = t.content.querySelector(".health");
        var level = t.content.querySelector(".level");
        var type = t.content.querySelector(".type");
        
        for (var i = 0; i < datos.length; i++) {

            name.textContent = datos[i].name;
            level.textContent = "Lv." + datos[i].level;
            descr.textContent = datos[i].descr;
            price.textContent = datos[i].price;
            //type.textContent = datos[i].type;
            health.textContent = datos[i].health;
            image.src = `./img/ships/${datos[i].image}`;

            clone = document.importNode(t.content, true);
            target.appendChild(clone);
        }

    }
}

var myRequest = new Request(urlNavesJSON, myInit);
fetch(myRequest)
.then( function(response) {
    return response.json();    
})
.then ( function(json){
    main(json);
})
.catch( function(error) {
    console.error(error);
});

}