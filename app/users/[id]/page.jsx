'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'


const UserIDPage = () => {
    const pathName = usePathname()
    const id = pathName.split('/').pop()
    const [user, setUser] = useState()
    console.log(id)

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

    useEffect(() => {
        getUsers().then( data => {
            const authUser = data.filter(item => item.id == id)[0]
            setUser(authUser)
        })
    })


    return (
        <main>
            <div className="container mx-auto mt-8">
                <p>{user?.name}</p>
            </div>
        </main>
    )
}

export default UserIDPage
