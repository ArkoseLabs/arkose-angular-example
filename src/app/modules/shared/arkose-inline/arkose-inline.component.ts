import { Component, EventEmitter, OnInit, Output, Renderer2, NgZone } from '@angular/core';
import { ArkoseScriptService } from 'src/app/services/arkose-script.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-arkose-inline',
  templateUrl: './arkose-inline.component.html'
})
export class ArkoseInlineComponent implements OnInit {
  @Output() onReady = new EventEmitter();
  @Output() onShown = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onSuppress = new EventEmitter();
  @Output() onCompleted = new EventEmitter();
  @Output() onReset = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onFailed = new EventEmitter();
  // This is the function which will give result after puzzle is loaded
  setupEnforcement = (myEnforcement: any) => {
    window.myInlineEnforcement = myEnforcement;
    window.myInlineEnforcement.setConfig({
      selector: '#arkose-ec',
      mode: 'inline',
      onReady: () => {
        this.zone.run(() => {
          this.onReady.emit();
        });
      },
      onShown: () => {
        this.zone.run(() => {
          this.onShown.emit();
        });
      },
      onShow: () => {
        this.zone.run(() => {
          this.onShow.emit();
        });
      },
      onSuppress: () => {
        this.zone.run(() => {
          this.onSuppress.emit();
        });
      },
      onCompleted: (response: any) => {
        if (response.token) {
          this.zone.run(() => {
            this.onCompleted.emit(response.token);
          });
        }
      },
      onReset: () => {
        this.zone.run(() => {
          this.onReset.emit();
        });
      },
      onHide: () => {
        this.zone.run(() => {
          this.onHide.emit();
        });
      },
      onError: (response: any) => {
        this.onError.emit(response);
      },
      onFailed: (response: any) => {
        this.zone.run(() => {
          this.onFailed.emit(response);
        });
      },
    });
  };

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
  constructor(private renderer: Renderer2,
    private _arkoseScriptService: ArkoseScriptService,
    private zone: NgZone) { }

}
