"use client";

import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    ReactNode,
} from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut as firebaseSignOut,
    signInWithPopup,
    GoogleAuthProvider,
    OAuthProvider,
    User
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, pass: string) => Promise<any>;
    signUp: (email: string, pass: string) => Promise<any>;
    signOut: () => Promise<any>;
    signInWithGoogle: () => Promise<any>;
    signInWithMicrosoft: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const signIn = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signUp = (email: string, pass: string) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const signOut = () => {
        return firebaseSignOut(auth).then(() => {
            router.push('/login');
        });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        return signInWithPopup(auth, provider);
    };

    const signInWithMicrosoft = () => {
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            // Optional: You can specify a tenant here if needed
            // tenant: 'YOUR_TENANT_ID'
        });
        return signInWithPopup(auth, provider);
    };

    const value = { user, loading, signIn, signUp, signOut, signInWithGoogle, signInWithMicrosoft };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
