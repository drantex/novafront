import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonType } from '../../page.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-person',
  templateUrl: './modal-person.component.html',
  styleUrls: ['./modal-person.component.scss']
})
export class ModalPersonComponent implements OnInit {

  icons: Array<IconDefinition> = [faTimesCircle];
  /**
   * [title]
   * @description Propiedad que se recibe del padre, mostrando el titulo sea de creación o edición
   */
   @Input() title: string = 'Agregar';

  /**
   * [title]
   * @description Propiedad que se recibe del padre, indicará la carga.
   */
   @Input() loading: boolean = false;

   /**
    * [isEdit]
    * @description Propiedad que se recibe del padre, indica si es edición o no.
    */
   @Input() isEdit: boolean = false;

   /**
    * [dataSuscription]
    * @description Esta propiedad tendrá valor solo cuando isEdit = true, su información será referente
    *             a la dta de usuario que se editará
    */
   @Input() dataPerson: PersonType | null = null;

   /**
    * [sendDataForm]
    * @description Output que se emitirá con la información de la data del estudiante o profesor al presionar guardar o editar.
    */
   @Output() public sendDataForm: EventEmitter<PersonType> = new EventEmitter<PersonType>();

   /**
    * [form]
    * @description Formulario reactivo sobre el que se manejará la información de la suscripción
    */
   public form: FormGroup = new FormGroup({
     id: new FormControl({ value: null, disabled: false }, []),
     name: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
     secondName: new FormControl({ value: '', disabled: false }, [ Validators.minLength(3), Validators.maxLength(50)]),
     lastName: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
     secondLastName: new FormControl({ value: '', disabled: false }, [ Validators.minLength(3), Validators.maxLength(30)]),
     documentNumber: new FormControl({ value: '', disabled: false }, [  Validators.required, Validators.minLength(3), Validators.maxLength(30)])
   });

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    if ( this.isEdit && this.dataPerson ) {
      this.form.setValue( { ...this.dataPerson } )
    }
  }

  /**
    * [onCancel]
    * @author Daniel Stiven Lenis Cardona
    * @date 07-04-2021
    * @description Metodo encargado de cerrar el modal
    * @returns null
    */
   onCancel(): void {
    this.activeModal.close();
  }

   /**
    * [onSaveSuscription]
    * @author Daniel Stiven Lenis Cardona
    * @date 07-04-2021
    * @description Metodo que se ejecutará cuando se presione click sobre el botón guardar o editar
    * @returns null
    */
    onSaveUser(): void {

      if (this.form.valid) {
        const dataForm = this.form.value;
        this.sendDataForm.emit( { ...dataForm  });
      }
    }

}
