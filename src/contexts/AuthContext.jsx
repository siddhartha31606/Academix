import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { demoUsers, demoNotifications } from '@/data/mock-data';

const AuthContext = createContext(null);
const USERS_KEY = 'eduflow_users';
const CURRENT_USER_KEY = 'eduflow_current_user';

const readStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeStoredUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const readCurrentUser = () => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readCurrentUser());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = useCallback(async (email, password, role) => {
    const storedUsers = readStoredUsers();
    const localMatch = storedUsers.find(u => u.email === email);
    if (localMatch) {
      if (localMatch.password && localMatch.password !== password) {
        return { success: false, message: 'Invalid credentials.' };
      }
      if (role && localMatch.role !== role) {
        return { success: false, message: 'Invalid credentials.' };
      }
      setUser(sanitizeUser(localMatch));
      setNotifications([]);
      return { success: true };
    }

    const found = demoUsers.find(u => u.email === email);
    if (found) {
      if (role && found.role !== role) {
        return { success: false, message: 'Invalid credentials.' };
      }
      setUser(found);
      setNotifications(demoNotifications.filter(n => n.userId === found.id));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials.' };
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    const storedUsers = readStoredUsers();
    const exists = storedUsers.some(u => u.email === email) || demoUsers.some(u => u.email === email);
    if (exists) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = {
      id: `u${Date.now()}`,
      email,
      name,
      role: role || 'student',
      password,
      createdAt: new Date().toISOString(),
    };
    writeStoredUsers([...storedUsers, newUser]);
    setUser(sanitizeUser(newUser));
    setNotifications([]);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setNotifications([]);
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, notifications, markNotificationRead, unreadCount }}>
      {children}
    </AuthContext.Provider>
  );
};
