import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalArkoseComponent } from './arkose-modal/arkose-modal.component';
import { ArkoseInlineComponent } from './arkose-inline/arkose-inline.component';

@NgModule({
  declarations: [
    ModalArkoseComponent,
    ArkoseInlineComponent,
    ModalArkoseComponent,
  ],
  imports: [CommonModule],
  exports: [ModalArkoseComponent, ArkoseInlineComponent, ModalArkoseComponent],
})
export class SharedModule {}
