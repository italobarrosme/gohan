import { Button } from '@/shared/components/Button'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { ImageRestoreCompare } from '../../types'

export type ListImagesRestoreCompareProps = {
  imagesRestoreCompared: ImageRestoreCompare[]
}

export const ListImagesRestoreCompare = ({
  imagesRestoreCompared,
}: ListImagesRestoreCompareProps) => {
  if (imagesRestoreCompared.length === 0) {
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
    <div className="flex max-w-5xl flex-col flex-wrap gap-4 p-4">
      {imagesRestoreCompared.map((image, index) => (
        <div key={index} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative size-40">
              <Image
                src={image.url_before}
                alt={image.name_before}
                className="rounded-md object-fill"
                fill
              />
            </div>
            <div className="relative size-80">
              <Image
                src={image.url_after}
                alt={image.name_after}
                className="rounded-md object-fill"
                fill
              />
              <Button
                icon="heroicons:download-20-solid"
                variant="secondary"
                className="absolute bottom-4 right-4 z-40"
                onClick={() => window.open(image.url_after, '_blank')}
              >
                Download Image
              </Button>
            </div>
          </div>
          {image.function && (
            <Button
              onClick={image.function}
              variant="secondary"
              icon="heroicons:sparkles-20-solid"
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
