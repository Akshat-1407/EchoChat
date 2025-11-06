function PageNotFound() {

  const bgColor = "bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2]"; 

  return (
    <div className={`flex items-center justify-center min-h-screen w-full ${bgColor} p-6 font-sans`}>

      <div className="text-center text-gray-800 p-8 md:p-12 rounded-3xl shadow-xl bg-white transition duration-500 ease-in-out transform hover:scale-[1.01] max-w-xl w-full border border-blue-200">
        
        <h1 className="text-8xl md:text-[10rem] font-extrabold tracking-tighter mb-4 leading-none text-blue-900 drop-shadow-lg">
          404
        </h1>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8 text-cyan-500 animate-pulse">
            <circle cx="12" cy="12" r="10" className="opacity-70"/>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl mb-10 text-gray-600 font-light">
          We couldn't find the page you were looking for. It might have moved, or never existed!
        </p>

      </div>
    </div>
  );
}

export default PageNotFound