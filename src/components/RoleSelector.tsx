
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleSelectorProps {
  onRoleSelect: (role: 'developer' | 'tester' | 'po') => void;
}

const roles = [
  {
    id: 'developer' as const,
    title: 'Developer',
    icon: '👨‍💻',
    description: 'Get code analysis, bug fixes, and optimization suggestions',
    features: ['Code review', 'Bug detection', 'Performance analysis', 'Security scan']
  },
  {
    id: 'tester' as const,
    title: 'Tester',
    icon: '🧪',
    description: 'Generate comprehensive test cases and validation strategies',
    features: ['Test case generation', 'Edge case detection', 'API testing', 'Coverage analysis']
  },
  {
    id: 'po' as const,
    title: 'Product Owner',
    icon: '📊',
    description: 'View project insights, bug analytics, and feature validation',
    features: ['Bug analytics', 'Feature validation', 'Progress tracking', 'Quality metrics']
  }
];

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-4xl font-bold gradient-text mb-4">Choose Your Role</h1>
          <p className="text-xl text-muted-foreground">Select your primary role to customize your QA experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card
              key={role.id}
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-in group"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl group-hover:animate-pulse-glow">
                  {role.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{role.title}</CardTitle>
                <CardDescription className="text-base">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
