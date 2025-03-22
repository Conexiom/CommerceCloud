import {
  Component,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '@spartacus/core';

@Component({
  selector: 'app-custom-empty-cart',
  template: `
    <div class="custom-empty-cart-wrapper">
      <div class="custom-empty-cart-left"></div>
      <div class="custom-empty-cart-right" *ngIf="isLoggedIn">
        <cx-cart-totals></cx-cart-totals>
      </div>
    </div>
  `,
  styleUrls: ['./custom-empty-cart.component.scss'],
})
export class CustomEmptyCartComponent implements AfterViewInit {
  isLoggedIn = false;
  constructor(
    private elRef: ElementRef,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {
    this.authService.isUserLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        this.isLoggedIn = true;
      }
    });
  }

  ngAfterViewInit() {
    if (this.isLoggedIn) {
      const container = this.elRef.nativeElement.querySelector(
        '.custom-empty-cart-left'
      );
      const emptyCartParagraph = document.querySelector(
        '.EmptyCartMiddleContent cx-paragraph'
      );
      const emptyCartImport = document.querySelector(
        '.EmptyCartMiddleContent  cx-import-order-entries'
      );

      if (emptyCartParagraph && container) {
        container.append(...Array.from(emptyCartParagraph.children));
      }
      if (emptyCartImport && container) {
        container.append(...Array.from(emptyCartImport.children));
      }
    }
  }
}
