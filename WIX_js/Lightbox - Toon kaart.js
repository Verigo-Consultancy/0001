// For full API documentation, including code examples, visit http://wix.to/94BuAAs
import {lightbox} from 'wix-window';

$w.onReady(function () {    
	$w.onReady(() => {  
		let item = lightbox.getContext();
		console.log(item);
		//let myLocation = $w("#googleMaps1").location;
		//let locationLatitude = myLocation.latitude;       // 37.77065
		//let locationLongitude = myLocation.longitude;     // -122.387301
		//let locationDescription = myLocation.description; // "Wix Office"
		// use $w to set the item data on elements of the page
	});
});
