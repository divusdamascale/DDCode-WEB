import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubsctibtion?: Subscription;
  categoryByIdSubsctibtion?: Subscription;
  category?: Category;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  ngOnDestroy(): void {
    this.paramsSubsctibtion?.unsubscribe();
    this.categoryByIdSubsctibtion?.unsubscribe();
  }
  ngOnInit(): void {
    this.paramsSubsctibtion = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryByIdSubsctibtion = this.categoryService
            .getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              },
            });
        }
      },
    });
  }
  onFormSubmit(): void {
    console.log(this.category);
  }
}
