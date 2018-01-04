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

// registar un optimizedResize event para poder utilizarlo luego
// a la hora de detectar cuando se cambia el tamaño del window
// y asi ajustar la caja que se mueve a traves del menu
(function() {

    window.addEventListener("resize", resizeThrottler, false);
  
    var resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
       
         // The actualResizeHandler will execute at a rate of 15fps
         }, 66);
      }
    }
  
    function actualResizeHandler() {
      // handle the resize event
      highlight.style.display = 'none';
    highlight.style.transform = 'translate(0px, 0px)';
    }
  
  }());

