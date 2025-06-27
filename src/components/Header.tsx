
import { Bell, Search, Settings, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface HeaderProps {
  currentUser?: any;
  onSearchClick: () => void;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onLoginClick: () => void;
  onNavClick: (section: string) => void;
  activeSection: string;
}

export const Header = ({ 
  currentUser, 
  onSearchClick, 
  onNotificationClick, 
  onSettingsClick, 
  onLoginClick,
  onNavClick,
  activeSection 
}: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavClick('dashboard')}
                className={`font-medium transition-colors ${
                  activeSection === 'dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavClick('projects')}
                className={`font-medium transition-colors ${
                  activeSection === 'projects' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => onNavClick('team')}
                className={`font-medium transition-colors ${
                  activeSection === 'team' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Team
              </button>
              <button 
                onClick={() => onNavClick('reports')}
                className={`font-medium transition-colors ${
                  activeSection === 'reports' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Reports
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                className="pl-10 w-64 bg-gray-50/50 border-gray-200/50 focus:bg-white cursor-pointer"
                onClick={onSearchClick}
                readOnly
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative" onClick={onNotificationClick}>
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onSettingsClick}>
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              {currentUser ? (
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={onLoginClick} className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-gray-600" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
