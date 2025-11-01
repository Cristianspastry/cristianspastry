import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string
  showSkeleton?: boolean
}

/**
 * Componente immagine ottimizzato con:
 * - Lazy loading automatico
 * - Blur placeholder
 * - Skeleton loader durante caricamento
 * - Fallback image in caso di errore
 * - Ottimizzazione automatica dimensioni
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder-image.jpg',
  showSkeleton = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
    setIsLoading(false)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        quality={85}
        {...props}
      />
    </div>
  )
}

/**
 * Wrapper per immagini Sanity con URL builder ottimizzato
 */
export function SanityImage({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: OptimizedImageProps) {
  // Se l'immagine è da Sanity CDN, aggiungi parametri di ottimizzazione
  const optimizedSrc = typeof src === 'string' && src.includes('cdn.sanity.io')
    ? `${src}?auto=format&fit=max${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}&q=85`
    : src

  return (
    <OptimizedImage
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}
