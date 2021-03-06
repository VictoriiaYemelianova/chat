import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUser, IServerModel, IUserToken } from 'src/app/data-interface';
import { Observable, Subject } from 'rxjs';
import { url } from 'src/app/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUserToken: IUserToken;
  public subject: Subject<boolean> = new Subject<boolean>();


  constructor( private http: HttpClient ) {
    this.getItemLocalStorage('user');
  }

  getItemLocalStorage(keyUser) {
    const user = localStorage.getItem(keyUser);

    if (user) {
      this.currentUserToken = JSON.parse(user);
    }
  }

  logUser(user: IUser): Observable<IServerModel> {
    return this.http.post(`${url}/login`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.subject.next(true);
          this.currentUserToken = res.items[0] as IUserToken;
          localStorage.setItem('user', JSON.stringify(this.currentUserToken));
        }
        return res;
      })
    );
  }

  createUser(user: IUser): Observable<IServerModel> {
    return this.http.post(`${url}/register`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.currentUserToken = res.items[0] as IUserToken;
          localStorage.setItem('user', JSON.stringify(this.currentUserToken));
        }

        return res;
      })
    );
  }

  getUsers() {
    return this.http.get(`${url}/users`);
  }

  deleteUser(id) {
    return this.http.delete(`${url}/user-delete/${id}`);
  }

  logOut() {
    this.subject.next(false);
    localStorage.clear();
  }
}
