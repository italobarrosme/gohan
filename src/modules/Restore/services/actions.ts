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
          'ccd53a9a38ebbaa783a1e6318d22fa68c14c3aed66cc3589e53ef07d07f5be1d',
        input: {
          image: imageUrl,
        },
      }),
    })

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
        log: `Image processing status ENCHANCE: ${data.status}`,
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

        restoredImage = data.output[1].image

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

export const startColorImageAction = async (imageUrl: string) => {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version:
          'ca494ba129e44e45f661d6ece83c4c98a9a7c774309beca01429b58fce8aa695',
        input: {
          image: imageUrl,
          model_size: 'large',
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Error fetching data 0da600fab0c45')
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
        log: `Image processing status COLORED: ${data.status}`,
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
