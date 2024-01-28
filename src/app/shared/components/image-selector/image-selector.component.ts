import { Component, OnDestroy } from '@angular/core';
import { ImageService } from './image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss',
})
export class ImageSelectorComponent implements OnDestroy {
  private file?: File;
  fileName: string = '';
  title: string = '';
  uploadImageSubscription?: Subscription;
  constructor(private imageService: ImageService) {}
  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }
  onFileUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      this.uploadImageSubscription = this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
