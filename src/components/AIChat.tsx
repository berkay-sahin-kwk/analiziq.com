import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Brain, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
}

export function AIChat({ isMinimized = false, onToggleMinimize, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI football analyst. Ask me anything about upcoming matches, team form, injury reports, or predictions. For example: 'Will Manchester United beat Liverpool tonight?' or 'Tell me about Chelsea's current form'.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Will Galatasaray beat Fenerbahçe tonight?",
    "Is there a key player missing from Manchester United?",
    "What's Liverpool's current form?",
    "Predict the outcome of Chelsea vs Arsenal"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('galatasaray') && lowerQuestion.includes('fenerbahçe')) {
      return "Based on current form analysis:\n\n🎯 **Prediction**: Galatasaray 65% chance to win\n⚽ **Both teams to score**: Very likely (85%)\n📊 **Over 2.5 goals**: 70% probability\n⚠️ **Key factors**: Derby intensity, home advantage for Galatasaray\n🏥 **Injuries**: Fenerbahçe missing 2 key defenders";
    }
    
    if (lowerQuestion.includes('manchester united') || lowerQuestion.includes('man utd')) {
      return "Manchester United Analysis:\n\n📋 **Key Missing Players**: Marcus Rashford (hamstring), Lisandro Martínez (foot injury)\n📈 **Current Form**: W-D-L-W-D (mixed)\n🎯 **Attack Rating**: 7.2/10\n🛡️ **Defense Rating**: 6.1/10\n💡 **Recommendation**: Consider their vulnerability in defense with Martinez out";
    }
    
    if (lowerQuestion.includes('liverpool')) {
      return "Liverpool Current Analysis:\n\n🔥 **Form**: Excellent - 8 wins in last 10 games\n⚽ **Goals**: Averaging 2.4 goals per game\n🛡️ **Clean Sheets**: 6 in last 10 matches\n👑 **Key Players**: Salah in brilliant form (12 goals in 8 games)\n📊 **Expected Performance**: Very high confidence in upcoming matches";
    }
    
    if (lowerQuestion.includes('chelsea') && lowerQuestion.includes('arsenal')) {
      return "Chelsea vs Arsenal Prediction:\n\n🎯 **Most Likely**: Draw or Arsenal slight edge\n📊 **Probability**: Arsenal 40%, Draw 35%, Chelsea 25%\n⚽ **Goals**: Both teams likely to score\n🔑 **Key Battle**: Midfield control will be decisive\n⚠️ **Watch Out**: Chelsea's inconsistent away form\n🏥 **Injuries**: Both teams relatively injury-free";
    }
    
    return "I've analyzed your question using real-time data and AI modeling:\n\n🎯 **Prediction**: Based on current form, head-to-head records, and tactical analysis\n📊 **Confidence Level**: High (78%)\n⚽ **Goal Expectation**: 2-3 goals likely\n🔑 **Key Factors**: Home advantage, recent form, and injury status\n💡 **Recommendation**: Monitor team news 2 hours before kickoff for final updates";
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="w-14 h-14 rounded-full bg-gradient-primary shadow-glow hover:shadow-neon transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-card border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm">AI Football Analyst</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-2 h-2 mr-1" />
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={onToggleMinimize}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-3 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className="flex items-center gap-1 mt-2 opacity-60">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick questions:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.slice(0, 2).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 text-xs text-left justify-start hover:bg-primary/10"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask about matches, teams, predictions..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}