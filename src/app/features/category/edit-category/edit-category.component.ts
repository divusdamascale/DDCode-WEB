import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubsctibtion?: Subscription;
  categoryByIdSubsctibtion?: Subscription;
  updateCategorySubsctibtion?: Subscription;
  deleteCategorySubsctibtion?: Subscription;
  category?: Category;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.paramsSubsctibtion?.unsubscribe();
    this.categoryByIdSubsctibtion?.unsubscribe();
    this.updateCategorySubsctibtion?.unsubscribe();
    this.deleteCategorySubsctibtion?.unsubscribe();
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
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    if (this.id) {
      this.updateCategorySubsctibtion = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  onDelete(): void {
    if (this.id) {
      this.deleteCategorySubsctibtion = this.categoryService
        .deleteCategory(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
