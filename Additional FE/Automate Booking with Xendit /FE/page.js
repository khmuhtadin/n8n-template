'use client'
import React, { useActionState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Palette,
  Phone,
  User,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { submitBooking } from './actions'

export default function MakeupBookingForm() {
  const [state, formAction, isPending] = useActionState(submitBooking, null)

  const jenisMakeupOptions = [
    'Yudisium',
    'Wisuda',
    'Pendamping',
    'Bridesmaid',
    'Tunangan',
    'Photoshoot',
    'Prewedding',
    'Party',
  ]

  const pelayananOptions = ['Homeservice (tambahan biaya transport)', 'Visit Studio Khaisa']

  const paymentOptions = ['Booking (DP)', 'Bayar Penuh']

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
          {/* Form Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-2">Booking Makeup Session</h2>
            <p className="text-pink-100">
              Lengkapi detail booking Anda untuk mendapatkan layanan terbaik
            </p>
          </div>

          {/* Success/Error Message */}
          {state && (
            <div
              className={`mx-8 mt-6 p-4 rounded-lg border ${
                state.success
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <p className="font-medium">{state.message}</p>
              {state.bookingId && (
                <p className="text-sm mt-1 opacity-75">Booking ID: {state.bookingId}</p>
              )}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="p-8 space-y-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                Informasi Personal
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    required
                    defaultValue={state?.formData?.nama || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder:text-gray-500 placeholder:opacity-100"
                    placeholder="Masukkan nama lengkap"
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Whatsapp *
                  </label>
                  <input
                    type="tel"
                    name="noHp"
                    required
                    defaultValue={state?.formData?.noHp || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder:text-gray-500 placeholder:opacity-100"
                    placeholder="08xxxxxxxxxx"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                Jadwal & Lokasi Acara
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal *</label>
                  <input
                    type="date"
                    name="tanggal"
                    required
                    defaultValue={state?.formData?.tanggal || ''}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Jam *
                  </label>
                  <input
                    type="time"
                    name="jam"
                    required
                    defaultValue={state?.formData?.jam || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Tempat Acara *
                </label>
                <input
                  type="text"
                  name="tempatAcara"
                  required
                  defaultValue={state?.formData?.tempatAcara || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder:text-gray-500 placeholder:opacity-100"
                  placeholder="Alamat lengkap tempat acara"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Service Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-pink-500" />
                Detail Layanan
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Makeup *
                  </label>
                  <select
                    name="jenisMakeup"
                    required
                    defaultValue={state?.formData?.jenisMakeup || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    disabled={isPending}
                  >
                    <option value="">Pilih jenis makeup</option>
                    {jenisMakeupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pelayanan *
                  </label>
                  <select
                    name="pelayanan"
                    required
                    defaultValue={state?.formData?.pelayanan || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    disabled={isPending}
                  >
                    <option value="">Pilih pelayanan</option>
                    {pelayananOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Pembayaran *
                </label>
                <select
                  name="tipePembayaran"
                  required
                  defaultValue={state?.formData?.tipePembayaran || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  disabled={isPending}
                >
                  <option value="">Pilih tipe pembayaran</option>
                  {paymentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Add On / Catatan Khusus
                </label>
                <textarea
                  name="addOn"
                  rows={4}
                  defaultValue={state?.formData?.addOn || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none placeholder:text-gray-500 placeholder:opacity-100"
                  placeholder="Tambahan layanan atau catatan khusus yang diinginkan..."
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses Booking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Book Sekarang</span>
                  </>
                )}
              </button>
            </div>

            {/* Footer Info */}
            <div className="bg-pink-50 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">💄 Bykhaisa Makeup</span> - Setelah booking, Anda akan
                diarahkan ke halaman pembayaran.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
