import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import { Pricing, About, Contact } from './pages/Marketing'
const NotFound=()=> <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center"><p className="text-cyan">404</p><h1 className="mt-2 text-4xl font-semibold">This link went nowhere.</h1><a className="mt-5 text-indigo-300" href="/">Back home</a></main>
function Shell(){const l=useLocation();return <><Navbar/><AnimatePresence mode="wait"><motion.div key={l.pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}><Routes location={l}><Route path="/" element={<Home/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth mode="register"/>}/><Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/><Route path="/analytics" element={<ProtectedRoute><Analytics/></ProtectedRoute>}/><Route path="/pricing" element={<Pricing/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></motion.div></AnimatePresence><Footer/></>}
export default function App(){return <AuthProvider><Shell/></AuthProvider>}
