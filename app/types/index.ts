export type TabType = 'dashboard' | 'shaxmatka' | 'rassrochka' | 'kassa';
export type ApartmentStatus = 'free' | 'reserved' | 'sold';
export type DebtorStatus = 'overdue' | 'upcoming' | 'paid_today';
export type KassaType = 'in' | 'out';

export interface Apartment {
  id: number;
  number: number;
  floor: number;
  block: string;
  rooms: number;
  area: number;
  pricePerSqm: number;
  status: string;
  client: string | null;
  phone: string | null;
  paidPercent: number;
  reserveDate: string | null;
}

export interface Debtor {
  id: number;
  client: string;
  apt: string;
  phone: string;
  totalContract: number;
  paid: number;
  monthlyDue: number;
  dueDate: string;
  overdueDays: number;
  status: string;
}

export interface Transaction {
  id: number;
  time: string;
  type: string;
  title: string;
  category: string;
  block: string;
  clientOrVendor: string;
  amountUsd: number;
  amountUzs: number;
  method: string;
}

export interface WarehouseItem {
  id: number;
  name: string;
  unit: string;
  stock: number;
  limit: number;
  lastPrice: string;
  status: string;
}

export interface MonthlyStat {
  month: string;
  income: number;
  expense: number;
}

export interface ScheduleRow {
  monthNum: number;
  date: string;
  usd: number;
  uzs: number;
}

export interface CalcStats {
  baseTotal: number;
  discountAmount: number;
  finalTotal: number;
  remaining: number;
  monthlyUsd: number;
  monthlyUzs: number;
  schedule: ScheduleRow[];
}

export interface FloorGroup {
  floor: number;
  items: Apartment[];
}

