'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export type FileImage = File & {
  preview: string
}

export type UploadImageProps = {
  onUpload: (files: FileImage[]) => void
}

export const UploadImage = ({ onUpload }: UploadImageProps) => {
  const [files, setFiles] = useState<FileImage[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(() => {
    onUpload(files)

    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [files, onUpload])

  return (
    <>
      <div
        {...getRootProps({
          className:
            'border-2 border-dashed border-gray-200 rounded-md w-full h-48 flex items-center justify-center gap-2 cursor-pointer transition-colors delay-300 hover:border-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        })}
      >
        <input {...getInputProps()} />
        <Icon icon="photo" width={24} />

        {files.length ? (
          <div className="flex flex-col gap-2">
            {files.map((file: FileImage) => (
              <div key={file.name} className="flex flex-col items-center gap-2">
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={120}
                  height={120}
                />
                <span className="text-xs">{file.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
    </>
  )
}
