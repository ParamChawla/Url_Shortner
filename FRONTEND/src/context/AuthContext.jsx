import { createContext, useContext, useEffect, useState } from 'react'
import * as auth from '../services/auth'
const AuthContext = createContext(null)
export function AuthProvider({ children }) { const [user,setUser]=useState(null),[loading,setLoading]=useState(true); const refreshUser=async()=>{const r=await auth.currentUser();const u=r.data?.user||r.data;setUser(u);return u}; useEffect(()=>{refreshUser().catch(()=>{}).finally(()=>setLoading(false))},[]); const value={user,loading,refreshUser,login: async d=>{const r=await auth.login(d); const u=r.data?.user||await refreshUser(); if(r.data?.token)localStorage.setItem('token',r.data.token); setUser(u); return r},register:async d=>{const r=await auth.register(d); await refreshUser(); return r},logout:async()=>{await auth.logout().catch(()=>{});localStorage.removeItem('token');setUser(null)}}; return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> }
export const useAuth=()=>useContext(AuthContext)
