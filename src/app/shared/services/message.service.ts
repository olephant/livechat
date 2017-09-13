import { Subject } from 'rxjs/Rx';
import { Message } from './../models/message';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  // let components know when new message is created
  // will allow us to set scroll height
  newMessage = new Subject<any>();

  items: FirebaseListObservable<Message[]> = null;
  item: FirebaseObjectObservable<Message> = null;

  constructor(
    private ngDb: AngularFireDatabase
  ) { }

  createItem(item: Message): void {
    this.items.push(item)
      .then(() => this.newMessage.next('new message'))
      .catch(error => console.log(error.message, 'creating message'));
  }

}
