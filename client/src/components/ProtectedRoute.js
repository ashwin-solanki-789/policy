import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ user, element }) {
    if (!user) {
        return <Navigate to={"/login"} />
    }
    return (
        element
    )
}
