import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-2xl p-8 max-w-md text-center transform hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to Gov Price Checker</h1>
        <p className="text-gray-700 mb-8 leading-relaxed text-lg">This platform helps prevent overpricing in government procurement with cutting-edge tools.</p>
        <nav className="space-x-6">
          <Link to="/upload" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-[0_0_10px_rgba(59,130,246,0.6)] hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300">Upload Prices</Link>
          <Link to="/compare" className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-300">Compare Prices</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;