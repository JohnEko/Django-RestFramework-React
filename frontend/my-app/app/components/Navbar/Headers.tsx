"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"
// import { ModeToggle } from "@/components/mode-toggle"
// import Navbar from "./components/Navbar"

const Header =() => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
           
          <Link href="/" className="text-2xl font-bold text-primary">
            Amebonaija
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/featured" className="text-muted-foreground hover:text-primary">
              Featured
            </Link>
            <Link href="/trending" className="text-muted-foreground hover:text-primary">
              Trending
            </Link>
            <Link href="/recent" className="text-muted-foreground hover:text-primary">
              Recent
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Register</Button>
            </div>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Headers
