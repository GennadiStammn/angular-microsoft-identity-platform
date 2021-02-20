import { RedirectRequest } from '@azure/msal-browser';
import { AuthenticationResult, PopupRequest, InteractionType } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'My Microsoft Login- Example';

  constructor(private authService: MsalService) {

  }

  isLoggedIn(): boolean {
    return this.authService.instance.getAllAccounts().length > 0
  }

  login() {
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  }

  logout() {
    this.authService.logout({postLogoutRedirectUri: "http://localhost:4200"});
  }
}
