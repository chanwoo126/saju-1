'use client'

import { useState } from 'react'
import { generateSaju } from '../actions'

export default function SajuForm() {
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState<"남" | "여">("남")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      if (!birthdate) throw new Error("생년월일을 입력해주세요.")
      const res = await generateSaju(birthdate, gender)
      setResult(res)
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mt-8">
      <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
        <label className="block text-sm font-medium text-gray-200 mb-2">생년월일 및 성별</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="flex-1 rounded-lg border-gray-600 bg-gray-900/50 text-white p-3 border focus:ring-indigo-500 focus:border-indigo-500"
            required
            disabled={loading}
          />
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value as "남" | "여")}
            className="rounded-lg border-gray-600 bg-gray-900/50 text-white p-3 border focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          >
            <option value="남">남성</option>
            <option value="여">여성</option>
          </select>
          <button
            type="submit"
            disabled={loading || !birthdate}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition shadow-lg shrink-0"
          >
            {loading ? '운명 엿보는 중...' : '결과 보기'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-center text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-8 bg-indigo-900/30 border border-indigo-500/40 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen filter blur-[64px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-2xl font-black text-indigo-300 mb-4 tracking-tight">당신의 사주 풀이</h2>
          <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-lg font-medium">{result}</p>
        </div>
      )}
    </div>
  )
}
