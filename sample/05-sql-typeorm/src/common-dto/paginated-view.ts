export class Paginated<T> {
  items: T;
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;

  public static getPaginated<T>(data: {
    items: T;
    page: number;
    size: number;
    count: number;
  }): Paginated<T> {
    return {
      totalCount: data.count,
      pagesCount: Math.ceil(data.count / data.size),
      page: data.page,
      pageSize: data.size,
      items: data.items,
    };
  }
}
