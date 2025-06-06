# User Authentication with localStorage and Cookies Implementation

## Overview
This document outlines the implementation of a dual authentication storage system where:
1. **During registration**: `userId` is stored in localStorage for immediate client-side access
2. **During login**: `userId` is transferred from localStorage to secure httpOnly cookies
3. **Authentication verification**: System checks both localStorage and cookies, with automatic synchronization

## Key Components Modified

### 1. Registration API (`/api/auth/register`)
**File**: `src/app/api/auth/register/route.ts`

**Changes**:
- Added automatic cookie setting when registration is successful
- User is automatically "logged in" after registration with secure cookies
- Both localStorage (client) and cookies (server) contain userId

```typescript
// Set a secure cookie with the user ID (same as login) - this automatically logs the user in
response.cookies.set('userId', String(createdUser.id), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7 // 7 days
});
```

### 2. Login API (`/api/auth/login`)
**File**: `src/app/api/auth/login/route.ts`

**Changes**: Already had cookie setting functionality - no changes needed

### 3. Session Sync API (`/api/auth/sync-session`)
**File**: `src/app/api/auth/sync-session/route.ts` (NEW)

**Purpose**: 
- Allows conversion of localStorage userId to secure cookies
- Validates user exists and is active before setting cookies
- Called automatically by authentication hook when needed

### 4. Authentication Utilities
**File**: `src/utils/auth.ts`

**New Functions Added**:
- `setUserIdInLocalStorage()`: Store userId in localStorage
- `syncUserIdToCookies()`: Sync localStorage userId to cookies via API

### 5. Authentication Hook Enhancement
**File**: `src/hooks/useAuth.tsx`

**Enhanced Logic**:
- First checks server cookies for authentication
- If server says not authenticated, checks localStorage
- Automatically attempts to sync localStorage to cookies
- Maintains backward compatibility with existing authentication flow

```typescript
// Enhanced authentication check with sync capability
if (localUserId) {
  // Try to sync localStorage userId to cookies
  const syncResponse = await fetch('/api/auth/sync-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: localUserId }),
    credentials: 'include',
  });

  if (syncResponse.ok) {
    // Successfully synced - user is now authenticated via cookies
    setAuthState({ isAuthenticated: true, ... });
  }
}
```

### 6. Frontend Pages Updates
**Files**: 
- `src/app/auth/register/page.tsx`
- `src/app/auth/login/page.tsx`

**Changes**:
- Import and use `setUserIdInLocalStorage()` utility function
- Consistent userId storage handling
- Added comments explaining the dual storage approach

## Authentication Flow

### Registration Flow
1. User submits registration form
2. Server creates user and profile
3. **Server automatically sets secure httpOnly cookie with userId**
4. **Client stores userId in localStorage for immediate access**
5. User is redirected to profile setup (automatically authenticated)

### Login Flow
1. User submits login credentials
2. Server validates credentials
3. **Server sets secure httpOnly cookie with userId**
4. **Client stores userId in localStorage for immediate access**
5. User is redirected to dashboard

### Authentication Verification Flow
1. `useAuth` hook checks server cookies first (most secure)
2. If cookies invalid/missing but localStorage has userId:
   - Calls `/api/auth/sync-session` to validate and sync
   - If valid: Sets secure cookies and continues authentication
   - If invalid: Clears localStorage and redirects to login
3. If no userId in either location: Redirects to login

## Security Benefits

### Secure Cookies (Primary Authentication)
- **httpOnly**: Cannot be accessed by JavaScript (XSS protection)
- **secure**: Only sent over HTTPS in production
- **sameSite**: CSRF protection
- **Server-side validation**: All API calls verify against cookies

### localStorage (Secondary/Convenience)
- **Immediate access**: No need to parse cookies client-side
- **Automatic sync**: Converts to secure cookies when possible
- **Fallback**: Allows recovery if cookies are cleared

## Migration Strategy

### Existing Users
- Users with existing localStorage userId will automatically be synced to cookies on next authentication check
- No manual intervention required
- Seamless transition

### New Users
- Get both localStorage and cookies immediately upon registration/login
- Optimal security and user experience from the start

## API Endpoints

### `/api/auth/register` (Enhanced)
- Creates user and profile
- **Sets secure httpOnly cookie**
- Returns userId for localStorage storage

### `/api/auth/login` (Existing)
- Validates credentials
- Sets secure httpOnly cookie
- Returns user data

### `/api/auth/sync-session` (New)
- Validates localStorage userId
- Sets secure httpOnly cookie if valid
- Returns user data

### `/api/auth/verify` (Existing)
- Verifies authentication via cookies
- Used by `useAuth` hook

### `/api/auth/logout` (Existing)
- Clears secure cookies
- Client clears localStorage

## Testing the Implementation

### Registration Test
1. Register a new user
2. Check browser Application tab → Local Storage → userId present
3. Check browser Application tab → Cookies → userId cookie present (httpOnly)
4. Navigate to protected pages → Should work without additional login

### Login Test
1. Login with existing credentials
2. Check localStorage and cookies both contain userId
3. Close browser and reopen → Should remain authenticated via cookies
4. Clear cookies but keep localStorage → Should auto-sync on next page load

### Logout Test
1. Click logout
2. Check both localStorage and cookies are cleared
3. Try accessing protected pages → Should redirect to login

## Error Handling

### Sync Failures
- If localStorage→cookie sync fails, user is prompted to login again
- Prevents security issues from invalid localStorage data

### Cookie Expiration
- 7-day expiration on cookies
- Automatic cleanup of expired sessions

### Network Issues
- Graceful fallback to localStorage when server unavailable
- Automatic retry on next authentication check
