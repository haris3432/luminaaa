import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Compass, Calendar, Check } from 'lucide-react';

export const AtelierMap: React.FC = () => {
  const [appointmentRequested, setAppointmentRequested] = useState(false);

  return (
    <section id="atelier" className="py-16 sm:py-20 bg-[#F3EDE3]/60 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7355] block mb-1.5">
            Private Studio &amp; Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal mb-3 tracking-tight">
            Visit the Solaria Atelier
          </h2>
          <p className="text-xs sm:text-sm text-[#5E564D] leading-relaxed">
            Experience our fine jewelry and luxury prêt accessories in person, test custom ring sizing, or reserve a complimentary private styling consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Atelier Details Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EAE3D9] space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C7355] bg-[#F3EDE3] px-2.5 py-1">
                Flagship Studio
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1B18] mt-3 mb-2">
                Gulberg III, Lahore
              </h3>
              <p className="text-xs text-[#5E564D] leading-relaxed">
                Level 2, Solaria Private Suites, M.M. Alam Road, Gulberg III, Lahore, 54000, Pakistan.
              </p>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-[#EFE9E0] text-xs">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1B18] block font-medium">Studio Visiting Hours:</strong>
                  <span className="text-[#5E564D]">Monday to Saturday: 11:30 AM – 8:30 PM PKT</span>
                  <span className="text-[#5E564D] block">Sunday: 2:00 PM – 8:00 PM (By Private RSVP)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1B18] block font-medium">WhatsApp Concierge:</strong>
                  <a
                    href="https://wa.me/923008472910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8C7355] hover:text-[#1E1B18] underline"
                  >
                    +92-300-8472910
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=MM+Alam+Road+Gulberg+III+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#1E1B18] hover:bg-[#332E2A] text-[#FAF8F5] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D8C39E]" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={() => setAppointmentRequested(true)}
                className="flex-1 py-3 px-4 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {appointmentRequested ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>RSVP Requested</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Styling Visit</span>
                  </>
                )}
              </button>
            </div>

            {appointmentRequested && (
              <p className="text-[11px] text-[#5E564D] bg-[#FAF8F5] p-3 border border-[#DED5C8]">
                Thank you! Our Lahore studio concierge has noted your interest. Feel free to message us on WhatsApp (+92-300-8472910) with your preferred time slot.
              </p>
            )}
          </div>

          {/* Interactive Stylized Architectural Map Preview */}
          <div className="lg:col-span-7">
            <div className="relative h-[340px] sm:h-[400px] bg-[#EFE9DF] border border-[#DED5C8] overflow-hidden flex items-center justify-center">
              
              {/* Architectural Grid Lines */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #C8B28E 1px, transparent 1px), linear-gradient(to bottom, #C8B28E 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />

              {/* Stylized Roads */}
              <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-[#FAF8F5]/80 border-y border-[#DED5C8] flex items-center justify-between px-8 text-[10px] tracking-[0.25em] uppercase text-[#8C7355]">
                <span>M.M. Alam Road</span>
                <span>Gulberg III Boulevard</span>
              </div>
              <div className="absolute inset-y-0 left-1/3 w-6 bg-[#FAF8F5]/70 border-x border-[#DED5C8]" />

              {/* Center Atelier Pin Card */}
              <div className="relative z-10 bg-white/95 backdrop-blur-xs p-5 border border-[#C8B28E] shadow-lg max-w-xs text-center">
                <div className="w-10 h-10 rounded-full bg-[#1E1B18] text-[#D8C39E] flex items-center justify-center mx-auto mb-2.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C7355] block">
                  Solaria Flagship
                </span>
                <h4 className="font-serif text-lg text-[#1E1B18] font-normal mt-0.5">
                  Solaria Private Suites
                </h4>
                <p className="text-[11px] text-[#6E6459] mt-1">
                  M.M. Alam Road, Gulberg III, Lahore
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#EFE9E0] flex items-center justify-center gap-1.5 text-[10px] text-[#8C7355]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>31.5102° N, 74.3441° E · Valet Parking Available</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
