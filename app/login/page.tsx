import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams
  
  return (
    <div className="flex bg-slate-950 min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-amber-500/20 relative z-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">☯️</div>
          <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-widest mb-2">사주 서비스</h1>
          <p className="text-amber-200/60 text-sm">당신의 운명의 흐름을 읽어드립니다</p>
        </div>
        
        {params?.message && (
          <div className="bg-red-950/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {params.message}
          </div>
        )}

        <form action={login} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-100/70 mb-1.5" htmlFor="email">이메일</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              required 
              className="block w-full rounded-lg border border-amber-500/30 bg-slate-800/80 text-amber-50 shadow-inner focus:border-amber-400 focus:ring-amber-400 focus:ring-1 p-3 transition-colors outline-none" 
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-100/70 mb-1.5" htmlFor="password">비밀번호</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              required 
              className="block w-full rounded-lg border border-amber-500/30 bg-slate-800/80 text-amber-50 shadow-inner focus:border-amber-400 focus:ring-amber-400 focus:ring-1 p-3 transition-colors outline-none" 
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col space-y-3 pt-6">
            <button 
              formAction={login} 
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300"
            >
              운명 확인하기 (로그인)
            </button>
            <button 
              formAction={signup} 
              className="w-full bg-transparent hover:bg-amber-500/10 border border-amber-500/50 text-amber-400 font-bold py-3.5 px-4 rounded-lg transition-all duration-300"
            >
              새로운 여정 시작하기 (회원가입)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
