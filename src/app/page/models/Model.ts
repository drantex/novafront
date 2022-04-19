/**
 * @Date 05/10/2020
 * @author Daniel Stiven Lenis Cardona <stiven_lenis@hotmail.com>
 * @description Modelo base con los metodos necesarios para dar acceso a los datos de las clases que lo extienda
 */
export abstract class Model {

  /**
   * Metodo get generico del modelo.
   * @param namePropertie Nombre de la propiedad del modelo
   */
  get(namePropertie: string): any {
    if (this.hasOwnProperty(namePropertie)) {
      return (this as any)[namePropertie];
    } else {
      throw new Error(`La propiedad ${namePropertie} no existe en el modelo`);
    }
  }

  /**
   * Metodo Set generico del modelo
   * @param namePropertie Nombre de la propiedad a setear el valro
   * @param value Valor que se seteará en la propiedad
   */
  set(namePropertie: string, value: any): void {

    if (this.hasOwnProperty(namePropertie)) {
      (this as any)[namePropertie] = value;
    } else {
      throw new Error(`La propiedad ${namePropertie} no existe en el modelo`);
    }
  }

  /**
   * Metodo encargado de retornar toda la información del modelo
   */
  getData(): any {
    return { ...this };
  }

  /**
   * Metodo encargado de retornar toda la información del modelo
   */
  /**
   * [namesetData]
   * @description metodo encargado de setearle información al modelo mediante un objeto.
   * @param dataModel objeto con las propiedades a setearle al modelo
   */
  setData( dataModel: { [key: string]: any } ): void {
    Object.keys( dataModel ).forEach( (key: string) => {
      if ( this.hasOwnProperty(key) ) {
        (this as any)[key] = dataModel[key];
      } else {
        throw new Error(`La propiedad ${key} no existe en el modelo`);
      }
    });
  }

  /**
   * [getDataModelKey]
   * @author Stiven Lenis Cardona
   * @date 15-10-2021
   * @description Este metodo nos permite acceder a los datos contenidos en el modelo, cuando la información
   *              requerida esta en un modelo, dentro de otro modelo, por lo cual se diseña una logica
   *              para acceder a ellos mediante un string.
   * @returns null
   */
  getDataModelKey(value: string): string {

    const arrValue = value.split('.');
    let response = this.getData();

    for (let i = 0, len = arrValue.length; i < len; i++) {
      response = response[arrValue[i]];
    }

    return response;
  }

}
