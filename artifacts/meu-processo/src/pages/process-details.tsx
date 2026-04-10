import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { mockProcessos, mockMovimentacoes } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ArrowLeft, 
  Landmark, 
  Scale, 
  User as UserIcon, 
  Calendar, 
  FileText, 
  Sparkles,
  Info,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProcessDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const processo = useMemo(() => mockProcessos.find(p => p.id === id), [id]);
  const movimentacoes = useMemo(() => {
    return mockMovimentacoes
      .filter(m => m.processoId === id)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [id]);

  if (!processo) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-fundo">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-primaria mb-2">Processo não encontrado</h2>
          <p className="text-muted-foreground mb-4">O processo que você tentou acessar não existe ou você não tem permissão.</p>
          <Link href="/dashboard">
            <Button variant="outline">Voltar para o Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Em Andamento": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Aguardando Audiencia": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Sentenciado": return "bg-green-100 text-green-800 border-green-200";
      case "Arquivado": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Recurso": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-fundo py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primaria mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para Meus Processos
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-borda overflow-hidden mb-8">
          <div className="bg-primaria p-6 md:p-8 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Scale className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-primaria-foreground/80 font-mono text-sm bg-black/20 px-3 py-1 rounded-md w-fit">
                  <Landmark className="h-4 w-4" />
                  {processo.numero}
                </div>
                <Badge variant="outline" className={`${getStatusBadgeColor(processo.status)} bg-white/10 text-white border-white/20 px-3 py-1 font-medium`}>
                  {processo.status}
                </Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4">{processo.titulo}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primaria-foreground/90">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>{processo.descricao}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 shrink-0" />
                    <span>{processo.vara} • {processo.tribunal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Início: {format(new Date(processo.dataAbertura), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-borda">
            <div className="p-4 md:p-6">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Autor</p>
              <p className="font-medium text-foreground">{processo.autor}</p>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Réu</p>
              <p className="font-medium text-foreground">{processo.reu}</p>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Advogado</p>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-secundaria" />
                <p className="font-medium text-foreground">{processo.advogadoNome}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-primaria flex items-center gap-2">
            <Clock className="h-6 w-6 text-secundaria" />
            Andamento do Processo
          </h2>
          <Badge variant="outline" className="bg-secundaria/10 text-secundaria border-secundaria/20">
            {movimentacoes.length} movimentações
          </Badge>
        </div>

        <div className="space-y-6">
          {movimentacoes.map((mov, index) => (
            <div key={mov.id} className="relative pl-6 md:pl-8">
              {/* Timeline Line */}
              {index !== movimentacoes.length - 1 && (
                <div className="absolute left-[11px] md:left-[15px] top-8 bottom-[-24px] w-0.5 bg-borda"></div>
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1 top-2 w-6 h-6 rounded-full bg-white border-2 border-secundaria flex items-center justify-center shadow-sm z-10">
                <div className="w-2 h-2 rounded-full bg-secundaria"></div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-borda overflow-hidden transition-all hover:shadow-md">
                {/* Header */}
                <div className="bg-gray-50/80 px-4 md:px-6 py-3 border-b border-borda flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-primaria">{mov.tipo}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(mov.data), "dd/MM/yyyy 'às' HH:mm")}
                  </div>
                </div>

                <div className="p-4 md:p-6 space-y-4">
                  {/* AI Translated Block (The most prominent) */}
                  <div className="bg-secundaria/5 border-l-4 border-secundaria rounded-r-lg p-4 md:p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Sparkles className="w-16 h-16 text-secundaria" />
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="bg-secundaria text-white p-1.5 rounded-md shrink-0 mt-0.5">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-secundaria-foreground mb-1 uppercase tracking-wider">O que isso significa?</h4>
                        <p className="text-foreground text-lg leading-relaxed">{mov.textoTraduzido}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-borda" />

                  {/* Original Legal Text (Subdued) */}
                  <div className="px-2">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-primaria transition-colors flex items-center gap-2 list-none">
                        <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0 group-open:bg-muted-foreground group-open:text-white transition-colors">
                          <span className="text-[10px] leading-none block group-open:hidden">+</span>
                          <span className="text-[10px] leading-none hidden group-open:block">-</span>
                        </div>
                        Ver texto original do tribunal
                      </summary>
                      <div className="mt-3 bg-gray-50 border border-borda rounded-md p-4">
                        <p className="text-sm text-muted-foreground font-serif italic leading-relaxed">
                          "{mov.textoOriginal}"
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {movimentacoes.length === 0 && (
            <div className="bg-white rounded-lg border border-borda p-8 text-center text-muted-foreground">
              Nenhuma movimentação registrada para este processo ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
