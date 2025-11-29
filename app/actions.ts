'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function addSubscriber(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const address = formData.get('address')

  if (!name || !email) {
    return { error: "Missing name, or email" }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error: dbError } = await supabase
    .from('subscribers')
    .insert({ email, name})

  if (dbError) {
    return { error: dbError.message }
  }

  revalidatePath('/')
  return { success: true }
}