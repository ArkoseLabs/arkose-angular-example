import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-arkose-modal',
  templateUrl: './login-with-modal-arkose.component.html'
})
export class LoginWithModalArkoseComponent implements OnInit {
  public arkoseToken: string | undefined;
  constructor(private _router: Router) {
    this.arkoseToken = undefined;
  }

  ngOnInit(): void { }

  onCompleted(token: string) {
    this.arkoseToken = token;
    this._router.navigate(['/dashboard']);
  }

  onError(errorMessage: any) {
    alert(errorMessage);
  }

  onSubmit() {
    if (!this.arkoseToken) {
      window.myModalEnforcement.run();
    }
  }
}
