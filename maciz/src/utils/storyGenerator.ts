import type { DrawingAnalysis, Theme } from '../types';

const colorDescriptions: Record<string, string> = {
  red: "kırmızı rengin coşkusunu taşıyan",
  blue: "mavi tonların huzurunu yansıtan",
  green: "yeşilin canlılığını gösteren",
  yellow: "sarı rengin neşesini barındıran",
  purple: "mor renklerin gizemini içeren",
  pink: "pembe tonların tatlılığını sunan",
  black: "siyahın gücünü simgeleyen",
  other: "rengarenk"
};

export function generateStory(analysis: DrawingAnalysis, theme: Theme): string {
  const colorDesc = colorDescriptions[analysis.dominantColor] || colorDescriptions.other;
  
  let story = "";
  
  if (theme === 'animals') {
    story = `Senin çizdiğin ${colorDesc} bu güzel resimde harika bir hikaye saklı! `;
    
    if (analysis.complexity === 'detailed') {
      story += "Çok detaylı çizdiğin bu sevimli hayvan, ormandaki en özel arkadaşmış. ";
    } else {
      story += "Sade ve güzel çizgilerin, bu hayvanın ne kadar nazik olduğunu gösteriyor. ";
    }
    
    story += "Her sabah güneş doğduğunda, tüm orman arkadaşlarını selamlarmış. ";
    story += analysis.hasCircular ? 
      "Yuvarlak gözleri ve sevimli burnuyla herkesi güldürürmüş. " :
      "Sivri kulakları sayesinde en uzaktaki sesleri bile duyabilirmiş. ";
    
    story += "Bir gün ormanda gezerken çok ilginç bir şey bulmuş: ";
    story += analysis.dominantColor === 'green' ? 
      "Parlak yeşil yaprakların arasında saklı bir hazine! " :
      `${analysis.dominantColor === 'red' ? 'Kırmızı' : 'Renkli'} bir kuş yuvası! `;
    
    story += "Bu özel arkadaşın bugün yeni bir maceraya başlıyor. ";
    story += "Acaba başka neler keşfedecek? Sen ne düşünüyorsun?";
    
  } else if (theme === 'nature') {
    story = `${colorDesc.charAt(0).toUpperCase() + colorDesc.slice(1)} bu muhteşem manzara, doğanın güzelliklerini anlatıyor. `;
    
    story += analysis.hasCircular ?
      "Güneş gökyüzünde parlıyor, yuvarlak bulutlar pamuk gibi süzülüyor. " :
      "Sivri dağlar göğe uzanıyor, ağaçlar rüzgarla dans ediyor. ";
    
    if (analysis.dominantColor === 'green') {
      story += "Yeşil yapraklar her yeri kaplıyor, çimenler yumuşacık bir halı gibi. ";
    } else if (analysis.dominantColor === 'blue') {
      story += "Masmavi gökyüzü ve berrak sular, huzur veriyor. ";
    } else {
      story += "Rengarenk çiçekler açmış, kelebekler dans ediyor. ";
    }
    
    story += "Kuşlar neşeyle şarkı söylüyor, arılar bal topluyor. ";
    story += analysis.complexity === 'detailed' ?
      "Çizdiğin her detay, doğanın zenginliğini gösteriyor. " :
      "Basit ve zarif çizgilerin, doğanın sakinliğini yansıtıyor. ";
    
    story += "Bu güzel manzarada sen olsan neler yapardın?";
    
  } else if (theme === 'numbers') {
    story = `Çizdiğin ${colorDesc} şekiller, sayıların büyülü dünyasına açılan kapılar! `;
    
    story += analysis.hasCircular ?
      "Yuvarlak şekiller sıfırdan başlayıp sonsuza gidiyor. " :
      "Köşeli şekiller birden ona kadar diziliyor. ";
    
    story += "Her şekil bir sayıyı temsil ediyor: ";
    story += analysis.complexity === 'detailed' ?
      "5 yıldız, 3 daire, 2 kare... Hepsi senin hayal gücünle canlanıyor! " :
      "1, 2, 3 diye sayıyoruz, matematiğin eğlenceli dünyasına dalıyoruz! ";
    
    story += "Sayılar birlikte dans ediyor, toplama ve çıkarma yapıyor. ";
    story += `${analysis.dominantColor === 'yellow' ? 'Sarı' : 'Renkli'} sayılar neşeyle zıplıyor! `;
    story += "En sevdiğin sayı hangisi?";
    
  } else { // emotions
    story = `${colorDesc.charAt(0).toUpperCase() + colorDesc.slice(1)} resmin, bugünkü duygularını anlatıyor. `;
    
    if (analysis.dominantColor === 'yellow' || analysis.dominantColor === 'pink') {
      story += "Mutluluk her çizgiden taşıyor, neşe her renkte parlıyor! ";
    } else if (analysis.dominantColor === 'blue') {
      story += "Huzur ve sakinlik resmine yansımış, ne kadar dinlendirici! ";
    } else {
      story += "Güçlü duygular resmine yansımış, enerjin çok yüksek! ";
    }
    
    story += analysis.hasCircular ?
      "Yuvarlak şekiller sevgiyi ve dostluğu temsil ediyor. " :
      "Keskin çizgiler cesaretini ve kararlılığını gösteriyor. ";
    
    story += "Bugün kendini nasıl hissediyorsun? ";
    story += analysis.complexity === 'detailed' ?
      "Detaylı çizimin, zengin iç dünyanı yansıtıyor. " :
      "Sade çizgilerin, içindeki huzuru gösteriyor. ";
    
    story += "Her duygu değerlidir ve senin resminde hepsi çok güzel görünüyor!";
  }
  
  return story;
}

export function generateStoryTitle(theme: Theme, analysis: DrawingAnalysis): string {
  const titles: Record<Theme, string[]> = {
    animals: ["Sevimli Dostum", "Orman Macerası", "Hayvan Arkadaşım"],
    nature: ["Doğa Harikası", "Güzel Manzara", "Tabiat Güzelliği"],
    numbers: ["Sayılar Dünyası", "Matematik Macerası", "Eğlenceli Sayılar"],
    emotions: ["Duygularım", "Mutlu Anlar", "Renkli Hisler"]
  };
  
  const themeTitles = titles[theme] || titles.animals;
  return themeTitles[Math.floor(Math.random() * themeTitles.length)];
}