'use client'
import { Button } from '@/shared/components/Button'
import { toast } from '@/shared/components/Toast/useToast'
import { UploadImage, type FileImage } from '@/shared/components/UploadImage'
import { useState } from 'react'
import { postUploadImage } from '../../services'

type UploadImagesFormProps = {
  handlerUpload: (isOnUpload: boolean) => void
}

export const UploadImagesForm = ({ handlerUpload }: UploadImagesFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<FileImage[]>([])
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
      handlerUpload(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <UploadImage onUpload={(files) => handleUpload(files)} />
      <div className="flex w-full flex-row-reverse">
        <Button type="submit" icon="uil:image-upload" onClick={submitUpload}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  )
}
