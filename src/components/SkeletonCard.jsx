import { useEffect, useState } from "react";

const SkeletonCard = () => {
  const [cardSize, setCardSize] = useState("");

  const getCardSize = () => {
    const width = window.innerWidth;

    let size = "w-[132px]";

    if (width > 1280) {
      size = "w-[289.6px]";
    } else if (width > 1024) {
      size = "w-[238.4px]";
    } else if (width > 768) {
      size = "w-[187.2px]";
    } else if (width > 640) {
      size = "w-[177px]";
    } else if (width > 300) {
      size = "w-[197.333px]";
    }
    return size;
  };

  useEffect(() => {
    const updateCardSize = () => {
      const newCardSize = getCardSize();
      setCardSize(newCardSize);
    };

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("size", updateCardSize);
  }, []);

  return (
    <div className={`${cardSize} bg-gray-800 rounded-lg animate-pulse`}>
      <div className="bg-gray-700 rounded-t-lg"></div>
      <div className="p-2 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
