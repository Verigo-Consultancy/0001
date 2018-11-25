// For full API documentation, including code examples, visit http://wix.to/94BuAAs

import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { toonAdres } from 'public/llyda.js';
import { toonPrijs } from 'public/llyda.js';

$w.onReady(function () {

	let receivedData = wixWindow.lightbox.getContext();
	receivedData = receivedData[0];
	let vastgoedID = receivedData._id;

	$w('#Title').text = receivedData.title;
	$w("#adres").text = toonAdres(receivedData.adresStraat, receivedData.adresPostcode, receivedData.adresPlaats);
	$w("#prijs").text = toonPrijs(receivedData.prijs);
	$w('#vastgoedStatus').text = receivedData.vastgoed_status.title;
	$w('#vastgoedType').text = receivedData.vastgoed_type.title;
	$w('#hoofdFoto').src = receivedData.lijstFoto;

	// bijlagen ophalen (query)
	let queryBijlagen = wixData.query("llyda_Vastgoed_bijlages");
	queryBijlagen = queryBijlagen.limit(10);
	queryBijlagen = queryBijlagen.eq("Vastgoed_Titel", vastgoedID);
	queryBijlagen = queryBijlagen.find()
	.then( (results) => {

    	console.log(results.totalCount);
		
		if (results.totalCount >= 1) {
			console.log(results.items[0].title + " : " + results.items[0].bijlage);
			let rows = $w("#bijlagen").rows;
			$w('#bijlagen').rows = [
				{
					"documentType": results.items[0].documentType,
					"title": results.items[0].title,
					"url": results.items[0].bijlage
				}
			];
		}

		if (results.totalCount >> 1) {
			let rows =  $w("#bijlagen").rows;
			for (var i = 1; i < results.length; i++) {
				rows = $w("#bijlagen").rows;
				rows.push( {
					"documentType": results.items[i].documentType,
					"title": results.items[i].title,
					"url": results.items[i].bijlage
				} );
				$w("#bijlagen").rows = rows;
			}
		}

		if (results.totalCount === 0) {
			$w("#bijlagen").hide();
			$w("#bijlagen").collapse();
		}
	
	} )
  	.catch( (err) => {
    	console.log(err.code + " : " + err.message);
  	} );

});