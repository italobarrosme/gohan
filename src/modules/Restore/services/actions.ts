'use server'

import { getCustomLog } from '@/utils/logs/logs'

export const startEnchanceImageAction = async (imageUrl: string) => {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version:
          '1302b550b4f7681da87ed0e405016d443fe1fafd64dabce6673401855a5039b5',
        input: {
          image: imageUrl,
          s_cfg: 7.5,
          s_churn: 5,
          s_noise: 1.003,
          upscale: 1,
          a_prompt:
            'Cinematic, High Contrast, highly detailed, taken using a Canon EOS R camera, hyper detailed photo - realistic maximum detail, 32k, Color Grading, ultra HD, extreme meticulous detailing, skin pore detailing, hyper sharpness, perfect without deformations.',
          min_size: 1024,
          n_prompt:
            'painting, oil painting, illustration, drawing, art, sketch, oil painting, cartoon, CG Style, 3D render, unreal engine, blurring, dirty, messy, worst quality, low quality, frames, watermark, signature, jpeg artifacts, deformed, lowres, over-smooth',
          s_stage1: -1,
          s_stage2: 1,
          edm_steps: 50,
          use_llava: true,
          linear_CFG: false,
          model_name: 'SUPIR-v0Q',
          color_fix_type: 'Wavelet',
          spt_linear_CFG: 1,
          linear_s_stage2: false,
          spt_linear_s_stage2: 0,
        },
      }),
    })

    console.log(response)

    if (!response.ok) {
      throw new Error('Error fetching data')
    }

    const {
      urls: { get, cancel },
    } = await response.json()

    let restoredImage: string | null = null

    while (!restoredImage) {
      const response = await fetch(get, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error fetching data')
      }

      const data = await response.json()

      getCustomLog({
        log: `Image processing status: ${data.status}`,
        statusCode: 200,
        type: 'info',
      })

      if (data.status === 'failed') {
        throw new Error('Error processing image')
      }

      if (data.status === 'succeeded') {
        getCustomLog({
          log: `${JSON.stringify(data.output)}`,
          statusCode: 200,
          type: 'info',
        })

        restoredImage = data.output

        getCustomLog({
          log: `Image processing status: ${data.status}`,
          statusCode: 200,
          type: 'success',
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 10000))
    }

    return {
      restoredImage,
      cancel,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
