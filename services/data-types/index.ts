export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface MinyakItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  nameBank: string;
  noRekening: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalsTypes {
  _id: string;
  nominalQuantity: number;
  nominalName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface JWTPayloadTypes {
  pelanggan: string;
  iat: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
}

export interface HistoryVoucherPembelianTypes {
  category: string;
  kardusName: string;
  nominalName: string;
  nominalQuantity: string;
  price: number;
  thumbnail: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface HistoryTransactionTypes {
  _id: string;
  historyVoucherPembelian: HistoryVoucherPembelianTypes;
  value: number;
  status: string;
  tax: number;
  name: string;
  historyPayment: HistoryPaymentTypes;
  category: CategoryTypes;
}

export interface PembelianCategoriesTypes {
  _id: string;
  value: string;
  name: string;
  price: number;
}
