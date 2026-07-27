import { createContext, useContext, useEffect, useState } from "react";
import { getSession, onAuthChange } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    getSession().then(({ data }) => setSession(data.session ?? null));
    const {
      data: { subscription },
    } = onAuthChange((_event, s) => setSession(s ?? null));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading: session === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
