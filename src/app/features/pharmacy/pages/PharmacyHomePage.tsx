import React, { useState, useMemo } from 'react';
import type { Medicine } from '../models/medicine.model';
import { pharmacyService } from '../services/pharmacy.service';
import { MedicineCard } from '../components/MedicineCard';
import { PharmacyFilters } from '../components/PharmacyFilters';
import { DoctorConsultationBanner } from '../components/DoctorConsultationBanner';
import { PrescriptionUploadModal } from '../components/PrescriptionUploadModal';
import { MedicineDetailModal } from '../components/MedicineDetailModal';
import { 
  FileUp, 
  Clock, 
  ShieldCheck, 
  Search, 
  Truck, 
  HeartHandshake, 
  Sparkles
} from 'lucide-react';

interface PharmacyHomePageProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    section: 'pharmacy';
    quantity: number;
    requiresPrescription?: boolean;
  }) => void;
  cartItemIds: string[];
  onOpenPrescriptionsList: () => void;
}

export const PharmacyHomePage: React.FC<PharmacyHomePageProps> = ({
  onAddToCart,
  cartItemIds,
  onOpenPrescriptionsList
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [requiresRxFilter, setRequiresRxFilter] = useState<boolean | null>(null);
  const [selectedForm, setSelectedForm] = useState('الكل');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Modals state
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [targetRxMedName, setTargetRxMedName] = useState<string | undefined>(undefined);
  const [consultationAlert, setConsultationAlert] = useState<string | null>(null);

  const categories = useMemo(() => pharmacyService.getCategories(), []);

  const filteredMedicines = useMemo(() => {
    return pharmacyService.filterMedicines({
      query: searchQuery,
      categorySlug: selectedCategory,
      requiresPrescription: requiresRxFilter,
      form: selectedForm,
      sortBy
    });
  }, [searchQuery, selectedCategory, requiresRxFilter, selectedForm, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setRequiresRxFilter(null);
    setSelectedForm('الكل');
    setSortBy('popular');
  };

  const handleOpenRxForMed = (med: Medicine) => {
    setTargetRxMedName(med.name);
    setIsUploadModalOpen(true);
  };

  return (
    <div className="pharmacy-home-page">
      {/* Hero Banner Section */}
      <section className="pharmacy-hero">
        <div className="container hero-grid">
          <div className="hero-text-side">
            <div className="hero-pill-badge">
              <span className="dot-pulse"></span>
              <span>صيدلية إلكترونية مرخصة ومعتمدة</span>
            </div>

            <h1 className="hero-heading">
              أدويتك وصحتك، <span className="highlight-text">توصيل في ٣٠ دقيقة</span>
            </h1>

            <p className="hero-subtext">
              اطلب أدوية أصيلة، فيتامينات يومية، مسكنات وعلاجات طبية معتمدة. يفحصها صيادلة مرخصون ويتم توصيلها إلى باب منزلك.
            </p>

            {/* Quick Search inside Hero */}
            <div className="hero-search-box">
              <Search size={20} className="text-secondary" />
              <input 
                type="text" 
                placeholder="ابحث باسم الدواء، المادة الفعّالة، أو الشركة..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>مسح</button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="hero-perks-row">
              <div className="perk-item">
                <Truck size={18} className="text-emerald-500" />
                <span>توصيل خلال ٣٠ دقيقة</span>
              </div>
              <div className="perk-item">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>أدوية أصيلة ١٠٠٪</span>
              </div>
              <div className="perk-item">
                <HeartHandshake size={18} className="text-emerald-500" />
                <span>دعم صيدلاني مجاني</span>
              </div>
            </div>
          </div>

          {/* Quick Prescription Upload Card on Right */}
          <div className="hero-upload-card">
            <div className="upload-card-badge">
              <Sparkles size={16} />
              <span>مراجعة فورية بالذكاء الاصطناعي</span>
            </div>

            <h3 className="upload-card-title">لديك وصفة طبية من الدكتور؟</h3>
            <p className="upload-card-sub">
              ارفع صورة واضحة أو ملف PDF من وصفتك. صيدلانينا المرخصون سيفحصون ويجهزون ويشحنون أدويتك.
            </p>

            <button 
              className="btn-hero-upload"
              onClick={() => {
                setTargetRxMedName(undefined);
                setIsUploadModalOpen(true);
              }}
            >
              <FileUp size={20} />
              <span>ارفع وصفتك الطبية الآن</span>
            </button>

            <div className="upload-card-footer">
              <Clock size={14} />
              <span>مراجعة آلية + موافقة صيدلاني بشري</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container pharmacy-main-section">
        {/* Doctor Consultation Banner */}
        <DoctorConsultationBanner 
          onOpenConsultation={() => {
            setConsultationAlert('صيدلاني مرخص يتصل بجلسة الدردشة المباشرة الآن...');
            setTimeout(() => setConsultationAlert(null), 5000);
          }}
          onOpenUpload={() => setIsUploadModalOpen(true)}
        />

        {consultationAlert && (
          <div className="consultation-notification animate-fade-in">
            <Sparkles size={18} />
            <span>{consultationAlert}</span>
          </div>
        )}

        {/* Filters and Category Selector */}
        <PharmacyFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          requiresRxFilter={requiresRxFilter}
          onToggleRxFilter={setRequiresRxFilter}
          selectedForm={selectedForm}
          onSelectForm={setSelectedForm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredMedicines.length}
          onReset={handleResetFilters}
        />

        {/* Medicines Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="medicines-grid">
            {filteredMedicines.map((med) => (
              <MedicineCard 
                key={med.id}
                medicine={med}
                onSelect={(m) => setSelectedMedicine(m)}
                onAddToCart={(m) => onAddToCart({
                  id: m.id,
                  name: m.name,
                  price: m.price,
                  imageUrl: m.imageUrl,
                  category: m.category,
                  section: 'pharmacy',
                  quantity: 1,
                  requiresPrescription: m.requiresPrescription
                })}
                onUploadRxForMed={handleOpenRxForMed}
                isInCart={cartItemIds.includes(med.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-medicines-state">
            <div className="empty-icon-circle">
              <Search size={32} />
            </div>
            <h3>لم يتم العثور على أدوية مطابقة</h3>
            <p>جرّب مسح البحث أو اختر تصنيفاً مختلفاً للأدوية.</p>
            <button className="btn-primary mt-3" onClick={handleResetFilters}>
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </section>

      {/* Prescription Upload Modal */}
      <PrescriptionUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        preselectedMedicineName={targetRxMedName}
        onSuccess={() => {
          setIsUploadModalOpen(false);
          onOpenPrescriptionsList();
        }}
      />

      {/* Medicine Details Modal */}
      <MedicineDetailModal 
        medicine={selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
        onAddToCart={(m, qty) => onAddToCart({
          id: m.id,
          name: m.name,
          price: m.price,
          imageUrl: m.imageUrl,
          category: m.category,
          section: 'pharmacy',
          quantity: qty,
          requiresPrescription: m.requiresPrescription
        })}
        onUploadRx={handleOpenRxForMed}
        isInCart={selectedMedicine ? cartItemIds.includes(selectedMedicine.id) : false}
      />

      <style>{`
        .pharmacy-home-page {
          padding-bottom: 4rem;
        }

        .pharmacy-hero {
          background: linear-gradient(180deg, var(--light-green-bg) 0%, rgba(248, 250, 252, 0.5) 100%);
          padding: 3rem 0 3.5rem;
          border-bottom: 1px solid rgba(16, 185, 129, 0.15);
          margin-bottom: 2.5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--white);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--hover-green);
          box-shadow: var(--shadow-xs);
          margin-bottom: 1.25rem;
        }

        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-green);
          animation: pulseGlow 2s infinite;
          flex-shrink: 0;
        }

        .hero-heading {
          font-size: 2.5rem;
          line-height: 1.3;
          font-weight: 900;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .highlight-text {
          color: var(--primary-green);
          background: linear-gradient(120deg, #10B981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtext {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1.75rem;
          max-width: 580px;
        }

        .hero-search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--white);
          border: 1.5px solid var(--primary-green);
          border-radius: var(--radius-full);
          padding: 0.65rem 1.25rem;
          box-shadow: var(--shadow-md), var(--shadow-green);
          margin-bottom: 1.75rem;
          max-width: 560px;
        }

        .hero-search-box input {
          flex-grow: 1;
          border: none;
          outline: none;
          font-size: 0.95rem;
          background: transparent;
          font-family: var(--font-family);
        }

        .clear-search-btn {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 700;
          white-space: nowrap;
        }

        .clear-search-btn:hover {
          color: var(--accent-red);
        }

        .hero-perks-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Hero Upload Card */
        .hero-upload-card {
          background: var(--white);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-xl);
          padding: 2.25rem;
          box-shadow: var(--shadow-lg), var(--shadow-green);
          position: relative;
          overflow: hidden;
        }

        .hero-upload-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #10B981, #34D399, #059669);
        }

        .upload-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--light-green-bg);
          color: var(--hover-green);
          font-size: 0.78rem;
          font-weight: 800;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 1rem;
        }

        .upload-card-title {
          font-size: 1.3rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }

        .upload-card-sub {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .btn-hero-upload {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: var(--primary-green);
          color: var(--white);
          font-weight: 800;
          font-size: 1rem;
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-green);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
        }

        .btn-hero-upload:hover {
          background: var(--hover-green);
          transform: translateY(-2px);
          box-shadow: var(--shadow-green-lg);
        }

        .upload-card-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 1rem;
        }

        .consultation-notification {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--light-green-bg);
          border: 1px solid var(--primary-green);
          color: var(--hover-green);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .medicines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .empty-medicines-state {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .empty-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background: var(--light-green-bg);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .pharmacy-main-section {
          padding-top: 0;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};
