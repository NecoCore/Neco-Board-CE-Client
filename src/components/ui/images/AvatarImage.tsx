import { avatarsFiles } from "@/api/files/avatars.files"
import type React from "react"
import { useEffect, useState } from "react"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  filePath: string | null;
  fallbackSrc?: string
}

export function AvatarImage({filePath, fallbackSrc = '/img/default-avatar.png', className, alt, ...props}: Props) {
  const [imgSrs, setImgSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    let objectUrl: string;

    const loadImg = async () => {
      setIsLoading(true);

      try {
        if(!filePath) {
          setImgSrc(fallbackSrc);
          return;
        }
        const blob = await avatarsFiles.getAvatar(filePath);
        objectUrl = URL.createObjectURL(blob);
        setImgSrc(objectUrl);
      } catch (error) {
        console.error(error);
        setImgSrc(fallbackSrc);
      } finally {
        setIsLoading(false);
      }
    };

    if(filePath) {
      loadImg();
    }

    return () => {
      if(objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  }, [filePath, fallbackSrc])

  if(isLoading) return <div className={`animate-pulse bg-neutral ${className || 'size-6'}`}></div>
  
  return <img src={imgSrs || fallbackSrc} alt={alt} className={className} {...props} />
}
