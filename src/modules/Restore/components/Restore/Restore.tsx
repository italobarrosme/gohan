'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/Dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/Tabs'
import { Icon } from '@iconify/react'
import { ListImages } from '../ListImages/ListImages'
import { useToast } from '@/shared/components/Toast'
import {
  getImagesRestore,
  getListImagesRestoreCompare,
  postEnchanceImageReplicate,
} from '../../services'
import { useEffect, useState } from 'react'
import { ImageRestore, ImageRestoreCompare } from '../../types'
import { UploadImagesForm } from '../../Forms/UploadImagesForm/UploadImagesForm'
import { useLoadingGlobal } from '@/modules/LoadingGlobal/store/useLoadingGlobal'
import { ListImagesRestoreCompare } from '../ListImagesCompare/ListImagesCompare'

export const Restore = () => {
  const { toast } = useToast()

  const [imagesRestore, setImagesRestore] = useState<ImageRestore[]>([])
  const [imagesRestoreCompare, setImagesRestoreCompare] = useState<
    ImageRestoreCompare[]
  >([])
  const [isOnUpload, setIsOnUpload] = useState(false)
  const { setLoading } = useLoadingGlobal()

  const listImagesRestore = async () => {
    if (imagesRestore.length > 0) {
      return
    }

    const { images, error } = await getImagesRestore()

    if (error) {
      toast({
        title: 'Error loading images',
        description: `${error.message}`,
        status: 'error',
      })
    }

    if (images) {
      const trataImages = images.map((image: any) => ({
        id: Math.random().toString(36).substring(7),
        url: `${image.url}`,
        name: image.name,
        function: () => restoreImage(image.name),
      }))

      setImagesRestore(trataImages)
    }
  }

  const listImagesRestoreCompare = async () => {
    if (imagesRestoreCompare.length > 0) {
      return
    }

    const { images, error } = await getListImagesRestoreCompare()

    if (error) {
      toast({
        title: 'Error loading images',
        description: `${error.message}`,
        status: 'error',
      })
    }

    if (images) {
      const trataImages = images.map((image: any) => ({
        id: Math.random().toString(36).substring(7),
        url_before: `${image.url_before}`,
        name_before: image.name_before,
        url_after: `${image.url_after}`,
        name_after: image.name_after,
      }))

      setImagesRestoreCompare(trataImages)
    }
  }

  const restoreImage = async (image: any) => {
    setLoading(true)
    try {
      await postEnchanceImageReplicate(image)

      toast({
        title: 'Image restored',
        description: 'Your image has been restored',
        status: 'success',
      })
    } catch (error: any) {
      toast({
        title: 'Error restoring image',
        description: `${error.message}`,
        status: 'error',
      })
    } finally {
      listImagesRestore()
      listImagesRestoreCompare()
      setLoading(false)
    }
  }

  useEffect(() => {
    listImagesRestore()
    listImagesRestoreCompare()
  }, [])

  const handlerUpload = (isOnUpload: boolean) => {
    setIsOnUpload(isOnUpload)

    if (!isOnUpload) {
      listImagesRestore()
      listImagesRestoreCompare()
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-md bg-brand-light p-4">
      <div className="flex flex-row-reverse">
        <Dialog onOpenChange={handlerUpload} open={isOnUpload}>
          <DialogTrigger className="flex items-center  gap-3 whitespace-nowrap rounded bg-brand-primary px-4 py-2 text-sm font-bold text-white transition-colors delay-300 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            Upload image <Icon icon="uil:image-upload" width={24} />
          </DialogTrigger>
          <DialogContent className="bg-brand-light p-4">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Upload your image to restore it
              </DialogDescription>
              <UploadImagesForm handlerUpload={handlerUpload} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="restore" className="w-full">
        <TabsList className="flex justify-between gap-4 text-brand-light">
          <TabsTrigger value="restore">Images to restore</TabsTrigger>
          <TabsTrigger value="restored">Images restored</TabsTrigger>
        </TabsList>
        <TabsContent value="restore">
          <div className="min-h-96">
            <ListImages images={imagesRestore} />
          </div>
        </TabsContent>
        <TabsContent value="restored">
          <div className="min-h-96">
            <ListImagesRestoreCompare
              imagesRestoreCompared={imagesRestoreCompare}
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
