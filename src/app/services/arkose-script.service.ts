import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
declare global {
  interface Window {
    setupEnforcement: any;
    myInlineEnforcement: any;
    myModalEnforcement: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class ArkoseScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Append the JS tag to the Document Body.
  public loadScript(renderer: Renderer2, publicKey: string): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://client-api.arkoselabs.com/v2/${publicKey}/api.js`;
    script.setAttribute('data-callback', 'setupEnforcement');
    script.async = true;
    script.defer = true;
    script.id = 'arkose-script';
    const currentScript = this.document.getElementById(script.id);
    if (currentScript) {
      currentScript.remove();
    }
    renderer.appendChild(this.document.body, script);
    return script;
  }
}
