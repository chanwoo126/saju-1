import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams
  
  return (
    <div className="flex bg-[#0a0514] min-h-screen items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dreamy Background Orbs/Lights */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[3000ms]"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      {/* Glassmorphic Container */}
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] p-10 border border-white/[0.08] relative z-10 transition-all duration-500 hover:border-fuchsia-500/20">
        
        {/* Crystal Ball Avatar section */}
        <div className="text-center mb-10 relative">
          <div className="mx-auto w-24 h-24 mb-4 relative flex items-center justify-center">
            {/* Inner glow of the crystal ball */}
            <div className="absolute inset-0 bg-fuchsia-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md"></div>
            <span className="text-6xl relative z-10 drop-shadow-[0_0_20px_rgba(232,121,249,0.8)]">🔮</span>
            {/* Sparkles */}
            <span className="absolute top-0 right-1 text-2xl animate-bounce">✨</span>
            <span className="absolute bottom-2 left-2 text-sm animate-pulse">✨</span>
          </div>
          
          <h1 className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-fuchsia-200 to-pink-300 tracking-wider mb-3 drop-shadow-sm">
            신비로운 사주
          </h1>
          <p className="text-indigo-200/60 text-sm font-light tracking-[0.2em]">
            당신의 사주, 신비로운 여정
          </p>
        </div>
        
        {params?.message && (
          <div className="bg-fuchsia-950/40 border border-fuchsia-500/30 text-fuchsia-200 px-4 py-3 rounded-xl mb-8 text-sm font-medium shadow-inner text-center">
            {params.message}
          </div>
        )}

        <form action={login} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-light tracking-widest text-indigo-300/70 ml-1" htmlFor="email">
              영혼의 식별자 (이메일)
            </label>
            <input 
              id="email"
              name="email" 
              type="email" 
              required 
              className="block w-full bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-indigo-50 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 px-4 py-3.5 transition-all outline-none placeholder-indigo-300/20 font-light" 
              placeholder="user@example.com"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-light tracking-widest text-indigo-300/70 ml-1" htmlFor="password">
              비밀의 열쇠 (비밀번호)
            </label>
            <input 
              id="password"
              name="password" 
              type="password" 
              required 
              className="block w-full bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-indigo-50 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 px-4 py-3.5 transition-all outline-none placeholder-indigo-300/20 font-light tracking-widest" 
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col space-y-4 pt-8">
            <button 
              formAction={login} 
              className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-600 hover:from-indigo-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-medium py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-all duration-500 group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                미래 들여다보기
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </button>
            <button 
              formAction={signup} 
              className="w-full bg-transparent border border-indigo-500/30 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 text-indigo-300/80 hover:text-fuchsia-200 font-light py-3.5 px-4 rounded-xl tracking-wide transition-all duration-300 text-sm"
            >
              새로운 운명 자아내기 (회원가입)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
