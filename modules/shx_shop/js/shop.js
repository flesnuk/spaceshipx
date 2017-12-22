function main() {

    var datos = JSON.parse(`[{"id":"1","name":"aur","descr":"best ship until today","price":"100",
    "health":"80","level":"10","type":"1","image":"Katou.jpg"},
    {"id":"2","name":"argint","descr":"nice description bro, don't mind me","price":"10",
    "health":"20","level":"5","type":"2","image":"Katou.jpg"},
    {"id":"3","name":"bronz","descr":"what I should expect, this is the best I ever seen","price":"10",
    "health":"20","level":"3","type":"2","image":"Katou.jpg"},
    {"id":"4","name":"hydrogen","descr":"I should use lorem instead of writing like an idiot","price":"10",
    "health":"20","level":"1","type":"2","image":"Katou.jpg"}]`);

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
main();
//document.addEventListener("DOMContentLoaded", function (){main()});