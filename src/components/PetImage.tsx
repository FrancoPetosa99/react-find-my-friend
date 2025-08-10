import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

interface PetImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const PetImage: React.FC<PetImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/images/pets/default-pet.jpg',
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default PetImage; 