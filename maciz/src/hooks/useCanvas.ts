import { useRef, useEffect, useCallback } from 'react';
import type { DrawingTool } from '../types';

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);

  const initCanvas = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    
    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const startDrawing = useCallback((x: number, y: number, tool: DrawingTool, color: string) => {
    const context = contextRef.current;
    if (!context) return;

    isDrawingRef.current = true;
    context.beginPath();
    context.moveTo(x, y);

    if (tool === 'fill') {
      fillArea(x, y, color);
      isDrawingRef.current = false;
    } else if (tool === 'shapes') {
      drawShape(x, y, color);
      isDrawingRef.current = false;
    }
  }, []);

  const draw = useCallback((x: number, y: number, tool: DrawingTool, color: string) => {
    if (!isDrawingRef.current || !contextRef.current) return;
    if (tool === 'fill' || tool === 'shapes') return;

    const context = contextRef.current;

    if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = 20;
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = color;
      
      if (tool === 'pen') {
        context.lineWidth = 3;
      } else if (tool === 'brush') {
        context.lineWidth = 10;
      }
    }
    
    context.lineTo(x, y);
    context.stroke();
  }, []);

  const stopDrawing = useCallback(() => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      contextRef.current?.beginPath();
    }
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const hasContent = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return false;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Check if there are non-white pixels
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
        return true;
      }
    }
    return false;
  }, []);

  const getImageData = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? canvas.toDataURL('image/png') : '';
  }, []);

  // Helper functions
  const fillArea = (x: number, y: number, color: string) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixelColor(imageData, x, y);
    const fillColor = hexToRgb(color);
    
    if (!fillColor || colorsMatch(targetColor, fillColor)) return;
    
    floodFill(imageData, x, y, targetColor, fillColor);
    context.putImageData(imageData, 0, 0);
  };

  const drawShape = (x: number, y: number, color: string) => {
    const context = contextRef.current;
    if (!context) return;

    const shapes = ['star', 'heart', 'circle', 'square', 'triangle'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = color;
    context.strokeStyle = color;
    
    switch(randomShape) {
      case 'star':
        drawStar(context, x, y, 5, 30, 15);
        break;
      case 'heart':
        drawHeart(context, x, y, 30);
        break;
      case 'circle':
        context.beginPath();
        context.arc(x, y, 25, 0, Math.PI * 2);
        context.fill();
        break;
      case 'square':
        context.fillRect(x - 25, y - 25, 50, 50);
        break;
      case 'triangle':
        context.beginPath();
        context.moveTo(x, y - 25);
        context.lineTo(x - 25, y + 25);
        context.lineTo(x + 25, y + 25);
        context.closePath();
        context.fill();
        break;
    }
  };

  return {
    canvasRef,
    initCanvas,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    hasContent,
    getImageData
  };
}

// Helper functions
function getPixelColor(imageData: ImageData, x: number, y: number) {
  const index = (Math.floor(y) * imageData.width + Math.floor(x)) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3]
  };
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255
  } : null;
}

function colorsMatch(c1: any, c2: any) {
  return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
}

function floodFill(imageData: ImageData, startX: number, startY: number, targetColor: any, fillColor: any) {
  const stack: number[][] = [[Math.floor(startX), Math.floor(startY)]];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  while (stack.length > 0) {
    const coords = stack.pop();
    if (!coords) continue;
    const [x, y] = coords;
    
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    
    const index = (y * width + x) * 4;
    
    if (data[index] === targetColor.r && 
        data[index + 1] === targetColor.g && 
        data[index + 2] === targetColor.b && 
        data[index + 3] === targetColor.a) {
      
      data[index] = fillColor.r;
      data[index + 1] = fillColor.g;
      data[index + 2] = fillColor.b;
      data[index + 3] = fillColor.a;
      
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  }
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;
  
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;
    
    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.quadraticCurveTo(x - size / 2, y - size / 2, x - size / 4, y);
  ctx.quadraticCurveTo(x, y - size / 4, x, y + size / 4);
  ctx.quadraticCurveTo(x, y - size / 4, x + size / 4, y);
  ctx.quadraticCurveTo(x + size / 2, y - size / 2, x, y + size / 4);
  ctx.fill();
}