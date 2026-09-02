import React from 'react';
import type { Medicine } from '../models/medicine.model';
import { ShoppingBag, FileText, Star, Eye, ShieldCheck, Check } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onSelect: (medicine: Medicine) => void;
  onAddToCart: (medicine: Medicine) => void;
  onUploadRxForMed: (medicine: Medicine) => void;
  isInCart?: boolean;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onSelect,
  onAddToCart,
  onUploadRxForMed,
  isInCart = false
}) => {
  return (
    <div className="medicine-card group">
      {/* Top Media & Badges */}
      <div className="card-media-wrapper" onClick={() => onSelect(medicine)}>
        <img 
          src={medicine.imageUrl} 
          alt={medicine.name} 
          className="medicine-image" 
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
          }}
        />
        
        {/* Floating Badges */}
        <div className="badge-row-top">
          {medicine.requiresPrescription ? (
            <span className="badge badge-rx">
              <FileText size={12} className="ml-1" />
              يستلزم وصفة (Rx)
            </span>
          ) : (
            <span className="badge badge-otc">
              <ShieldCheck size={12} className="ml-1" />
              بدون وصفة (OTC)
            </span>
          )}

          {medicine.discountPercentage && (
            <span className="badge badge-red">
              خصم {medicine.discountPercentage}٪
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button 
          className="quick-view-btn"
          title="معاينة سريعة"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(medicine);
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Card Info */}
      <div className="card-content">
        <div className="brand-category-row">
          <span className="brand-name">{medicine.brand}</span>
          <span className="form-pill">{medicine.form}</span>
        </div>

        <h3 
          className="medicine-title" 
          onClick={() => onSelect(medicine)}
          title={medicine.name}
        >
          {medicine.name}
        </h3>

        <p className="generic-name">
          <span className="generic-label">المادة الفعّالة: </span>{medicine.genericName}
        </p>

        <div className="dosage-pack-info">
          <span>{medicine.dosage}</span>
          <span className="bullet-dot">•</span>
          <span>{medicine.packSize}</span>
        </div>

        {/* Rating & Stock */}
        <div className="rating-row">
          <div className="star-rating">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="rating-num">{medicine.rating.toFixed(1)}</span>
            <span className="reviews-count">({medicine.reviewsCount} تقييم)</span>
          </div>

          <span className="stock-indicator">
            <span className="stock-dot"></span>
            متوفر بالمستودع
          </span>
        </div>

        {/* Price Row */}
        <div className="price-container">
          <div className="price-block">
            <div className="current-price">
              {medicine.price.toFixed(2)} <span className="currency-label">ر.س</span>
            </div>
            {medicine.oldPrice && (
              <div className="old-price">
                {medicine.oldPrice.toFixed(2)} ر.س
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Details & Buy */}
        <div className="card-footer-row">
          <button
            className="btn-details-action"
            onClick={() => onSelect(medicine)}
            title="مشاهدة التفاصيل الكاملة للدواء"
          >
            <Eye size={15} />
            <span>التفاصيل</span>
          </button>

          {medicine.requiresPrescription ? (
            <button
              className="btn-rx-action"
              onClick={() => onUploadRxForMed(medicine)}
            >
              <FileText size={15} />
              <span>ارفع الوصفة</span>
            </button>
          ) : (
            <button
              className={`btn-cart-action ${isInCart ? 'in-cart' : ''}`}
              onClick={() => onAddToCart(medicine)}
            >
              {isInCart ? (
                <>
                  <Check size={16} />
                  <span>في السلة</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .medicine-card {
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
          position: relative;
        }

        .medicine-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg), var(--shadow-green);
        }

        .card-media-wrapper {
          position: relative;
          height: 210px;
          background-color: #F8FAFC;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .medicine-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .medicine-card:hover .medicine-image {
          transform: scale(1.06);
        }

        .badge-row-top {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          right: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          z-index: 2;
        }

        .quick-view-btn {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: var(--text-primary);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(10px);
          transition: all var(--transition-fast);
          z-index: 3;
        }

        .medicine-card:hover .quick-view-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-view-btn:hover {
          background: var(--primary-green);
          color: var(--white);
        }

        .card-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .brand-category-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .brand-name {
          font-weight: 700;
          color: var(--hover-green);
          letter-spacing: 0;
        }

        .form-pill {
          background: var(--bg-muted);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.72rem;
        }

        .medicine-title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 0.35rem;
          cursor: pointer;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color var(--transition-fast);
        }

        .medicine-title:hover {
          color: var(--primary-green);
        }

        .generic-name {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
        }

        .generic-label {
          font-weight: 700;
          color: var(--text-primary);
        }

        .dosage-pack-info {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.73rem;
          color: var(--text-secondary);
          background: var(--light-green-bg);
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .bullet-dot {
          color: var(--primary-green);
        }

        .rating-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .star-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .rating-num {
          font-weight: 800;
          color: var(--text-primary);
        }

        .reviews-count {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .stock-indicator {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--hover-green);
        }

        .stock-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary-green);
          display: inline-block;
          animation: pulseGlow 2s infinite;
        }

        .price-container {
          margin-bottom: 0.85rem;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .price-block {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .current-price {
          font-size: 1.3rem;
          font-weight: 900;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }

        .currency-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .old-price {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .card-footer-row {
          margin-top: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          padding-top: 0.85rem;
          border-top: 1px dashed var(--border-light);
        }

        .btn-details-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          background: #F1F5F9;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.55rem 0.65rem;
          border-radius: var(--radius-md);
          border: 1px solid #E2E8F0;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .btn-details-action:hover {
          background: #E2E8F0;
          color: var(--hover-green);
          border-color: #CBD5E1;
        }

        .btn-cart-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          background: var(--primary-green);
          color: var(--white);
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.55rem 0.65rem;
          border-radius: var(--radius-md);
          border: none;
          transition: all var(--transition-fast);
          white-space: nowrap;
          cursor: pointer;
        }

        .btn-cart-action:hover {
          background: var(--hover-green);
          box-shadow: var(--shadow-green);
        }

        .btn-cart-action.in-cart {
          background: var(--hover-green);
        }

        .btn-rx-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          color: #B45309;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.55rem 0.65rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          white-space: nowrap;
          cursor: pointer;
        }

        .btn-rx-action:hover {
          background: #FDE68A;
          color: #92400E;
        }
      `}</style>
    </div>
  );
};
