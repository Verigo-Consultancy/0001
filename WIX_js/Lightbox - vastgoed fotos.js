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
	$w('#beschrijving').html = receivedData.beschrijving;
	
	// afbeeldingen ophalen (query)
	let queryAfbeeldingen = wixData.query("llyda_Vastgoed_afbeeldingen");
	queryAfbeeldingen = queryAfbeeldingen.limit(10);
	//queryAfbeeldingen = queryAfbeeldingen.include("vastgoed_advertentie");
	queryAfbeeldingen = queryAfbeeldingen.eq("vastgoed_advertentie", vastgoedID);
	queryAfbeeldingen = queryAfbeeldingen.find()
	.then( (results) => {
    	console.log(results.length);
		if (results.length >= 1) {
			console.log(results.items[0].title + " : " + results.items[0].afbeelding);
			console.log(results.items[0]);
			$w('#gallery1').items = [
				{
					"title": results.items[0].title,
					"src": results.items[0].afbeelding
				}
			];
		}
		if (results.length >> 1) {
			let galleryItems = $w("#gallery1").items;
			for (var i = 1; i < results.length; i++) {
				galleryItems = $w("#gallery1").items;
				galleryItems.push( {
					"src": results.items[i].afbeelding,
					"title": results.items[i].title
				} );
				$w("#gallery1").items = galleryItems;
			}
		}
		if (results.length === 0) {
			$w("#gallery1").hide();
			$w("#gallery1").collapse();
		}
	  	} )
  	.catch( (err) => {
    	console.log(err.code + " : " + err.message);
  	} );
/*
	let querytest = wixData.query("llyda_Vastgoed_bijlages");
	querytest = querytest.limit(10);
	querytest = querytest.include("Vastgoed_Titel");
	querytest = querytest.find()
	.then( (results) => {
    	console.log(results.totalCount);
		console.log(results.items[0]);
	});
*/
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
					"title": results.items[0].title,
					"bijlage": results.items[0].bijlage
				}
			];
		}

		if (results.totalCount >> 1) {
			let rows =  $w("#bijlagen").rows;
			for (var i = 1; i < results.length; i++) {
				rows = $w("#bijlagen").rows;
				rows.push( {
					"title": results.items[i].title,
					"bijlage": results.items[i].bijlage
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