export interface Service {
  id: number;
  name: string;
}
export interface Schedule {
  date: string;
  name: string;
  service: string;
  serviceCode: number;
  phone: string;
  dayOfWeek: string;
}

export interface ScheduleResponse {
  id: number;
  date: string;
  dayOfWeek: string;
  endOfService: string;
  name: string;
  phone: string;
  service: string;
}

export interface ScheduleUpdate {
  id: number;
  name: string;
  phone: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
}

export interface Page<ScheduleResponse> {
  content: ScheduleResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface AuthResponse {
  token: string;
}
