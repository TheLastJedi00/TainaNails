export interface Service {
  id: number;
  name: string;
}
export interface Schedule {
    date: Date;
    name: string;
    service: string
    serviceCode: number;
    phone: string;
    dayOfWeek: string;
}