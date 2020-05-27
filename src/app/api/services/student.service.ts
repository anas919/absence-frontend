import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Student } from './../models/student.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
	private students: Student[] = [];
	private studentsUpdated = new Subject<{students: Student[]}>();

	constructor(private http: HttpClient, private router: Router) { }


	getStudents() {
	  const url = `http://localhost:8000/api/students/`;
	  let headers = new HttpHeaders({ 
	      'Content-Type': 'application/json',
	      'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
	  });
	  return this.http
	    .get<{students: any}>(url, { headers: headers }).pipe(map((studentData) => {
	    	console.log(studentData);
	      return { students: studentData.students.map(student => {
	        // return {
	        //   id: student.id,
	        //   name: student.user.name,
	        //   avatar: student.avatar,
	        //   is_absent: student.is_absent
	        // };
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
}
