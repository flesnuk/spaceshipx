MAX_SIZE_IMG = 1000000;

var mainBody;
window.onload = function (){
	mainBody = document.querySelector("main");
}

function updateImageDisplay(ev){
	var uploadInput = document.getElementById("upload-input")
	var curFiles = uploadInput.files
	for (let i = 0; i < curFiles.length; i++ ){
		console.log(curFiles[i].name + " has a size of " + curFiles[i].size + " Bytes");
		if (curFiles[i].size > MAX_SIZE_IMG){
			uploadInput.setCustomValidity(`El tamaño de la imagen excede los ${MAX_SIZE_IMG/1000} KB`);
			document.getElementById("foto").src = "//:0";
		} else { 
			uploadInput.setCustomValidity("");
			var reader  = new FileReader();
			imagen = document.getElementById("foto");
			reader.addEventListener("load", function(){imagen.src = reader.result;});
			reader.readAsDataURL(curFiles[i]);
			console.log(curFiles)
		}
}	}


function detectores(){
	form=document.querySelector("#form-upload-img");
	if (form == null) {
		return;
	}
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		let files = document.getElementById("upload-input");
		this.submit();
	});
	
	document.getElementById("upload-input").addEventListener('change', updateImageDisplay);
}

document.addEventListener("DOMContentLoaded", function (){detectores()});

function loadFragment(link, callback) {
	
	var myInit = { method: 'GET'};  

	link.addEventListener("click", function(ev){
		ev.preventDefault();
		// ponemos temporalmente un gif de loading
		mainBody.innerHTML = "<img src='http://uploads.webflow.com/56dfccba3d760e08049f42a9/56dfccba3d760e08049f4300_infinite-gif-preloader.gif'></img>"
		// si el enlace ya contiene query parameters, utilizar un & en vez de ?
		queryParameter = (ev.target.href.indexOf('?') > -1 ? "&vista=fragment" : "?vista=fragment")
		var myRequest = new Request(ev.target.href + queryParameter, myInit);
		fetch(myRequest)
		.then( function(response) {
			return response.text();    
		})
		.then ( function(text){			
			mainBody.innerHTML = text;
		})
		.then( function(){
			if (callback != null)
				callback();
		})
		.catch( function(error) {
			console.error(error);
		});

	}, false)
}