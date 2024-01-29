import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogUrl?: string | null = null;
  urlParamsSubscription?: Subscription;
  blog$?: Observable<BlogPost>;
  constructor(
    private route: ActivatedRoute,
    private blogpostService: BlogPostService
  ) {}
  ngOnDestroy(): void {
    this.urlParamsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.urlParamsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.blogUrl = params.get('url');
      },
    });

    if (this.blogUrl) {
      this.blog$ = this.blogpostService.getBlogPostByUrl(this.blogUrl);
    }
  }
}
