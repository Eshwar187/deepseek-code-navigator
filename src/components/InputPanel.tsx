
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface InputPanelProps {
  onAnalyze: (data: any) => void;
  isAnalyzing: boolean;
  userRole: string;
}

export function InputPanel({ onAnalyze, isAnalyzing, userRole }: InputPanelProps) {
  const [inputMethod, setInputMethod] = useState('paste');
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [githubUrl, setGithubUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);

  const handleApiKeyTest = async () => {
    if (!apiKey.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an API key to test',
        variant: 'destructive'
      });
      return;
    }

    // Simulate API key validation
    setTimeout(() => {
      const isValid = apiKey.length > 10; // Simple validation
      setApiKeyValid(isValid);
      toast({
        title: isValid ? 'Success' : 'Error',
        description: isValid ? '✅ API Key Valid' : '❌ API Key Invalid',
        variant: isValid ? 'default' : 'destructive'
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (!code.trim() && !githubUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide code or GitHub URL',
        variant: 'destructive'
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please describe what your code should do',
        variant: 'destructive'
      });
      return;
    }

    onAnalyze({
      inputMethod,
      code: inputMethod === 'github' ? githubUrl : code,
      prompt,
      language,
      apiKey
    });
  };

  const canSubmit = (code.trim() || githubUrl.trim()) && prompt.trim() && !isAnalyzing;

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-lg">⚡</span>
          <span>Input Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Programming Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Input Method Tabs */}
        <Tabs value={inputMethod} onValueChange={setInputMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paste">📝 Paste Code</TabsTrigger>
            <TabsTrigger value="github">🐙 GitHub URL</TabsTrigger>
            <TabsTrigger value="upload">📁 Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paste" className="space-y-4">
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="github" className="space-y-4">
            <Input
              placeholder="https://github.com/user/repo"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-muted-foreground">Drag & drop a .zip file or click to browse</p>
              <Button variant="outline" className="mt-4">
                Choose File
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Describe what your code should do</label>
          <Textarea
            placeholder="Explain the expected functionality, business logic, or specific requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* API Key Testing */}
        <div className="space-y-2">
          <label className="text-sm font-medium">API Key (Optional)</label>
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter Deepseek API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`flex-1 ${
                apiKeyValid === true ? 'border-green-500' : 
                apiKeyValid === false ? 'border-red-500' : ''
              }`}
            />
            <Button variant="outline" onClick={handleApiKeyTest} size="sm">
              🔍 Test
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          size="lg"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <>🧠 Analyze with Deepseek AI</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
