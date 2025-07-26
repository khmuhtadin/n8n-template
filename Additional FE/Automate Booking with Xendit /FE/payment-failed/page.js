'use client'
import React from 'react'
import { XCircle, MessageSquare, AlertTriangle, Sparkles, ArrowLeft, Phone } from 'lucide-react'
import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bykhaisa Makeup
              </h1>
              <p className="text-gray-600 text-sm">Professional Makeup Artist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
          {/* Failed Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Pembayaran Gagal</h2>
            <p className="text-red-100 text-lg">Terjadi masalah dengan pembayaran Anda</p>
          </div>

          {/* Failed Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-2" />
                  <h3 className="text-xl font-semibold text-red-800">Pembayaran Tidak Berhasil</h3>
                </div>
                <p className="text-red-700 mb-4">
                  Periksa pesan whatsapp anda untuk mencoba melakukan pembayaran ulang.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/6285155431253?text=Halo%20Khaisa,%20saya%20mengalami%20masalah%20dengan%20pembayaran%20booking%20makeup.%20Mohon%20bantuan%20untuk%20menyelesaikan%20booking%20saya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Hubungi Khaisa
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-pink-50 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">💄 Bykhaisa Makeup</span> - Jangan khawatir, kami siap
                membantu menyelesaikan masalah Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
