import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { LaravelPassportService } from 'laravel-passport';
import { NavController } from '@ionic/angular';
import { ModuleService } from './../api/services/module.service';
import { Module } from './../api/models/module.model';
import { PopoverController, ModalController } from '@ionic/angular';
import { NotificationsComponent } from './../helpers/notifications/notifications.component';
import { SearchFilterPage } from './../helpers/search-filter/search-filter.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  modules: Module[] = [];
  name: string;
  isLoading = false;
  private modulesSub: Subscription;

  searchKey = '';
  constructor(private laravelPassport: LaravelPassportService,private modulesService: ModuleService, private navCtrl: NavController, private popoverCtrl: PopoverController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.isLoading = true;
    this.modulesService.getModules();
    this.modulesSub = this.modulesService.getModuleUpdateListener()
      .subscribe((moduleData: {modules: Module[], name: string}) => {
        this.isLoading = false;
        this.name = moduleData.name;
        this.modules = moduleData.modules;
      });
  }
  // ngOnInit() {
  //   this.isLoading = true;
  //   this.moduleServices.getModules()
  //     .subscribe(
  //       result => {
  //         this.modules = result.modules;
  //       },
  //       error => {
  //         console.log('error :', error);
  //       },
  //       () => {
  //         console.log('Completed');
  //       }
  //     )
  // }
  logout() {
    this.laravelPassport.logout();
    this.navCtrl.navigateRoot('/login');
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  ngOnDestroy() {
    this.modulesSub.unsubscribe();
  }

}
