export default function Separator() {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black py-8 font-vt323 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Animated separator line */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-limegreen to-transparent"></div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-limegreen rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-limegreen to-transparent"></div>
        </div>

        {/* Scrolling text effect */}
        <div className="mt-4 text-center text-gray-600 text-base md:text-lg"></div>
      </div>
    </section>
  );
}
