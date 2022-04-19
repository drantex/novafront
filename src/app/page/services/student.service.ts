import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/student.model';
import { UtilityService } from '../../shared/utility/utility.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  getStudents(): Observable<any> {
    return this.utilityService.filterResponse(this.http.get('/Student/all'));
  }

  getStudent(id: number): Observable<any> {
    return this.utilityService.filterResponse(this.http.get(`/Student/${id}`));
  }

  saveStudent(student: StudentModel): Observable<any> {
    return this.utilityService.filterResponse(this.http.post('/Student', student));
  }

  updateStudent(student: StudentModel): Observable<any> {
    return this.utilityService.filterResponse(this.http.put(`/Student/${student.get('id')}`, student));
  }

  deleteStudent(id: number): Observable<any> {
    return this.utilityService.filterResponse(this.http.delete(`/Student/${id}`));
  }
}
