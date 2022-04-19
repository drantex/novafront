import { Injectable } from '@angular/core';
import { NotificationsService, Notification } from 'angular2-notifications';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as interfaces from '../interfaces/interfaces';
import { map, catchError } from 'rxjs/operators';
import { Response } from '../interfaces/interfaces';
import { ConfirmComponent } from '../components/confirm/confirm.component';

/**
 * @className UtilityService
 * @author Stiven Lenis Cardona
 * @date 02-01-2021
 * @description este servicio se utilizará para todas las
 *              funcionalidades adicionales requeridas por la aplicación
 *              tales como son las notificaciones, encriptar y desencriptar,
 *              obtener los headers para las peticiones http entre otras
 *              muchas que puedan surgir a lo largo del proyecto.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor( private notificationService: NotificationsService,
               private modalService: NgbModal) {}

    public filterResponse(request: Observable<any>) {
    return request.pipe(
      map((response: Response) => {

        const { resultStatus, object, errorMessage } = response;
        if (resultStatus === 'OK') {
          return { resultStatus, object };
        }

        return { resultStatus, errorMessage: errorMessage  };
      }),
      catchError( () => of( {status: 'FAILURE', errorMessage: 'GENERIC_ERROR'}) )
    )
  }
  /**
   * [name]
   * @author Stiven Lenis Cardona
   * @date 01-03-2021
   * @description Metodo encargado de crear notificaciones mediante la libreria angular2Notification
   * @param config [Notification] Información requerida para generar la notificación
   * @returns Notification
   */
  public showAngularNotification(config: interfaces.Notification): Notification {
    switch (config.type) {
      case 'success':
        return this.getNotificationSuccess(config);

      case 'warning':
        return this.getNotificationWarn(config);

      case 'error':
        return this.getNotificationError(config);

      default:
        return this.getNotificationInfo(config);
    }
  }

  /**
   * [getNotificationSuccess]
   * @author Stiven Lenis Cardona
   * @date 19-04-2022
   * @description Metodo encargado de retornar una notificación del tipo success
   * @param config: interfaces.Notification información de notificación a mostrar.
   * @returns Notification Notificación de la libreria angular2-notification
   */
  private getNotificationSuccess(config: interfaces.Notification): Notification {
    return this.notificationService.success(
      config.title ? config.title : 'Exito!!',
      config.message ? config.message : 'Proceso realizado exitosamente'
    );
  }

  /**
   * [getNotificationwarn]
   * @author Stiven Lenis Cardona
   * @date 19-04-2022
   * @description Metodo encargado de retornar una notificación del tipo warn
   * @param config: interfaces.Notification información de notificación a mostrar.
   * @returns Notification Notificación de la libreria angular2-notification
   */
  private getNotificationWarn(config: interfaces.Notification): Notification {
    return this.notificationService.warn(
      config.title ? config.title : 'Advertencia!',
      config.message ? config.message : 'WarningNotificationMessage'
    );
  }

  /**
   * [getNotificationerror]
   * @author Stiven Lenis Cardona
   * @date 19-04-2022
   * @description Metodo encargado de retornar una notificación del tipo error
   * @param config: interfaces.Notification información de notificación a mostrar.
   * @returns Notification Notificación de la libreria angular2-notification
   */
  private getNotificationError(config: interfaces.Notification): Notification {
    return this.notificationService.error(
      config.title ? config.title : 'Error!!',
      config.message ? config.message : 'Ha ocurrido un error!',
      config.data ? config.data : undefined
    );
  }

  /**
   * [getNotificationinfo]
   * @author Stiven Lenis Cardona
   * @date 19-04-2022
   * @description Metodo encargado de retornar una notificación del tipo info
   * @param config: interfaces.Notification información de notificación a mostrar.
   * @returns Notification Notificación de la libreria angular2-notification
   */
  private getNotificationInfo(config: interfaces.Notification): Notification {
    return this.notificationService.info(
      config.title ? config.title : 'InfoNotificationTitle',
      config.message ? config.message : 'InfoNotificationMessage'
    );
  }

  /**
   * [confirmMessage]
   * @author Stiven Lenis Cardona
   * @date 11-03-2021
   * @description Metodo encargado de solicitar confirmación mediante
   *            un modal que tiene un titulo, un contenido un
   *            botón de aceptar y un botón de cancelar.
   *            Importante utilizar la etiqueta de await para realizar
   *            este proceso de manera sincrona.
   * @param title [string] Titulo internacionalizado
   * @param content [string] Contenido internacionalizado
   * @param acept [string] texto del botón aceptar internacionalizado x defecto es Aceptar
   * @param cancel [string] texto del botón cancelar internacionalizado x defecto es Cancelar
   * @param iconTitle [string] texto del icono del titulo x defecto se utiliza exclamación
   * @returns Promise<boolean> retorna un true en caso de aceptar y false en caso de cancelar.
   */
   confirmMessage( title: string,
                   content: string,
                   acept: string = 'Aceptar',
                   cancel: string= 'Cancelar' ): Promise<boolean>{

    return new Promise<boolean>( (resolve, reject) => {

      const modalConfirmRolNew = this.modalService.open( ConfirmComponent, {
        backdrop: 'static',
        centered: true,
      });

      modalConfirmRolNew.componentInstance.title = title;
      modalConfirmRolNew.componentInstance.content = content;
      modalConfirmRolNew.componentInstance.acceptBtn = acept;
      modalConfirmRolNew.componentInstance.cancelBtn = cancel;

      modalConfirmRolNew.componentInstance.onAccept.subscribe( () => {
        resolve(true);
        modalConfirmRolNew.close();
      });


      modalConfirmRolNew.componentInstance.onCancel.subscribe( () => {
        resolve(false);
        modalConfirmRolNew.close();
      });
    });
  }

  /**
   * [getDefaultHeadders]
   * @author Stiven Lenis Cardona
   * @date 06-04-2022
   * @description Metodo encargado de retornar los headers por defecto sin bearer ni tenant.
   * @returns header.
   */
  public getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
  }
}
