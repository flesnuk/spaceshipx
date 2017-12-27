triggers = document.querySelectorAll('.rootLink');
const highlight = document.createElement('span');

highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    highlight.style.display = 'block';
    const linkCoords = this.getBoundingClientRect();
    highlight.style.width = `${linkCoords.width}px`;
    highlight.style.height = `${linkCoords.height}px`;
    highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));

loadFragment(document.querySelector("#userLink"), user);
loadFragment(document.querySelector("#shopLink"), shop);
loadFragment(document.querySelector("#gameLink"), game);
loadFragment(document.querySelector("#initLink"));

(function () {
    var throttle = function (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

// handle event
window.addEventListener("optimizedResize", function () {
    highlight.style.display = 'none';
    highlight.style.transform = 'translate(0px, 0px)';
});
