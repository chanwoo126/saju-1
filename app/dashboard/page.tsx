import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: sajuResults, error } = await supabase
    .from('saju_results')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 bg-gray-950 text-white">
      <header className="flex w-full justify-between items-center max-w-5xl z-10 mb-12">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          사주 기록
        </h1>
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-sm font-medium px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
            새로 보기
          </Link>
          <form action="/auth/signout" method="post">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition">로그아웃</button>
          </form>
        </div>
      </header>

      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-8">지난 사주 기록</h2>
        {error && (
          <div className="p-4 bg-red-500/10 text-red-200 rounded-xl mb-4">
            기록을 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        
        {(!sajuResults || sajuResults.length === 0) && (
          <div className="p-10 text-center text-gray-400 border border-gray-800 rounded-2xl bg-gray-900/50">
            아직 기록이 없습니다.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sajuResults?.map((result: any) => (
            <div key={result.id} className="bg-gray-900 border border-t-[3px] border-t-indigo-500 border-x-gray-800 border-b-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-indigo-500/10 transition">
              <div className="text-sm text-indigo-400 mb-2 font-semibold">
                입력: {result.birthdate}
              </div>
              <div className="text-xs text-gray-500 mb-5">
                {new Date(result.created_at).toLocaleString('ko-KR')}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {result.result_text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
