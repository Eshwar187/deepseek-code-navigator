
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface OutputRendererProps {
  result: any;
  userRole: string;
  isAnalyzing: boolean;
}

export function OutputRenderer({ result, userRole, isAnalyzing }: OutputRendererProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['main']));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  if (isAnalyzing) {
    return (
      <Card className="glass-card h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Analyzing your code...</h3>
              <p className="text-muted-foreground">AI is processing your request</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="glass-card h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="text-6xl">🤖</div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Ready to analyze</h3>
              <p className="text-muted-foreground">Submit your code to get AI-powered insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (userRole === 'tester') {
    return (
      <Card className="glass-card h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🧪</span>
            <span>Test Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Functional Tests */}
          <Collapsible open={openSections.has('functional')} onOpenChange={() => toggleSection('functional')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span className="font-semibold">Functional Test Cases</span>
                  <Badge variant="secondary">{result.functionalTests?.length || 0} tests</Badge>
                </div>
                <span className="text-lg">{openSections.has('functional') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {result.functionalTests?.map((test: any) => (
                <div key={test.id} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{test.name}</span>
                    <Badge variant={test.status === 'pass' ? 'default' : 'destructive'}>
                      {test.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Coverage: {test.coverage}%
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Security Tests */}
          <Collapsible open={openSections.has('security')} onOpenChange={() => toggleSection('security')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>🔐</span>
                  <span className="font-semibold">Security Test Cases</span>
                  <Badge variant="secondary">{result.securityTests?.length || 0} tests</Badge>
                </div>
                <span className="text-lg">{openSections.has('security') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {result.securityTests?.map((test: any) => (
                <div key={test.id} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{test.name}</span>
                    <Badge variant={test.status === 'pass' ? 'default' : 'outline'}>
                      {test.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Performance Tests */}
          <Collapsible open={openSections.has('performance')} onOpenChange={() => toggleSection('performance')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span className="font-semibold">Performance Test Cases</span>
                  <Badge variant="secondary">{result.performanceTests?.length || 0} tests</Badge>
                </div>
                <span className="text-lg">{openSections.has('performance') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {result.performanceTests?.map((test: any) => (
                <div key={test.id} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{test.name}</span>
                    <Badge variant="default">{test.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Result: {test.result}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">📄 Export JSON</Button>
            <Button variant="outline" size="sm">📮 Export to Postman</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userRole === 'developer') {
    return (
      <Card className="glass-card h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>👨‍💻</span>
            <span>Code Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Corrected Code */}
          <Collapsible open={openSections.has('code')} onOpenChange={() => toggleSection('code')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>🧹</span>
                  <span className="font-semibold">Corrected Code</span>
                </div>
                <span className="text-lg">{openSections.has('code') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(result.correctedCode)}
                >
                  📋
                </Button>
                <pre className="whitespace-pre-wrap pr-12">{result.correctedCode}</pre>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Bug Analysis */}
          <Collapsible open={openSections.has('bugs')} onOpenChange={() => toggleSection('bugs')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>🔍</span>
                  <span className="font-semibold">Bug Analysis</span>
                  <Badge variant="destructive">{result.bugs?.length || 0} issues</Badge>
                </div>
                <span className="text-lg">{openSections.has('bugs') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {result.bugs?.map((bug: any, index: number) => (
                <div key={index} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Line {bug.line}</span>
                    <Badge variant={bug.severity === 'high' ? 'destructive' : 'outline'}>
                      {bug.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{bug.message}</p>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Suggestions */}
          <Collapsible open={openSections.has('suggestions')} onOpenChange={() => toggleSection('suggestions')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center space-x-2">
                  <span>💡</span>
                  <span className="font-semibold">Suggestions</span>
                </div>
                <span className="text-lg">{openSections.has('suggestions') ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {result.suggestions?.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 p-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">📄 Export Report</Button>
            <Button variant="outline" size="sm">🐙 Push to GitHub</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userRole === 'po') {
    return (
      <Card className="glass-card h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Project Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Bug Stats */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Bug Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{result.bugStats?.high || 0}</div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{result.bugStats?.medium || 0}</div>
                  <div className="text-sm text-muted-foreground">Medium Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Validation */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Feature Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Implementation Score</span>
                  <span className="font-bold text-green-500">{result.featureValidation?.score || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                    style={{ width: `${result.featureValidation?.score || 0}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">📄 Export PDF</Button>
            <Button variant="outline" size="sm">🔗 Share Summary</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
