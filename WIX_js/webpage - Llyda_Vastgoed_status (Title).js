// For full API documentation, including code examples, visit http://wix.to/94BuAAs
import {local} from 'wix-storage';
import { toonAdres } from 'public/llyda.js';
import { toonPrijs } from 'public/llyda.js';

let toonPrijsVeld =  true;
let toonMeerDetailsKnop =  true;

$w.onReady(function () {

	$w("#dynamicDataset").onReady(() => {

		let lijstType = $w("#dynamicDataset").getCurrentItem().lijst_titel;
		if (lijstType === "Referentie projecten") {
			toonPrijsVeld =  false;
			toonMeerDetailsKnop =  false;
		} else {
			toonPrijsVeld =  true;
			toonMeerDetailsKnop =  true;
		}

		$w("#dynamicDataset").getItems(0, 1)
		.then( (result) => { 
			const dynamicPageListURL = result.items.map(item => item["link-Llyda-Vastgoed-title"]);
			local.setItem('dynamicPageListURL', dynamicPageListURL);
		})
		.catch( (err) => {
			console.log(err.code, err.message);
		});
	});

	$w("#dataset1").onReady(() => {
		let numberOfTotalItems = $w("#dataset1").getTotalCount();
		$w("#dataset1").getItems(0, numberOfTotalItems)
		.then( (result) => { 
			const dynamicPageItemsURLs = result.items.map(item => item["link-Llyda-Vastgoed-title"]);
			local.setItem('dynamicPageItemsURLs', dynamicPageItemsURLs);
		})
		.catch( (err) => {
			console.log(err.code, err.message);
		});
		
	});

	$w("#repeater1").onItemReady(($w, itemData, index) => {
		$w("#text30").text = toonAdres(itemData.adresStraat, itemData.adresPostcode, itemData.adresPlaats);
		if (toonPrijsVeld) {
			$w("#text33").text = toonPrijs(itemData.prijs);
		} else {
			$w("#text33").hide();
		}
		if (!toonMeerDetailsKnop) {$w("#button1").hide()}
	});

});