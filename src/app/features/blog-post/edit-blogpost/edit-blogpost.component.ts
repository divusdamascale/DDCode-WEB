import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss',
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  getBlogPostByIdSubscription?: Subscription;
  model?: BlogPost;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogpostService: BlogPostService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getBlogPostByIdSubscription = this.blogpostService
            .getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
              },
            });
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.getBlogPostByIdSubscription?.unsubscribe();
  }

  onFormSubmit(): void {}
}
