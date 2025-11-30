interface LaptopFrameProps {
  src: string;
  alt: string;
}

export function LaptopFrame({ src, alt }: LaptopFrameProps) {
  return (
    <div className="relative w-full">
      {/* Laptop bezel container */}
      <div 
        className="relative w-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 shadow-2xl overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        {/* Screen area */}
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border-2 border-gray-800">
          {/* Webcam notch */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 w-2 h-2 rounded-full bg-gray-800 shadow-lg pointer-events-none" />
          
          {/* Image */}
          <img
            src={src}
            alt={alt}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Laptop base/stand */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-1.5 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg shadow-xl" />
    </div>
  );
}
