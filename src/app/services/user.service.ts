import { Observable } from "rxjs/Rx";
import { AngularFireList } from "angularfire2/database/interfaces";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserService {
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.getUsers();
  }

  getUsers() {
    this.usersRef = this.db.list("users");

    this.users=this.usersRef.snapshotChanges().map(changes=>{
      return changes.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  addItem(user) {
    this.usersRef.push(user);
  }

  updateItem(key: string,user) {
    this.usersRef.update(key,user);
  }

  deleteItem(key: string) {    
    this.usersRef.remove(key); 
  }

  deleteEverything() {
    this.usersRef.remove();
  }
}
