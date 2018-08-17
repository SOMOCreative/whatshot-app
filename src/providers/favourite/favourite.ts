import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Favourite Provider.

*/
@Injectable()
export class FavouriteProvider {

  private STORAGE_KEY: string = 'favourites';
  private TAG: string = "-- STORAGE: ";

  constructor(
    public storage: Storage
  ) {
    console.log('Hello FavouriteProvider Provider');
  }

  public isFavourite(post) {
    // Get all favourites.
    return this.getAllFavourites().then(result => {
      // Do we have any favourites?
      if(result === null) return false;
      // Yes we do, test objects in array for post.id and return true:false.
      return result.filter(item => {return item.id === post.id}).length > 0;
    });
  }

  public addFavourite(post){
    console.log(this.TAG, 'Add favourite.', post);
    // Get all favourites.
    return this.getAllFavourites().then(result => {
      // Do we have any favourites?
      if(result) {
        // Yes we do, push another favourite onto the pile.
        result.push(post);
        // Set favourites in storage.
        return this.storage.set(this.STORAGE_KEY, result);
      } else {
        // No favourites/no array, store a new array of 1 favourite.
        return this.storage.set(this.STORAGE_KEY, [post]);
      }
    });
  }

  public removeFavourite(post) {
    console.log(this.TAG, 'Remove favourite.');
    // Get all favourites.
    return this.getAllFavourites().then(result => {
      // Do we have any favourites? We should if this is being called!
      if(result) {
        // Get the index of the favourite to be removed.
        let index = result.findIndex(item => {return item.id === post.id});
        // Cut it out!
        result.splice(index, 1);
        // Store the newly adjusted favourites array.
        return this.storage.set(this.STORAGE_KEY, result);
      }
    });
  }

  public getAllFavourites() { 
    // Get all the favourites.
    return this.storage.get(this.STORAGE_KEY);
  }

  public clearAll() {
    // Kill all favourites.
    this.storage.set(this.STORAGE_KEY, null);
  }
}