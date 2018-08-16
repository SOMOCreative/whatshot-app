import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Configuration and Utilities provider.

  Provides strings and utility functions.

*/
@Injectable()
export class ConfigProvider {

  constructor(
    private callNumber: CallNumber,
    private inAppBrowser: InAppBrowser
  ) {
    console.log('Hello ConfigProvider Provider');
  }

  public strings = {
    "en" : {
      "loading" : {
        "blog": "Hold tight, we're getting you the very latest news and info...",
        "post": "Getting all the details...",
        "events": "Putting your fingers on the pulse...",
        "more": "Loading some more...",
        "map": "Fetching location data...",
        "travel": "Curating a list of all the best bits...",
        "mynz": "Loading your Kiwi wish-list...",
        "refresh": "Freshening up...",
        "pulltorefresh": "Pull to refresh"
      },
      "titles" : {
        "blog": "News & Info",
        "events": "Events",
        "map": "Map",
        "mynz": "My New Zealand",
        "travel": "Directory"
      }
    },
    "config" : {
      "spinner": "crescent",
      "favourite": "heart",
      "favouriteAdded": "heart"
    }
  };

  public Palette = {
    food: {
      colour: '#dc443a',
      tint: '#b7382e'
    },
    user: {
      colour: '#46515a',
      tint: '#343e46'
    }
  };

  public Map = {
    mapStyle: [
      { "elementType": "geometry", "stylers": [{ "color": "#efefeb" }] },
      { "elementType": "labels.icon", "stylers": [{ "visibility": "simplified" }] },
      { "elementType": "labels.text.fill", "stylers": [{ "color": "#3c3c3c" }] },
      { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
      { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
      { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
      { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
      { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dce6dc" }] },
      { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
      { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
      { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
      { "featureType": "road.highway", "elementType": "geometry", "stylers": [{  "color": "#dadada" }] },
      { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{  "color": "#616161" }] },
      { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{  "color": "#9e9e9e" }] },
      { "featureType": "transit.line", "elementType": "geometry", "stylers": [{  "color": "#e5e5e5" }] },
      { "featureType": "transit.station", "elementType": "geometry", "stylers": [{  "color": "#eeeeee" }] },
      { "featureType": "water", "elementType": "geometry", "stylers": [{  "color": "#b4b4c8" }] },
      { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{  "color": "#9e9e9e" }] }
    ],
    myPin: {
			path: 'M11 11l1.256 5 3.744-10-10 3.75 5 1.25zm1-11c-5.522 0-10 4.395-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.42-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8 8 3.582 8 8-3.581 8-8 8z',
			scale: 1.75,
			fillColor: this.Palette.user.colour,
			fillOpacity: 0.9,
			strokeColor: '#111111',
			strokeWeight: 1,
			strokeOpacity: 0.25,
			anchor: {x: 12, y: 24}
    },
    directoryPin: {
      path: 'M1.628,10.176c0,3.77,2.491,6.506,5.232,8.78v0.006c3.725,3.216,3.451,3.244,5.004,5.038	c0,0,1.486-2.199,5.255-5.038c0.012,0,0-0.006,0.012-0.006c2.73-2.273,5.221-5.01,5.221-8.78c0-5.575-4.57-10.083-10.236-10.162 C12.081,0.014,12.047,0,12.012,0H11.99h-0.011c-0.035,0-0.069,0.015-0.115,0.015C6.198,0.094,1.628,4.601,1.628,10.176',
      scale: 1,
      fillColor: '#dc443a',
      fillOpacity: 0.9,
      strokeColor: '#111111',
      strokeWeight: 1,
      strokeOpacity: 0.25,
      anchor: {x: 12, y: 24}
    }
  };

  
  
  /*

    Utility Functions

  */

  public createInfoWindow(post): string {
    // Build info window HTML.
    let html = ``;
      // Main image, title & meta title.
      html += post.acf.normal_image ? `<img src="${post.acf.normal_image.sizes.app}" />` : ``;
      html += `<h3>${post.title.rendered}</h3>`;
      html += post.acf.listing_type ? `<p class="meta-title">${post.acf.listing_type}</p>` : ``;
      // Contact details.
      html += "<table>";
      html += `<tr><td><h6>Address:</h6></td><td><p>${post.acf.map_pins[0].pin_address.address}</p></td></tr>`;
      html += post.acf.business_freephone ? `<tr><td><h6>Free Phone:</h6></td><td><p>${post.acf.business_freephone}</p></td></tr>` : ``;
      html += post.acf.business_phone ? `<tr><td><h6>Phone:</h6></td><td><p>${post.acf.business_phone}</p></td></tr>` : ``;
      html += post.acf.business_url ? `<tr><td><h6>Website:</h6></td><td><p>${post.acf.business_url}</p></td></tr>` : ``;
      html += post.acf.business_email ? `<tr><td><h6>Email:</h6></td><td><p>${post.acf.business_email}</p></td></tr>` : ``;
      html += "</table>";
    return html;
  }

  public clickToCall(number){
    console.log("-- CLICK TO CALL: ", number)
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  public openURL(url){
    console.log("-- OPEN URL: ", url);
    this.inAppBrowser.create(url, "_blank");
  }

  public excerpt(str, maxLength, append){
    if (str.length <= maxLength) return str;
    return str.substr(0, str.lastIndexOf(" ", maxLength)) + append;
  }

  public stripTags(str){
    return str.replace(/(<([^>]+)>)/ig,"");
  }
}
