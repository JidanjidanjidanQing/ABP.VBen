import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import qs from 'qs';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/connect/token',
  Logout = '/#/login?redirect=/dashboard',
  GetUserInfo = '/connect/userinfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
      params:{
        grant_type:'password',
        client_id:'ERP_Web',
        scope:'email profile roles ERP',
        username:params.username,
        password:params.password,
        client_secret:'1q2w3e*'
      },
      paramsSerializer:(params) => {
        return qs.stringify(params,{indices:false});
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
