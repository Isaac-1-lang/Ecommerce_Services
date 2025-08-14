// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id',
  scope: 'email profile',
  redirectUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
};

// Google API types
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export interface GoogleUser {
  getAuthResponse(): {
    id_token: string;
    access_token: string;
  };
  getBasicProfile(): {
    getId(): string;
    getName(): string;
    getEmail(): string;
    getImageUrl(): string;
  };
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private auth2: any = null;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google API if not already loaded
      if (typeof window === 'undefined') {
        reject(new Error('Google Auth is not available on server side'));
        return;
      }

      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.onload = () => this.loadAuth2(resolve, reject);
        script.onerror = () => reject(new Error('Failed to load Google API'));
        document.head.appendChild(script);
      } else {
        this.loadAuth2(resolve, reject);
      }
    });
  }

  private loadAuth2(resolve: () => void, reject: (error: Error) => void): void {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: GOOGLE_CONFIG.clientId,
        scope: GOOGLE_CONFIG.scope
      }).then((auth2: any) => {
        this.auth2 = auth2;
        this.isInitialized = true;
        resolve();
      }).catch((error: any) => {
        reject(new Error(`Failed to initialize Google Auth: ${error.message}`));
      });
    });
  }

  async signIn(): Promise<GoogleUser> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const googleUser = await this.auth2.signIn();
      return googleUser;
    } catch (error: any) {
      throw new Error(`Google sign in failed: ${error.message}`);
    }
  }

  async signOut(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.auth2.signOut();
    } catch (error: any) {
      throw new Error(`Google sign out failed: ${error.message}`);
    }
  }

  isSignedIn(): boolean {
    return this.auth2?.isSignedIn?.get() || false;
  }

  getCurrentUser(): GoogleUser | null {
    if (!this.isInitialized || !this.isSignedIn()) {
      return null;
    }
    return this.auth2.currentUser.get();
  }
}

// Export singleton instance
export const googleAuthService = GoogleAuthService.getInstance();
