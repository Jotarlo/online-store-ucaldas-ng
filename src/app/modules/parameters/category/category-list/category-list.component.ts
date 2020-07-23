import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../../models/parameters/category.model';
import { CategoryService } from '../../../../services/parameters/category.service';

declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  recordList: CategoryModel[];
  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.fillRecords();
  }

  fillRecords() {
    this.service.getAllRecords().subscribe(
      data => {
        this.recordList = data;
        console.log(this.recordList);
      },
      error => {
        showMessage("There os an error with backend communication.");
      }
    );
  }

  RemoveConfirmation(){
    showRemoveConfirmationWindow();
  }

}
