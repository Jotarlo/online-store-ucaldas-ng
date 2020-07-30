import { Component, OnInit } from '@angular/core';
import { FormsConfig } from 'src/app/config/forms-config';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BrandModel } from '../../../../models/parameters/brand.model';
import { BrandService } from '../../../../services/parameters/brand.service';

declare const closeAllModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  page: number = 1;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  recordList: BrandModel[];
  idToRemove: String = '';

  constructor(private service: BrandService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fillRecords();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
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

  RemoveConfirmation(id) {
    this.idToRemove = id;
    showRemoveConfirmationWindow();
  }

  RemoveRecord() {
    if (this.idToRemove) {
      this.service.DeleteRecord(this.idToRemove).subscribe(
        data => {
          this.idToRemove = '';
          this.fillRecords();
          closeAllModal('removeConfirmationModal');
        },
        error => {
          showMessage("There is an error with backend communication.");
        }
      );
    }
  }

}

