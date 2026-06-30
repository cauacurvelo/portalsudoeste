import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  onCrop: (blob: Blob) => void;
  onClose: () => void;
}

export function ImageCropperModal({ imageSrc, onCrop, onClose }: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [imageSrc]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675; // Exactly 16:9 aspect ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const containerRatio = containerWidth / containerHeight;
    const imgRatio = imgWidth / imgHeight;

    let renderW = containerWidth;
    let renderH = containerHeight;
    if (imgRatio > containerRatio) {
      renderW = containerHeight * imgRatio;
    } else {
      renderH = containerWidth / imgRatio;
    }

    const finalW = renderW * zoom;
    const finalH = renderH * zoom;

    const cx = (containerWidth - finalW) / 2 + offset.x;
    const cy = (containerHeight - finalH) / 2 + offset.y;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawScaleX = canvas.width / containerWidth;
    const drawScaleY = canvas.height / containerHeight;

    ctx.drawImage(
      img,
      0, 0, imgWidth, imgHeight,
      cx * drawScaleX, cy * drawScaleY, finalW * drawScaleX, finalH * drawScaleY
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCrop(blob);
        }
      },
      'image/jpeg',
      0.9
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800 text-[14px]">Enquadrar Imagem (16:9)</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col items-center justify-center bg-gray-100 min-h-[300px]">
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full aspect-[16/9] max-w-lg bg-black relative overflow-hidden cursor-move border select-none touch-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop"
              className="pointer-events-none select-none max-w-none absolute origin-center"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              }}
            />
            {/* Overlay grid lines */}
            <div className="absolute inset-0 border border-white/30 pointer-events-none flex flex-col justify-between">
              <div className="border-b border-dashed border-white/20 h-1/3 w-full" />
              <div className="border-b border-dashed border-white/20 h-1/3 w-full" />
            </div>
            <div className="absolute inset-0 pointer-events-none flex justify-between">
              <div className="border-r border-dashed border-white/20 w-1/3 h-full" />
              <div className="border-r border-dashed border-white/20 w-1/3 h-full" />
            </div>
          </div>

          <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1">
            <Move className="w-3.5 h-3.5" /> Arraste a imagem para enquadrar
          </p>

          <div className="w-full max-w-lg mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-[#2271b1] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-gray-400" />
              <span className="text-[12px] text-gray-600 font-mono w-8 text-right">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border rounded-sm hover:bg-gray-100 text-[13px] font-semibold text-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-[#2271b1] text-white px-4 py-1.5 rounded-sm hover:bg-[#135e96] text-[13px] font-semibold"
          >
            Cortar e Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
