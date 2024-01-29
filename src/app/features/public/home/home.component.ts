import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  blogposts$?: Observable<BlogPost[]>;
  constructor(private blogpostService: BlogPostService) {}
  ngOnInit(): void {
    this.blogposts$ = this.blogpostService.getBlogPosts();
  }
}
