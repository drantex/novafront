export interface Response {
  errorMessage: null | string
  object: any
  resultStatus: 'OK' | 'FAILURE'
  successMessage: string
}

/**
 * [Notification]
 * @description Interfaz de notificación angular2-notification
 */
 export interface Notification {
  data?: object;
  type?: 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
}
