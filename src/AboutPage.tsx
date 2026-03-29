import { Link } from 'react-router-dom';
import logo from '../Images/Logo.png';
import ownerPhoto from '../Images/ArmanFace.jpg';

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] text-[#1F2A28]">
      <header className="px-6 pt-8 pb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="The Neyaz Salon logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="text-xl font-playfair font-bold text-[#1F2A28]">The Neyaz Salon</div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#1F2A28]/10 bg-white/70 px-5 py-2 text-sm font-semibold text-[#1F2A28] shadow-sm hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[36px] bg-white/80 backdrop-blur-xl border border-[#C6A769]/15 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-0">
              <div className="relative p-10 sm:p-14 flex flex-col justify-between">
                <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-[#C6A769]/20 blur-3xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center rounded-full bg-white border border-[#C6A769]/20 px-4 py-2 text-xs font-semibold text-[#C6A769]">
                    Message from the Owner
                  </div>
                  <h1 className="mt-6 text-4xl sm:text-5xl font-playfair font-bold leading-tight">
                    A personal note of welcome.
                  </h1>
                  <p className="mt-5 text-lg text-[#1F2A28]/70 leading-relaxed">
                    Hello, I am Neyaz. Every detail inside our salon is designed with one goal in
                    mind: to make you feel confident the moment you step out. We take time to
                    listen, recommend what truly fits you, and deliver a premium finish that feels
                    effortless and modern.
                  </p>
                  <p className="mt-5 text-lg text-[#1F2A28]/70 leading-relaxed">
                    Whether you visit for a quick trim or a full grooming session, you will always
                    be welcomed with respect, clean hygiene, and honest care. Thank you for trusting
                    us with your style.
                  </p>
                </div>
                <div className="relative mt-10 flex flex-wrap gap-4">
                  <div className="rounded-2xl border border-[#C6A769]/15 bg-white px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C6A769]">Our Promise</p>
                    <p className="mt-2 text-sm text-[#1F2A28]/70">Clean service, calm space, consistent results.</p>
                  </div>
                  <div className="rounded-2xl border border-[#C6A769]/15 bg-white px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C6A769]">Client First</p>
                    <p className="mt-2 text-sm text-[#1F2A28]/70">Friendly, respectful, and tailored to you.</p>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-[#1F2A28] to-[#2A3836] text-white p-10 sm:p-14 flex flex-col items-center justify-center">
                <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-[#C6A769]/20 blur-3xl"></div>
                <div className="relative">
                  <div className="h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-gradient-to-br from-[#C6A769] to-[#D4B87E] p-1">
                    <img
                      src={ownerPhoto}
                      alt="Neyaz, Owner of The Neyaz Salon"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <h2 className="mt-8 text-3xl font-playfair font-bold">Neyaz</h2>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Owner</p>
                <p className="mt-6 text-center text-white/70 leading-relaxed max-w-sm">
                  Best Rated Men's Salon in the Valley. Thank you for supporting our team and
                  allowing us to be part of your story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-[#1F2A28] to-[#2A3836] text-white p-10 sm:p-14 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#D4B87E]">Visit Us</p>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold mt-4">Experience the difference.</h2>
              <p className="text-white/70 mt-4 max-w-2xl">
                Drop by for a consultation or book your next appointment in just a few clicks.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#C6A769] to-[#D4B87E] text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Book Your Slot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
