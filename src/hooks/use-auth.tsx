
"use client";

import React, { 
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
    sendPasswordResetEmail,
    User,
    AuthErrorCodes
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, pass: string) => Promise<any>;
    signUp: (email: string, pass: string) => Promise<any>;
    signOut: () => Promise<any>;
    sendPasswordReset: (email: string) => Promise<void>;
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

    const signIn = async (email: string, pass: string) => {
        try {
            return await signInWithEmailAndPassword(auth, email, pass);
        } catch (error: any) {
            if (error.code === AuthErrorCodes.INVALID_PASSWORD || error.code === 'auth/wrong-password') {
                throw new Error("Incorrect password. Please try again.");
            } else if (error.code === AuthErrorCodes.USER_DELETED || error.code === 'auth/user-not-found') {
                 throw new Error("No account found with this email. Please sign up first.");
            } else if (error.code === 'auth/invalid-credential') {
                 throw new Error("Invalid credentials. Please check your email and password.");
            }
            else {
                throw new Error(error.message || "An unexpected error occurred during sign-in.");
            }
        }
    };

    const signUp = async (email: string, pass: string) => {
         try {
            return await createUserWithEmailAndPassword(auth, email, pass);
        } catch (error: any) {
            if (error.code === AuthErrorCodes.EMAIL_EXISTS || error.code === 'auth/email-already-in-use') {
                throw new Error("Email already exists. Please log in.");
            } else {
                throw new Error(error.message || "An unexpected error occurred during sign-up.");
            }
        }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        // Force a redirect to the login page after sign-out.
        router.push('/login');
    };
    
    const sendPasswordReset = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
             if (error.code === 'auth/user-not-found') {
                // To avoid user enumeration, you might want to show a generic message.
                // However, for better UX, we'll inform them the email was not found.
                throw new Error("No account found with this email address.");
            } else {
                throw new Error(error.message || "An unexpected error occurred while sending the reset email.");
            }
        }
    };

    const value = { user, loading, signIn, signUp, signOut, sendPasswordReset };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
