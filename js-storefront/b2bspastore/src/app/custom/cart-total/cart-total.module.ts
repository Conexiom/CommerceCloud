import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideConfig,
} from '@spartacus/core';
import {
  OutletPosition,
  provideOutlet,
  SpinnerModule,
} from '@spartacus/storefront';
import { CustomCartTotalsComponent } from './custom-cart-total.component';
import { CartSharedModule } from '@spartacus/cart/base/components';
import { CustomEmptyCartComponent } from './empty-cart/custom-empty-cart-wrapper.component';

@NgModule({
  imports: [CommonModule, CartSharedModule, SpinnerModule],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CartTotalsComponent: {
          component: CustomCartTotalsComponent,
        },
      },
    }),
    provideOutlet({
      id: 'EmptyCartMiddleContent',
      position: OutletPosition.AFTER,
      component: CustomEmptyCartComponent,
    }),
  ],
  declarations: [CustomCartTotalsComponent, CustomEmptyCartComponent],
  exports: [CustomCartTotalsComponent, CustomEmptyCartComponent],
})
export class CustomCartTotalsModule {}
