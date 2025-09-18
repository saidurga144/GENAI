
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
    sendEmailVerification,
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const signIn = async (email: string, pass: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            if (!userCredential.user.emailVerified) {
              await firebaseSignOut(auth); 
              throw new Error("Please verify your email before logging in. Check your inbox (and spam folder) for a verification link.");
            }
            return userCredential;
        } catch (error: any) {
            if (error.code === AuthErrorCodes.INVALID_PASSWORD || error.code === 'auth/wrong-password') {
                throw new Error("Incorrect password. Please try again.");
            } else if (error.code === AuthErrorCodes.USER_DELETED || error.code === 'auth/user-not-found') {
                 throw new Error("No account found with this email. Please sign up first.");
            } else if (error.code === 'auth/invalid-credential') {
                 throw new Error("Invalid credentials. Please check your email and password.");
            } else if (error.message.includes("Please verify your email")) {
                throw error;
            }
            else {
                throw new Error(error.message || "An unexpected error occurred during sign-in.");
            }
        }
    };

    const signUp = async (email: string, pass: string) => {
         try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await sendEmailVerification(userCredential.user);
            await firebaseSignOut(auth);
            return userCredential;
        } catch (error: any) {
            if (error.code === AuthErrorCodes.EMAIL_EXISTS || error.code === 'auth/email-already-in-use') {
                throw new Error("Email already exists. Please log in.");
            } else {
                throw new Error(error.message || "An unexpected error occurred during sign-up.");
            }
        }
    };

    const signOut = () => {
        return firebaseSignOut(auth).then(() => {
            router.push('/login');
        });
    };

    const value = { user, loading, signIn, signUp, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
