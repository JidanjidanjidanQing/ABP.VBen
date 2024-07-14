import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { MaterialTypeCreateModel, MaterialTypeQueryParams, MaterialTypeUpdateModel } from './models/MaterialTypeModel';

const uri = '/api/app/material-type';

export function getMaterialTypeList(params:MaterialTypeQueryParams,mode:ErrorMessageMode = 'modal'){
  return defHttp.get({url:uri,params},
    {errorMessageMode:mode});
}

export function createMaterialType(data:MaterialTypeCreateModel,mode:ErrorMessageMode = 'modal'){
  return defHttp.post({url:uri,data},
    {errorMessageMode:mode});
}

export function updateMaterialType(id:string,data:MaterialTypeUpdateModel,mode:ErrorMessageMode = 'modal'){
  return defHttp.put({url:uri + '/' + id, data},
    {errorMessageMode:mode});
}

export function deleteMaterialType(id:string,mode:ErrorMessageMode = 'modal'){
  return defHttp.delete({url:uri + '/' + id},
    {errorMessageMode:mode});
}

