import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { CustomCartTotalsComponent } from './custom-cart-total.component';
import { CartSharedModule } from '@spartacus/cart/base/components';

@NgModule({
  imports: [CommonModule, CartSharedModule, SpinnerModule],
    providers: [provideConfig(<CmsConfig>{
      cmsComponents: {
        CartTotalsComponent: {
          component: CustomCartTotalsComponent,
        },
      },
    }),
  ],
  declarations: [CustomCartTotalsComponent],
  exports: [CustomCartTotalsComponent],
})
export class CustomCartTotalsModule {}
