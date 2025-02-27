import { auth, db } from './firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import UserServices from '~/services/UserServices';


export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //save
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            // username: username,
            // firstname: firstName,
            // lastname: lastName,
            role: 'user',
            uid: user.uid,
            provider: user.providerData[0]?.providerId, // Google/Facebook/Email
            // createdAt: new Date().toISOString(),
        });

        return user;
    } catch (error) {
        return error;
    }
};


export const getUser = async (email) => {
    try {
        const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
        if (userDoc.empty) {
            throw new Error('User không tồn tại');
        }
        return userDoc.docs[0].data();
    } catch (error) {
        return error;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const userDoc = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
        if (userDoc.empty) {
            throw new Error('User không tồn tại');
        }
        return userDoc.docs[0].data();
    } catch (error) {
        return error;
    }
}

export const loginWEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        return error;
    }
};

export const loginWithUsername = async (username, password) => {
    try {
        // Tìm email từ username
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error('Username không tồn tại');
        }
        const userDoc = querySnapshot.docs[0];
        const email = userDoc.data().email;

        // Đăng nhập bằng email
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        return error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        return error;
    }
};

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        //save firestore
        await saveUser(user);
        const userDoc = await getUser(user.email);
        // Save to database
        await UserServices.register(userDoc.username, '', '', '', user.email);
        return user;
    } catch (error) {
        return error;
    }
};
export const doSignInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        //save
        await saveUser(user);
        const userDoc = await getUserByUsername(user.displayName);

        const [firstName, ...lastNameParts] = userDoc.displayName.split(' ');
        const lastName = lastNameParts.join(' ');
        // Save to database
        await UserServices.register(userDoc.displayName, '', firstName, lastName, user.email);
        return user;
    } catch (error) {
        return error;
    }
};

export const doSendEmailVerification = () => {
    return doSendEmailVerification(auth.currentUser, {
        url: '${window.location.origin}',
    });
};

export const saveUser = async (user) => {
    try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));

        let role = 'user';

        if (!userDoc.empty) {
            const existingUser = userDoc.docs[0].data();
            role = existingUser.role || 'user';
        }

        await setDoc(userRef, {
            email: user.email,
            username: user.displayName,
            role: role,
            uid: user.uid,
            provider: user.providerData[0]?.providerId,
            createdAt: new Date().toISOString(),
        }, { merge: true });

    } catch (error) {
        return error;
    }
};

export const resetPassword = async (email, password) => {
    try {
        // Find user through email
        const query = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(query);
        if (querySnapshot.empty) {
            throw new Error('Email không tồn tại');
        } else {
            const userDoc = querySnapshot.docs[0];
            const user = userDoc.data();
            await setDoc(doc(db, 'users', user.uid), {
                password: password,
            }, { merge: true });
        }
    } catch (error) {
        return error;
    }
};

