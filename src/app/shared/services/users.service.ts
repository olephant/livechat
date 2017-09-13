import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  // user add when user logs - initialised from chat-room
  userDetails = new Subject<User>();

  user: FirebaseObjectObservable<User> = null;
  users: FirebaseListObservable<User[]> = null;

  constructor(
    private db: AngularFireDatabase,
    private router: Router) { }

    updateProfile(key: string, username: string, image: string) {
      username = username.toLowerCase();
      const path = `users/${key}`;
      const usernameData = {};
      usernameData[username] = key;
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef
        .child(`profile/${key}`)
        .putString(image, 'base64', {contentType: 'image/png'})
        .then(
          (snapshot) => {
            const updates = {
            name : username.toLowerCase(),
            avatar : snapshot.downloadURL
          };

          this.db.object(path).update(updates)
            .catch(error => console.log(error));
          this.db.object(`usernames/`).update(usernameData)
            .then( () => this.router.navigate(['/chat']))
            .catch(error => console.log(error));
          });
    } // updateProfile

    checkUsername(username: string) {
      username = username.toLowerCase();
      return this.db.object(`usernames/${username}`);
    }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getAllUsers(query = {}): FirebaseListObservable<User[]> {
    this.users = this.db.list('users/', {
      query: query
    });
    return this.users;
  }

  getUser(key: string): FirebaseObjectObservable<User> {
    this.user = this.db.object(`users/${key}`);
    return this.user;
  }

}


