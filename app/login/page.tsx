import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams
  
  return (
    <div className="flex bg-gray-900 min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">사주 서비스</h1>
        
        {params?.message && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 rounded-md mb-6 text-sm text-center">
            {params.message}
          </div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200" htmlFor="email">이메일</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              required 
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200" htmlFor="password">비밀번호</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              required 
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" 
            />
          </div>
          <div className="flex flex-col space-y-3 pt-4">
            <button 
              formAction={login} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              로그인
            </button>
            <button 
              formAction={signup} 
              className="w-full bg-transparent hover:bg-white/10 border border-indigo-400 text-indigo-300 font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
