export interface BasicPageParams {
  skipCount: number;
  maxResultCount: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  totalCount: number;
}
