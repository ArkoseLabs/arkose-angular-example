import {
  Component,
  EventEmitter,
  NgZone,
  Output,
  Renderer2,
} from '@angular/core';
import { ArkoseScriptService } from 'src/app/services/arkose-script.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-arkose-modal',
  templateUrl: './arkose-modal.component.html',
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

  constructor(
    private renderer: Renderer2,
    private _arkoseScriptService: ArkoseScriptService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // This injects the Arkose script into the angular dom
    const scriptElement = this._arkoseScriptService.loadScript(
      this.renderer,
      environment.arkoseKey
    );

    // This will inject required html and css after the Arkose script is properly loaded
    scriptElement.onload = () => {
      console.log('Arkose API Script loaded');
      window.setupEnforcement = this.setupEnforcement.bind(this);
    };

    // If there is an error loading the Arkose script this callback will be called
    scriptElement.onerror = () => {
      console.log('Could not load the Arkose API Script!');
    };
  }
  // This is the function that will be called after the Arkose script has loaded
  setupEnforcement = (myEnforcementObject: any) => {
    window.myModalEnforcement = myEnforcementObject;
    window.myModalEnforcement.setConfig({
      mode: 'modal',
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
        this.zone.run(() => {
          this.onError.emit(response);
        });
      },
      onFailed: (response: any) => {
        this.zone.run(() => {
          this.onFailed.emit(response);
        });
      },
    });
  };
}
