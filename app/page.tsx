import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SajuForm from './components/SajuForm'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 bg-gray-950 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 hidden sm:block"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 hidden sm:block"></div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row w-full justify-between items-center max-w-5xl z-10 mb-16 gap-4">
        <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          AI 신년 사주
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-400 hidden sm:inline-block">{user.email}</span>
          <Link href="/dashboard" className="text-sm font-medium px-4 py-2 border border-white/10 rounded-lg hover:bg-white/10 transition">
            기록 보기
          </Link>
          <form action="/auth/signout" method="post">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition">로그아웃</button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <div className="z-10 flex flex-col items-center w-full mt-4 sm:mt-10">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-center mb-6 leading-tight tracking-tight">
          인공지능이 풀어주는 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">당신의 운명</span>
        </h2>
        <p className="text-gray-400 text-center max-w-lg mb-8 text-lg">
          정확한 생년월일을 입력하고 당신의 과거, 현재, 그리고 미래에 대한 지혜를 구하세요.
        </p>
        
        <SajuForm />
      </div>
    </main>
  )
}
