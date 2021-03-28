var PreloadedImagesH = {};
var mute = document.getElementById('mute');
mute.addEventListener('click', muteHandler, false);


function PreloadImage(img) {
  if (img in PreloadedImagesH) {
	return;
	  } 
	var Img = new Image();
	Img.src = img;
	PreloadedImagesH[img] = true;
	}
		
PreloadImage('img/mute.svg');
PreloadImage('img/unmute.svg');

var isLoud = true;
var audio = document.getElementById('audio');
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
function muteHandler(e) {
	e.preventDefault();
	if (audio && isLoud) {
		mute.src = 'img/mute.svg';
		audio.pause();
		isLoud = false;
		mute.setAttribute('title', 'Включить музыку');
	} else if (audio && !isLoud) {
		mute.src = 'img/unmute.svg';
		audio.play();
		isLoud = true;
		mute.setAttribute('title', 'Выключить музыку');
	}
}