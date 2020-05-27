import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Module } from './../models/module.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
	private modules: Module[] = [];
  	private modulesUpdated = new Subject<{modules: Module[], name: string}>();

 	constructor(private http: HttpClient) { }

	getModules() {
	    const url = `http://localhost:8000/api/modules`;
	    let headers = new HttpHeaders({ 
	        'Content-Type': 'application/json',
	        'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
	    });
	    return this.http
	    	.get<{modules: any, name: string}>(url, { headers: headers }).pipe(map((moduleData) => {
		        return { modules: moduleData.modules.map(module => {
					return {
						id: module.id,
						name: module.name,
						ref: module.ref,
						description: module.description,
						filiere_id: module.filiere_id,
						semestre_id: module.semestre_id,
						created_at: module.created_at,
						updated_at: module.updated_at
					};
		        }), name: moduleData.name};
		    }))
	      	.subscribe((transfomedModuleData) => {
	        	this.modules = transfomedModuleData.modules;
	        	this.modulesUpdated.next({
	        		modules: [...this.modules],
        			name: transfomedModuleData.name
	        	});
	      	});;
	}

	getModuleUpdateListener() {
    	return this.modulesUpdated.asObservable();
  	}
}
