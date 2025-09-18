
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
            if (user && !user.emailVerified) {
                // If the user is logged in but the email is not verified,
                // keep them on the login page or show a message.
                // For this app, we'll just log them out if they refresh.
                const isAuthPage = window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup');
                if (!isAuthPage) {
                    firebaseSignOut(auth);
                }
                 setUser(null);
            } else {
                setUser(user);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const signIn = async (email: string, pass: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            if (!userCredential.user.emailVerified) {
              // Sign out the user immediately if their email is not verified.
              await firebaseSignOut(auth);
              throw new Error("Please verify your email before logging in. Check your inbox for a verification link.");
            }
            return userCredential;
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        // Send verification email
        await sendEmailVerification(userCredential.user);
        // Sign out the user immediately so they have to verify to log in
        await firebaseSignOut(auth);
        return userCredential;
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
