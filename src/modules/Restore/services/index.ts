import { getCustomLog } from '@/utils/logs/logs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { startEnchanceImageAction } from './actions'

const BUCKET_IMAGE_FOLDER =
  process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER
const BUCKET_IMAGE_RESTORE =
  process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORE
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_URL
const BUCKET_IMAGE_RESTORED =
  process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED

export const postUploadImage = async (file: File) => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_IMAGE_FOLDER)
      .upload(`${BUCKET_IMAGE_RESTORE}/${file.name}`, file)

    if (error) {
      return { error }
    }

    getCustomLog({
      log: 'Image uploaded',
      statusCode: 200,
      type: 'success',
    })

    return {
      data,
      error: null,
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getImagesRestore = async () => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.storage
      .from(`${BUCKET_IMAGE_FOLDER}`)
      .list(`${BUCKET_IMAGE_RESTORE}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    if (error) {
      return { error }
    }

    getCustomLog({
      log: 'Images processing listed',
      statusCode: 200,
      type: 'success',
    })

    return {
      images: data.map((image: any) => ({
        url: `${STORAGE_BUCKET}/${BUCKET_IMAGE_FOLDER}/${BUCKET_IMAGE_RESTORE}/${image.name}`,
        name: image.name,
      })),
      error: null,
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const postEnchanceImageReplicate = async (name: any) => {
  const supabase = createClientComponentClient()

  try {
    const { data } = await supabase.storage
      .from(BUCKET_IMAGE_FOLDER)
      .getPublicUrl(`${BUCKET_IMAGE_RESTORE}/${name}`)

    if (!data) {
      throw new Error('Image not found')
    }

    const { restoredImage } = await startEnchanceImageAction(data.publicUrl)

    if (!restoredImage) {
      throw new Error('Error processing image')
    }

    const readImageRestored = await fetch(restoredImage)
    const blobImage = await readImageRestored.blob()

    const { error } = await supabase.storage
      .from(BUCKET_IMAGE_FOLDER)
      .upload(`${BUCKET_IMAGE_RESTORED}/${name}`, blobImage)

    if (error) {
      throw new Error('Error uploading image')
    }

    getCustomLog({
      log: 'Image restored',
      statusCode: 200,
      type: 'success',
    })

    const { error: errorDelete } = await supabase.storage
      .from(BUCKET_IMAGE_FOLDER)
      .remove([`${BUCKET_IMAGE_RESTORE}/${name}`])

    if (errorDelete) {
      throw new Error('Error deleting image')
    }

    return { error: null }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getListImagesRestored = async () => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_IMAGE_FOLDER)
      .list(`${BUCKET_IMAGE_RESTORED}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    if (error) {
      return { error }
    }

    getCustomLog({
      log: 'Images restored listed',
      statusCode: 200,
      type: 'success',
    })

    return {
      images: data.map((image: any) => ({
        url: `${STORAGE_BUCKET}/${BUCKET_IMAGE_FOLDER}/${BUCKET_IMAGE_RESTORED}/${image.name}`,
        name: image.name,
      })),
      error: null,
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
