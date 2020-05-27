import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import { SeanceService } from './../../api/services/seance.service';
import { Seance } from './../../api/models/seance.model';
import { PageEvent } from '@angular/material';
import { ModalController } from '@ionic/angular';
import { SeanceCreateComponent } from '../seance-create/seance-create.component';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss'],
})
export class SeanceListComponent implements OnInit {
  seances: Seance[] = [];
  isLoading = false;
  private seancesSub: Subscription;

  dataReturned:any;
  
  constructor(
    public modalController: ModalController,
    public seanceService: SeanceService
  ) { }
 
  async createSeance() {
    const modal = await this.modalController.create({
      component: SeanceCreateComponent,
      cssClass: 'large-popup',//In variables.scss
      componentProps: {}
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.ngOnInit();
      }
    });
 
    return await modal.present();
  }

  async updateSeance(seanceId) {
    const modal = await this.modalController.create({
      component: SeanceCreateComponent,
      cssClass: 'large-popup',//In variables.scss
      componentProps: {
        "seanceId": seanceId
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.ngOnInit();
      }
    });
 
    return await modal.present();
  }
  ngOnInit() {
    this.isLoading = true;
    this.seanceService.getSeances();
    this.seancesSub = this.seanceService.getSeanceUpdateListener()
      .subscribe((seanceData: {seances: Seance[]}) => {
        this.isLoading = false;
        this.seances = seanceData.seances;
      });
  }

  ngOnDestroy() {
    this.seancesSub.unsubscribe();
  }

}
