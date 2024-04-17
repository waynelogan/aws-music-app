'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()


    function generateRandomID() {
        return Math.random().toString(36).substring(2, 9)
    }


    const handleRegister = async () => {
        const path = `https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users`
        console.log(path)
        try {
            const response = await fetch('https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users', {
                method: 'GET'
            })
            const data = await response.json()
            const emails = await data.flatMap(item => item.email)
            console.log(emails)
            if (emails.includes(email)) {
                alert('An account with that email existing. Please log in')
                router.push('/login')
            } else {
                const id = generateRandomID()
                const createResponse = await fetch('https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: id,
                        name: username,
                        email: email,
                        password: password
                    })
                })
                const createData = await createResponse.json()
                const newID = createData.split(' ').pop()
                if (newID == id) {
                    alert('Account created successfully')
                    router.push('/login')
                } else {
                    alert('Error encountered')
                }
            }
        } catch (error) {
            alert(error)
            setError(error.toString())
        }
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 p-2 w-full border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleRegister}>
                    Register
                </button>
                <p>Have an account? <Link href={'/login'} className='text-blue-500 underline underline-offset-2'>Log in</Link></p>
            </div>
        </div>
    )
}

export default Register
