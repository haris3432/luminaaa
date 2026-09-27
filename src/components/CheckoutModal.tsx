import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Upload, 
  Copy, 
  Building, 
  Smartphone, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  Truck,
  Sun,
  Sparkles
} from 'lucide-react';
import { CartItem, DeliveryDetails, PaymentMethod, Order } from '../types/jewelry';
import { MANUAL_PAYMENT_CONFIG, CITIES_LIST } from '../data/jewelryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  onOrderConfirmed: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  onOrderConfirmed,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  
  // Delivery details form state
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: '',
    phone: '',
    email: 'example@example.com',
    address: '',
    city: 'Lahore',
    postalCode: '',
    deliveryNotes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Copy helper
  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Screenshot upload
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fill sample proof for immediate testing
  const handleUseSampleProof = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FEF9E7';
      ctx.fillRect(0, 0, 440, 320);
      
      ctx.strokeStyle = '#FCD34D';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, 424, 304);

      ctx.fillStyle = '#1A1916';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('BANK TRANSFER RECEIPT - SOLARIA JEWELRY', 24, 45);
      
      ctx.fillStyle = '#B45309';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`Amount Settled: Rs. ${total.toLocaleString()}`, 24, 85);
      
      ctx.fillStyle = '#37332E';
      ctx.font = '12px sans-serif';
      ctx.fillText(`IBAN: PK36ABCD0001234567890123`, 24, 120);
      ctx.fillText(`Beneficiary: Solaria Jewelry (Pvt) Ltd`, 24, 150);
      ctx.fillText(`Channel: Meezan Bank / Raast Instant`, 24, 180);
      
      ctx.fillStyle = '#15803D';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`Payment Status: SUCCESSFUL / TRANSFERRED`, 24, 220);
      
      ctx.fillStyle = '#D97706';
      const tid = `SOL-${Math.floor(10000000 + Math.random() * 90000000)}`;
      ctx.fillText(`Transaction Ref: ${tid}`, 24, 260);
      
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshotPreview(dataUrl);
      setScreenshotFileName('solaria_payment_receipt.png');
      if (!transactionId) {
        setTransactionId(tid);
      }
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!deliveryDetails.fullName.trim()) errors.fullName = 'Full name is required';
    if (!deliveryDetails.phone.trim()) errors.phone = 'Valid phone number is required';
    if (!deliveryDetails.address.trim()) errors.address = 'Street shipping address is required';
    if (!deliveryDetails.city.trim()) errors.city = 'Please select a delivery city';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // Step 2 Submission & Unique Order ID Generation
  const handleFinalSubmit = () => {
    if (paymentMethod !== 'cod' && !screenshotPreview && !transactionId.trim()) {
      setFormErrors({ payment: 'Please attach a payment screenshot proof or enter your Transaction ID.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Unique generated Order ID popup trigger
      const generatedOrderId = `SOL-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: generatedOrderId,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items,
        subtotal,
        deliveryFee,
        discount,
        total,
        deliveryDetails,
        paymentMethod,
        transactionId: transactionId || (paymentMethod === 'cod' ? 'COD-PAYMENT' : `TID-${Math.floor(10000000 + Math.random() * 90000000)}`),
        paymentProofUrl: screenshotPreview || undefined,
        paymentProofName: screenshotFileName || undefined,
        status: paymentMethod === 'cod' ? 'confirmed' : screenshotPreview ? 'confirmed' : 'pending_verification',
        estimatedDelivery: '2 to 4 Business Days (Express Courier)',
      };

      setIsSubmitting(false);
      onOrderConfirmed(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1916]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FFFDF0] max-w-2xl w-full border-2 border-[#FCD34D] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#FEF9E7] border-b-2 border-[#FDE68A] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B45309] flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-[#D97706]" />
              Secure Checkout · Solaria Fine Jewelry
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1916]">
              {currentStep === 1 ? '1. Shipping & Customer Details' : '2. Payment & Transfer Proof'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 text-[#78350F] hover:text-[#1A1916] rounded-full hover:bg-[#FEF08A] cursor-pointer border border-[#FDE68A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#FEF3C7] px-6 py-3 border-b-2 border-[#FDE68A] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 1 ? 'bg-[#1A1916] text-[#FEF08A]' : 'bg-[#15803D] text-white'
            }`}>
              {currentStep === 2 ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <span className={currentStep === 1 ? 'font-bold text-[#1A1916]' : 'font-semibold text-[#78350F]'}>
              Delivery Info
            </span>
          </div>
          <div className="h-[2px] w-14 bg-[#FCD34D]" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 2 ? 'bg-[#1A1916] text-[#FEF08A]' : 'bg-[#FDE68A] text-[#1A1916]'
            }`}>
              2
            </span>
            <span className={currentStep === 2 ? 'font-bold text-[#1A1916]' : 'font-semibold text-[#78350F]'}>
              Manual Payment & Proof
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {currentStep === 1 ? (
            /* STEP 1: Delivery Details */
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayla Mansoor"
                    value={deliveryDetails.fullName}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, fullName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-[#DC2626] font-bold mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0300 1234567"
                    value={deliveryDetails.phone}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-[#DC2626] font-bold mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  value={deliveryDetails.email}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                  Shipping Address (House, Street, Area) *
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. House 42, Main Boulevard, Phase 6 DHA"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                />
                {formErrors.address && (
                  <span className="text-[11px] text-[#DC2626] font-bold mt-1 block">{formErrors.address}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                    City *
                  </label>
                  <select
                    value={deliveryDetails.city}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-bold text-[#1A1916] cursor-pointer"
                  >
                    {CITIES_LIST.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 54000"
                    value={deliveryDetails.postalCode}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, postalCode: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5">
                  Special Delivery Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call upon arrival / Gift packaging"
                  value={deliveryDetails.deliveryNotes}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, deliveryNotes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-semibold text-[#1A1916]"
                />
              </div>

              {/* Summary Bar */}
              <div className="bg-[#FEF3C7] p-4 border-2 border-[#FCD34D] flex justify-between items-center text-xs shadow-2xs">
                <div>
                  <span className="text-[#524B40] font-semibold">Order Total ({items.length} items):</span>
                  <p className="font-serif text-lg font-bold text-[#B45309] tabular-nums">
                    Rs. {total.toLocaleString()}
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer border border-[#F59E0B] shadow-sm"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4 text-[#FEF08A]" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: MANUAL PAYMENT INTEGRATION (Bank Transfer / JazzCash) */
            <div className="space-y-6">
              
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-2">
                  Choose Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#B45309] bg-[#FEF08A] shadow-xs'
                        : 'border-[#FDE68A] bg-white hover:bg-[#FEF9E7] text-[#524B40]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building className="w-4 h-4 text-[#B45309]" />
                      <span className="text-xs font-bold text-[#1A1916]">Bank Transfer</span>
                    </div>
                    <span className="text-[10px] text-[#78350F] block font-semibold">Direct IBAN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#B45309] bg-[#FEF08A] shadow-xs'
                        : 'border-[#FDE68A] bg-white hover:bg-[#FEF9E7] text-[#524B40]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Smartphone className="w-4 h-4 text-[#DC2626]" />
                      <span className="text-xs font-bold text-[#1A1916]">JazzCash</span>
                    </div>
                    <span className="text-[10px] text-[#78350F] block font-semibold">Mobile Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#B45309] bg-[#FEF08A] shadow-xs'
                        : 'border-[#FDE68A] bg-white hover:bg-[#FEF9E7] text-[#524B40]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Truck className="w-4 h-4 text-[#D97706]" />
                      <span className="text-xs font-bold text-[#1A1916]">Cash on Delivery</span>
                    </div>
                    <span className="text-[10px] text-[#78350F] block font-semibold">Doorstep Pay</span>
                  </button>
                </div>
              </div>

              {/* MANUAL PAYMENT CARD (Bank Transfer / JazzCash with Dummy IBAN PK36ABCD0001234567890123) */}
              {paymentMethod !== 'cod' ? (
                <div className="bg-[#FFFDF5] border-2 border-[#FDE68A] p-5 space-y-4 shadow-sm">
                  
                  {/* Beneficiary Header */}
                  <div className="flex items-start justify-between pb-3 border-b-2 border-[#FDE68A]">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 border border-[#FDE68A]">
                        Official Merchant Account
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#1A1916] mt-1">
                        {MANUAL_PAYMENT_CONFIG.storeTitle}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#78350F] block font-semibold">Amount to Transfer</span>
                      <span className="font-serif text-xl font-bold text-[#B45309] tabular-nums">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Account Box with exact dummy account PK36ABCD0001234567890123 */}
                  <div className="bg-[#FEF3C7] p-4 border-2 border-[#FCD34D] space-y-2 text-xs">
                    {paymentMethod === 'bank_transfer' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Bank Name:</span>
                          <span className="font-bold text-[#1A1916]">{MANUAL_PAYMENT_CONFIG.bank.title}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Account Title:</span>
                          <span className="font-bold text-[#1A1916]">{MANUAL_PAYMENT_CONFIG.bank.accountTitle}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Account IBAN:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-extrabold text-[#1A1916] text-xs sm:text-sm tabular-nums bg-white px-2 py-1 border border-[#FCD34D]">
                              {MANUAL_PAYMENT_CONFIG.bank.iban}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(MANUAL_PAYMENT_CONFIG.bank.iban, 'iban')}
                              className="text-xs bg-[#B45309] hover:bg-[#78350F] text-white px-2 py-1 font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            >
                              {copiedField === 'iban' ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'jazzcash' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Wallet:</span>
                          <span className="font-bold text-[#1A1916]">{MANUAL_PAYMENT_CONFIG.jazzcash.title}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Account Number:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-extrabold text-[#1A1916] text-sm tabular-nums bg-white px-2 py-1 border border-[#FCD34D]">
                              {MANUAL_PAYMENT_CONFIG.jazzcash.accountNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(MANUAL_PAYMENT_CONFIG.jazzcash.accountNumber, 'jc')}
                              className="text-xs bg-[#B45309] hover:bg-[#78350F] text-white px-2 py-1 font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            >
                              {copiedField === 'jc' ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#524B40] font-semibold">Account Title:</span>
                          <span className="font-bold text-[#1A1916]">{MANUAL_PAYMENT_CONFIG.jazzcash.accountName}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                      Step-by-Step Instructions:
                    </h5>
                    <ol className="text-xs text-[#37332E] font-medium space-y-1.5 list-decimal list-inside bg-[#FEF9E7] p-3.5 border border-[#FDE68A]">
                      {MANUAL_PAYMENT_CONFIG.instructions.map((inst, idx) => (
                        <li key={idx} className="leading-relaxed">{inst}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Screenshot upload field for payment proof */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1916]">
                        Screenshot Upload (Payment Proof) *
                      </label>
                      <button
                        type="button"
                        onClick={handleUseSampleProof}
                        className="text-xs text-[#B45309] hover:text-[#78350F] font-extrabold underline cursor-pointer bg-[#FEF08A] px-2 py-1 border border-[#FCD34D] shadow-2xs"
                      >
                        ⚡ Generate Demo Transfer Proof
                      </button>
                    </div>

                    {screenshotPreview ? (
                      <div className="relative border-2 border-[#15803D] bg-[#F0FDF4] p-3.5 flex items-center gap-3">
                        <img
                          src={screenshotPreview}
                          alt="Transfer screenshot proof"
                          className="w-16 h-16 object-cover border border-[#86EFAC] shadow-2xs"
                        />
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-1 text-xs font-bold text-[#15803D]">
                            <Check className="w-4 h-4" />
                            <span>Proof Attached & Verified</span>
                          </div>
                          <p className="text-[11px] font-semibold text-[#166534] truncate mt-0.5">
                            {screenshotFileName}
                          </p>
                          <span className="text-[10px] text-[#4B453C] font-medium">
                            Ready to generate your unique order ID
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setScreenshotPreview(null);
                            setScreenshotFileName('');
                          }}
                          className="text-xs font-bold text-[#DC2626] hover:underline p-1 cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-[#FCD34D] hover:border-[#B45309] bg-white hover:bg-[#FEF9E7] p-5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                        <Upload className="w-7 h-7 text-[#D97706] group-hover:scale-110 transition-transform mb-2" />
                        <span className="text-xs font-bold text-[#1A1916]">
                          Drop transfer screenshot proof here or browse files
                        </span>
                        <span className="text-[11px] text-[#78350F] font-semibold mt-1">
                          PNG, JPG, or PDF (or click "Generate Demo Proof" above)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* TID Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-1">
                      Bank Transaction ID / Ref Number (Optional if screenshot uploaded)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SOL-98472918 or Meezan Ref"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border-2 border-[#FDE68A] focus:outline-none focus:border-[#B45309] font-mono font-bold text-[#1A1916]"
                    />
                  </div>

                </div>
              ) : (
                /* Cash on delivery card */
                <div className="bg-[#FEF3C7] p-5 border-2 border-[#FCD34D] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1916]">
                    <Truck className="w-4 h-4 text-[#D97706]" />
                    <span>Cash on Delivery (COD) Selected</span>
                  </div>
                  <p className="text-xs text-[#37332E] font-medium leading-relaxed">
                    You can pay the full amount of <strong className="text-[#B45309] font-extrabold tabular-nums">Rs. {total.toLocaleString()}</strong> in cash directly to the courier rider upon delivery at your doorstep in {deliveryDetails.city}.
                  </p>
                </div>
              )}

              {/* Form Error */}
              {formErrors.payment && (
                <div className="flex items-center gap-2 p-3 bg-[#FEF2F2] border-2 border-[#FCA5A5] text-xs text-[#DC2626] font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.payment}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-2 border-t-2 border-[#FDE68A] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 border-2 border-[#FDE68A] bg-white hover:bg-[#FEF9E7] text-xs font-bold text-[#1A1916] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Shipping</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#1A1916] hover:bg-[#2C2C2C] disabled:opacity-50 text-[#FFFDF0] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer border-2 border-[#F59E0B]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#FEF08A] border-t-transparent rounded-full animate-spin" />
                      <span>Generating Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Order (Rs. {total.toLocaleString()})</span>
                      <Check className="w-4 h-4 text-[#FEF08A]" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
