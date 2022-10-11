import { Component, EventEmitter, NgZone, Output, Renderer2 } from '@angular/core';
import { ArkoseScriptService } from 'src/app/services/arkose-script.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-arkose-modal',
  templateUrl: './arkose-modal.component.html'
})
export class ModalArkoseComponent {
  @Output() onReady = new EventEmitter();
  @Output() onShown = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onSuppress = new EventEmitter();
  @Output() onCompleted = new EventEmitter();
  @Output() onReset = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onFailed = new EventEmitter();

  constructor(private renderer: Renderer2,
    private _arkoseScriptService: ArkoseScriptService,
    private zone: NgZone) { }

  ngOnInit(): void {
    //It inject arkose script into angular dom
    const scriptElement = this._arkoseScriptService.loadScript(
      this.renderer,
      environment.arkoseKey
    );

    //Script will inject required html css after script is properly loaded
    scriptElement.onload = () => {
      console.log('Arkose API Script loaded');
      window.setupEnforcement = this.setupEnforcement.bind(this);
    };

    //This is the callback which will throw error is script is not properly injected
    scriptElement.onerror = () => {
      console.log('Could not load the Arkose API Script!');
    };
  }
  // This is the function which will give result after puzzle is loaded
  setupEnforcement = (myEnforcementObject: any) => {
    window.myModalEnforcement = myEnforcementObject;
    window.myModalEnforcement.setConfig({
      // We need to pass id of the div where we want to inject the arkose ec
      selector: '#arkose-ec',
      mode: 'modal',
      onReady: () => {
        this.zone.run(() => {
          this.onReady.emit();
          // window.myModalEnforcement.run();
          console.log('onReady');
        });
      },
      onShown: () => {
        this.zone.run(() => {
          console.log('onShown');
          this.onShown.emit();
        });
      },
      onShow: () => {
        this.zone.run(() => {
          console.log('onShow');
          this.onShow.emit();
        });
      },
      onSuppress: () => {
        this.zone.run(() => {
          this.onSuppress.emit();
        });
      },
      onCompleted: (response: any) => {
        console.log('onComp');
        if (response.token) {
          this.zone.run(() => {
            this.onCompleted.emit(response.token);
          });
        }
      },
      onReset: () => {
        console.log('onReset');
        this.zone.run(() => {
          this.onReset.emit();
        });
      },
      onHide: () => {
        console.log('onHide');
        this.zone.run(() => {
          this.onHide.emit();
        });
      },
      onError: (response: any) => {
        console.log('onError');
        this.onError.emit(response);
      },
      onFailed: (response: any) => {
        console.log('onFailed');
        this.zone.run(() => {
          this.onFailed.emit(response);
        });
      },
    });
  };
}
