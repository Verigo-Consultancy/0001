// For full API documentation, including code examples, visit http://wix.to/94BuAAs

const debug = false;

import wixData from 'wix-data';
import wixWindow from 'wix-window';
import { toonAdres } from 'public/llyda.js';
import { toonPrijs } from 'public/llyda.js';

let vastgoedQuery = wixData.query("Llyda_Vastgoed");
let errors= [];
let firstRun = true;

$w.onReady(function () {
	filterToepassen();   
});

export function filterToepassen(event) {

	vastgoedQuery = [];
	vastgoedQuery = wixData.query("Llyda_Vastgoed");
	
	//checkBoxStatus array initialiseren
	let checkBoxStatus = [];
	//vastgoedStatus checkboxen uitlezen en relevante IDs (TABEL llyda_vastgoed_status) in array checkBoxStatus toevoegen
	if ($w('#teKoop').checked)				{checkBoxStatus.push('609b32bd-87df-4192-a8ca-1705ca1d3125');}
	if ($w('#teHuur').checked) 				{checkBoxStatus.push('fed7473d-d92c-4e6d-83cd-f5971d53eed7');}
	if ($w('#toekomstigProject').checked)	{checkBoxStatus.push('a18c6612-e1f9-413e-bad2-cec3d3cf94df');}
	if (debug) {console.log("checkBoxStatus : "); console.log(checkBoxStatus);}
	
	//checkBoxTypes array initialiseren
	let checkBoxTypes = [];
	//vastgoedType checkboxen uitlezen en relevante IDs (TABEL llyda_vastgoed_types) in array checkBoxTypes toevoegen
	if ($w('#woning').checked) 				{checkBoxTypes.push('4dc13dd9-738b-46ab-9cee-a4a1c9c3f7f8');}
	if ($w('#appartement').checked)			{checkBoxTypes.push('437b330f-2cec-44ec-bb87-c839570d871e');}
	if ($w('#studio').checked)				{checkBoxTypes.push('1506bffa-118e-4304-8b59-6d666ea7ef05');}
	if ($w('#penthouse').checked)			{checkBoxTypes.push('ecdf6681-198e-41e6-aad2-28d5ba65d462');}
	if ($w('#commercieleRuimte').checked)	{checkBoxTypes.push('750face9-397e-4a47-90e6-718b0b55bfd3');}
	if ($w('#bergruimte').checked) 			{checkBoxTypes.push('b9f2f2bf-a20f-4dc6-a30d-aa70860621f0');}
	if ($w('#andere').checked)				{checkBoxTypes.push('2a2a4c73-a2b6-4e33-9afd-39092e66bac4');}
	if ($w('#staanplaats').checked)			{checkBoxTypes.push('c2f332a5-e022-44eb-8f50-1655b5ada674');}
	if ($w('#garage').checked)				{checkBoxTypes.push('6f0b0072-c7c6-4cbb-9d0c-9a67b5213d50');}
	if ($w('#grond').checked)				{checkBoxTypes.push('f5e040f2-edec-4642-a7a3-2043d5b10ae2');}
	if (debug) {console.log("checkBoxStatus : "); console.log(checkBoxTypes);}

	// vastgoed query opbouwen
	vastgoedQuery = vastgoedQuery.limit(10);
	vastgoedQuery = vastgoedQuery.include("vastgoed_status");
	vastgoedQuery = vastgoedQuery.include("vastgoed_type");
	if (checkBoxStatus.length >> 0) {
		vastgoedQuery = vastgoedQuery.hasSome("vastgoed_status", checkBoxStatus);
		if (debug) {
			console.log("vastgoedQuery : vastgoed_status : " + checkBoxStatus);
		}
	} else {
		if (debug) {
			console.log("vastgoedQuery : GEEN vastgoed_status filtering.");
		}
	}

	if (checkBoxTypes.length >> 0) {
		vastgoedQuery = vastgoedQuery.hasSome("vastgoed_type", checkBoxTypes);
		if (debug) {
			console.log("vastgoedQuery : vastgoed_type : " + checkBoxTypes);
		}
	} else {
		if (debug) {
			console.log("vastgoedQuery : GEEN vastgoed_type filtering.");
		}
	}

	vastgoedQuery.find()
	.then( (results) => {
		if (debug) {
			console.log("items : ");
			console.log(results.items);
			console.log("firstItem : ");
			console.log(results.firstItem);
			console.log("totalCount : " + results.totalCount);
			console.log("pageSize : " + results.pageSize);
			console.log("currentPage : " + results.currentPage);
			console.log("totalPages : " + results.totalPages);
			console.log("hasNext : " + results.hasNext);
			console.log("hasPrev : " + results.hasPrev);
			console.log("length : " + results.length);
		}
		$w('#vastgoedAanbod').data = results.items;
	} )
	.catch( (error) => {
		errors.push = (error.code + " : " + error.message);
	} );

	$w('#vastgoedAanbod').onItemReady( ($w, itemData, index) => {
		$w("#vastgoedAdres").text = toonAdres(itemData.adresStraat, itemData.adresPostcode, itemData.adresPlaats);
		$w("#vastgoedPrijs").text = toonPrijs(itemData.prijs);
		$w("#vastgoedFotos").src = itemData.lijstFoto;
		$w("#vastgoedTitel").text = itemData.title;
		$w("#vastgoedType").text = itemData.vastgoed_type.title;
		$w("#vastgoedStatus").text = itemData.vastgoed_status.title;
		$w("#vastgoedBeschrijving").html = itemData.beschrijving;
  	} );
	
	$w("#anchor1").scrollTo();
}

