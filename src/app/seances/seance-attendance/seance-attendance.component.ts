import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SeanceService } from './../../api/services/seance.service';
import { Student } from './../../api/models/student.model';

@Component({
  selector: 'app-seance-attendance',
  templateUrl: './seance-attendance.component.html',
  styleUrls: ['./seance-attendance.component.scss'],
})
export class SeanceAttendanceComponent implements OnInit, OnDestroy {
	private seanceId: string;
	students: Student[] = [];
	isLoading = false;

	absentStudentsArray = [];
	presentStudentsArray = [];

	private studentsSub: Subscription;

	constructor(
		public seanceService: SeanceService,
    	public route: ActivatedRoute
    ) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			this.seanceId = paramMap.get('seanceId');
		});
		this.seanceService.getStudents(this.seanceId);
		this.studentsSub = this.seanceService.getStudentsUpdateListener()
			.subscribe((studentsData: {students: Student[]}) => {
				this.isLoading = false;
		        this.students = studentsData.students;
	      });
	}

	//add student whose absent to the absentStudentsArray array
	markStudent(studentId, is_absent) {
		if(is_absent==true) {
			this.absentStudentsArray.push(studentId);

			var index = this.presentStudentsArray.indexOf(studentId);
			if (index > -1) {
			  this.presentStudentsArray.splice(index, 1);
			}
		}else if(is_absent==false) {
			var index = this.absentStudentsArray.indexOf(studentId);
			if (index > -1) {
			  this.absentStudentsArray.splice(index, 1);
			}

			this.presentStudentsArray.push(studentId);
		}
	}

	saveMarkedStudents() {
		this.seanceService.markAbsentStudents(this.seanceId, this.absentStudentsArray, this.presentStudentsArray);
	}

	ngOnDestroy() {
		this.studentsSub.unsubscribe();
	}

}
