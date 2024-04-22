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
import { UploadImage, FileImage } from '../UploadImage/UploadImage'
import { Icon } from '@iconify/react'
import { ListImages } from '../ListImages/ListImages'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/components/Toast'
import { postUploadImage } from '../../services'
import { useState } from 'react'

export const Restore = () => {
  const { toast } = useToast()
  const [files, setFiles] = useState<FileImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async (files: FileImage[]) => {
    setFiles(files)
  }

  const submitUpload = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await postUploadImage(files[0])

      if (error) {
        toast({
          title: 'Erro ao enviar os dados',
          description: `${error.message}`,
          status: 'error',
        })
      }

      if (data) {
        toast({
          title: 'Image uploaded successfully!',
          description: 'Image uploaded successfully!',
          status: 'success',
        })
      }
    } catch (error) {
      toast({
        title: 'Error sending form data',
        description: `${error}`,
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-md bg-brand-light p-4">
      <div className="flex w-full flex-row-reverse">
        <Dialog>
          <DialogTrigger className="flex items-center  gap-3 whitespace-nowrap rounded bg-brand-primary px-4 py-2 text-sm font-bold text-white transition-colors delay-300 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            Upload image <Icon icon="uil:image-upload" width={24} />
          </DialogTrigger>
          <DialogContent className="bg-brand-light p-4">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Upload your image to restore it
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <UploadImage onUpload={(files) => handleUpload(files)} />
              <div className="flex w-full flex-row-reverse">
                <Button
                  type="submit"
                  icon="uil:image-upload"
                  onClick={submitUpload}
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="restore" className="w-full">
        <TabsList className="flex justify-between gap-4 text-brand-light">
          <TabsTrigger value="restore">Images to restore</TabsTrigger>
          <TabsTrigger value="restored">Images restored</TabsTrigger>
        </TabsList>
        <TabsContent value="restore">
          <div className="grid min-h-96 place-content-center">
            <ListImages images={[]} />
          </div>
        </TabsContent>
        <TabsContent value="restored">
          <div className="grid min-h-96 place-content-center">
            <ListImages images={[]} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
