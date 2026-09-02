export type PrescriptionStatus = 'pending' | 'verified' | 'pharmacist_reviewing' | 'ready_for_checkout' | 'rejected';

export interface PrescriptionUpload {
  id: string;
  patientName: string;
  patientPhone: string;
  fileUrl?: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  doctorName?: string;
  clinicOrHospital?: string;
  status: PrescriptionStatus;
  pharmacistNotes?: string;
  detectedMedicines?: string[];
  insuranceProvider?: string;
  insuranceNumber?: string;
}
