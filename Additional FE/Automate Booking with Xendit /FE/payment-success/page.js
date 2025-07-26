'use client'
import React from 'react'
import { CheckCircle, MessageSquare, Calendar, Sparkles, ArrowLeft, Phone } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
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
          {/* Success Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Booking Berhasil!</h2>
            <p className="text-pink-100 text-lg">Terima kasih telah mempercayai layanan kami</p>
          </div>

          {/* Success Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <h3 className="text-xl font-semibold text-green-800">
                    Pembayaran Berhasil Diproses
                  </h3>
                </div>
                <p className="text-green-700 mb-4">
                  Booking Anda telah dikonfirmasi dan pembayaran sedang diproses
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/6287812234804?text=Halo,%20saya%20sudah%20melakukan%20booking%20makeup%20dan%20pembayaran.%20Mohon%20konfirmasi%20booking%20saya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Konfirmasi via WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Schedule Confirmation */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-100 border border-pink-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Konfirmasi Jadwal</h4>
                      <p className="text-sm text-gray-600">1-2 hari sebelum acara</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Tim kami akan menghubungi Anda untuk konfirmasi final jadwal dan persiapan
                    makeup
                  </p>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">Catatan Penting:</h4>
                  <ul className="text-yellow-700 text-sm space-y-2">
                    <li>• Simpan bukti pembayaran untuk referensi</li>
                    <li>• Pastikan nomor WhatsApp Anda aktif untuk komunikasi</li>
                    <li>• Hubungi kami jika ada perubahan jadwal minimal 24 jam sebelumnya</li>
                    <li>• Siapkan area yang cukup terang untuk proses makeup</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-pink-50 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">💄 Bykhaisa Makeup</span> - Terima kasih telah
                mempercayai layanan profesional kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
