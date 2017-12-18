
function updateImageDisplay(ev){
	var curFiles = document.getElementById("upload-input").files
	for (let i = 0; i < curFiles.length; i++ ){
		console.log(curFiles[i].name + " has a size of " + curFiles[i].size + " Bytes");
}	}


function detectores(){
	form=document.querySelector("#form-upload-img");
	if (form == null) {
		return;
	}
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		let files = document.getElementById("upload-input");
		//this.submit();
	});
	
	document.getElementById("upload-input").addEventListener('change', updateImageDisplay);
}

document.addEventListener("DOMContentLoaded", function (){detectores()});
