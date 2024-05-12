import { Button } from '@/shared/components/Button'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { ImageRestore } from '../../types'

export type ListImagesProps = {
  images: ImageRestore[]
}

export const ListImages = ({ images }: ListImagesProps) => {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center gap-4">
        List images is empty
        <Icon
          icon="material-symbols-light:empty-dashboard-outline-rounded"
          width={32}
        />
      </div>
    )
  }

  return (
    <div className="flex max-w-5xl flex-wrap gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center gap-4">
          <div className="relative size-80">
            <Image
              src={image.url}
              alt={image.name}
              className="rounded-md object-fill"
              fill
            />
          </div>
          {image.function && (
            <Button
              onClick={image.function}
              variant="secondary"
              icon="heroicons:sparkles-20-solid"
            >
              Restore
            </Button>
          )}
          {image.function2 && (
            <Button
              onClick={image.function2}
              variant="secondary"
              icon="heroicons:paint-brush-20-solid"
            >
              Colored
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