export function toonAlles(event) {
	$w('#teKoop').checked=true;
	$w('#teHuur').checked=true;
	$w('#toekomstigProject').checked=true;
	
	$w('#woning').checked=true;
	$w('#appartement').checked=true;
	$w('#studio').checked=true;
	$w('#penthouse').checked=true;
	$w('#commercieleRuimte').checked=true;
	$w('#bergruimte').checked=true;
	$w('#andere').checked=true;
	$w('#staanplaats').checked=true;
	$w('#garage').checked=true;
	$w('#grond').checked=true;
	filterToepassen();
}

/*
export function toonFilters_click(event) {
	$w('#Filters').show();
	$w('#Filters').expand();
	$w('#toonFilters').hide();
	$w('#toonFilters').collapse();
}

export function verbergFilters_click(event) {
	$w('#Filters').hide();
	$w('#Filters').collapse();
	$w('#toonFilters').show();
	$w('#toonFilters').expand();
}
*/

export function toonFotos_click(event) {
	//Add your code for this event here: 
}

export function toonBijlagen_click(event) {
	const data = $w("#vastgoedAanbod").data;
	console.log(event.context);
	wixWindow.openLightbox("vastgoed bijlagen", data.filter(item => item._id === event.context.itemId));
}

export function vastgoedPrijs_click(event) {
	//Add your code for this event here: 
}

export function button25_click(event) {
	//Add your code for this event here: 
}

export function tvinkUitTypes_click(event) {
	//Add your code for this event here: 
}

export function vinkUitTypes_click(event) {
	$w('#woning').checked=false;
	$w('#appartement').checked=false;
	$w('#studio').checked=false;
	$w('#penthouse').checked=false;
	$w('#commercieleRuimte').checked=false;
	$w('#bergruimte').checked=false;
	$w('#andere').checked=false;
	$w('#staanplaats').checked=false;
	$w('#garage').checked=false;
	$w('#grond').checked=false;
}

export function vinkUitStatussen_click(event) {
	$w('#teKoop').checked=false;
	$w('#teHuur').checked=false;
	$w('#toekomstigProject').checked=false; 
}