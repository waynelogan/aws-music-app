'use client'
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    router.push('/register')
    return (
        <main>
            
        </main>
    )
}
