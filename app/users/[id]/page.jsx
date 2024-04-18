'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const UserIDPage = () => {
    const pathName = usePathname()
    const [user, setUser] = useState()
    const [songs, setSongs] = useState([])
    const router = useRouter()
    const path = pathName.split('/')
    if (path.length !== 3) {
        // router.push('/login')
    }
    const id = path.pop()

    async function getUsers() {
        try {
            const response = await fetch('https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users', {
                method: 'GET'
            })
            const data = await response.json()
            return data
        } catch (error) {
            alert(error)
        }
    }

    async function getSongs() {
        try {
            const response = await fetch('https://v9fz4mkkfh.execute-api.eu-north-1.amazonaws.com/music', {
                method: 'GET'
            })
            const data = await response.json()
            return data
        } catch (error) {
            alert(error)
        }
    }

    async function handleDeleteSong(id) {
        try {
            const response = await fetch(`https://v9fz4mkkfh.execute-api.eu-north-1.amazonaws.com/music/${id}`, {
                method: 'DELETE'
            })
            const data = await response.data
            getSongs().then(data => {
                setSongs(data)
            })
        } catch (error) {
            alert(error)
        }
    }

    async function handleQuery() {
        const fetchedSongs = await getSongs()
        setSongs(fetchedSongs)
    }

    useEffect(() => {
        getUsers().then(data => {
            const authUser = data.filter(item => item.id == id)[0]
            setUser(authUser)
        })
    }, [])


    return (
        <main>
            <div className="container mx-auto mt-8">
                <div className="flex justify-end mb-4">
                    <div className='flex flex-col gap-4'>
                        <div className="bg-gray-200 p-4 rounded">
                            <h2 className="text-lg font-semibold mb-2">User Details</h2>
                            <p>Name: {user?.name}</p>
                            <p>Email: {user?.email}</p>
                        </div>
                        <Link href={'/login'} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Logout</Link>
                        <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600" onClick={handleQuery}>Query</button>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">Songs</h1>
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left">Title</th>
                            <th className="text-left">Artist</th>
                            <th className="text-left">Year</th>
                            <th className="text-left">Image</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={index} className="border-b">
                                <td>{song?.title}</td>
                                <td>{song?.artist}</td>
                                <td>{song?.year}</td>
                                <td>
                                    <img src={song.img_url} alt={song.title} className="h-12 w-12 object-cover" />
                                </td>
                                <td>
                                    <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" onClick={() => handleDeleteSong(song.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default UserIDPage
