import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartTotalsComponent } from '@spartacus/cart/base/components';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomPoService } from '../service/custom-po.service';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  styleUrl: 'cart-totals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCartTotalsComponent extends CartTotalsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  isLoading = new BehaviorSubject<boolean>(false);
  selectedFile: File | null = null;
  uploadMessage: string = '';

  constructor(protected override activeCartService: ActiveCartFacade,private customPoService: CustomPoService) {
    super(activeCartService)
  }

  override ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.isLoading.next(true);
      this.customPoService.authenticateAndUpload(this.selectedFile).subscribe(
        () => {
          this.uploadMessage = 'File uploaded successfully!';
          this.selectedFile = null;
          this.fileInput.nativeElement.value = '';
          this.isLoading.next(false);
        },
        (error) => {
          this.uploadMessage = 'Upload failed. Please try again.';
          this.fileInput.nativeElement.value = '';
          this.isLoading.next(false);
        }
      );
    } else {
      this.uploadMessage = 'Please select a file first.';
    }
  }
}
