import { Component } from '@angular/core';
import { StudentModel } from './models/student.model';
import { TeacherModel } from './models/teacher.model';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { faSyncAlt, faPlus, faCircleExclamation, faSearch, faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Response } from '../shared/interfaces/interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalPersonComponent } from './modal/modal-person/modal-person.component';
import { UtilityService } from '../shared/utility/utility.service';

export type PersonType = {
  id: number | null;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  documentNumber: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  icons: Array<IconDefinition> = [faCircleExclamation, faSearch, faSyncAlt, faPlus, faEdit, faTrashAlt];

  studens: Array<StudentModel> = [];
  teachers: Array<TeacherModel> = [];

  public loadStudent: boolean = false;
  public loadTeacher: boolean = false;

  public searchStudent = '';
  public searchTeacher = '';

  constructor(private teacherService: TeacherService,
    private studentService: StudentService,
    private modalService: NgbModal,
    private utilityService: UtilityService) {
    this.getStudents();
    this.getTeachers();
  }

  /**
   * [onClickSearch]
   * @description Metodo encargado de setear el valor del input del search.
   * @param isStudent [boolean] Indica si se usará para estudiante o profesor
   * @param text [string] texto del input.
   * @date 19-04-2022
   * @return void
   */
  onClickSearch(text: string, isStudent: boolean = true): void {
    if (isStudent) {
      this.searchStudent = text;
    } else {
      this.searchTeacher = text;
    }
  }

  /**
   * [onRefreshSearch]
   * @description Metodo encargado de obtener los estudiantes almacenados en h2.
   * @param isStudent [boolean] Indica si se usará para estudiante o profesor
   * @date 19-04-2022
   * @return void
   */
  onRefreshSearch(isStudent: boolean = true): void {

    if (isStudent) {
      this.searchStudent = '';
      this.getStudents();
    } else {
      this.searchTeacher = '';
      this.getTeachers()
    }
  }

  /**
   * [getStudentsFilter]
   * @description Metodo encargado de obtener los estudiantes de acuerdo al filtro realizado
   * @date 19-04-2022
   * @return Array<StudentModel>
   */
  getStudentsFilter(): Array<StudentModel> {
    return this.searchStudent == '' ? this.studens :
      this.studens.filter((studentRecord: StudentModel) => studentRecord.get('documentNumber').includes(this.searchStudent));
  }

  /**
   * [onRefreshSearch]
   * @description Metodo encargado de obtener los profesores de acuerdo al filtro realizado
   * @date 19-04-2022
   * @return void
   */
  getTeachersFilter(): Array<TeacherModel> {
    return this.searchTeacher == '' ? this.teachers :
      this.teachers.filter((teacherRecord: TeacherModel) => teacherRecord.get('documentNumber').includes(this.searchTeacher));
  }

  /**
   * [getStudents]
   * @description Metodo encargado de obtener los estudiantes almacenados en h2.
   * @date 19-04-2022
   * @return void
   */
  private getStudents(): void {
    this.loadStudent = true;
    this.studentService.getStudents().subscribe((response: Response) => {
      if (response.resultStatus === 'OK') {
        this.studens = response.object.map((record: any) => new StudentModel(record));
      }
      this.loadStudent = false;
    });
  }

  /**
   * [invokeModalDialog]
   * @description Metodo encargado de crear la instancia del modal
   * @date 19-04-2022
   * @return void
   */
  private invokeModalDialog(isEdit: boolean = true, isStudent = true): NgbModalRef {
    const modalRef = this.modalService.open(ModalPersonComponent, {
      backdrop: 'static',
      centered: true,
      container: 'app-page'
    });

    let title = '';
    if ( isStudent ) {
      title =  isEdit ? 'Editar estudiante' : 'Crear estudiante';
    } else {
      title =  isEdit ? 'Editar profesor' : 'Crear profesor';
    }

    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.title = title;

    return modalRef;
  }

  /**
   * [onNewStudent]
   * @description Metodo encargado de invocar el dialogo donde
   *              se gestionará los datos del estudiante
   * @date 19-04-2022
   * @return void
   */
  onNewStudent(): void {
    const modalRef = this.invokeModalDialog(false);
    modalRef.componentInstance.sendDataForm.subscribe(async (dataForm: PersonType) => {

      const isConfirm: boolean = await this.utilityService.confirmMessage(
        'Atención',
        '¿Creará un estudiante, desea continuar?'
      );

      if (isConfirm) {
        this.loadStudent = true;
        this.saveOrEditStudent(dataForm, modalRef);
      }
    });
  }

  private saveOrEditStudent(dataForm: PersonType, modalRef: NgbModalRef, isSave: boolean = true): void {
    const student = new StudentModel(dataForm);
    const observable = isSave ? this.studentService.saveStudent(student) : this.studentService.updateStudent(student);
    observable.subscribe((response: Response) => {
      if (response.resultStatus === 'OK') {
        modalRef.close()
        this.utilityService.showAngularNotification({type: 'success', message: 'Proceso realizado exitosamente!'});
        this.getStudents();
      } else {
        this.loadStudent = false;
        this.utilityService.showAngularNotification({type: 'error', message: 'Ocurrio un error inesperado.'});

      }
    });
  }

  /**
   * [onEditStudent]
   * @description Metodo encargado de invocar el dialogo donde
   *              se editará los datos del estudiante.
   * @date 19-04-2022
   * @return void
   */
  onEditStudent(student: StudentModel): void {
    const modalRef = this.invokeModalDialog();
    modalRef.componentInstance.dataPerson = student.getData() as PersonType;
    modalRef.componentInstance.sendDataForm.subscribe(async (dataForm: PersonType) => {

      const isConfirm: boolean = await this.utilityService.confirmMessage(
        'Atención',
        '¿Editará un estudiante, desea continuar?'
      );

      if (isConfirm) {
        this.saveOrEditStudent(dataForm, modalRef, false);
      }
    });
  }

  /**
   * [deleteStudent]
   * @description Solicita permiso para eliminar el estudiante.
   * @date 19-04-2022
   * @return void
   */
  async deleteStudent(student: StudentModel): Promise<void> {
    const isConfirm: boolean = await this.utilityService.confirmMessage(
      'Atención',
      '¿Eliminará un estudiante, desea continuar?'
    );
    if (isConfirm) {
      this.loadStudent = true;
      this.studentService.deleteStudent(student.get('id')).subscribe((response: Response) => {
        if (response.resultStatus === 'OK') {
          this.utilityService.showAngularNotification({type: 'success', message: 'Proceso realizado exitosamente!'});
          this.getStudents();
        } else {
          this.utilityService.showAngularNotification({type: 'error', message: 'Ocurrio un error inesperado.'});
          this.loadStudent = false;
        }

      });
    }
  }

  /**
   * [getTeachers]
   * @description Metodo encargado de obtener los estudiantes almacenados en h2.
   * @date 19-04-2022
   * @return void
   */
  private getTeachers(): void {
    this.loadTeacher = true;
    this.teacherService.getTeachers().subscribe((response: any) => {
      if (response.resultStatus === 'OK') {
        this.teachers = response.object.map((record: any) => new TeacherModel(record));
      }
      this.loadTeacher = false;
    });
  }

  /**
     * [onNewStudent]
     * @description Metodo encargado de invocar el dialogo donde
     *              se gestionará los datos del estudiante
     * @date 19-04-2022
     * @return void
     */
  onNewTeacher(): void {
    const modalRef = this.invokeModalDialog(false, false);
    modalRef.componentInstance.sendDataForm.subscribe(async (dataForm: PersonType) => {

      const isConfirm: boolean = await this.utilityService.confirmMessage(
        'Atención',
        '¿Creará un profesor, desea continuar?'
      );

      if (isConfirm) {
        this.loadTeacher = true;
        this.saveOrEditTeachers(dataForm, modalRef);
      }
    });
  }

  private saveOrEditTeachers(dataForm: PersonType, modalRef: NgbModalRef, isSave: boolean = true): void {
    const teacher = new TeacherModel(dataForm);
    const observable = isSave ? this.teacherService.saveTeacher(teacher) : this.teacherService.updateTeacher(teacher);
    observable.subscribe((response: Response) => {
      if (response.resultStatus === 'OK') {
        modalRef.close()
        this.utilityService.showAngularNotification({type: 'success', message: 'Proceso realizado exitosamente!'});
        this.getTeachers();
      } else {
        this.loadTeacher = false;
        this.utilityService.showAngularNotification({type: 'error', message: 'Ocurrio un error inesperado.'});
      }
    });
  }

  /**
   * [onEditStudent]
   * @description Metodo encargado de invocar el dialogo donde
   *              se editará los datos del estudiante.
   * @date 19-04-2022
   * @return void
   */
  onEditTeacher(teacher: TeacherModel): void {
    const modalRef = this.invokeModalDialog(true, false);
    modalRef.componentInstance.dataPerson = teacher.getData() as PersonType;
    modalRef.componentInstance.sendDataForm.subscribe(async (dataForm: PersonType) => {

      const isConfirm: boolean = await this.utilityService.confirmMessage(
        'Atención',
        '¿Editará un profesor, desea continuar?'
      );

      if (isConfirm) {
        this.saveOrEditTeachers(dataForm, modalRef, false);
      }
    });
  }

  /**
   * [deleteStudent]
   * @description Solicita permiso para eliminar el estudiante.
   * @date 19-04-2022
   * @return void
   */
  async deleteTeacher(teacher: TeacherModel): Promise<void> {
    const isConfirm: boolean = await this.utilityService.confirmMessage(
      'Atención',
      '¿Eliminará un profesor, desea continuar?'
    );
    if (isConfirm) {
      this.loadTeacher = true;
      this.teacherService.deleteTeacher(teacher.get('id')).subscribe((response: Response) => {
        if (response.resultStatus === 'OK') {
          this.utilityService.showAngularNotification({type: 'success', message: 'Proceso realizado exitosamente!'});
          this.getTeachers();
        } else {
          this.loadTeacher = false;
          this.utilityService.showAngularNotification({type: 'error', message: 'Ocurrio un error inesperado.'});
        }

      });
    }
  }

}
