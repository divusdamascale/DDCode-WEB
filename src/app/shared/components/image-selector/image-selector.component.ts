import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss',
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  private file?: File;
  fileName: string = '';
  title: string = '';
  uploadImageSubscription?: Subscription;
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImages();
  }
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
          this.imageUploadForm?.resetForm();
          this.getImages();
        });
    }
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages(): void {
    this.images$ = this.imageService.getImages();
  }
}
