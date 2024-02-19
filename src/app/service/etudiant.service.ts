import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Student } from '../model/student.model';
import { Observable} from "rxjs";
import {Messages} from "../model/messages.model";

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

  saveStudent(student:Student):Observable<Messages >{
    return this.httpClient.post<Messages>(
      this.HOST,student
    );
  }


  deleteStudent(email: string):Observable<Messages> {
    return this.httpClient.delete<Messages>(
      `${this.HOST}/${email}`
    );
  }

  editStudent(email:string, student:Student):Observable<Student> {
    return this.httpClient.put<Student>(
      `${this.HOST}/${email}`,student
    );
  }

  /**
   * calculate difference between created date and date now
   * @param date
   */
  public calculateDiff(date: string): number {
    let currentDate: Date = new Date();
    let dateSent: Date = new Date(date);
    return Math.floor(
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())
      )
      / (1000 * 60 * 60 * 24));
  }
}
