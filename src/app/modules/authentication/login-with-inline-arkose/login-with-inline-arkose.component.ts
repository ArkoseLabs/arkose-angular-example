import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-inline-arkose',
  templateUrl: './login-with-inline-arkose.component.html',
})
export class LoginWithInlineArkoseComponent implements OnInit {
  public showArkoseEC: boolean;
  constructor(private _router: Router) {
    this.showArkoseEC = false;
  }

  ngOnInit(): void {}

  onCompleted(token: string) {
    this._router.navigate(['/dashboard']);
  }

  onError(errorMessage: any) {
    alert(errorMessage);
  }
}
