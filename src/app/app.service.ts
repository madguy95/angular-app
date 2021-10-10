import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
export class Foo {
  constructor(
    public id: number,
    public name: string) { }
} 

@Injectable()
export class AppService {
   public clientId = 'client-web';
   public clientSecret = '274d8ffe-799d-4df4-bf01-d8dc15b24bd5';
   public redirectUri = 'http://localhost:8089/';
   public keycloak_host = 'http://192.168.0.123:31080';
   public keycloak_realm = 'SpringBootKeycloak';

  constructor(
    private _http: HttpClient){}

  retrieveToken(code){
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
     this._http.post(this.keycloak_host + '/auth/realms/' + this.keycloak_realm + '/protocol/openid-connect/token', params.toString(), { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }

  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    Cookie.set("id_token", token.id_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = this.redirectUri;
  }

  getResource(resourceUrl) : Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    return this._http.get(resourceUrl, { headers: headers })
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials(){
    return Cookie.check('access_token');
  } 

  logout() {
    let token = Cookie.get('id_token');
    Cookie.delete('access_token');
    Cookie.delete('id_token');
    let logoutURL = this.keycloak_host + '/auth/realms/' + this.keycloak_realm + "/protocol/openid-connect/logout?id_token_hint="
      + token
      + "&post_logout_redirect_uri=" + this.redirectUri;

    window.location.href = logoutURL;
  } 
}