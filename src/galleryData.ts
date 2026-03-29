const imageImports = import.meta.glob('../Images/Gallery/Images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sortedImageEntries = Object.entries(imageImports).sort(([pathA], [pathB]) =>
  pathA.localeCompare(pathB, undefined, { numeric: true })
);

export const fullGalleryImages = sortedImageEntries.map(([path, src], index) => ({
  src,
  label: `Look ${String(index + 1).padStart(2, '0')}`,
  alt: `Gallery look ${index + 1}`,
}));

const craftLabels = [
  'Sleek Silhouette',
  'Clean Lines',
  'Soft Texture',
  'Crisp Finish',
  'Studio Detail',
  'Refined Edge',
  'Soft Layer',
  'Clean Texture',
];

export const craftImages = fullGalleryImages.slice(0, 8).map((item, index) => ({
  ...item,
  label: craftLabels[index] ?? item.label,
}));

const highlightIndex = Math.min(17, Math.max(fullGalleryImages.length - 1, 0));

export const craftHighlight = {
  src: fullGalleryImages[highlightIndex]?.src ?? '',
  title: 'Studio Signature Series',
  description: 'More looks from the floor, the chair, and the craft in motion.',
};

const craftVideoSources = [
  new URL('../Images/Gallery/Videos/HeroVideo5.mp4', import.meta.url).href,
  new URL('../Images/Gallery/Videos/HeroVideo2.mp4', import.meta.url).href,
  new URL('../Images/Gallery/Videos/HeroVideo3.mp4', import.meta.url).href,
];

export const craftVideos = [
  { src: craftVideoSources[0], label: 'V Fade' },
  { src: craftVideoSources[1], label: 'Fresh Hair Cut' },
  { src: craftVideoSources[2], label: 'Mid Fade' },
];
