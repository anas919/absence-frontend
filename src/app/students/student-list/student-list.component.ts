import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import { StudentService } from './../../api/services/student.service';
import { Student } from './../../api/models/student.model';
import { PageEvent } from '@angular/material';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
	students: Student[] = [];
	isLoading = false;
	private studentsSub: Subscription;

	dataReturned:any;
	constructor(
		public modalController: ModalController,
    	public studentService: StudentService
  	) { }

	ngOnInit() {
		this.isLoading = true;
		this.studentService.getStudents();
		this.studentsSub = this.studentService.getStudentsUpdateListener()
		  .subscribe((studentData: {students: Student[]}) => {
		    this.isLoading = false;
		    this.students = studentData.students;
		  });
	}

	ngOnDestroy() {
		this.studentsSub.unsubscribe();
	}

}
