import {HttpClient} from '@angular/common/http';
import {Injectable, InputSignal, WritableSignal} from '@angular/core';
import { Student } from '../model/student.model';
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

  getStudentById(id: any):Observable<Student>{
    return this.httpClient.get<Student>(
      `${this.HOST}/find-by/${id}`
    );
  }
  searchByEmail(email : string):Observable<Student>{
    return this.httpClient.get<Student>(
      `${this.HOST}/${email}`
    );
  }

  saveStudent(student:Student){
    return this.httpClient.post(
      this.HOST,student
    );
  }


}
