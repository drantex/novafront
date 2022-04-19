import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-data-found',
  templateUrl: './not-data-found.component.html',
  styleUrls: ['./not-data-found.component.scss']
})
export class NotDataFoundComponent {

  /**
   * [page]
   * @description Pagina actual del componente
   */
  @Input() info = 'No existen registros';
}
