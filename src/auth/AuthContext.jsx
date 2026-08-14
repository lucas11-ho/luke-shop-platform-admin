import React,{createContext,useContext,useMemo,useState}from'react';
import{createApi,readSession,writeSession}from'../api/client.js';

const C=createContext(null);

export function AuthProvider({children}){
 const[session,setState]=useState(()=>readSession());
 const setSession=next=>{setState(next);writeSession(next)};
 const api=useMemo(()=>createApi({getSession:()=>session,onSession:setSession}),[session]);
 const login=async({email,password})=>{const publicApi=createApi({getSession:()=>null,onSession:()=>{}});const d=await publicApi.request('/v1/platform/auth/login',{method:'POST',auth:false,body:{email,password}}),u=d.data.user,t=d.data.tokens,next={accessToken:t.access_token,refreshToken:t.refresh_token,expiresIn:t.expires_in,user:u};setSession(next);return next};
 const refreshProfile=async()=>{if(!session?.accessToken)return null;const d=await api.request('/v1/platform/me');const user=d.data.user;setSession({...session,user});return user};
 const logout=async()=>{try{if(session?.accessToken)await api.request('/v1/platform/auth/logout',{method:'POST',body:{}})}catch{}finally{setSession(null);location.hash='#/login'}};
 return <C.Provider value={{session,api,login,logout,refreshProfile,isOwner:session?.user?.role==='OWNER'}}>{children}</C.Provider>;
}

export const useAuth=()=>useContext(C);
