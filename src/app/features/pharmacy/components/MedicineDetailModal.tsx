import React, { useState } from 'react';
import type { Medicine } from '../models/medicine.model';
import { 
  X, 
  Star, 
  ShoppingBag, 
  FileText, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  Pill, 
  Sparkles,
  Check,
  Truck,
  Building2,
  Layers
} from 'lucide-react';

interface MedicineDetailModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAddToCart: (medicine: Medicine, qty: number) => void;
  onUploadRx: (medicine: Medicine) => void;
  isInCart?: boolean;
}

export const MedicineDetailModal: React.FC<MedicineDetailModalProps> = ({
  medicine,
  onClose,
  onAddToCart,
  onUploadRx,
  isInCart = false
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'warnings' | 'usage'>('overview');

  if (!medicine) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-modal-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="detail-modal-header">
          <div className="header-tags">
            <span className="badge badge-green">{medicine.category}</span>
            {medicine.requiresPrescription ? (
              <span className="badge badge-rx">
                <FileText size={13} className="ml-1" />
                يستلزم وصفة طبية (Rx)
              </span>
            ) : (
              <span className="badge badge-otc">
                <ShieldCheck size={13} className="ml-1" />
                دواء متاح بدون وصفة (OTC)
              </span>
            )}
          </div>
          <button className="close-btn" onClick={onClose} title="إغلاق">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="detail-modal-body">
          {/* Right Column: Image & Quick Details */}
          <div className="modal-left-col">
            <div className="modal-image-wrap">
              <img 
                src={medicine.imageUrl} 
                alt={medicine.name} 
                className="modal-img" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
                }}
              />
              {medicine.discountPercentage && (
                <span className="badge-discount-float">وفر {medicine.discountPercentage}٪</span>
              )}
            </div>

            <div className="safety-guarantee-box">
              <ShieldCheck size={22} className="text-emerald-500 shrink-0" />
              <div>
                <p className="safety-title">دواء أصلي ١٠٠٪ ومضمون</p>
                <p className="safety-text">مستورد ومخزن وفق أعلى المعايير الصيدلانية المعتمدة في المملكة.</p>
              </div>
            </div>

            <div className="delivery-guarantee-box">
              <Truck size={20} className="text-emerald-600 shrink-0" />
              <div>
                <p className="safety-title">توصيل سريع مبرد</p>
                <p className="safety-text">يصلك خلال ٣٠ إلى ٤٥ دقيقة في علب مخصصة لحفظ درجات الحرارة.</p>
              </div>
            </div>
          </div>

          {/* Left Column (Arabic main): Info, Tabs & Pricing */}
          <div className="modal-right-col">
            <div className="med-header-meta">
              <div className="brand-meta-badge">
                <Building2 size={13} />
                <span>{medicine.brand}</span>
              </div>
              <h2 className="med-full-title">{medicine.name}</h2>
              <p className="med-generic-sub">
                <strong className="text-emerald-700">المادة الفعّالة: </strong> {medicine.genericName}
              </p>
            </div>

            <div className="rating-dosage-strip">
              <div className="rating-pill">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="font-bold">{medicine.rating.toFixed(1)}</span>
                <span className="text-gray-400">({medicine.reviewsCount} تقييم)</span>
              </div>
              <div className="dosage-pill">
                <Pill size={14} className="text-emerald-600" />
                <span>{medicine.dosage}</span>
              </div>
              <div className="pack-pill">
                <Layers size={14} className="text-slate-500" />
                <span>{medicine.packSize}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="modal-nav-tabs">
              <button 
                className={`nav-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                نظرة عامة
              </button>
              <button 
                className={`nav-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                المواد الفعّالة
              </button>
              <button 
                className={`nav-tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
                onClick={() => setActiveTab('usage')}
              >
                الجرعة وطريقة الاستعمال
              </button>
              <button 
                className={`nav-tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
                onClick={() => setActiveTab('warnings')}
              >
                التحذيرات وموانع الاستعمال
              </button>
            </div>

            {/* Tab Contents */}
            <div className="tab-pane-container">
              {activeTab === 'overview' && (
                <div className="tab-pane">
                  <p className="overview-text">{medicine.description}</p>
                  
                  <div className="key-attributes-grid">
                    <div className="attr-item">
                      <span className="attr-label">الشكل الصيدلاني</span>
                      <span className="attr-val">{medicine.form}</span>
                    </div>
                    <div className="attr-item">
                      <span className="attr-label">الشركة المصنعة</span>
                      <span className="attr-val">{medicine.brand}</span>
                    </div>
                    <div className="attr-item">
                      <span className="attr-label">نوع الصرف</span>
                      <span className="attr-val">{medicine.requiresPrescription ? 'يتطلب وصفة طبية صالحة (Rx)' : 'بدون وصفة طبية (OTC)'}</span>
                    </div>
                    <div className="attr-item">
                      <span className="attr-label">حالة التوفر</span>
                      <span className="attr-val text-emerald-600 font-bold">متوفر في صيدلية التوصيل السريع</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="tab-pane">
                  <h4 className="tab-inner-title">المكونات والمواد الفعّالة النشطة:</h4>
                  <ul className="ingredients-list">
                    {medicine.activeIngredients.map((item, index) => (
                      <li key={index} className="ingredient-item">
                        <Sparkles size={15} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="footnote-text">يُرجى إبلاغ الصيدلاني بأي حساسية سابقة تجاه هذه المواد قبل الاستخدام.</p>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="tab-pane">
                  <div className="usage-highlight-card">
                    <Info size={19} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-950 mb-1">تعليمات الجرعة والاستخدام:</h4>
                      <p className="text-sm leading-relaxed text-emerald-900">{medicine.usage}</p>
                    </div>
                  </div>

                  {medicine.sideEffects.length > 0 && (
                    <div className="side-effects-section">
                      <h4 className="text-sm font-bold text-slate-800 mb-2">الآثار الجانبية المحتملة (نادرة/خفيفة):</h4>
                      <ul className="side-effects-list">
                        {medicine.sideEffects.map((effect, idx) => (
                          <li key={idx} className="side-effect-item">
                            <span className="bullet-dot">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'warnings' && (
                <div className="tab-pane">
                  <div className="warnings-alert-card">
                    <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-950 mb-1.5">التحذيرات والاحتياطات الطبية:</h4>
                      <ul className="warnings-list">
                        {medicine.warnings.map((w, idx) => (
                          <li key={idx} className="warning-item">
                            <span className="text-amber-600">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Pricing & Add to Cart Bar */}
            <div className="modal-purchase-bar">
              <div className="modal-price-wrap">
                <span className="modal-price">
                  {(medicine.price * quantity).toFixed(2)} <span className="modal-currency">ر.س</span>
                </span>
                {medicine.oldPrice && (
                  <span className="modal-old-price">
                    {(medicine.oldPrice * quantity).toFixed(2)} ر.س
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {!medicine.requiresPrescription && (
                <div className="qty-picker">
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    title="تقليل الكمية"
                  >
                    -
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    title="زيادة الكمية"
                  >
                    +
                  </button>
                </div>
              )}

              {medicine.requiresPrescription ? (
                <button 
                  className="btn-upload-modal-action"
                  onClick={() => {
                    onClose();
                    onUploadRx(medicine);
                  }}
                >
                  <FileText size={18} />
                  <span>ارفع وصفتك الطبية لهذا الدواء</span>
                </button>
              ) : (
                <button 
                  className="btn-add-modal-action"
                  onClick={() => {
                    onAddToCart(medicine, quantity);
                    onClose();
                  }}
                >
                  {isInCart ? <Check size={18} /> : <ShoppingBag size={18} />}
                  <span>{isInCart ? 'تحديث الكمية في السلة' : `إضافة (${quantity}) للسلة`}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .detail-modal-box {
          background: var(--white);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--border-light);
          direction: rtl;
          text-align: right;
        }

        .detail-modal-header {
          padding: 1.25rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
          background: #FAFAFA;
        }

        .header-tags {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .detail-modal-body {
          padding: 1.75rem;
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 2rem;
        }

        .modal-image-wrap {
          position: relative;
          width: 100%;
          height: 250px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #F8FAFC;
          border: 1px solid var(--border-light);
          margin-bottom: 1rem;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge-discount-float {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--accent-red);
          color: var(--white);
          font-weight: 800;
          font-size: 0.78rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-sm);
        }

        .safety-guarantee-box,
        .delivery-guarantee-box {
          background: var(--light-green-bg);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.75rem 0.9rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          margin-bottom: 0.65rem;
        }

        .safety-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .safety-text {
          font-size: 0.74rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .brand-meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--hover-green);
          background: var(--light-green-bg);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }

        .med-full-title {
          font-size: 1.45rem;
          font-weight: 900;
          line-height: 1.35;
          margin: 0.25rem 0 0.4rem;
          color: var(--text-primary);
        }

        .med-generic-sub {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 0.9rem;
          line-height: 1.5;
        }

        .rating-dosage-strip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .rating-pill, .dosage-pill, .pack-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: var(--bg-slate);
          border: 1px solid var(--border-light);
          font-weight: 600;
        }

        .modal-nav-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1.5px solid var(--border-light);
          margin-bottom: 1rem;
          overflow-x: auto;
        }

        .nav-tab-btn {
          padding: 0.55rem 0.85rem;
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-secondary);
          border-bottom: 2.5px solid transparent;
          transition: all var(--transition-fast);
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-tab-btn:hover {
          color: var(--primary-green);
        }

        .nav-tab-btn.active {
          color: var(--primary-green);
          border-bottom-color: var(--primary-green);
        }

        .tab-pane-container {
          min-height: 150px;
          margin-bottom: 1.25rem;
        }

        .overview-text {
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .key-attributes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: var(--bg-slate);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }

        .attr-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .attr-label {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .attr-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tab-inner-title {
          font-size: 0.9rem;
          font-weight: 800;
          margin-bottom: 0.65rem;
          color: var(--text-primary);
        }

        .ingredients-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 0.75rem;
        }

        .ingredient-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          background: #F8FAFC;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .footnote-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .usage-highlight-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--light-green-bg);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.9rem 1.1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .side-effect-item, .warning-item {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-size: 0.84rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .warnings-alert-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          padding: 0.9rem 1.1rem;
          border-radius: var(--radius-md);
        }

        .modal-purchase-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .modal-price-wrap {
          display: flex;
          flex-direction: column;
        }

        .modal-price {
          font-size: 1.5rem;
          font-weight: 900;
          font-family: var(--font-heading);
          color: var(--text-primary);
          white-space: nowrap;
        }

        .modal-currency {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .modal-old-price {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .qty-picker {
          display: flex;
          align-items: center;
          background: var(--bg-slate);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .qty-btn {
          padding: 0.5rem 0.85rem;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .qty-btn:hover:not(:disabled) {
          background: var(--light-green-bg);
          color: var(--primary-green);
        }

        .qty-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .qty-val {
          padding: 0.5rem 0.75rem;
          font-weight: 800;
          font-size: 0.95rem;
        }

        .btn-add-modal-action {
          flex-grow: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--primary-green);
          color: var(--white);
          font-weight: 800;
          font-size: 0.95rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          border: none;
          box-shadow: var(--shadow-green);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .btn-add-modal-action:hover {
          background: var(--hover-green);
          box-shadow: var(--shadow-green-lg);
        }

        .btn-upload-modal-action {
          flex-grow: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          color: #B45309;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .btn-upload-modal-action:hover {
          background: #FDE68A;
          color: #92400E;
        }

        @media (max-width: 768px) {
          .detail-modal-body {
            grid-template-columns: 1fr;
          }
          .modal-purchase-bar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};
