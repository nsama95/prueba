import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from 'shared/models/categories';
import { CategoriesService } from 'shared/services/categories.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('query') query: ElementRef;
  categorie=[];
  categorieSubscription: Subscription;
  constructor( private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.categorieSubscription = this.categorieService.getAll().subscribe((p) => {
      this.categorie = p;
      console.log(JSON.stringify( this.categorie));

    });
  }

}
