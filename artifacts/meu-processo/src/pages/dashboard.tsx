import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockProcessos } from "@/lib/mockData";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileText, ChevronRight, User as UserIcon, Landmark } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter processes based on role and search term
  const filteredProcessos = useMemo(() => {
    if (!user) return [];
    
    let filtered = mockProcessos;
    
    // Filter by role
    if (user.perfil === "CLIENTE") {
      filtered = filtered.filter(p => p.clienteId === user.id);
    } else {
      filtered = filtered.filter(p => p.advogadoId === user.id);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.numero.toLowerCase().includes(term) || 
        p.titulo.toLowerCase().includes(term) ||
        p.clienteNome.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [user, searchTerm]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Em Andamento": return "default";
      case "Aguardando Audiencia": return "secondary";
      case "Sentenciado": return "outline"; // Success-like
      case "Arquivado": return "secondary";
      case "Recurso": return "destructive";
      default: return "default";
    }
  };

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
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primaria mb-2">Meus Processos</h1>
            <p className="text-muted-foreground">
              {user?.perfil === "ADVOGADO" 
                ? "Acompanhe o andamento das ações do seu escritório." 
                : "Acompanhe o andamento das suas questões jurídicas."}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por número ou nome..."
                className="pl-9 bg-white border-borda"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white border-borda shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {filteredProcessos.length === 0 ? (
          <div className="bg-white rounded-lg border border-borda p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-primaria mb-2">Nenhum processo encontrado</h3>
            <p className="text-muted-foreground max-w-md">
              Não encontramos nenhum processo com os termos buscados. Tente usar outros termos ou limpe a busca.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProcessos.map((processo) => (
              <Card key={processo.id} className="overflow-hidden border-borda hover:border-secundaria/50 transition-colors bg-white">
                <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                      <Landmark className="h-4 w-4" />
                      {processo.numero}
                    </div>
                    <Badge variant="outline" className={`${getStatusBadgeColor(processo.status)} font-medium border`}>
                      {processo.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primaria mt-2">{processo.titulo}</h3>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Resumo do Caso</p>
                      <p className="text-sm text-foreground line-clamp-2">{processo.descricao}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-muted-foreground w-16">Cliente:</span>
                        <span className="font-medium">{processo.clienteNome}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Scale className="h-4 w-4 text-gray-400" />
                        <span className="text-muted-foreground w-16">Vara:</span>
                        <span>{processo.vara}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50/30 pt-3 pb-3 border-t border-gray-50 flex justify-end">
                  <Link href={`/processo/${processo.id}`} className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-primaria text-white hover:bg-primaria/90">
                      Ver Detalhes <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
