
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';

// Note: The username functionality is currently disabled due to unresolved Firestore permission issues.
// The following functions are preserved for future use but are not currently called by the application.

const usernameRegex = /^[a-zA-Z]{4}[0-9]{3}$/;

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  if (!usernameRegex.test(username)) {
    return false;
  }
  const usernameRef = doc(db, 'usernames', username.toLowerCase());
  const docSnap = await getDoc(usernameRef);
  return !docSnap.exists();
}

export async function setUsername(userId: string, username: string): Promise<void> {
  if (!usernameRegex.test(username)) {
    throw new Error('Invalid username format. Must be 4 letters followed by 3 numbers.');
  }

  const lowerCaseUsername = username.toLowerCase();
  const userRef = doc(db, 'users', userId);
  const usernameRef = doc(db, 'usernames', lowerCaseUsername);

  try {
    await runTransaction(db, async (transaction) => {
      const usernameDoc = await transaction.get(usernameRef);
      if (usernameDoc.exists()) {
        throw new Error('This username is already taken. Please choose another one.');
      }

      const userDoc = await transaction.get(userRef);
      if (userDoc.exists() && userDoc.data().username) {
        const oldUsername = userDoc.data().username;
        const oldUsernameRef = doc(db, 'usernames', oldUsername.toLowerCase());
        transaction.delete(oldUsernameRef);
      }

      transaction.set(usernameRef, { uid: userId });
      transaction.set(userRef, { username: username }, { merge: true });
    });
  } catch (error) {
    console.error("Transaction failed: ", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unexpected error occurred while setting the username.');
  }
}

export async function getUsername(userId: string): Promise<string | null> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().username) {
        return userDoc.data().username;
    }
    return null;
}
