import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../student/student.interface';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private HOST:string = "http://localhost:3000/api/etudiants";
  students:Student[] = [];
  constructor(private httpClient:HttpClient) {

  }

  getAllStudent():Observable<Student[]>{
    return this.httpClient.get<Student[]>(
      this.HOST
    );
  }

  searchByEmail(email : string){
    return this.httpClient.get(
      `${this.HOST}/{email}`
    );
  }
}
