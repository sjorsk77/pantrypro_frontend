
import { Outlet } from "react-router-dom"

export function Layout() {
    return (
        <>
            <main className="h-screen">
                <Outlet/>
            </main>
        </>
    )
}