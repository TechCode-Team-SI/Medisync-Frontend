export type Settings = {
  BACK_API: string;
  SESSION: string;
};

export type SystemMetadata = {
  IS_INSTALLED: boolean;
};

export type Invoice = {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
};
