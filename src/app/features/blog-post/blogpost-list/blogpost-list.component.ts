import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss'],
})
export class BlogpostListComponent implements OnInit {
  blogpost$?: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogpost$ = this.blogPostService.getBlogPosts() as Observable<
      BlogPost[]
    >;
  }
}
