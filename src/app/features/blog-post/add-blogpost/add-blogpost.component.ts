import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss'],
})
export class AddBlogpostComponent implements OnDestroy {
  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router
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
    };
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
