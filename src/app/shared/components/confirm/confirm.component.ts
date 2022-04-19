import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDefinition, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit{

  icons: Array<IconDefinition> = [faTimesCircle];
  /**
   * [title]
   * @description titulo que aparecerá en el modal
   */
  @Input() public title = '';

  /**
   * [iconTitle]
   * @description Icono del titulo, por defecto se enviará simbolo de exclamación
   */
  @Input() public iconTitle = '';

  /**
   * [content]
   * @description Texto del contenido principal
   */
  @Input() public content = '';

  /**
   * [acceptBtn]
   * @description Texto q se visualizará en el botón de aceptar
   */
  @Input() public acceptBtn = '';

  /**
   * [name]
   * @description Texto q se visualizará en el botón de Cancelar
   */
  @Input() public cancelBtn = '';

  /**
   * [isValidateButtonCancelAndAccept]
   * @description validacion para confirmacion de mensaje simple
   *              y no mostrar botones cancelar y aceptar del
   *              que se enviara del utility service
   */
  @Input() isValidateButtonCancelAndAccept = false;

  /**
   * [name]
   * @description evento que será emitido en caso de cancelar la confirmación
   */
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();

  /**
   * [name]
   * @description evento que será emitido en caso de aceptar la confirmación
   */
   @Output() public onAccept: EventEmitter<any> = new EventEmitter();

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  /**
   * [ngOnInit]
   * @author Kevin Johan Hernandez
   * @date 25-03-2021
   * @description Metodo ejecutado por el ciclo de vida de angular al momento de renderizar el componente en el DOM.
   * @returns null
   */
  ngOnInit(): void {
    if ( this.isValidateButtonCancelAndAccept ) {
      this.onAccept.emit();
    }
  }

  /**
   * [closeModal]
   * @author Stiven Lenis Cardona
   * @date 11-03-2021
   * @description Metodo encargado de cerrar el modal
   * @returns null
   */
  closeModal(): void {
    this.activeModal.close();
    this.onCancel.emit();
  }
}
