import type { DrawingAnalysis } from '../types';

export function analyzeDrawing(canvas: HTMLCanvasElement): DrawingAnalysis {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      dominantColor: 'other',
      complexity: 'simple',
      hasCircular: false,
      pixelCount: 0
    };
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Color analysis
  const colorCounts = {
    red: 0, blue: 0, green: 0, yellow: 0,
    purple: 0, pink: 0, black: 0, other: 0
  };
  
  let pixelCount = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip white/transparent pixels
    if (a > 0 && !(r > 240 && g > 240 && b > 240)) {
      pixelCount++;
      
      if (r > 200 && g < 100 && b < 100) colorCounts.red++;
      else if (r < 100 && g < 100 && b > 200) colorCounts.blue++;
      else if (r < 100 && g > 200 && b < 100) colorCounts.green++;
      else if (r > 200 && g > 200 && b < 100) colorCounts.yellow++;
      else if (r > 100 && g < 100 && b > 150) colorCounts.purple++;
      else if (r > 200 && g < 150 && b > 150) colorCounts.pink++;
      else if (r < 50 && g < 50 && b < 50) colorCounts.black++;
      else colorCounts.other++;
    }
  }
  
  // Find dominant color
  const dominantColor = Object.keys(colorCounts).reduce((a, b) => 
    colorCounts[a as keyof typeof colorCounts] > colorCounts[b as keyof typeof colorCounts] ? a : b
  );
  
  // Detect drawing complexity
  const complexity = pixelCount > 5000 ? 'detailed' : 'simple';
  
  // Detect if drawing might contain circular patterns
  const hasCircular = Math.random() > 0.5; // Simplified for demo
  
  return {
    dominantColor,
    complexity: complexity as 'simple' | 'detailed',
    hasCircular,
    pixelCount
  };
}