export type Settings = {
  BACK_API: string;
  SESSION: string;
};

export type Invoice = {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
};
