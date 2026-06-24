import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Eye, Calendar, X, ChevronLeft, ChevronRight, Image as ImageIcon, Upload, Trash2, Check, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  isAdmin?: boolean;
  gallery?: GalleryItem[];
}

export default function GallerySection({ isAdmin = false, gallery }: GallerySectionProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_gallery_items');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Failed to load gallery items from localStorage', e);
    }
    return GALLERY_ITEMS;
  });

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nature' | 'culture' | 'staff' | 'landmark'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Form State for Gallery Upload
  const [newImage, setNewImage] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<'nature' | 'culture' | 'staff' | 'landmark'>('nature');
  const [isDragOver, setIsDragOver] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const itemsToUse = gallery || galleryItems;

  const filteredItems = selectedFilter === 'all' 
    ? itemsToUse 
    : itemsToUse.filter((item) => item.category === selectedFilter);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  // Image Upload Logic
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormError('Please upload an image file (PNG, JPG, etc.).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormError('Image size exceeds 2MB limit. Please upload a smaller image.');
      return;
    }
    setFormError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) {
      setFormError('Please select or upload an image first.');
      return;
    }
    if (!titleInput.trim()) {
      setFormError('Please enter a descriptive photo title.');
      return;
    }
    if (!descInput.trim()) {
      setFormError('Please enter a brief description.');
      return;
    }

    const newItem: GalleryItem = {
      id: `custom-g-${Date.now()}`,
      title: titleInput.trim(),
      category: categoryInput,
      image: newImage,
      description: descInput.trim()
    };

    const updated = [...galleryItems, newItem];
    setGalleryItems(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_gallery_items', JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Storage limit exceeded, keeping in active state:', e);
    }

    // Reset Form
    setNewImage(null);
    setTitleInput('');
    setDescInput('');
    setCategoryInput('nature');
    setFormError('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (galleryItems.length <= 1) {
      setFormError('Keep at least one photo in the gallery.');
      return;
    }
    const updated = galleryItems.filter((item) => item.id !== id);
    setGalleryItems(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_gallery_items', JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Storage failed to write:', e);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Immersive Snapshots
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-white">Visual Gallery</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          <p className="text-neutral-400 mt-4 text-xs sm:text-sm">
            Experience glimpses of tropical forest highlands, Rastafarian ceremonies, and municipal teams.
          </p>
        </div>

        {/* ADMIN GALLERY UPLODER CONTAINER */}
        {isAdmin && (
          <div className="mb-14 p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 backdrop-blur-md max-w-3xl mx-auto space-y-4" id="admin-gallery-uploader">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-bold block flex items-center gap-1.5 border-b border-neutral-800 pb-2.5">
              <Sparkles className="h-4 w-4" /> Legese’s Visual Gallery Portal — Add Tour Asset
            </span>

            {formError && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                ⚠️ {formError}
              </div>
            )}
            {isSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Asset successfully added to the visual showcase!
              </div>
            )}

            <form onSubmit={handleUploadItem} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              {/* Image Input Selection Block */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Image Attachment</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('gallery-file-field')?.click()}
                  className={`border border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all h-[170px] flex flex-col items-center justify-center gap-2 ${
                    isDragOver 
                      ? 'border-orange-500 bg-orange-500/5' 
                      : 'border-neutral-800 bg-neutral-950 hover:border-orange-500/20'
                  }`}
                  id="gallery-drop-box"
                >
                  {newImage ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img src={newImage} alt="Uploaded snapshot preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-neutral-950/60 flex items-center justify-center">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="h-4 w-4" /> Loaded Preview
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-neutral-500" />
                      <p className="text-xs text-neutral-300 font-bold">Drag-and-drop or Browse file</p>
                      <p className="text-[9px] text-neutral-500 font-medium">Max 2MB. Image files only.</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    id="gallery-file-field" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileSelect} 
                  />
                </div>
              </div>

              {/* Data values Block */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">Photo Title</label>
                    <input 
                      type="text"
                      placeholder="E.g., Bamboo Forest Sanctuary"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200 focus:border-orange-500 outline-none transition-colors"
                      id="gallery-title-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">Category</label>
                      <select 
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none cursor-pointer transition-colors"
                        id="gallery-category-field"
                      >
                        <option value="nature">Nature</option>
                        <option value="culture">Culture</option>
                        <option value="staff">Staff</option>
                        <option value="landmark">Landmark</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                        id="gallery-submit-btn"
                      >
                        Publish Photo
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Provide a historical, cultural or scenic background outline of the captured item..."
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200 focus:border-orange-500 outline-none resize-none transition-colors"
                    id="gallery-desc-field"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="gallery-filter">
          {(['all', 'nature', 'culture', 'staff', 'landmark'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg border uppercase tracking-wider transition-all cursor-pointer ${
                selectedFilter === cat 
                  ? 'bg-orange-600 border-orange-500 text-white shadow' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>


        {/* Gallery grid mapping */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-neutral-900 hover:border-orange-500/30 shadow-lg block bg-neutral-900"
                id={`gallery-item-${item.id}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {isAdmin && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-4 right-4 z-20 p-2 bg-neutral-950/80 hover:bg-red-600/90 border border-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all"
                    title="Delete Photo"
                    id={`btn-delete-item-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-neutral-950/80 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-orange-400 font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono mt-3">
                    <Eye className="h-3.5 w-3.5" /> Tap to enlarge photo
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / image viewer sliding modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div 
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close button relative upper right */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Slider content row */}
              <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-6">
                
                {/* Prev trigger icon */}
                <button
                  onClick={handlePrevPhoto}
                  className="h-10 w-10 text-white hover:text-orange-400 transition-colors flex items-center justify-center bg-neutral-900/40 hover:bg-neutral-900 rounded-full border border-neutral-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Core slide container */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-grow max-h-[70vh] flex flex-col items-center justify-center relative bg-neutral-950/40 rounded-3xl overflow-hidden p-2"
                >
                  <img 
                    src={filteredItems[lightboxIndex].image} 
                    alt={filteredItems[lightboxIndex].title} 
                    className="max-h-[60vh] max-w-full rounded-2xl object-contain drop-shadow-2xl border border-neutral-900"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Backdrop subtitle caption */}
                  <div className="mt-4 text-center max-w-2xl px-4">
                    <span className="text-[9px] font-mono tracking-widest text-orange-500 uppercase font-bold block">
                      {filteredItems[lightboxIndex].category}
                    </span>
                    <h3 className="text-lg font-bold mt-1 text-white">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-normal mt-1 font-sans">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  </div>
                </motion.div>

                {/* Next trigger icon */}
                <button
                  onClick={handleNextPhoto}
                  className="h-10 w-10 text-white hover:text-orange-400 transition-colors flex items-center justify-center bg-neutral-900/40 hover:bg-neutral-900 rounded-full border border-neutral-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

              </div>

              {/* Photo statistics footer info row */}
              <div className="mt-6 flex items-center gap-2 bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-800 text-[10px] font-mono text-neutral-400">
                <ImageIcon className="h-4 w-4 text-orange-400" />
                <span>PHOTO {lightboxIndex + 1} OF {filteredItems.length}</span>
                <span>• Camera: 35mm Analog Simulator</span>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
