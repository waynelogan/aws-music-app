'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        try {
            // Perform login request
            const response = await fetch('https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users', {
                method: 'GET'
            })
            const data = await response.json()
            const user = data.filter( item => item.email == email)
            if (user.length == 0 ) {
                alert('No account with that email found. Please sign up.')
                router.push('/register')
            } else if (user[0].password !== password) {
                setError('Wrong password')
            } else {
                router.push(`/users/${user[0].id}`)
            }
            //   const response = await axios.post('/api/login', { email, password });

            //   // Redirect user to dashboard or home page upon successful login
            //   window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error logging in:', error)
            setError('Invalid email or password. Please try again.')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 p-2 w-full border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 p-2 w-full border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleLogin}>
                    Login
                </button>
                <p>Don&apos;t have an account? <Link href={'/register'} className='text-blue-500 underline underline-offset-2'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login
