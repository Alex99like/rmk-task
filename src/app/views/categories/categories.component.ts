import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []

  selectedCategory: Category

  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTaskByCategory(category: Category) {
    this.selectedCategory = category
    this.dataHandler.fillTasksByCategory(category)
  }
}
