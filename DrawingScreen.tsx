import React, { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import type { DrawingTool } from '../types';

interface DrawingScreenProps {
  onBack: () => void;
  onSave: (imageData: string) => void;
}

const tools: { id: DrawingTool; emoji: string; name: string }[] = [
  { id: 'pen', emoji: '✏️', name: 'Kalem' },
  { id: 'brush', emoji: '🖌️', name: 'Fırça' },
  { id: 'eraser', emoji: '🧹', name: 'Silgi' },
  { id: 'fill', emoji: '🪣', name: 'Dolgu' },
  { id: 'shapes', emoji: '⭐', name: 'Şekil' }
];

const colors = [
  { id: 'black', value: '#000000', name: 'Siyah' },
  { id: 'red', value: '#EF4444', name: 'Kırmızı' },
  { id: 'yellow', value: '#F59E0B', name: 'Sarı' },
  { id: 'green', value: '#10B981', name: 'Yeşil' },
  { id: 'blue', value: '#3B82F6', name: 'Mavi' },
  { id: 'purple', value: '#8B5CF6', name: 'Mor' },
  { id: 'pink', value: '#EC4899', name: 'Pembe' }
];

export function DrawingScreen({ onBack, onSave }: DrawingScreenProps) {
  const [currentTool, setCurrentTool] = useState<DrawingTool>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    canvasRef,
    initCanvas,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    hasContent,
    getImageData
  } = useCanvas();

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      initCanvas(rect.width, 400);
    }
  }, [initCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startDrawing(x, y, currentTool, currentColor);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draw(x, y, currentTool, currentColor);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing(x, y, currentTool, currentColor);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw(x, y, currentTool, currentColor);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const handleSave = () => {
    if (!hasContent()) {
      alert('Lütfen önce bir şeyler çizin! 🎨');
      return;
    }
    
    const imageData = getImageData();
    onSave(imageData);
  };

  return (
    <div className="drawing-screen">
      <div className="drawing-header">
        <button onClick={onBack} className="header-back-btn">
          ←
        </button>
        <span>Çizim Yap</span>
        <button onClick={clearCanvas} className="header-clear-btn">
          Temizle
        </button>
      </div>

      <div className="drawing-tools">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-button ${currentTool === tool.id ? 'active' : ''}`}
            onClick={() => setCurrentTool(tool.id)}
            title={tool.name}
          >
            {tool.emoji}
          </button>
        ))}
      </div>

      <div className="color-palette">
        {colors.map((color) => (
          <button
            key={color.id}
            className={`color-button ${currentColor === color.value ? 'active' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => setCurrentColor(color.value)}
            title={color.name}
          />
        ))}
      </div>

      <div ref={containerRef} className="canvas-container">
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      <div className="drawing-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          İptal
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Hikaye Oluştur
        </button>
      </div>
    </div>
  );
}