import { BasicPageParams } from '../../model/baseModel';

export interface MaterialTypeQueryParams extends BasicPageParams {
  name: string;
}

export interface MaterialTypeModel {}

export interface MaterialTypeCreateModel {
  name: string;
  description: string;
}

export interface MaterialTypeUpdateModel {
  name: string;
  description: string;
}
