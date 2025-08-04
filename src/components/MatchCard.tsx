import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp, AlertTriangle, Activity } from "lucide-react";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  matchTime: string;
  league: string;
  aiPrediction: {
    winner: string;
    confidence: number;
    bothTeamsScore: boolean;
    overUnder: string;
    surpriseRisk: "Düşük" | "Orta" | "Yüksek";
    injuryImpact: "Düşük" | "Orta" | "Yüksek";
  };
  keyStats?: {
    homeForm: string;
    awayForm: string;
    headToHead: string;
  };
}

export function MatchCard({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  matchTime,
  league,
  aiPrediction,
  keyStats
}: MatchCardProps) {
  const confidenceColor = aiPrediction.confidence > 75 ? "primary" : 
                         aiPrediction.confidence > 50 ? "neon" : "destructive";

  const riskColor = aiPrediction.surpriseRisk === "Yüksek" ? "destructive" :
                   aiPrediction.surpriseRisk === "Orta" ? "neon" : "primary";

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {league}
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{matchTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Teams Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src={homeTeamLogo} 
                alt={homeTeam}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{homeTeam}</h3>
              {keyStats && (
                <p className="text-sm text-muted-foreground">Form: {keyStats.homeForm}</p>
              )}
            </div>
          </div>

          <div className="text-center px-4">
            <div className="text-2xl font-bold text-primary">VS</div>
            {keyStats && (
              <p className="text-xs text-muted-foreground mt-1">K2K: {keyStats.headToHead}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h3 className="font-bold text-lg">{awayTeam}</h3>
              {keyStats && (
                <p className="text-sm text-muted-foreground">Form: {keyStats.awayForm}</p>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src={awayTeamLogo} 
                alt={awayTeam}
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-primary">Yapay Zeka Tahminleri</h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Muhtemel Kazanan</span>
                <Badge variant="outline" className="text-xs font-bold">
                  {aiPrediction.winner}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Güven</span>
                <Badge 
                  variant={confidenceColor === "primary" ? "default" : "secondary"}
                  className={`text-xs font-bold ${
                    confidenceColor === "neon" ? "bg-neon text-neon-foreground" :
                    confidenceColor === "destructive" ? "bg-destructive text-destructive-foreground" : ""
                  }`}
                >
                  {aiPrediction.confidence}%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">İki Takım da Gol Atar</span>
                <Badge variant={aiPrediction.bothTeamsScore ? "default" : "secondary"} className="text-xs">
                  {aiPrediction.bothTeamsScore ? "Evet" : "Hayır"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Üst/Alt 2.5</span>
                <Badge variant="outline" className="text-xs font-bold">
                  {aiPrediction.overUnder}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sürpriz Riski</span>
                <Badge 
                  variant={riskColor === "primary" ? "default" : "secondary"}
                  className={`text-xs font-bold ${
                    riskColor === "neon" ? "bg-neon text-neon-foreground" :
                    riskColor === "destructive" ? "bg-destructive text-destructive-foreground" : ""
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {aiPrediction.surpriseRisk}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sakatlık Etkisi</span>
                <Badge 
                  variant={aiPrediction.injuryImpact === "Yüksek" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {aiPrediction.injuryImpact}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="match" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
          onClick={() => alert(`${homeTeam} vs ${awayTeam} için detaylı analiz gösteriliyor...`)}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Detaylı Analizi Görüntüle
        </Button>
      </CardContent>
    </Card>
  );
}