// Firebase 초기화 모듈
import { firebaseConfig, isFirebaseEnabled } from './config.js';

let firebaseApp = null;
let db = null;

/**
 * Firebase 초기화
 */
export async function initializeFirebase() {
    if (!isFirebaseEnabled) {
        console.log('Firebase is disabled. Using localStorage.');
        return;
    }

    // Firebase SDK가 로드될 때까지 대기
    let retries = 0;
    while (typeof firebase === 'undefined' && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }

    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK not loaded. Please check Firebase SDK scripts in index.html');
        return;
    }

    try {
        // Firebase 앱 초기화 (compat 모드 사용)
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        console.log('Falling back to localStorage');
    }
}

/**
 * Firestore 인스턴스 가져오기
 */
export function getFirestore() {
    return db;
}

/**
 * Firebase 사용 가능 여부 확인
 */
export function isFirebaseReady() {
    return isFirebaseEnabled && db !== null;
}

