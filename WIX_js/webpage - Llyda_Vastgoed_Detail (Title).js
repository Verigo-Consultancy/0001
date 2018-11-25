// For full API documentation, including code examples, visit http://wix.to/94BuAAs
import wixWindow from 'wix-window';
import {local} from 'wix-storage';
import wixLocation from 'wix-location';
import { toonAdres } from 'public/llyda.js';
import { toonPrijs } from 'public/llyda.js';

$w.onReady(function () {
	$w('#dynamicDataset').onReady(() => {
		let vastgoedItem = $w('#dynamicDataset').getCurrentItem();
		$w("#adres").text = toonAdres(vastgoedItem.adresStraat, vastgoedItem.adresPostcode, vastgoedItem.adresPlaats);
		$w("#text34").text = toonPrijs(vastgoedItem.prijs);
	});

  $w("#terugNaarLijst").disable();
  if (local.getItem('dynamicPageListURL')) {
    const dynamicPageListURL = local.getItem('dynamicPageListURL').split(',');
		console.log(dynamicPageListURL);

    $w("#terugNaarLijst").link = dynamicPageListURL[0];
    $w("#terugNaarLijst").enable();
  }
 
  $w("#vorige").disable();
  $w("#volgende").disable();
  if (local.getItem('dynamicPageItemsURLs')) {
    const dynamicPageItemsURLs = local.getItem('dynamicPageItemsURLs').split(',');
		console.log(dynamicPageItemsURLs);

    const currentPage = '/' + wixLocation.prefix + '/' + wixLocation.path.join('/');
		console.log(currentPage);

    const currentPageIndex = dynamicPageItemsURLs.indexOf(currentPage);
		console.log(currentPageIndex);

    if (currentPageIndex > 0) {
      $w("#vorige").link = dynamicPageItemsURLs[currentPageIndex - 1];
      $w("#vorige").enable();
    }

    if (currentPageIndex < dynamicPageItemsURLs.length - 1) {
      $w("#volgende").link = dynamicPageItemsURLs[currentPageIndex + 1];
      $w("#volgende").enable();
    }
  }
});

export function toonKaart(event) {
	$w('#dynamicDataset').setCurrentItemIndex(event.itemIndex)
    .then(() => {
      wixWindow.openLightbox('Toon kaart', 
        $w('#dynamicDataset').getCurrentItem());
    });
}