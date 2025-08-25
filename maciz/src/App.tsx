import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Maciz</h1>
      <p>Çizimler Hikaye Oluyor Mobil Uygulaması</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount((c) => c + 1)}
      >
        Sayaç: {count}
      </button>
    </div>
  );
}

export default App;