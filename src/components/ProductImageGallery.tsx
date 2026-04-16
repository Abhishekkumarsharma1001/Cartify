import { useState, useRef } from "react";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
  badge?: string;
  discount?: number;
}

export default function ProductImageGallery({ images, name, badge, discount }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image with zoom */}
      <div
        ref={imageRef}
        className="relative aspect-square rounded-2xl overflow-hidden bg-secondary cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[selectedIndex]}
          alt={`${name} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300"
          style={isZoomed ? {
            transform: "scale(2)",
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          } : undefined}
          draggable={false}
        />
        {badge && (
          <span className={`absolute top-4 left-4 ${badge === "sale" ? "badge-sale" : badge === "new" ? "badge-new" : "badge-new"} text-sm px-3 py-1 z-10`}>
            {badge === "sale" ? `-${discount}%` : badge === "new" ? "New" : "Best Seller"}
          </span>
        )}
        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === selectedIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
