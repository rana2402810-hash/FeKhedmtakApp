import React from 'react';
import { pharmacyService } from '../services/pharmacy.service';
import { 
  FileText, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  ShoppingBag 
} from 'lucide-react';

interface PharmacyPrescriptionsPageProps {
  onBackToPharmacy: () => void;
  onOpenUpload: () => void;
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
}

export const PharmacyPrescriptionsPage: React.FC<PharmacyPrescriptionsPageProps> = ({
  onBackToPharmacy,
  onOpenUpload,
  onAddToCart
}) => {
  const prescriptions = pharmacyService.getPrescriptions();

  return (
    <div className="prescriptions-page container">
      {/* Top Navigation */}
      <div className="page-nav-bar">
        <button className="btn-back" onClick={onBackToPharmacy}>
          <ArrowRight size={18} />
          <span>العودة للصيدلية</span>
        </button>

        <button className="btn-primary" onClick={onOpenUpload}>
          <PlusCircle size={18} />
          <span>رفع وصفة جديدة</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="prescriptions-header">
        <div>
          <h1 className="title-text">وصفاتي الطبية (Rx)</h1>
          <p className="subtitle-text">
            تتبع حالة التحقق، واطلع على الملاحظات السريرية من الصيدلاني، وأضف أدويتك للسلة بنقرة واحدة.
          </p>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="prescriptions-list">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="rx-card animate-fade-in">
            <div className="rx-card-header">
              <div className="rx-header-main">
                <div className="rx-icon-box">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="rx-id-row">
                    <span className="rx-id-code">رقم الوصفة: #{rx.id}</span>
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} />
                      تم التحقق من الصيدلاني
                    </span>
                  </div>
                  <h3 className="rx-patient-name">المريض: {rx.patientName}</h3>
                  <span className="rx-time">تم الرفع: {rx.uploadedAt} • {rx.fileName}</span>
                </div>
              </div>

              <div className="rx-status-box">
                <span className="status-indicator">جاهز للطلب السريع</span>
                <span className="rx-phone-tag">{rx.patientPhone}</span>
              </div>
            </div>

            <div className="rx-card-body">
              <div className="rx-detail-grid">
                <div className="detail-item">
                  <span className="detail-label">الطبيب المعالج والمستشفى:</span>
                  <span className="detail-val">
                    <Building2 size={14} className="text-emerald-600 inline mr-1" />
                    {rx.doctorName || 'د. طارق المنصور'} ({rx.clinicOrHospital || 'عيادة المدينة الصحية'})
                  </span>
                </div>

                {rx.insuranceProvider && (
                  <div className="detail-item">
                    <span className="detail-label">شركة التأمين الصحي:</span>
                    <span className="detail-val">
                      <ShieldCheck size={14} className="text-emerald-600 inline mr-1" />
                      {rx.insuranceProvider} ({rx.insuranceNumber || 'POL-VALID'})
                    </span>
                  </div>
                )}
              </div>

              {/* Detected Medicines */}
              {rx.detectedMedicines && (
                <div className="prescribed-meds-box">
                  <span className="meds-box-label">الأدوية الموصوفة والمحققة:</span>
                  <div className="meds-tags-wrap">
                    {rx.detectedMedicines.map((med, idx) => (
                      <span key={idx} className="med-tag-pill">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pharmacist Note */}
              {rx.pharmacistNotes && (
                <div className="pharmacist-note-bubble">
                  <div className="pharmacist-avatar">Rx</div>
                  <div className="note-text">
                    <strong>ملاحظة الصيدلاني السريرية:</strong> {rx.pharmacistNotes}
                  </div>
                </div>
              )}
            </div>

            <div className="rx-card-actions">
              <button 
                className="btn-add-all-rx"
                onClick={() => {
                  onAddToCart({
                    id: `prescribed-${rx.id}`,
                    name: `حزمة الوصفة الطبية #${rx.id} (${rx.patientName})`,
                    price: 64.00,
                    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
                    category: 'أدوية الوصفات الطبية',
                    section: 'pharmacy',
                    quantity: 1,
                    requiresPrescription: true
                  });
                  alert(`✅ تمت إضافة حزمة الوصفة الطبية #${rx.id} إلى سلة التسوق`);
                }}
              >
                <ShoppingBag size={16} />
                <span>أضف أدوية الوصفة للسلة</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .prescriptions-page {
          padding: 2.5rem 1.5rem 4rem;
        }

        .page-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--text-primary);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          background: var(--white);
          border: 1px solid var(--border-light);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
        }

        .btn-back:hover {
          color: var(--primary-green);
          border-color: var(--primary-green);
          background: var(--light-green-bg);
        }

        .prescriptions-header {
          margin-bottom: 2rem;
        }

        .title-text {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.4rem;
        }

        .subtitle-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .prescriptions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .rx-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .rx-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: var(--shadow-md), var(--shadow-green);
        }

        .rx-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .rx-header-main {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rx-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-lg);
          background: var(--light-green-bg);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rx-id-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.25rem;
          flex-wrap: wrap;
        }

        .rx-id-code {
          font-family: monospace;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .rx-patient-name {
          font-size: 1.2rem;
          font-weight: 800;
        }

        .rx-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .rx-status-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
        }

        .status-indicator {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--hover-green);
        }

        .rx-phone-tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
          direction: ltr;
        }

        .rx-card-body {
          padding: 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .rx-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 700;
        }

        .detail-val {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .prescribed-meds-box {
          background: var(--bg-slate);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meds-box-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-secondary);
        }

        .meds-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .med-tag-pill {
          background: var(--white);
          border: 1px solid var(--border-light);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pharmacist-note-bubble {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--light-green-bg);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
        }

        .pharmacist-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--primary-green);
          color: var(--white);
          font-weight: 800;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .note-text {
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .rx-card-actions {
          padding-top: 1rem;
          border-top: 1px dashed var(--border-light);
          display: flex;
          justify-content: flex-start;
        }

        .btn-add-all-rx {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-green);
          color: var(--white);
          font-weight: 800;
          font-size: 0.9rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-green);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
        }

        .btn-add-all-rx:hover {
          background: var(--hover-green);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};
