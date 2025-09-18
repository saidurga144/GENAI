
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
            if (user) {
                // This will allow a newly signed up user (who is not verified) to exist in the auth state
                // on the signup/login pages, but will prevent them from accessing protected routes.
                if (!user.emailVerified) {
                    const isAuthPage = window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup') || window.location.pathname === '/';
                    // If they are on a protected page, sign them out.
                    if (!isAuthPage) {
                        firebaseSignOut(auth);
                        setUser(null);
                    } else {
                        // This allows the user object to be available temporarily on auth pages
                        // which can be useful for displaying messages, but they can't navigate away.
                        setUser(user); 
                    }
                } else {
                    setUser(user);
                }
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
            // The onAuthStateChanged observer will handle the user state.
            // We just need to check for verification here to provide immediate feedback.
            if (!userCredential.user.emailVerified) {
              await firebaseSignOut(auth); // Sign out if not verified
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
            } else if (error.message.includes("Please verify your email")) {
                throw error; // Re-throw our custom verification error
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
            // We sign the user out to force them to verify their email before logging in.
            // The user will be redirected by the logic in `useEffect`.
            await firebaseSignOut(auth);
            return userCredential;
        } catch (error: any) {
            if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
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
