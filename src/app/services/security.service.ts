import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { ServiceConfig } from '../config/service-config';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<UserModel>(new UserModel);

  constructor(
    private http: HttpClient
  ) {
    this.verifyCurrentSession();
  }


  verifyCurrentSession() {
    let currentSession = this.getSessionData();
    if (currentSession) {
      this.setUserData(JSON.parse(currentSession));
    }
  }

  /**
   * Method to update user data
   * @param user user data 
   */
  setUserData(user: UserModel) {
    this.userData.next(user);
  }

  /**
   * get user data status
   */
  getUserData() {
    return this.userData.asObservable();
  }

  /**
   * Method to call customer POST in backend
   * @param customer customer data to save
   */
  CustomerLogin(user: UserModel): Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}login`, user, {
      headers: new HttpHeaders({})
    });
  }

  /**
   * save session data
   * @param sessionData user data and token
   */
  saveSessionData(sessionData: any): Boolean {
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      return false;
    } else {
      let data: UserModel = {
        id: sessionData.data.id,
        customerId: sessionData.data.customerId,
        username: sessionData.data.username,
        role: sessionData.data.role,
        token: sessionData.token,
        isLogged: true
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true;
    }
  }

  /**
   * Return the current session data
   */
  getSessionData() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  /**
   * Clear session data
   */
  logout() {
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }

}
