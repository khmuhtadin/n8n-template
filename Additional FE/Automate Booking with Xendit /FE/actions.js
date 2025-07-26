'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// Rate limiting storage
const rateLimitMap = new Map()

export async function submitBooking(prevState, formData) {
  // Rate limiting implementation
  const headersList = await headers()
  const clientIP = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const windowMs = 5 * 60 * 1000 // 5 minutes
  const maxAttempts = 3

  // Check rate limit
  const attempts = rateLimitMap.get(clientIP) || []
  const recentAttempts = attempts.filter((time) => now - time < windowMs)

  if (recentAttempts.length >= maxAttempts) {
    return {
      success: false,
      message: 'Terlalu banyak percobaan booking. Silakan coba lagi dalam 5 menit.',
      formData: Object.fromEntries(formData),
    }
  }

  // Record this attempt
  rateLimitMap.set(clientIP, [...recentAttempts, now])

  // Clean up old entries periodically (optional optimization)
  if (Math.random() < 0.1) {
    // 10% chance to clean up
    for (const [ip, times] of rateLimitMap.entries()) {
      const validTimes = times.filter((time) => now - time < windowMs)
      if (validTimes.length === 0) {
        rateLimitMap.delete(ip)
      } else {
        rateLimitMap.set(ip, validTimes)
      }
    }
  }
  const bookingData = {
    nama: formData.get('nama'),
    noHp: formData.get('noHp'),
    tanggal: formData.get('tanggal'),
    jam: formData.get('jam'),
    tempatAcara: formData.get('tempatAcara'),
    jenisMakeup: formData.get('jenisMakeup'),
    pelayanan: formData.get('pelayanan'),
    tipePembayaran: formData.get('tipePembayaran'),
    addOn: formData.get('addOn'),
    timestamp: new Date().toISOString(),
  }

  // Basic validation
  const requiredFields = [
    'nama',
    'noHp',
    'tanggal',
    'jam',
    'tempatAcara',
    'jenisMakeup',
    'pelayanan',
    'tipePembayaran',
  ]

  for (const field of requiredFields) {
    if (!bookingData[field] || bookingData[field].trim() === '') {
      return {
        success: false,
        message: `Field ${field} harus diisi.`,
        formData: bookingData,
      }
    }
  }

  // Validate phone number format
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
  if (!phoneRegex.test(bookingData.noHp.replace(/\s+/g, ''))) {
    return {
      success: false,
      message: 'Format nomor WhatsApp tidak valid. Gunakan format: 08xxxxxxxxxx',
      formData: bookingData,
    }
  }

  // Validate date and time is not in the past
  const selectedDateTime = new Date(`${bookingData.tanggal}T${bookingData.jam}`)
  const currentTime = new Date()

  if (selectedDateTime <= currentTime) {
    return {
      success: false,
      message: 'Tanggal dan waktu harus lebih dari waktu sekarang.',
      formData: bookingData,
    }
  }

  try {
    // Kirim ke n8n webhook
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (!webhookUrl) {
      throw new Error('Webhook URL tidak dikonfigurasi.')
    }

    console.log('Sending booking data to n8n:', bookingData)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('n8n webhook error:', response.status, errorText)
      throw new Error(`Server error: ${response.status}`)
    }

    const result = await response.json()
    console.log('n8n response:', result)

    // Handle Xendit response format (array with payment data)
    if (Array.isArray(result) && result.length > 0) {
      const paymentData = result[0]

      // Check if we have a valid invoice URL from Xendit
      if (paymentData.invoice_url && paymentData.status === 'PENDING') {
        // Redirect to Xendit payment page
        redirect(paymentData.invoice_url)
      } else {
        throw new Error('Invalid payment response from server.')
      }
    }
    // Handle other response formats
    else if (result.success && result.paymentUrl) {
      redirect(result.paymentUrl)
    } else if (result.success) {
      return {
        success: true,
        message:
          result.message ||
          'Booking berhasil! Kami akan mengirimkan detail pembayaran melalui WhatsApp.',
        data: bookingData,
      }
    } else {
      throw new Error(result.message || 'Booking gagal diproses oleh server.')
    }
  } catch (error) {
    // Check if this is a Next.js redirect error - if so, let it through
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }

    console.error('Booking submission error:', error)

    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.',
        formData: bookingData,
      }
    }

    if (error.message.includes('Server error: 5')) {
      return {
        success: false,
        message: 'Server sedang mengalami gangguan. Silakan coba beberapa saat lagi.',
        formData: bookingData,
      }
    }

    return {
      success: false,
      message: error.message || 'Terjadi kesalahan tidak terduga. Silakan coba lagi.',
      formData: bookingData,
    }
  }
}
