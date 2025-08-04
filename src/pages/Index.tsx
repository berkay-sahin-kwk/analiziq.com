import { useState } from "react";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Activity, 
  Trophy,
  Calendar,
  MessageCircle,
  Zap,
  BarChart3,
  Clock,
  Star
} from "lucide-react";

// Import team logos
import manUtdLogo from "@/assets/man-utd-logo.png";
import liverpoolLogo from "@/assets/liverpool-logo.png";
import chelseaLogo from "@/assets/chelsea-logo.png";
import stadiumHero from "@/assets/stadium-hero.jpg";

const Index = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isChatMinimized, setChatMinimized] = useState(false);
  const [chatQuestion, setChatQuestion] = useState("");

  // Sample match data
  const topMatches = [
    {
      homeTeam: "Manchester United",
      awayTeam: "Liverpool", 
      homeTeamLogo: manUtdLogo,
      awayTeamLogo: liverpoolLogo,
      matchTime: "Tomorrow 17:30",
      league: "Premier League",
      aiPrediction: {
        winner: "Liverpool",
        confidence: 72,
        bothTeamsScore: true,
        overUnder: "Over 2.5",
        surpriseRisk: "Medium" as const,
        injuryImpact: "High" as const
      },
      keyStats: {
        homeForm: "W-D-L-W-D",
        awayForm: "W-W-W-D-W", 
        headToHead: "Liv 3-2"
      }
    },
    {
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      homeTeamLogo: chelseaLogo,
      awayTeamLogo: manUtdLogo, // Using as placeholder
      matchTime: "Sunday 16:00", 
      league: "Premier League",
      aiPrediction: {
        winner: "Arsenal",
        confidence: 58,
        bothTeamsScore: true,
        overUnder: "Under 2.5",
        surpriseRisk: "High" as const,
        injuryImpact: "Low" as const
      },
      keyStats: {
        homeForm: "W-L-D-W-L",
        awayForm: "W-W-D-W-W",
        headToHead: "Draw 1-1"
      }
    },
    {
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeTeamLogo: liverpoolLogo, // Using as placeholder
      awayTeamLogo: chelseaLogo, // Using as placeholder
      matchTime: "Saturday 21:00",
      league: "La Liga",
      aiPrediction: {
        winner: "Barcelona", 
        confidence: 65,
        bothTeamsScore: false,
        overUnder: "Over 2.5",
        surpriseRisk: "Low" as const,
        injuryImpact: "Medium" as const
      }
    }
  ];

  const newsItems = [
    {
      title: "Salah Injury Update: Expected to Miss Derby",
      team: "Liverpool",
      impact: "High",
      time: "2 hours ago"
    },
    {
      title: "New Signing Announcement from Chelsea",
      team: "Chelsea", 
      impact: "Medium",
      time: "4 hours ago"
    },
    {
      title: "Manager Press Conference: Tactical Changes",
      team: "Manchester United",
      impact: "Low", 
      time: "6 hours ago"
    }
  ];

  const handleQuestionSubmit = () => {
    if (chatQuestion.trim()) {
      setChatOpen(true);
      setChatMinimized(false);
      setChatQuestion("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${stadiumHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-neon text-neon-foreground shadow-neon">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Football 
              <span className="bg-gradient-accent bg-clip-text text-transparent"> AI </span>
              Predictions
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Get deep, data-driven insights on upcoming matches. Our AI analyzes team form, 
              injuries, tactics, and historical data to deliver precise predictions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="shadow-glow">
                <Target className="w-5 h-5 mr-2" />
                View Predictions
              </Button>
              <Button 
                variant="accent" 
                size="xl"
                onClick={() => {
                  setChatOpen(true);
                  setChatMinimized(false);
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask AI Anything
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick AI Question */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              Ask Our AI Analyst
            </h2>
            <p className="text-muted-foreground mb-8">
              Get instant answers about any upcoming match, team form, or injury reports
            </p>
            
            <div className="flex gap-3">
              <Input
                placeholder="Will Galatasaray beat Fenerbahçe tonight?"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                className="text-lg h-12"
              />
              <Button 
                onClick={handleQuestionSubmit}
                disabled={!chatQuestion.trim()}
                variant="neon"
                size="lg"
                className="px-8"
              >
                Ask AI
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {[
                "Manchester United injury updates?",
                "Liverpool vs Chelsea prediction?", 
                "Best bets for this weekend?"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setChatQuestion(question)}
                  className="hover:bg-primary/10"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Matches */}
      <section id="predictions" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <Trophy className="w-4 h-4 mr-2" />
              Featured Predictions
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Top Upcoming Matches</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI has analyzed thousands of data points to bring you the most accurate predictions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topMatches.map((match, index) => (
              <MatchCard key={index} {...match} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              AI Performance Stats
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "Prediction Accuracy", value: "87.3%", icon: Target, color: "primary" },
              { label: "Matches Analyzed", value: "15,847", icon: Activity, color: "accent" },
              { label: "Active Users", value: "124K", icon: Users, color: "neon" },
              { label: "Success Rate", value: "91.2%", icon: Star, color: "primary" }
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    stat.color === 'primary' ? 'bg-gradient-primary' :
                    stat.color === 'accent' ? 'bg-gradient-accent' :
                    'bg-gradient-neon'
                  }`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team News & Injuries */}
      <section id="news" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Latest Team News
            </h2>
            <p className="text-muted-foreground">
              Stay updated with injury reports and team announcements
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((news, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      news.impact === "High" ? "destructive" :
                      news.impact === "Medium" ? "secondary" : "outline"
                    }>
                      {news.impact} Impact
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      {news.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{news.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {news.team}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make Smarter Football Predictions?
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of football fans who trust our AI-powered insights 
            to stay ahead of the game.
          </p>
          <Button 
            variant="neon" 
            size="xl"
            onClick={() => {
              setChatOpen(true);
              setChatMinimized(false);
            }}
          >
            <Brain className="w-5 h-5 mr-2" />
            Start Predicting Now
          </Button>
        </div>
      </section>

      {/* AI Chat Component */}
      {isChatOpen && (
        <AIChat
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setChatMinimized(!isChatMinimized)}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
