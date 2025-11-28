import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export default function Home() {

  // 1. This is the "Server Action"
  // It runs securely on the server, not the browser.
  async function addSubscriber(formData: FormData) {
    'use server'

    // Get the data from the form
    const email = formData.get('email')

    // Connect to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Insert the data
    const { error } = await supabase
      .from('subscribers')
      .insert({ email })

    if (error) {
      console.error(error)
      return // In a real app, you'd show an error message
    }

    // Refresh the page so the form clears
    revalidatePath('/')
  }

  // 2. This is the UI (The Webpage)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex-col">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Coming Soon
        </h1>

        {/* The Form */}
        <form action={addSubscriber} className="flex flex-col gap-4 items-center">
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email"
            required
            className="p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-500 min-w-[300px]"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Join Waitlist
          </button>
        </form>

      </div>
    </main>
  )
}