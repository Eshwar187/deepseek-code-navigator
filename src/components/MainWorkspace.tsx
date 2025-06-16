
import { useState } from 'react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { OutputRenderer } from '@/components/OutputRenderer';

type User = {
  id: string;
  email: string;
  role: 'developer' | 'tester' | 'po';
};

interface MainWorkspaceProps {
  user: User;
  onLogout: () => void;
}

export function MainWorkspace({ user, onLogout }: MainWorkspaceProps) {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (data: any) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock analysis result based on role
      const mockResult = generateMockResult(user.role, data);
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateMockResult = (role: string, data: any) => {
    const baseResult = {
      timestamp: new Date().toISOString(),
      code: data.code,
      prompt: data.prompt,
      language: data.language
    };

    switch (role) {
      case 'tester':
        return {
          ...baseResult,
          functionalTests: [
            { id: 1, name: 'Valid input handling', status: 'pass', coverage: 85 },
            { id: 2, name: 'Edge case: empty input', status: 'fail', coverage: 90 },
            { id: 3, name: 'Error handling', status: 'pass', coverage: 75 }
          ],
          securityTests: [
            { id: 1, name: 'SQL injection check', status: 'pass', severity: 'high' },
            { id: 2, name: 'XSS vulnerability', status: 'warning', severity: 'medium' }
          ],
          performanceTests: [
            { id: 1, name: 'Load time analysis', result: '120ms', status: 'good' },
            { id: 2, name: 'Memory usage', result: '45MB', status: 'optimal' }
          ]
        };
      
      case 'developer':
        return {
          ...baseResult,
          correctedCode: `// Optimized version\n${data.code}\n// Added error handling and performance improvements`,
          bugs: [
            { line: 15, severity: 'high', message: 'Potential null pointer exception' },
            { line: 23, severity: 'medium', message: 'Inefficient loop structure' }
          ],
          suggestions: [
            'Add input validation',
            'Implement proper error handling',
            'Consider using async/await pattern'
          ]
        };
      
      case 'po':
        return {
          ...baseResult,
          bugStats: {
            total: 12,
            high: 3,
            medium: 5,
            low: 4
          },
          featureValidation: {
            implemented: 8,
            missing: 2,
            score: 80
          },
          timeline: [
            { date: '2024-01-15', bugs: 15, fixed: 12 },
            { date: '2024-01-16', bugs: 12, fixed: 8 }
          ]
        };
      
      default:
        return baseResult;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header user={user} onLogout={onLogout} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          <div className="space-y-6">
            <InputPanel 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing}
              userRole={user.role}
            />
          </div>
          
          <div className="space-y-6">
            <OutputRenderer 
              result={analysisResult}
              userRole={user.role}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
