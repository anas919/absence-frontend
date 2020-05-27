import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { SeanceService } from './../../api/services/seance.service';
import { ModuleService } from './../../api/services/module.service';
import { Seance } from './../../api/models/seance.model';
import { Module } from './../../api/models/module.model';
import { ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seance-create',
  templateUrl: './seance-create.component.html',
  styleUrls: ['./seance-create.component.scss'],
})
export class SeanceCreateComponent implements OnInit, OnDestroy {
  private mode = 'create';
  private seanceId: number;
  seance: any;
  isLoading = false;
  form: FormGroup;
  modalTitle:string;
  modelId:number;

  modules: Module[] = [];
  private modulesSub: Subscription;
 
  constructor(
    public seanceService: SeanceService,
    public moduleService: ModuleService,
    private modalController: ModalController,
    private navParams: NavParams,
    private navCtrl: NavController
  ) { }
 
  ngOnInit() {
    this.modelId = this.navParams.data.seanceId;
    this.form = new FormGroup({
      module_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      date: new FormControl(new Date().toISOString())
    });
	if (this.modelId!= null) {
		this.mode = 'edit';
		this.seanceId = this.modelId;//paramMap.get('seanceId');
		this.isLoading = true;
		this.seanceService.getSeance(this.seanceId).subscribe(seanceData => {
			this.isLoading = false;
			this.seance = {
				id: seanceData.seance.id,
				date: seanceData.seance.date,
				module_id: seanceData.seance.module_id
			};
			this.form.setValue({
				module_id: this.seance.module_id,
				date: this.seance.date
			});
		});
	} else {
		this.mode = 'create';
		this.seanceId = null;
	}
    this.moduleService.getModules();//Dépanage
    this.modulesSub = this.moduleService.getModuleUpdateListener()
        .subscribe((moduleData: {modules: Module[]}) => {
    		this.modules = moduleData.modules;
        });
  }

  onSaveSeance() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
		this.seanceService.addSeance(
			this.form.value.date.slice(0, 19).replace('T', ' '),
			this.form.value.module_id
		);
    	this.closeModal();
    } else {
		this.seanceService.updateSeance(
			this.seanceId,
			this.form.value.date.slice(0, 19).replace('T', ' '),
			this.form.value.module_id
		);
		this.closeModal();
    }
    this.form.reset();
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
	//this.navCtrl.navigateRoot('/home');//Must redirect to séance details
  }

  ngOnDestroy() {
    this.modulesSub.unsubscribe();
  }
}
