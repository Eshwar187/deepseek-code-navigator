
import { useState, useEffect } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { RoleSelector } from '@/components/RoleSelector';
import { MainWorkspace } from '@/components/MainWorkspace';
import { ThemeProvider } from '@/components/ThemeProvider';

type User = {
  id: string;
  email: string;
  role?: 'developer' | 'tester' | 'po';
};

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (localStorage simulation)
    const savedUser = localStorage.getItem('qa-assistant-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      if (!userData.role) {
        setShowRoleSelector(true);
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    const newUser = { id: '1', email };
    setUser(newUser);
    setShowRoleSelector(true);
    localStorage.setItem('qa-assistant-user', JSON.stringify(newUser));
  };

  const handleRoleSelect = (role: 'developer' | 'tester' | 'po') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setShowRoleSelector(false);
      localStorage.setItem('qa-assistant-user', JSON.stringify(updatedUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowRoleSelector(false);
    localStorage.removeItem('qa-assistant-user');
  };

  if (!user) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  if (showRoleSelector || !user.role) {
    return (
      <ThemeProvider>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MainWorkspace user={user} onLogout={handleLogout} />
    </ThemeProvider>
  );
};

export default Index;
