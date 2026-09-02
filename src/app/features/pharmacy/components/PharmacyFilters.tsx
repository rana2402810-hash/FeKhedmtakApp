import React from 'react';
import type { PharmacyCategory } from '../models/medicine.model';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface PharmacyFiltersProps {
  categories: PharmacyCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  requiresRxFilter: boolean | null;
  onToggleRxFilter: (val: boolean | null) => void;
  selectedForm: string;
  onSelectForm: (form: string) => void;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  onSortChange: (sort: 'popular' | 'price-asc' | 'price-desc' | 'rating') => void;
  totalCount: number;
  onReset: () => void;
}

const MEDICINE_FORMS = [
  'الكل',
  'أقراص',
  'كبسولات',
  'شراب',
  'كريم',
  'جل موضعي',
  'قطرات',
  'بخاخ استنشاق',
  'بخاخ',
  'أقراص فوارة',
  'جهاز طبي',
  'سيروم (قطرات)'
];

export const PharmacyFilters: React.FC<PharmacyFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  requiresRxFilter,
  onToggleRxFilter,
  selectedForm,
  onSelectForm,
  sortBy,
  onSortChange,
  totalCount,
  onReset
}) => {
  const hasActiveFilters = selectedCategory !== 'all' || requiresRxFilter !== null || selectedForm !== 'الكل' || sortBy !== 'popular';

  return (
    <div className="pharmacy-filters-wrapper">
      {/* Category Pills Slider */}
      <div className="category-pills-row">
        <button 
          className={`cat-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          <span>جميع الأدوية</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.slug)}
          >
            <span>{cat.name}</span>
            <span className="cat-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Secondary Filter Bar */}
      <div className="filter-controls-bar">
        {/* Prescription Type Toggle */}
        <div className="filter-pill-group">
          <span className="filter-group-label">نوع الصرف:</span>
          <button 
            className={`sub-filter-btn ${requiresRxFilter === null ? 'active' : ''}`}
            onClick={() => onToggleRxFilter(null)}
          >
            الكل
          </button>
          <button 
            className={`sub-filter-btn ${requiresRxFilter === false ? 'active' : ''}`}
            onClick={() => onToggleRxFilter(false)}
          >
            بدون وصفة OTC
          </button>
          <button 
            className={`sub-filter-btn ${requiresRxFilter === true ? 'active' : ''}`}
            onClick={() => onToggleRxFilter(true)}
          >
            يستلزم وصفة Rx
          </button>
        </div>

        {/* Form Selector */}
        <div className="filter-pill-group">
          <span className="filter-group-label">شكل الدواء:</span>
          <select 
            value={selectedForm} 
            onChange={(e) => onSelectForm(e.target.value)}
            className="form-select-dropdown"
          >
            {MEDICINE_FORMS.map(form => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
        </div>

        {/* Sort & Count */}
        <div className="sort-count-group">
          <span className="results-count-text">
            <strong>{totalCount}</strong> دواء متاح
          </span>

          <div className="sort-dropdown-wrap">
            <SlidersHorizontal size={14} className="text-secondary" />
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value as 'popular' | 'price-asc' | 'price-desc' | 'rating')}
              className="sort-select"
            >
              <option value="popular">الأكثر شيوعاً</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className="btn-reset-filters" onClick={onReset} title="إعادة تعيين الفلاتر">
              <RotateCcw size={13} />
              <span>إعادة تعيين</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .pharmacy-filters-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .category-pills-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }

        .category-pills-row::-webkit-scrollbar {
          display: none;
        }

        .cat-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 700;
          white-space: nowrap;
          background: var(--white);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
        }

        .cat-pill-btn:hover {
          border-color: var(--primary-green);
          color: var(--hover-green);
          background: var(--light-green-bg);
        }

        .cat-pill-btn.active {
          background: var(--primary-green);
          border-color: var(--primary-green);
          color: var(--white);
          box-shadow: var(--shadow-green);
        }

        .cat-count {
          font-size: 0.73rem;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.07);
        }

        .cat-pill-btn.active .cat-count {
          background: rgba(255, 255, 255, 0.25);
          color: var(--white);
        }

        .filter-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          background: var(--white);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }

        .filter-pill-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-group-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .sub-filter-btn {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: var(--bg-slate);
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
          white-space: nowrap;
        }

        .sub-filter-btn:hover {
          color: var(--text-primary);
          border-color: #cbd5e1;
        }

        .sub-filter-btn.active {
          background: var(--light-green-bg);
          border-color: var(--primary-green);
          color: var(--hover-green);
        }

        .form-select-dropdown, .sort-select {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--white);
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          font-family: var(--font-family);
        }

        .form-select-dropdown:focus, .sort-select:focus {
          border-color: var(--primary-green);
        }

        .sort-count-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-right: auto;
        }

        .results-count-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .sort-dropdown-wrap {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-reset-filters {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-red);
          background: #FEE2E2;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          font-family: var(--font-family);
        }

        .btn-reset-filters:hover {
          background: #FECACA;
        }
      `}</style>
    </div>
  );
};
