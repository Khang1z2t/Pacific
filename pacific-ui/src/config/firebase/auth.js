import {auth, db} from './firebase';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword,FacebookAuthProvider , GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {collection, doc, getDocs, query, setDoc,where} from 'firebase/firestore';


export const register = async (email, password,username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //save
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            username: username,
            uid: user.uid,
            provider: user.providerData[0]?.providerId, // Google/Facebook/Email
            createdAt: new Date().toISOString(),
        });
        //setUsername
        await user.updateProfile({
            displayName: username,
        });
        return user;
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
}

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
}

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        //save
        await saveUser(user);
        return user;
    } catch (error) {
        return error;
    }
}
export const doSignInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        //save
        await saveUser(user);
        return user;
    } catch (error) {
        return error;
    }
}

export const doSendEmailVerification = () => {
    return doSendEmailVerification(auth.currentUser, {
        url: '${window.location.origin}',
    });
}

export const saveUser = async (user) => {
    try{
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            email: user.email,
            username: user.displayName,
            uid: user.uid,
            provider: user.providerData[0]?.providerId, // Google/Facebook/Email
            createdAt: new Date().toISOString(),
        },{merge: true}); //Ghi de len tai khoan da ton tai
    }catch (error) {
        return error;
    }
}