import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss'],
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  selectedIMageSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoriesService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      content: '',
      author: '',
      featuredImageUrl: '',
      isVisible: true,
      publishedDate: new Date(),
      shortDescription: '',
      urlHandle: '',
      categories: [],
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
    this.selectedIMageSubscription = this.imageService
      .onSelectImage()
      .subscribe({
        next: (response) => {
          this.model.featuredImageUrl = response.url;
          this.isImageSelectorVisible = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.selectedIMageSubscription?.unsubscribe();
  }
  onFormSubmit() {
    this.addBlogPostSubscription = this.blogPostService
      .createBlogPost(this.model)
      .subscribe((response) => {
        this.router.navigateByUrl('/admin/blogposts');
      });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
