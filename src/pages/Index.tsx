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
  Star,
  ExternalLink,
  Eye
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
      matchTime: "Yarın 17:30",
      league: "Premier League",
      aiPrediction: {
        winner: "Liverpool",
        confidence: 72,
        bothTeamsScore: true,
        overUnder: "Üst 2.5",
        surpriseRisk: "Orta" as const,
        injuryImpact: "Yüksek" as const
      },
      keyStats: {
        homeForm: "G-B-M-G-B",
        awayForm: "G-G-G-B-G", 
        headToHead: "Liv 3-2"
      }
    },
    {
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      homeTeamLogo: chelseaLogo,
      awayTeamLogo: manUtdLogo, // Using as placeholder
      matchTime: "Pazar 16:00", 
      league: "Premier League",
      aiPrediction: {
        winner: "Arsenal",
        confidence: 58,
        bothTeamsScore: true,
        overUnder: "Alt 2.5",
        surpriseRisk: "Yüksek" as const,
        injuryImpact: "Düşük" as const
      },
      keyStats: {
        homeForm: "G-M-B-G-M",
        awayForm: "G-G-B-G-G",
        headToHead: "Beraberlik 1-1"
      }
    },
    {
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeTeamLogo: liverpoolLogo, // Using as placeholder
      awayTeamLogo: chelseaLogo, // Using as placeholder
      matchTime: "Cumartesi 21:00",
      league: "La Liga",
      aiPrediction: {
        winner: "Barcelona", 
        confidence: 65,
        bothTeamsScore: false,
        overUnder: "Üst 2.5",
        surpriseRisk: "Düşük" as const,
        injuryImpact: "Orta" as const
      }
    }
  ];

  const newsItems = [
    {
      title: "Salah Sakatlık Güncellemesi: Derby'yi Kaçırması Bekleniyor",
      team: "Liverpool",
      impact: "Yüksek",
      time: "2 saat önce"
    },
    {
      title: "Chelsea'den Yeni Transfer Duyurusu",
      team: "Chelsea", 
      impact: "Orta",
      time: "4 saat önce"
    },
    {
      title: "Teknik Direktör Basın Toplantısı: Taktiksel Değişiklikler",
      team: "Manchester United",
      impact: "Düşük", 
      time: "6 saat önce"
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
              Gelişmiş Yapay Zeka Destekli
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Futbol 
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Yapay Zeka </span>
              Tahminleri
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Yaklaşan maçlarda derinlemesine, veri odaklı öngörüler alın. Yapay zekamız takım formunu, 
              sakatlıkları, taktikleri ve geçmiş verileri analiz ederek kesin tahminler sunar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="shadow-glow">
                <Target className="w-5 h-5 mr-2" />
                Tahminleri Görüntüle
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
                Yapay Zeka'ya Sor
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
              Yapay Zeka Analistimize Sorun
            </h2>
            <p className="text-muted-foreground mb-8">
              Herhangi bir yaklaşan maç, takım formu veya sakatlık raporu hakkında anlık cevaplar alın
            </p>
            
            <div className="flex gap-3">
              <Input
                placeholder="Galatasaray bugün Fenerbahçe'yi yenecek mi?"
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
                Yapay Zeka'ya Sor
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {[
                "Manchester United sakatlık güncellemeleri?",
                "Liverpool Chelsea tahmini?", 
                "Bu hafta sonu en iyi bahisler?"
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
              Öne Çıkan Tahminler
            </Badge>
            <h2 className="text-4xl font-bold mb-4">En Önemli Yaklaşan Maçlar</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Yapay zekamız size en doğru tahminleri sunmak için binlerce veri noktasını analiz etti
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
              Yapay Zeka Performans İstatistikleri
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "Tahmin Doğruluğu", value: "87.3%", icon: Target, color: "primary" },
              { label: "Analiz Edilen Maç", value: "15,847", icon: Activity, color: "accent" },
              { label: "Aktif Kullanıcı", value: "124K", icon: Users, color: "neon" },
              { label: "Başarı Oranı", value: "91.2%", icon: Star, color: "primary" }
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
              Son Takım Haberleri
            </h2>
            <p className="text-muted-foreground">
              Sakatlık raporları ve takım duyurularıyla güncel kalın
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((news, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      news.impact === "Yüksek" ? "destructive" :
                      news.impact === "Orta" ? "secondary" : "outline"
                    }>
                      {news.impact} Etki
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
            Daha Akıllı Futbol Tahminleri Yapmaya Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Oyunun önünde kalmak için yapay zeka destekli öngörülerimize güvenen 
            binlerce futbol hayranına katılın.
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
            Şimdi Tahmin Yapmaya Başla
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">SHAZ WEB</p>
              <p className="text-sm text-muted-foreground">Profesyonel web çözümleri</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://berkaysahin.com', '_blank')}
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                berkaysahin.com
              </Button>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 SHAZ WEB. Tüm hakları saklıdır. | Yapay zeka destekli futbol analitik platformu
            </p>
          </div>
        </div>
      </footer>

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