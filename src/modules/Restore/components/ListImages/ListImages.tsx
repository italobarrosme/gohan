import { Button } from '@/shared/components/Button'
import { Icon } from '@iconify/react'
import Image from 'next/image'

export type image = {
  src: string
  alt: string
  restore: () => void
}

export type ListImagesProps = {
  images: image[]
}

export const ListImages = ({ images }: ListImagesProps) => {
  if (images.length === 0) {
    return (
      <div className="flex gap-4">
        List images is empty
        <Icon
          icon="material-symbols-light:empty-dashboard-outline-rounded"
          width={32}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div key={index} className="flex items-center gap-4">
          <Image
            src={image.src}
            alt={image.alt}
            className="size-24 rounded-md"
          />
          <Button onClick={image.restore} variant="link">
            Restore
          </Button>
        </div>
      ))}
    </div>
  )
}
