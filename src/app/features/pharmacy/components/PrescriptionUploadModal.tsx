import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { pharmacyService } from '../services/pharmacy.service';
import confetti from 'canvas-confetti';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMedicineName?: string;
  onSuccess: (prescriptionId: string) => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  preselectedMedicineName,
  onSuccess
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState(preselectedMedicineName ? `Prescription requested for ${preselectedMedicineName}` : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStep, setUploadStep] = useState<'form' | 'scanning' | 'verified'>('form');

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please provide patient name and phone number.');
      return;
    }

    setIsProcessing(true);
    setUploadStep('scanning');

    // Simulate AI Rx Scanner & Pharmacist Verification Step
    setTimeout(() => {
      const rx = pharmacyService.uploadPrescription({
        patientName,
        patientPhone,
        fileName: selectedFile ? selectedFile.name : 'digital_prescription_sample.pdf',
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
        insuranceProvider: insuranceProvider || undefined,
        insuranceNumber: insuranceNumber || undefined
      });

      setIsProcessing(false);
      setUploadStep('verified');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#059669', '#34D399', '#6EE7B7']
        });
      } catch {
        // ignore if canvas not supported
      }

      setTimeout(() => {
        onSuccess(rx.id);
      }, 1800);
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="upload-modal-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="upload-modal-header">
          <div className="header-icon-title">
            <div className="rx-icon-badge">
              <FileText size={22} />
            </div>
            <div>
              <h2>Upload Medical Prescription</h2>
              <p className="subtitle">Certified pharmacist verification in under 5 minutes</p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {uploadStep === 'form' && (
          <form onSubmit={handleSubmit} className="upload-form">
            {/* File Dropzone */}
            <div 
              className={`dropzone-area ${selectedFile ? 'has-file' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <input 
                type="file" 
                id="prescription-file" 
                accept="image/*,.pdf" 
                className="hidden-file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="prescription-file" className="dropzone-label">
                {selectedFile ? (
                  <div className="file-preview-card">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                    <div>
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-meta">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI verification</p>
                    </div>
                    <span className="change-btn">Change</span>
                  </div>
                ) : (
                  <>
                    <div className="upload-circle-icon">
                      <UploadCloud size={30} />
                    </div>
                    <p className="dropzone-primary-text">
                      Drag & Drop prescription photo or PDF here, or <span>Browse</span>
                    </p>
                    <p className="dropzone-subtext">
                      Supports JPG, PNG, PDF (Up to 15MB). Clear photos of handwritten or printed prescriptions.
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Form Fields Grid */}
            <div className="form-grid">
              <div className="input-group">
                <label>Patient Full Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Jenkins"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number (for SMS confirmation) <span className="req">*</span></label>
                <input 
                  type="tel" 
                  placeholder="e.g. +966 50 123 4567"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Insurance Provider (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bupa / Tawuniya / Medgulf"
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Member ID / Policy No. (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. POL-892147-X"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="input-group full-width">
              <label>Special Instructions / Notes for Pharmacist</label>
              <textarea 
                rows={2}
                placeholder="Mention any allergies, generic preference, or dosage schedule questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Benefits Trust Row */}
            <div className="trust-strip">
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>HIPAA & MOH Compliant Data Privacy</span>
              </div>
              <div className="trust-item">
                <Clock size={16} />
                <span>30-Min Fast Track Dispatch</span>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isProcessing}
              >
                <Sparkles size={18} />
                <span>Submit Prescription for Instant Review</span>
              </button>
            </div>
          </form>
        )}

        {uploadStep === 'scanning' && (
          <div className="scanning-state">
            <div className="scanner-radar">
              <div className="radar-circle"></div>
              <FileText size={48} className="radar-icon" />
            </div>
            <h3>Analyzing Prescription...</h3>
            <p>Our Pharmacist AI and clinical team are parsing medication dosages and verifying insurance eligibility.</p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill"></div>
            </div>
          </div>
        )}

        {uploadStep === 'verified' && (
          <div className="verified-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} />
            </div>
            <h3>Prescription Approved!</h3>
            <p>Your prescription has been reviewed and verified by Dr. Tariq on duty. Added to your checkout queue.</p>
            <div className="verified-details-card">
              <div className="card-item">
                <Building2 size={16} />
                <span>City General Health Clinic — Dr. Tariq Al-Mansoor</span>
              </div>
              <div className="verified-badges">
                <span className="badge badge-green">Prescription Validated</span>
                <span className="badge badge-otc">Express Delivery Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .upload-modal-box {
          background: var(--white);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 620px;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--border-light);
          overflow: hidden;
        }

        .upload-modal-header {
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FAFAFA;
        }

        .header-icon-title {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .rx-icon-badge {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: var(--light-green-bg);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-modal-header h2 {
          font-size: 1.2rem;
          margin: 0;
        }

        .upload-modal-header .subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.1rem;
        }

        .close-btn {
          color: var(--text-secondary);
          padding: 0.4rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        .close-btn:hover {
          background: var(--bg-muted);
          color: var(--text-primary);
        }

        .upload-form {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .dropzone-area {
          border: 2px dashed #CBD5E1;
          background: var(--light-green-bg);
          border-radius: var(--radius-lg);
          padding: 1.5rem 1.25rem;
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .dropzone-area:hover, .dropzone-area.has-file {
          border-color: var(--primary-green);
          background: #E6FBF3;
        }

        .hidden-file-input {
          display: none;
        }

        .dropzone-label {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .upload-circle-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          background: var(--white);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .dropzone-primary-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dropzone-primary-text span {
          color: var(--primary-green);
          text-decoration: underline;
        }

        .dropzone-subtext {
          font-size: 0.75rem;
          color: var(--text-secondary);
          max-width: 400px;
        }

        .file-preview-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--white);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(16, 185, 129, 0.3);
          width: 100%;
          text-align: left;
        }

        .file-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .file-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .change-btn {
          margin-left: auto;
          font-size: 0.8rem;
          color: var(--primary-green);
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .input-group.full-width {
          grid-column: 1 / -1;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .input-group .req {
          color: var(--accent-red);
        }

        .input-group input, .input-group textarea {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          font-size: 0.875rem;
          outline: none;
          transition: border var(--transition-fast);
        }

        .input-group input:focus, .input-group textarea:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .trust-strip {
          display: flex;
          justify-content: space-between;
          background: var(--bg-slate);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .trust-item svg {
          color: var(--primary-green);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn-cancel {
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          background: var(--bg-muted);
        }

        .btn-cancel:hover {
          background: #E2E8F0;
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.5rem;
          border-radius: var(--radius-md);
          background: var(--primary-green);
          color: var(--white);
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: var(--shadow-green);
          transition: all var(--transition-fast);
        }

        .btn-submit:hover {
          background: var(--hover-green);
        }

        /* Scanning State */
        .scanning-state, .verified-state {
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .scanner-radar {
          position: relative;
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light-green-bg);
          border-radius: var(--radius-full);
          color: var(--primary-green);
        }

        .radar-circle {
          position: absolute;
          inset: -6px;
          border: 2px solid var(--primary-green);
          border-radius: var(--radius-full);
          animation: pulseGlow 1.5s infinite;
        }

        .progress-bar-container {
          width: 240px;
          height: 6px;
          background: var(--border-light);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--primary-green);
          border-radius: var(--radius-full);
          animation: loadProgress 2s ease-in-out forwards;
        }

        @keyframes loadProgress {
          0% { width: 10%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .verified-state .success-icon-wrap {
          color: var(--primary-green);
          animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scaleUp {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .verified-details-card {
          background: var(--light-green-bg);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          text-align: left;
          width: 100%;
          max-width: 440px;
        }

        .card-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .verified-badges {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};
