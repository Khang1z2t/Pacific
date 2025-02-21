import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                setRole(userDoc.get('role'));
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setRole('user');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setCurrentUser(user);
            setUserLoggedIn(true);

            // Kiểm tra nếu role đã có, thì không cần lấy lại từ Firestore
            if (!role) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.get('role'));
                }
            }
        } catch (error) {
            console.error('Login failed: ', error.message);
            throw error;
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setUserLoggedIn(false);
            setRole(null);
        } catch (error) {
            console.error('Logout failed: ', error.message);
            throw error;
        }
    };


    const value = {
        currentUser,
        userLoggedIn,
        login,
        logout,
        loading,
        role,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}