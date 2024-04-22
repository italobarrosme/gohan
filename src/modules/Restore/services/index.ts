import { getCustomLog } from '@/utils/logs/logs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const postUploadImage = async (file: File) => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .upload(
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING}/${file.name}`,
        file
      )

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
