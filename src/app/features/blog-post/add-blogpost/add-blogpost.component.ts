import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss'],
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoriesService: CategoryService
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
  }
  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }
  onFormSubmit() {
    this.addBlogPostSubscription = this.blogPostService
      .createBlogPost(this.model)
      .subscribe((response) => {
        this.router.navigateByUrl('/admin/blogposts');
      });
  }
}
