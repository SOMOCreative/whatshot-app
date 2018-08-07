import { Injectable } from '@angular/core';

/*
  StringsProvider provider.

  Provides strings for interfaces.
*/
@Injectable()
export class StringsProvider {

  public strings = {
    "en" : {
      "loading" : {
        "blog": "Hold tight, we're getting you the very latest news and info...",
        "post": "Getting all the details...",
        "events": "Putting our fingers on the pulse...",
        "more": "Loading some more...",
        "map": "Contacting the Google..",
        "travel": "Curating a list of all the best bits...",
        "mynz": "Your wish-list is my command-list..."
      },
      "titles" : {
        "blog": "News & Info",
        "events": "Events",
        "map": "Map",
        "mynz": "My New Zealand",
        "travel": "Directory"
      }
    }
  };

  constructor() {
    console.log('Hello StringsProvider Provider');
  }

}
