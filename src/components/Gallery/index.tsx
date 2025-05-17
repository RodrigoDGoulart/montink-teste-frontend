import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function Gallery({images}: Props) {
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);

  return(
    <div className="flex flex-col gap-[12px] w-full">
      <div className="relative w-full h-[300px]">
        <img src={images[selectedImgIndex]} className="object-cover object-center w-full h-full" />
        <button 
          className="absolute top-1/2 left-[12px] bg-black/20 rounded-full cursor-pointer" 
          onClick={() => setSelectedImgIndex(prev => prev-1)} 
          disabled={selectedImgIndex === 0}
        >
          <ChevronLeft size={36} color={selectedImgIndex === 0 ? "gray" : "white"} />
        </button>
        <button 
          className="absolute top-1/2 right-[12px] bg-black/20 rounded-full cursor-pointer" 
          onClick={() => setSelectedImgIndex(prev => prev+1)} 
          disabled={selectedImgIndex === images.slice(0, 6).length - 1}
        >
          <ChevronRight size={36} color={selectedImgIndex === images.slice(0, 6).length - 1 ? "gray" : "white"} />
        </button>
      </div>
      <div className="flex gap-[6px] overflow-hidden">
        {images.slice(0, 6).map((img, index) => (
          <button 
            key={index} 
            className={classNames(
              "w-[48px] h-[48px]",
              { "opacity-50": index !== selectedImgIndex },
            )}
            onClick={() => setSelectedImgIndex(index)}
          >
            <img 
              src={img} 
              className="w-full h-full object-cover object-center" />
          </button>
        ))}
      </div>
    </div>
  );
}