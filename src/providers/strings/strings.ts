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
        "blog": "Hold tight, we're getting you the very latest news and info..."
      }
    }
  };

  constructor() {
    console.log('Hello StringsProvider Provider');
  }

}
