import { getCustomLog } from '@/utils/logs/logs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const bucketImageFolder =
  process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER
const bucketImageProcessing =
  process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING
const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_URL

export const postUploadImage = async (file: File) => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.storage
      .from(bucketImageFolder)
      .upload(`${bucketImageProcessing}/${file.name}`, file)

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

export const getImagesProcessing = async () => {
  const supabase = createClientComponentClient()

  console.log('SUPABASE', supabase.storage.from(bucketImageFolder))
  try {
    const { data, error } = await supabase.storage
      .from(`${bucketImageFolder}`)
      .list(`${bucketImageProcessing}`, {
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
        src: `${storageBucket}/${bucketImageFolder}/${bucketImageProcessing}/${image.name}`,
        alt: image.name,
        restore: () => {},
      })),
      error: null,
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

type EnchanceImage = {
  imageUrl: string
}

export const postEnchanceImageReplicate = async ({
  imageUrl,
}: EnchanceImage) => {
  const supabase = createClientComponentClient()

  try {
    const { data } = await supabase.storage
      .from(bucketImageFolder)
      .getPublicUrl(`${bucketImageProcessing}/${imageUrl}`)

    if (!data) {
      throw new Error('Image not found')
    }

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
