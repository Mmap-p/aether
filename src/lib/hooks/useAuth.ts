import { useState } from 'react'

const TEST_MODE = process.env.NEXT_PUBLIC_APP_ENV === 'development'

export const TEST_USER = {
  uid: 'test-user-001',
  email: 'test@aether.space',
  displayName: 'Test Observer',
  username: 'test_observer',
  role: 'astrophysicist',
  badgeTier: 'pro',
  avatarInitials: 'TO',
}

export function useAuth() {
  const [user] = useState(TEST_MODE ? TEST_USER : null)
  const [loading] = useState(false)

  return { user, loading, isAuthenticated: !!user }
}
