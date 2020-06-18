function getAspectRatio() {
    return window.innerWidth/window.innerHeight;
}

function changeBg() {
    let currentTime = new Date().getHours();

    let aspectRatio = getAspectRatio();
    let backgroundFolder;
    if ( Math.abs(aspectRatio - 16/9) <= Math.abs(aspectRatio - 16/10) )
        backgroundFolder = "16_9";
    else
        backgroundFolder = "16_10";

	if (0 <= currentTime&&currentTime < 2) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-night-midnight.jpg')`
	}
	else if(2 <= currentTime&&currentTime < 4.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-night.jpg')`
	}
	else if(4.5 <= currentTime&&currentTime < 6.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-dawn.jpg')`
	}
	else if(6.5 <= currentTime&&currentTime < 7.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-sunrise-dawn.jpg')`
	}
	else if(7.5 <= currentTime&&currentTime < 8.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-morning-sunrise.jpg')`
	}
	else if(8.5 <= currentTime&&currentTime < 11.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-morning.jpg')`
	}
	else if(11.5 <= currentTime&&currentTime < 13.5) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-noon.jpg')`
	}
	else if(13.5 <= currentTime&&currentTime < 18) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-afternoon.jpg')`
	}
	else if(18 <= currentTime&&currentTime < 20) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-evening-sunset.jpg')`
	}
	else if(20 <= currentTime&&currentTime < 23) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-evening-stars.jpg')`
	}
	else if(23 <= currentTime&&currentTime < 24) {
		document.body.style.backgroundImage =`url('images/${backgroundFolder}/BG-night-midnight.jpg')`
	}
}

changeBg();
setInterval(function(){ changeBg(); }, 60000);