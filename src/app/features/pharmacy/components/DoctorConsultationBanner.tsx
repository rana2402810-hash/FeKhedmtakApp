import React from 'react';
import { MessageSquare, PhoneCall, Stethoscope } from 'lucide-react';

interface DoctorConsultationBannerProps {
  onOpenConsultation: () => void;
  onOpenUpload: () => void;
}

export const DoctorConsultationBanner: React.FC<DoctorConsultationBannerProps> = ({
  onOpenConsultation,
  onOpenUpload
}) => {
  return (
    <div className="consultation-banner">
      <div className="banner-glow-circle"></div>
      
      <div className="banner-content">
        <div className="doctor-badge-row">
          <span className="live-status-pill">
            <span className="live-pulse"></span>
            ١٤ صيدلانياً معتمداً متصل الآن
          </span>
          <span className="accredited-tag">مرخص ومعتمد من وزارة الصحة</span>
        </div>

        <h2 className="banner-heading">
          مش متأكد من الجرعة أو التفاعلات الدوائية؟ تحدث مع صيدلاني مجاناً.
        </h2>

        <p className="banner-sub">
          احصل على نصيحة سريرية متخصصة حول سلامة الأدوية، البدائل العلاجية، وإعادة صرف الأدوية المزمنة خلال دقيقتين.
        </p>

        <div className="banner-action-buttons">
          <button className="btn-chat-pharmacist" onClick={onOpenConsultation}>
            <MessageSquare size={18} />
            <span>ابدأ استشارة صيدلانية مباشرة</span>
          </button>

          <button className="btn-upload-direct" onClick={onOpenUpload}>
            <Stethoscope size={18} />
            <span>ارفع وصفة طبية</span>
          </button>
        </div>
      </div>

      <div className="banner-graphic-side">
        <div className="emergency-card">
          <div className="emergency-icon-wrap">
            <PhoneCall size={20} />
          </div>
          <div>
            <span className="emergency-label">خط الطوارئ الطبي ٢٤/٧</span>
            <p className="emergency-phone">٨٠٠ - صيدلية - ٢٤٦٢٢٧٣</p>
          </div>
        </div>
      </div>

      <style>{`
        .consultation-banner {
          background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%);
          border-radius: var(--radius-xl);
          padding: 2.25rem 2.5rem;
          color: var(--white);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 15px 30px -10px rgba(6, 78, 59, 0.4);
        }

        .banner-glow-circle {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, rgba(6, 78, 59, 0) 70%);
          top: -100px;
          right: -50px;
          pointer-events: none;
        }

        .banner-content {
          max-width: 650px;
          z-index: 1;
        }

        .doctor-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.25);
          border: 1px solid rgba(52, 211, 153, 0.4);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: #A7F3D0;
        }

        .live-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.35);
          animation: pulseGlow 2s infinite;
        }

        .accredited-tag {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          padding-right: 0.75rem;
        }

        .banner-heading {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }

        .banner-sub {
          font-size: 0.95rem;
          color: #D1FAE5;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .banner-action-buttons {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .btn-chat-pharmacist {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--white);
          color: #065F46;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-fast);
        }

        .btn-chat-pharmacist:hover {
          background: #ECFDF5;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-upload-direct {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: var(--white);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .btn-upload-direct:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: var(--white);
        }

        .banner-graphic-side {
          z-index: 1;
        }

        .emergency-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
          white-space: nowrap;
        }

        .emergency-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: #34D399;
          color: #064E3B;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emergency-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #A7F3D0;
        }

        .emergency-phone {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--white);
          font-family: var(--font-heading);
        }

        @media (max-width: 900px) {
          .consultation-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
