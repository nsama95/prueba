import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Zonas } from 'shared/models/zonas';
import { ZonasService } from 'shared/services/zonas.service';

@Component({
  selector: 'app-admin-zonas',
  templateUrl: './admin-zonas.component.html',
  styleUrls: ['./admin-zonas.component.css']
})
export class AdminZonasComponent implements OnInit {

  @ViewChild('query') query: ElementRef;
  zonas=[];
  zonasSubscription: Subscription;
  constructor( private zonasService: ZonasService) { }

  ngOnInit(): void {
    this.zonasSubscription = this.zonasService.getAll().subscribe((p) => {
      this.zonas = p;
      console.log(JSON.stringify( this.zonas));
     
    });
  }

}
