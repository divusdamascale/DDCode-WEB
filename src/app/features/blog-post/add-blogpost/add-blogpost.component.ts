import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss'],
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor() {
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
  onFormSubmit() {
    console.log(this.model);
  }
}
