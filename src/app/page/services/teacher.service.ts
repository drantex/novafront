import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherModel } from '../models/teacher.model';
import { UtilityService } from '../../shared/utility/utility.service';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  getTeachers(): Observable<any> {
    return this.utilityService.filterResponse(this.http.get('/Teacher/all'));
  }

  getTeacher(id: number): Observable<any> {
    return this.utilityService.filterResponse(this.http.get(`/Teacher/${id}`));
  }

  saveTeacher(teacher: TeacherModel): Observable<any> {
    return this.utilityService.filterResponse(this.http.post('/Teacher', teacher));
  }

  updateTeacher(teacher: TeacherModel): Observable<any> {
    return this.utilityService.filterResponse(this.http.put(`/Teacher/${teacher.get('id')}`, teacher));
  }

  deleteTeacher(id: number): Observable<any> {
    return this.utilityService.filterResponse(this.http.delete(`/Teacher/${id}`));
  }
}
