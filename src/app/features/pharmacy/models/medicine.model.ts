export type MedicineForm = 
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Cream'
  | 'Gel'
  | 'Drops'
  | 'Inhaler'
  | 'Sachet'
  | 'Spray'
  | 'Injection'
  | 'أقراص'
  | 'كبسولات'
  | 'شراب'
  | 'كريم'
  | 'جل موضعي'
  | 'قطرات'
  | 'بخاخ استنشاق'
  | 'بخاخ'
  | 'أقراص فوارة'
  | 'جهاز طبي'
  | 'سيروم (قطرات)'
  | (string & {});

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  category: string;
  categorySlug: string;
  dosage: string;
  form: MedicineForm;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  requiresPrescription: boolean;
  description: string;
  activeIngredients: string[];
  usage: string;
  sideEffects: string[];
  warnings: string[];
  imageUrl: string;
  discountPercentage?: number;
  packSize: string;
  isPopular?: boolean;
}

export interface PharmacyCategory {
  id: string;
  name: string;
  arabicName?: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
}
