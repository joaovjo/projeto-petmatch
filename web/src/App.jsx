import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white w-full overflow-x-hidden">
        <main className="flex-grow flex items-center justify-center w-full">
          <Routes>
            {/* Rota da Página de Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rota da Página Principal (Pode estar vazia por enquanto) */}
            <Route path="/" element={<div className="text-2xl font-bold p-10">Página Principal em Construção... 🐾</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;