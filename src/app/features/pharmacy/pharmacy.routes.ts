export const PHARMACY_ROUTES = {
  HOME: '/pharmacy',
  MEDICINES: '/pharmacy/medicines',
  MEDICINE_DETAIL: (id: string) => `/pharmacy/medicines/${id}`,
  PRESCRIPTIONS: '/pharmacy/prescriptions',
  UPLOAD_RX: '/pharmacy/upload-rx',
  CONSULTATION: '/pharmacy/consultation'
} as const;

export type PharmacyRouteKey = keyof typeof PHARMACY_ROUTES;
