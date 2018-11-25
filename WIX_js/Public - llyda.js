// Filename: public/llyda.js 
//
// Code written in public files is shared by your site's
// Backend, page code, and site code environments.
//
// Use public files to hold utility functions that can 
// be called from multiple locations in your site's code.

import wixData from 'wix-data';

export function toonAdres(straat, postcode, gemeente){
  let adres = " ";
  if (straat) {adres = adres.concat(straat);adres = adres.concat(", ");}
  if (postcode) {if (adres.length > 1) { adres = adres.concat(postcode);adres = adres.concat(" ");} else { adres = postcode + " ";}}
  if (gemeente) {if (adres.length > 1) {adres = adres.concat(gemeente);} else {adres = gemeente;}}
  return adres;
}

export function toonPrijs(prijs){
  let prijsString = " ";
  if (prijs > 0) {prijsString = Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' , minimumFractionDigits: 0 }).format(prijs);} else {prijsString = "Contacteer ons";}
  return prijsString;
}

export function loadRepeaterData() {
  wixData.query("Llyda_Vastgoed")
    //.include("lyda_Vastgoed_afbeeldingen")
    //.include("lyda_Vastgoed_bijlages")
    .find()
    .then( (results) => {
      let items = results.items;
      console.log(items);
      //let firstItem = items[0];
      //let firstRefProp = firstItem.referenceField.propertyName;
      let totalCount = results.totalCount;
      console.log(totalCount);
      //let pageSize = results.pageSize;
      //let currentPage = results.currentPage;
      //let totalPages = results.totalPages;
      //let hasNext = results.hasNext();
      //let hasPrev = results.hasPrev();
      //let length = results.length;
      let query = results.query;
      console.log(query);
      return items;
    } )
    .catch( (error) => {
      let errorMsg = error.message;
      let code = error.code;
      console.log(code + " - " + errorMsg);
      return code;
  });
}


// The following code demonstrates how to call the add
// function from your site's page code or site code.

/* 
import {add} from 'public/llyda.js'

$w.onReady(function () {	
    let sum = add(6,7);
    console.log(sum);
});
*/


//The following code demonstrates how to call the add 
//function in one of your site's backend files.

/* 
import {add} from 'public/llyda.js'

export function usingFunctionFromPublic(a, b) {
	return add(a,b);
}
*/