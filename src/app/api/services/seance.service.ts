import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Seance } from './../models/seance.model';
import { Student } from './../models/student.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
	private seances: Seance[] = [];
  private seancesUpdated = new Subject<{seances: Seance[]}>();

  private students: Student[] = [];
  private studentsUpdated = new Subject<{students: Student[]}>();

 	constructor(private http: HttpClient, private router: Router) { }

	getSeances() {
	    const url = `http://localhost:8000/api/seances`;
	    let headers = new HttpHeaders({ 
	        'Content-Type': 'application/json',
	        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
	    });
	    return this.http
	    	.get<{seances: any}>(url, { headers: headers }).pipe(map((seanceData) => {
		        return { seances: seanceData.seances.map(seance => {
					return {
						id: seance.id,
						date: seance.date,
						prof_id: seance.prof_id,
						module_id: seance.module_id,
						created_at: seance.created_at,
						updated_at: seance.updated_at,
						module: seance.module.name
					};
		        })};
		    }))
	      	.subscribe((transfomedSeanceData) => {
	        	this.seances = transfomedSeanceData.seances;
	        	this.seancesUpdated.next({
	        		seances: [...this.seances]
	        	});
	      	});
	}

	getSeanceUpdateListener() {
    return this.seancesUpdated.asObservable();
  }

  getSeance(id: number) {
  	const url = `http://localhost:8000/api/seances/fetch/` + id;
    let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
    });
    return this.http.get<{seance: any, modules: any}>(url, { headers: headers });
  }

  addSeance(date: string, module_id: string) {
    let seanceData: any;
    seanceData = {
      id: null,
      date: date,
      module_id: module_id,
    };
    const url = `http://localhost:8000/api/seances/add`;
    let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
    });
    this.http
      .post<{seanceData}>(url, seanceData, { headers: headers })
      .subscribe((responseData) => {
        this.router.navigate(['/seances']);
      });
  }

  updateSeance(id: number, date: string, module_id: string) {
    let seanceData: any;
  	seanceData = {
  	  id: id,
  	  date: date,
  	  module_id: module_id
  	};
    const url = 'http://localhost:8000/api/seances/edit/' + id;
    let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
    });
    this.http
      .post<{seanceData}>(url, seanceData, { headers: headers })
      .subscribe((responseData) => {
        this.router.navigate(['/seances']);
      });
  }

  deleteSeance(seanceId: string) {
    return this.http.delete('http://localhost:3000/api/seances/' + seanceId);
  }

  //select students of specific seance by filiere (Back-End)
  getStudents(seanceId: string) {
      const url = `http://localhost:8000/api/seances/students/` + seanceId;
      let headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
      });
      return this.http
        .get<{students: any}>(url, { headers: headers }).pipe(map((studentData) => {
          return { students: studentData.students.map(student => {
            return {
              id: student.id,
              name: student.user.name,
              avatar: student.avatar,
              is_absent: student.is_absent
            };
          })};
        }))
        .subscribe((transfomedStudentData) => {
          this.students = transfomedStudentData.students;
          this.studentsUpdated.next({
            students: [...this.students]
          });
        });
  }

  getStudentsUpdateListener() {
    return this.studentsUpdated.asObservable();
  }

  markAbsentStudents(seance_id: string, absentStudentIds = [], presentStudentIds = []) {
    let seanceData: any;
    seanceData = {
      seanceId: seance_id,
      absentStudentIds: absentStudentIds,
      presentStudentIds: presentStudentIds
    };
    const url = 'http://localhost:8000/api/seances/students/mark';
    let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
    });
    this.http
      .post<{seanceData}>(url, seanceData, { headers: headers })
      .subscribe((responseData) => {
        this.router.navigate(['/seances']);
      });
  }
}
