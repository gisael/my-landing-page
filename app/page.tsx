'use client'

import { useState } from 'react'
import { addSubscriber } from './actions'

export default function Home() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setSuccess(false)
    setError('')
    
    const result = await addSubscriber(formData)
    
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000) // Hide after 5 seconds
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex-col">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Coming Soon
        </h1>

        <form action={handleSubmit} className="flex flex-col gap-4 items-center">
          <input 
            type="text" 
            name="name"
            placeholder="Enter your name"
            //required
            className="p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-500 w-full min-w-[300px] max-w-[600px]"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email"
            //required
            className="p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-500 w-full min-w-[300px]"
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Enter your address"
            //required
            className="p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-500 w-full min-w-[300px]"
          />
          
          {success && <p className="text-green-500 font-bold">✓ Successfully added to waitlist!</p>}
          {error && <p className="text-red-500 font-bold">✗ {error}</p>}
          
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-6 rounded w-full min-w-[300px] transition-colors duration-200"
          >
            Join Waitlist
          </button>
        </form>

      </div>
    </main>
  )
}