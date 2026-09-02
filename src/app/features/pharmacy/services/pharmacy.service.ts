import type { Medicine, PharmacyCategory } from '../models/medicine.model';
import type { PrescriptionUpload } from '../models/prescription.model';
import { MOCK_MEDICINES, MOCK_PHARMACY_CATEGORIES, MOCK_PRESCRIPTIONS } from '../mocks/pharmacy.mock';

class PharmacyService {
  private medicines: Medicine[] = [...MOCK_MEDICINES];
  private categories: PharmacyCategory[] = [...MOCK_PHARMACY_CATEGORIES];
  private prescriptions: PrescriptionUpload[] = [...MOCK_PRESCRIPTIONS];

  // Fetch all medicines
  public getAllMedicines(): Medicine[] {
    return this.medicines;
  }

  // Get medicine by ID
  public getMedicineById(id: string): Medicine | undefined {
    return this.medicines.find(m => m.id === id);
  }

  // Get categories
  public getCategories(): PharmacyCategory[] {
    return this.categories;
  }

  // Search & Filter medicines
  public filterMedicines(options: {
    query?: string;
    categorySlug?: string;
    requiresPrescription?: boolean | null;
    form?: string | null;
    maxPrice?: number;
    sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  }): Medicine[] {
    let result = [...this.medicines];

    if (options.query && options.query.trim()) {
      const q = options.query.toLowerCase().trim();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.activeIngredients.some(i => i.toLowerCase().includes(q))
      );
    }

    if (options.categorySlug && options.categorySlug !== 'all') {
      result = result.filter(m => m.categorySlug === options.categorySlug);
    }

    if (options.requiresPrescription !== undefined && options.requiresPrescription !== null) {
      result = result.filter(m => m.requiresPrescription === options.requiresPrescription);
    }

    if (options.form && options.form !== 'all' && options.form !== 'الكل') {
      result = result.filter(m => m.form === options.form);
    }

    if (options.maxPrice) {
      result = result.filter(m => m.price <= options.maxPrice!);
    }

    if (options.sortBy) {
      switch (options.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
        default:
          result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviewsCount - a.reviewsCount);
          break;
      }
    }

    return result;
  }

  // Prescription Upload Simulation
  public uploadPrescription(data: {
    patientName: string;
    patientPhone: string;
    fileName: string;
    fileSize: string;
    doctorName?: string;
    insuranceProvider?: string;
    insuranceNumber?: string;
  }): PrescriptionUpload {
    const newRx: PrescriptionUpload = {
      id: `rx-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      fileName: data.fileName,
      fileSize: data.fileSize,
      uploadedAt: 'الآن',
      doctorName: data.doctorName || 'د. طارق المنصور (طب عام)',
      clinicOrHospital: 'عيادة المدينة الصحية العامة',
      status: 'verified',
      pharmacistNotes: 'تم التحقق الفوري من وصفتك بواسطة الصيدلاني الرقمي والطبيب المناوب المعتمد. الأدوية جاهزة للتوصيل.',
      detectedMedicines: ['أموكسيسيلين كلافولانات ١جم', 'فيتامين C 1000ملجم فوار'],
      insuranceProvider: data.insuranceProvider,
      insuranceNumber: data.insuranceNumber
    };

    this.prescriptions = [newRx, ...this.prescriptions];
    return newRx;
  }

  // Get active prescriptions
  public getPrescriptions(): PrescriptionUpload[] {
    return this.prescriptions;
  }
}

export const pharmacyService = new PharmacyService();
