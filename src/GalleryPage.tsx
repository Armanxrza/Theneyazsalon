import { Link } from 'react-router-dom';
import { fullGalleryImages } from './galleryData';
import logo from '../Images/Logo.png';

function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] text-[#1F2A28]">
      <header className="px-6 pt-12 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#1F2A28]/10 bg-white/70 px-5 py-2 text-sm font-semibold text-[#1F2A28] shadow-sm hover:shadow-lg transition-all"
            >
              Back to Home
            </Link>
          </div>

          <div className="rounded-3xl bg-white/80 border border-[#C6A769]/20 shadow-2xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#C6A769]">Full Gallery</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mt-4">
                  Every Look, Every Detail
                </h1>
                <p className="text-lg text-[#1F2A28]/70 mt-4 max-w-2xl">
                  Explore the complete collection of our studio work, from crisp fades to textured layers.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex sm:hidden items-center gap-2 rounded-full border border-[#1F2A28]/10 bg-white px-5 py-2 text-sm font-semibold text-[#1F2A28] shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {fullGalleryImages.map((item) => (
              <div
                key={item.src}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl border border-[#C6A769]/10"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A28]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white text-sm font-semibold">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GalleryPage;
