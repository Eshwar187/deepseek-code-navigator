
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';

type User = {
  id: string;
  email: string;
  role: 'developer' | 'tester' | 'po';
};

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const roleIcons = {
  developer: '👨‍💻',
  tester: '🧪',
  po: '📊'
};

const roleNames = {
  developer: 'Developer',
  tester: 'Tester',
  po: 'Product Owner'
};

export function Header({ user, onLogout }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">QA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">QA Assistant</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Testing Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-muted"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-muted">
                  <span className="text-lg">{roleIcons[user.role]}</span>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium">{roleNames[user.role]}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
