import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import config from '../config';


@Injectable({
  providedIn: 'root'
})
export class CustomPoService {
  private loginUrl = config.conexiom.auth.url;
  private username = config.conexiom.auth.username;
  private password = config.conexiom.auth.password;

  private uploadUrl = config.conexiom.upload.url;

  constructor(private http: HttpClient, private userProfile: UserProfileFacade) {}
  authenticateAndUpload(file: File): Observable<any> {
    return this.userProfile.get().pipe(
      switchMap(user => {
        const userEmail =  user?.uid ? user?.uid: '';
        const payload = {
          "Username": this.username,
          "Password": this.password
        };

        return this.http.post<any>(this.loginUrl, payload).pipe(
          switchMap(response => {
            const accessToken = response.AccessToken;
            return this.uploadPDF(file, userEmail, accessToken);
          })
        );
      })
    );
  }

  private uploadPDF(file: File, userEmail: string, accessToken: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('userId', userEmail);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<any>(this.uploadUrl, formData, { headers });
  }
}
