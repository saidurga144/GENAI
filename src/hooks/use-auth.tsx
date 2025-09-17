
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
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification,
    ConfirmationResult,
    User
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

// Declare window.confirmationResult for the OTP flow
declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
        confirmationResult?: ConfirmationResult;
    }
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, pass: string) => Promise<any>;
    signUp: (email: string, pass: string) => Promise<any>;
    signOut: () => Promise<any>;
    sendOtp: (phone: string, otp?: string) => Promise<any>;
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

    const setupRecaptcha = (phone: string) => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
      }
    }
    
    const sendOtp = async (phone: string, otp?: string) => {
      if (otp) { // If OTP is provided, verify it
          if (window.confirmationResult) {
              return await window.confirmationResult.confirm(otp);
          } else {
              throw new Error("OTP was not sent yet. Please request an OTP first.");
          }
      } else { // If no OTP, send it
          setupRecaptcha(phone);
          const appVerifier = window.recaptchaVerifier!;
          const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
          window.confirmationResult = confirmationResult;
          return confirmationResult;
      }
    }

    const signIn = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signUp = async (email: string, pass: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        // Send verification email
        await sendEmailVerification(userCredential.user);
        return userCredential;
    };

    const signOut = () => {
        window.recaptchaVerifier?.clear();
        return firebaseSignOut(auth).then(() => {
            router.push('/login');
        });
    };

    const value = { user, loading, signIn, signUp, signOut, sendOtp };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
