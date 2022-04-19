import { Model } from './Model';
export class TeacherModel extends Model {

  private id: number | null;
  private name: string;
  private secondName: string;
  private lastName: string;
  private secondLastName: string;
  private documentNumber: string;

  constructor( dataModel: any = {} ) {
    super();

    this.id = dataModel.id || null;
    this.name = dataModel.name || '';
    this.secondName = dataModel.secondName || '';
    this.lastName = dataModel.lastName || '';
    this.secondLastName = dataModel.secondLastName || '';
    this.documentNumber = dataModel.documentNumber || '';
  }
}
