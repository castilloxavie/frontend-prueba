"use client";
import {useAuthStore} from "../store/authStore"
import Login from "./Login"

export default function ProtectedRoute ({children}) {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    if(!isLoggedIn) return <Login />
    return children
}
