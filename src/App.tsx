import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Scissors,
  Sparkles,
  Star,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Car,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react';
import logo from '../Images/Logo.png';
import premiumGroomingImage from '../Images/Grooming.jpeg';
import heroSlideOne from '../Images/Gallery/Images/1 (3).jpeg';
import heroSlideTwo from '../Images/Gallery/Images/1 (14).jpeg';
import heroSlideThree from '../Images/Gallery/Images/1 (22).jpeg';
import { craftImages, craftHighlight, craftVideos } from './galleryData';

const statsData = [
  { label: 'Expert Barbers', value: 10, suffix: '+' },
  { label: 'Years of Experience', value: 15, suffix: '+' },
  { label: 'Satisfied Clients', value: 5000, suffix: '+' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('Haircut - NPR 250');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('9:00 AM');
  const [statValues, setStatValues] = useState(statsData.map(() => 0));
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsAnimatedRef = useRef(false);

  const heroSlides = [premiumGroomingImage, heroSlideOne, heroSlideTwo, heroSlideThree];

  const serviceMenu = [
    { name: 'Haircut', price: 'NPR 250' },
    { name: 'Beard', price: 'NPR 150' },
    { name: 'Hair wash with Hair setting', price: 'NPR 150' },
    { name: 'Haircut + Beard + Hair wash + Hair setting (Combo)', price: 'NPR 500' },
    { name: 'Face Bleach', price: 'NPR 700' },
    { name: 'Facial', price: 'NPR 1200' },
    { name: 'Face Wash', price: 'NPR 500' },
    { name: 'Cleansing', price: 'NPR 500' },
    { name: 'Black Colour with Hair Wash', price: 'NPR 600' },
    { name: 'Threading', price: 'NPR 100' },
    { name: 'Hair Highlight', price: 'NPR 1000 to 1600' },
    { name: 'Hair Straight', price: 'As per Length (NPR 1800 to 4000)' },
    { name: 'Hair Treatment', price: 'NPR 650 to 800 (As per Length)' },
    { name: 'Hair deadlock', price: 'NPR 12000 to 25000' },
    { name: 'Hair Curly', price: 'NPR 3500 to 7000' },
    { name: 'Hair Keratin', price: 'NPR 1800 to 4000' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [heroSlides.length, reducedMotion]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const node = statsRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setStatValues(statsData.map((stat) => stat.value));
      return;
    }

    const animateStats = () => {
      const duration = 1400;
      const start = performance.now();
      const targets = statsData.map((stat) => stat.value);

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setStatValues(targets.map((value) => Math.round(value * eased)));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimatedRef.current) {
            statsAnimatedRef.current = true;
            animateStats();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleBookingClick = () => {
    const whatsappNumber = '9779808488490';
    const message = [
      'New booking request from the website:',
      `Name: ${bookingName || 'Not provided'}`,
      `Phone: ${bookingPhone || 'Not provided'}`,
      `Service: ${bookingService || 'Not provided'}`,
      `Preferred date: ${bookingDate || 'Not provided'}`,
      `Preferred time: ${bookingTime || 'Not provided'}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1EB] text-[#1F2A28]">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F6F1EB]/92 shadow-xl backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className={`border-b ${scrolled ? 'border-[#1F2A28]/10' : 'border-white/20'}`}>
          <div
            className={`max-w-6xl mx-auto flex flex-wrap items-center justify-end gap-4 px-6 py-2 text-xs ${
              scrolled ? 'text-[#1F2A28]/70' : 'text-white/75'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Maitidevi, Kathmandu
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Opposite to Maitidevi Temple
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              +977 980-8488490
            </span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A769]/60 bg-white/10">
              <img src={logo} alt="Neyaz Salon logo" className="h-8 w-8 rounded-full object-cover" />
            </div>
            <div>
              <div className={`text-lg sm:text-xl font-playfair font-bold ${scrolled ? 'text-[#1F2A28]' : 'text-white'}`}>
                Neyaz Salon
              </div>
              <div className={`text-[11px] uppercase tracking-[0.3em] ${scrolled ? 'text-[#1F2A28]/60' : 'text-white/70'}`}>
                Best Rated Men's Salon in the Valley
              </div>
            </div>
          </div>
          <nav className={`hidden md:flex items-center text-sm font-medium ${scrolled ? 'text-[#1F2A28]' : 'text-white'}`}>
            <button type="button" onClick={() => handleScrollTo('home')} className="px-4 py-2 transition-colors hover:text-[#C6A769]">Home</button>
            <span className={`h-4 w-px ${scrolled ? 'bg-[#1F2A28]/20' : 'bg-white/30'}`} />
            <button type="button" onClick={() => handleScrollTo('about')} className="px-4 py-2 transition-colors hover:text-[#C6A769]">About Us</button>
            <span className={`h-4 w-px ${scrolled ? 'bg-[#1F2A28]/20' : 'bg-white/30'}`} />
            <button type="button" onClick={() => handleScrollTo('services')} className="px-4 py-2 transition-colors hover:text-[#C6A769]">Services</button>
            <span className={`h-4 w-px ${scrolled ? 'bg-[#1F2A28]/20' : 'bg-white/30'}`} />
            <button type="button" onClick={() => handleScrollTo('gallery')} className="px-4 py-2 transition-colors hover:text-[#C6A769]">Gallery</button>
            <span className={`h-4 w-px ${scrolled ? 'bg-[#1F2A28]/20' : 'bg-white/30'}`} />
            <button type="button" onClick={() => handleScrollTo('contact')} className="px-4 py-2 transition-colors hover:text-[#C6A769]">Contact</button>
          </nav>
          <button
            type="button"
            onClick={() => handleScrollTo('booking')}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? 'bg-[#1F2A28] text-white hover:bg-[#2A3836]'
                : 'bg-white/15 text-white border border-white/40 hover:bg-white/25'
            }`}
          >
            Book Now
          </button>
        </div>
      </header>

      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="flex h-full w-full transition-transform duration-[1400ms] ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div key={`${slide}-${index}`} className="relative h-full min-w-full">
                <img src={slide} alt="Neyaz Salon interior" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="max-w-6xl mx-auto px-6 pt-40 pb-24">
            <div className="max-w-xl text-white reveal">
              <span className="text-[11px] uppercase tracking-[0.4em] text-white/70">Est. 2008</span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold">Neyaz Salon</h1>
              <p className="mt-4 text-base sm:text-lg text-white/80">
                Premium Unisex Salon for Modern Grooming
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => handleScrollTo('booking')}
                  className="bg-gradient-to-r from-[#C6A769] to-[#D4B87E] text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('services')}
                  className="bg-white/15 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold border border-white/40 hover:bg-white/25 transition-all duration-300"
                >
                  View Services
                </button>
              </div>
              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs text-white/75">
                <Car className="h-4 w-4 text-[#C6A769]" />
                Car & Bike Parking Available
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">About</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-4">Crafted for Modern Gentlemen</h2>
            <p className="text-lg text-[#1F2A28]/70 mt-4 max-w-2xl mx-auto">
              A calm, premium space designed for elevated grooming, sharp detail, and consistent excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#F6F1EB] to-[#E8DED2] rounded-2xl p-6 hover:shadow-xl transition-all duration-500 reveal">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-xl flex items-center justify-center mb-4">
                <Award className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Excellence</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed">
                Over 15 years of mastering the craft of premium grooming, serving discerning gentlemen who appreciate quality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F6F1EB] to-[#E8DED2] rounded-2xl p-6 hover:shadow-xl transition-all duration-500 reveal">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Luxury</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed">
                Premium products, elegant atmosphere, and personalized attention create an unmatched grooming experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F6F1EB] to-[#E8DED2] rounded-2xl p-6 hover:shadow-xl transition-all duration-500 reveal">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-xl flex items-center justify-center mb-4">
                <Star className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Hygiene</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed">
                Impeccable cleanliness standards and sterilization protocols ensure your safety and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F6F1EB]">
        <div className="max-w-6xl mx-auto" ref={statsRef}>
          <div className="text-center mb-12 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Our Legacy</span>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold mt-4">Numbers That Speak</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <div key={stat.label} className="bg-white rounded-3xl p-10 text-center shadow-xl border border-[#C6A769]/10 reveal">
                <div className="text-5xl md:text-6xl font-playfair font-bold text-[#1F2A28]">
                  {statValues[index]}{stat.suffix}
                </div>
                <p className="mt-4 text-[#1F2A28]/70 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-[#F6F1EB] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A769]/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Our Services</span>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mt-4 mb-6">Premium Offerings</h2>
            <p className="text-xl text-[#1F2A28]/70 max-w-2xl mx-auto">
              Curated services designed for the modern gentleman
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-[#F6F1EB] rounded-3xl p-10 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-[#C6A769]/10 reveal">
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={craftImages[0]?.src ?? premiumGroomingImage}
                  alt="Signature haircut"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Scissors className="text-white w-10 h-10" />
              </div>
              <h3 className="text-3xl font-playfair font-bold mb-4">Signature Haircut</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed mb-8">
                Precision cutting techniques tailored to your face shape and personal style. Includes consultation and styling.
              </p>
              <button
                type="button"
                onClick={() => handleScrollTo('booking')}
                className="text-[#C6A769] font-semibold group-hover:gap-3 flex items-center gap-2 transition-all"
              >
                Book Your Slot
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="group bg-gradient-to-br from-white to-[#F6F1EB] rounded-3xl p-10 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-[#C6A769]/10 reveal">
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={craftImages[1]?.src ?? premiumGroomingImage}
                  alt="Beard styling"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="text-white w-10 h-10" />
              </div>
              <h3 className="text-3xl font-playfair font-bold mb-4">Beard Styling</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed mb-8">
                Expert beard shaping and grooming with hot towel treatment. Premium oils and balms included.
              </p>
              <button
                type="button"
                onClick={() => handleScrollTo('booking')}
                className="text-[#C6A769] font-semibold group-hover:gap-3 flex items-center gap-2 transition-all"
              >
                Book Your Slot
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="group bg-gradient-to-br from-white to-[#F6F1EB] rounded-3xl p-10 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-[#C6A769]/10 reveal">
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={premiumGroomingImage}
                  alt="Premium grooming"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-[#C6A769] to-[#D4B87E] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Award className="text-white w-10 h-10" />
              </div>
              <h3 className="text-3xl font-playfair font-bold mb-4">Premium Grooming</h3>
              <p className="text-[#1F2A28]/70 leading-relaxed mb-8">
                The complete experience. Haircut, beard styling, facial treatment, and relaxation massage.
              </p>
              <button
                type="button"
                onClick={() => handleScrollTo('booking')}
                className="text-[#C6A769] font-semibold group-hover:gap-3 flex items-center gap-2 transition-all"
              >
                Book Your Slot
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Gallery</span>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mt-4">Our Craft</h2>
            <p className="text-lg text-[#1F2A28]/70 mt-5 max-w-2xl mx-auto">
              A curated sequence of textures, silhouettes, and in-chair details.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {craftImages.map((item) => (
              <div key={item.src} className="group relative aspect-square rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 reveal">
                <img src={item.src} alt={item.label} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A28]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 reveal">
            <div className="relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] shadow-2xl">
              <img src={craftHighlight.src} alt={craftHighlight.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A28]/90 via-[#1F2A28]/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 sm:p-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#D4B87E]">See More</p>
                  <h3 className="text-3xl sm:text-4xl font-playfair font-bold text-white mt-3">
                    {craftHighlight.title}
                  </h3>
                  <p className="text-white/80 max-w-xl mt-3">
                    {craftHighlight.description}
                  </p>
                </div>
                <Link
                  to="/gallery"
                  className="w-fit bg-white text-[#1F2A28] px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  See More Looks
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6 reveal">
              <div>
                <p className="text-sm uppercase tracking-wider text-[#C6A769] font-semibold">In Motion</p>
                <h3 className="text-3xl md:text-4xl font-playfair font-bold mt-2">Craft Videos</h3>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[#1F2A28]/60">
                Tap any reel to view details.
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {craftVideos.map((video) => (
                <div key={video.label} className="group relative overflow-hidden rounded-3xl border border-[#C6A769]/15 bg-[#F6F1EB] shadow-xl reveal">
                  <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                    <video
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A28]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white text-lg font-semibold">{video.label}</div>
                    <p className="text-white/70 text-sm mt-1">Short reel from the Salon floor.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 px-6 bg-[#F6F1EB]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Book Your Visit</span>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mt-4 mb-6">Reserve Your Slot</h2>
            <p className="text-xl text-[#1F2A28]/70">
              Experience luxury grooming at your convenience
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-[#C6A769]/10 reveal">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-[#1F2A28]/80">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-[#1F2A28]/10 focus:border-[#C6A769] outline-none transition-colors bg-white"
                      placeholder="John Doe"
                      value={bookingName}
                      onChange={(event) => setBookingName(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#1F2A28]/80">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-[#1F2A28]/10 focus:border-[#C6A769] outline-none transition-colors bg-white"
                      placeholder="+977 980-8488490"
                      value={bookingPhone}
                      onChange={(event) => setBookingPhone(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#1F2A28]/80">Service</label>
                    <select
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-[#1F2A28]/10 focus:border-[#C6A769] outline-none transition-colors bg-white"
                      value={bookingService}
                      onChange={(event) => setBookingService(event.target.value)}
                    >
                      {serviceMenu.map((service) => (
                        <option key={service.name}>
                          {service.name} - {service.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#1F2A28]/80">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-[#1F2A28]/10 focus:border-[#C6A769] outline-none transition-colors bg-white"
                      value={bookingDate}
                      onChange={(event) => setBookingDate(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#1F2A28]/80">Preferred Time</label>
                    <select
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-[#1F2A28]/10 focus:border-[#C6A769] outline-none transition-colors bg-white"
                      value={bookingTime}
                      onChange={(event) => setBookingTime(event.target.value)}
                    >
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="w-full bg-gradient-to-r from-[#C6A769] to-[#D4B87E] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Book Your Slot
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#F6F1EB]/80 rounded-2xl p-6 border border-[#C6A769]/10">
                  <h3 className="text-xl font-playfair font-bold mb-4">Booking Snapshot</h3>
                  <div className="space-y-3 text-sm text-[#1F2A28]/70">
                    <div className="flex items-center justify-between gap-4">
                      <span>Selected Service</span>
                      <span className="text-right text-[#1F2A28] font-semibold">{bookingService}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Preferred Date</span>
                      <span className="text-[#1F2A28] font-semibold">{bookingDate || 'Choose a date'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Preferred Time</span>
                      <span className="text-[#1F2A28] font-semibold">{bookingTime}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-6 border border-[#1F2A28]/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#1F2A28]/60">Popular Picks</p>
                      <h3 className="text-xl font-playfair font-bold">Quick Menu</h3>
                    </div>
                    <div className="rounded-full bg-[#C6A769]/20 px-3 py-1 text-xs font-semibold text-[#1F2A28]">Updated</div>
                  </div>
                  <div className="space-y-3">
                    {serviceMenu.slice(0, 4).map((service) => (
                      <div key={service.name} className="flex items-center justify-between gap-6 text-sm">
                        <span className="text-[#1F2A28]/80">{service.name}</span>
                        <span className="font-semibold text-[#1F2A28]">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 border border-[#1F2A28]/10 text-sm text-[#1F2A28]/70">
                  <Car className="w-4 h-4 text-[#C6A769]" />
                  Car & Bike Parking Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Google Reviews</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-4">
              Best Rated Men's Salon In Kathmandu Valley
            </h2>
            <p className="mt-5 text-lg text-[#1F2A28]/70">4.9/5 Rated on Google Reviews</p>
            <a
              href="https://www.google.com/search?sxsrf=ANbL-n5bfmpaG8bleKbYKgpw7yj9lcGqXA:1774787722889&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUV-O-G1odEiK4nPUUGUf0wRnPX6SCOHdO6F5zYy5_IrnxkmXmUb7aF_Uig42WzzQwA-Q2z2Bu7kNqgxRlGhLgpBHSyOP1ZWZXtKJUt2LvWm_PAwSQ%3D%3D&q=The+neyaz+saloon+Reviews"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C6A769]/30 px-5 py-2 text-sm font-semibold text-[#1F2A28] hover:bg-[#C6A769]/10 transition-all"
            >
              View Google Reviews
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arman Reza", role: "IT Security, TU", text: "Impeccable service and a calm, premium vibe. My cut was sharp, clean, and exactly what I asked for." },
              { name: "Sonu Kumar Maurya", role: "CEO & Founder, ZIEC Consultancy", text: "Friendly staff and true attention to detail. The grooming felt luxurious without being rushed." },
              { name: "Dipesh Thapa", role: "Student, KIST College", text: "Outstanding craftsmanship every visit. The finish is precise, and the experience is consistently relaxing." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#F6F1EB] to-[#E8DED2] rounded-3xl p-10 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 reveal">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#C6A769] fill-[#C6A769]" />
                  ))}
                </div>
                <p className="text-[#1F2A28]/80 leading-relaxed mb-8 text-lg">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-[#1F2A28]/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-gradient-to-br from-[#1F2A28] to-[#2A3836] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C6A769] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C6A769] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative reveal">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6">
            Classic Cuts.<br />Modern Looks.
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Experience the perfect fusion of timeless barbering tradition and contemporary style.
          </p>
          <button
            type="button"
            onClick={() => handleScrollTo('booking')}
            className="bg-gradient-to-r from-[#C6A769] to-[#D4B87E] text-white px-12 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-[#F6F1EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="text-[#C6A769] font-semibold text-sm tracking-wider uppercase">Visit Us</span>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mt-4">Find The Salon</h2>
            <p className="text-xl text-[#1F2A28]/70 mt-4">A calm, refined space in the heart of the city.</p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#C6A769]/20 reveal">
              <iframe
                title="The Neyaz Salon location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28258.87836300308!2d85.29561996459962!3d27.706175347247026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199ef6d98e2d%3A0x736556f3a203a626!2sThe%20neyaz%20saloon!5e0!3m2!1sen!2snp!4v1770459333215!5m2!1sen!2snp"
                className="w-full h-[420px] md:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-[#C6A769]/10 flex flex-col justify-between reveal">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#C6A769]/15 px-4 py-2 text-sm font-semibold text-[#1F2A28]">
                  <MapPin className="w-4 h-4" />
                  Prime Location
                </div>
                <h3 className="text-3xl font-playfair font-bold mt-6 mb-4">The Neyaz Salon</h3>
                <p className="text-[#1F2A28]/70 leading-relaxed">
                  Maitidevi, Kathmandu. Easy to reach, with a calm, elegant atmosphere just off the main road.
                </p>
              </div>

              <div className="mt-10 space-y-4 text-[#1F2A28]/70">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C6A769]" />
                  <span>Daily: 7:30 AM - 9:30 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C6A769]" />
                  <span>+977 980-8488490</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C6A769]" />
                  <span>neyazsalon@gmail.com</span>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=The%20Neyaz%20Salon%2C%20Maitidevi%2C%20Kathmandu"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#C6A769] to-[#D4B87E] text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1F2A28] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src={logo} alt="The Neyaz Salon logo" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-2xl font-playfair font-bold">The Neyaz Salon</div>
              </div>
              <p className="text-white/60 leading-relaxed">
                Premium grooming experience for the modern gentleman.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-white/60 hover:text-[#C6A769] transition-colors">Message from Owner</Link>
                <a href="#reviews" className="block text-white/60 hover:text-[#C6A769] transition-colors">Client Reviews</a>
                <a href="#gallery" className="block text-white/60 hover:text-[#C6A769] transition-colors">Gallery</a>
                <a href="#contact" className="block text-white/60 hover:text-[#C6A769] transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Hours</h4>
              <div className="space-y-3 text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Daily: 7:30 AM - 9:30 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <div className="space-y-3 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Maitidevi, Kathmandu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+977 980-8488490</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>theneyazsalon@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">
              © 2026 The Neyaz Salon. All rights reserved. Website designed by{' '}
              <a
                href="https://www.linkedin.com/in/armanxreza"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-[#C6A769] transition-colors"
              >
                Arman Reza
              </a>{' '}
              with ❤️.
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/theneyazsalon?igsh=MTIweXpubXdpOTJoYw==" className="text-white/60 hover:text-[#C6A769] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#C6A769] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#C6A769] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
