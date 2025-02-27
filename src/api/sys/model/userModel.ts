/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  expires_in: number;
  access_token: string;
  token_type: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  sub:string;
  tenantid:string;
  preferred_username:string;
  family_name:string;
  given_name:string;
  email:string;
  email_verified:boolean;
  role:Array<string>;
}
