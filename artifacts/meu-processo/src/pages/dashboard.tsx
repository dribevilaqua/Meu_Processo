import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileText, ChevronRight, User as UserIcon, Landmark, Scale, ShieldCheck, Users, BriefcaseBusiness, UserPlus, FolderPlus, Activity, Trash2 } from "lucide-react";
import { Perfil, Processo } from "@/lib/mockData";

const emptyUserForm = {
  nome: "",
  email: "",
  senha: "",
  perfil: "CLIENTE" as Exclude<Perfil, "ADMINISTRADOR">,
  cpf: "",
  cargo: "",
  oab: "",
  whatsapp: "",
};

const emptyProcessForm = {
  numero: "",
  titulo: "",
  status: "Em Andamento" as Processo["status"],
  descricao: "",
  vara: "",
  tribunal: "",
  advogadoId: "",
  clienteId: "",
};

const emptyMovementForm = {
  processoId: "",
  tipo: "",
  textoOriginal: "",
  textoTraduzido: "",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { usuarios, processos, createUsuario, deleteUsuario, createProcesso, deleteProcesso, createMovimentacao } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [processForm, setProcessForm] = useState(emptyProcessForm);
  const [movementForm, setMovementForm] = useState(emptyMovementForm);
  const isAdmin = user?.perfil === "ADMINISTRADOR";

  const advogados = usuarios.filter((usuario) => usuario.perfil === "ADVOGADO");
  const clientes = usuarios.filter((usuario) => usuario.perfil === "CLIENTE");

  const filteredProcessos = useMemo(() => {
    if (!user) return [];
    let filtered = processos;

    if (user.perfil === "CLIENTE") {
      filtered = filtered.filter((processo) => processo.clienteId === user.id);
    } else if (user.perfil === "ADVOGADO") {
      filtered = filtered.filter((processo) => processo.advogadoId === user.id);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((processo) =>
        processo.numero.toLowerCase().includes(term) ||
        processo.titulo.toLowerCase().includes(term) ||
        processo.clienteNome.toLowerCase().includes(term) ||
        processo.advogadoNome.toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [user, processos, searchTerm]);

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

  const statusSummary = processos.reduce<Record<string, number>>((acc, processo) => {
    acc[processo.status] = (acc[processo.status] || 0) + 1;
    return acc;
  }, {});

  const handleCreateUser = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userForm.nome || !userForm.email) return;

    const userData: any = {
      nome: userForm.nome,
      email: userForm.email,
      senha: userForm.senha || "123456",
      perfil: userForm.perfil,
      whatsapp: userForm.whatsapp,
    };

    if (userForm.perfil === "CLIENTE") {
      userData.cpf = userForm.cpf;
    } else if (userForm.perfil === "ADVOGADO") {
      userData.oab = userForm.oab;
    }

    createUsuario(userData);
    setUserForm(emptyUserForm);
  };

  const handleCreateProcess = (event: React.FormEvent) => {
    event.preventDefault();
    if (!processForm.numero || !processForm.titulo || !processForm.advogadoId || !processForm.clienteId) return;

    createProcesso(processForm);
    setProcessForm(emptyProcessForm);
  };

  const handleCreateMovement = (event: React.FormEvent) => {
    event.preventDefault();
    if (!movementForm.processoId || !movementForm.tipo || !movementForm.textoOriginal || !movementForm.textoTraduzido) return;

    createMovimentacao(movementForm);
    setMovementForm(emptyMovementForm);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-fundo py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primaria mb-2">
              {isAdmin ? "Painel do Administrador" : "Meus Processos"}
            </h1>
            <p className="text-muted-foreground">
              {isAdmin
                ? "Cadastre clientes, advogados, processos e movimentações do sistema."
                : user?.perfil === "ADVOGADO"
                  ? "Acompanhe o andamento das ações do seu escritório."
                  : "Acompanhe o andamento das suas questões jurídicas."}
            </p>
          </div>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por número, cliente ou advogado..."
                className="pl-9 bg-white border-borda"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                data-testid="input-busca-processos"
              />
            </div>
            <Button variant="outline" className="bg-white border-borda shrink-0" data-testid="button-filtros">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-borda bg-white">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primaria/10 flex items-center justify-center">
                    <BriefcaseBusiness className="h-6 w-6 text-primaria" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processos</p>
                    <p className="text-2xl font-bold text-primaria" data-testid="text-total-processos">{processos.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-borda bg-white">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secundaria/15 flex items-center justify-center">
                    <Users className="h-6 w-6 text-secundaria" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Advogados</p>
                    <p className="text-2xl font-bold text-primaria" data-testid="text-total-usuarios">{advogados.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-borda bg-white">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clientes</p>
                    <p className="text-2xl font-bold text-primaria" data-testid="text-total-clientes">{clientes.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-borda bg-white">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processos ativos</p>
                    <p className="text-2xl font-bold text-primaria" data-testid="text-processos-andamento">{processos.length - (statusSummary["Arquivado"] || 0)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-borda bg-white">
                <CardHeader>
                  <h2 className="text-xl font-serif font-bold text-primaria flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-secundaria" />
                    Cadastrar usuário
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateUser} className="space-y-3">
                    <Input placeholder="Nome completo" value={userForm.nome} onChange={(event) => setUserForm({ ...userForm, nome: event.target.value })} data-testid="input-usuario-nome" />
                    <Input placeholder="E-mail" type="email" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} data-testid="input-usuario-email" />
                    <Input placeholder="Senha inicial" type="password" value={userForm.senha} onChange={(event) => setUserForm({ ...userForm, senha: event.target.value })} data-testid="input-usuario-senha" />
                    <select className="w-full h-10 rounded-md border border-borda bg-white px-3 text-sm" value={userForm.perfil} onChange={(event) => setUserForm({ ...userForm, perfil: event.target.value as Exclude<Perfil, "ADMINISTRADOR"> })} data-testid="select-usuario-perfil">
                      <option value="CLIENTE">Cliente</option>
                      <option value="ADVOGADO">Advogado</option>
                    </select>
                    {userForm.perfil === "CLIENTE" && (
                      <Input placeholder="CPF" value={userForm.cpf} onChange={(event) => setUserForm({ ...userForm, cpf: event.target.value })} data-testid="input-usuario-cpf" />
                    )}
                    {userForm.perfil === "ADVOGADO" && (
                      <Input placeholder="OAB" value={userForm.oab} onChange={(event) => setUserForm({ ...userForm, oab: event.target.value })} data-testid="input-usuario-oab" />
                    )}
                    <Input placeholder="WhatsApp" value={userForm.whatsapp} onChange={(event) => setUserForm({ ...userForm, whatsapp: event.target.value })} data-testid="input-usuario-whatsapp" />
                    <Button type="submit" className="w-full bg-primaria text-white hover:bg-primaria/90" data-testid="button-cadastrar-usuario">Cadastrar usuário</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-borda bg-white">
                <CardHeader>
                  <h2 className="text-xl font-serif font-bold text-primaria flex items-center gap-2">
                    <FolderPlus className="h-5 w-5 text-secundaria" />
                    Cadastrar processo
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateProcess} className="space-y-3">
                    <Input placeholder="Número CNJ" value={processForm.numero} onChange={(event) => setProcessForm({ ...processForm, numero: event.target.value })} data-testid="input-processo-numero" />
                    <Input placeholder="Título" value={processForm.titulo} onChange={(event) => setProcessForm({ ...processForm, titulo: event.target.value })} data-testid="input-processo-titulo" />
                    <select className="w-full h-10 rounded-md border border-borda bg-white px-3 text-sm" value={processForm.status} onChange={(event) => setProcessForm({ ...processForm, status: event.target.value as Processo["status"] })} data-testid="select-processo-status">
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Aguardando Audiencia">Aguardando Audiência</option>
                      <option value="Sentenciado">Sentenciado</option>
                      <option value="Arquivado">Arquivado</option>
                      <option value="Recurso">Recurso</option>
                    </select>
                    <textarea className="min-h-20 w-full rounded-md border border-borda bg-white px-3 py-2 text-sm" placeholder="Descrição" value={processForm.descricao} onChange={(event) => setProcessForm({ ...processForm, descricao: event.target.value })} data-testid="textarea-processo-descricao" />
                    <Input placeholder="Vara" value={processForm.vara} onChange={(event) => setProcessForm({ ...processForm, vara: event.target.value })} data-testid="input-processo-vara" />
                    <Input placeholder="Tribunal" value={processForm.tribunal} onChange={(event) => setProcessForm({ ...processForm, tribunal: event.target.value })} data-testid="input-processo-tribunal" />
                    <select className="w-full h-10 rounded-md border border-borda bg-white px-3 text-sm" value={processForm.advogadoId} onChange={(event) => setProcessForm({ ...processForm, advogadoId: event.target.value })} data-testid="select-processo-advogado">
                      <option value="">Selecione o advogado</option>
                      {advogados.map((advogado) => <option key={advogado.id} value={advogado.id}>{advogado.nome}</option>)}
                    </select>
                    <select className="w-full h-10 rounded-md border border-borda bg-white px-3 text-sm" value={processForm.clienteId} onChange={(event) => setProcessForm({ ...processForm, clienteId: event.target.value })} data-testid="select-processo-cliente">
                      <option value="">Selecione o cliente</option>
                      {clientes.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
                    </select>
                    <Button type="submit" className="w-full bg-primaria text-white hover:bg-primaria/90" data-testid="button-cadastrar-processo">Cadastrar processo</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-borda bg-white">
                <CardHeader>
                  <h2 className="text-xl font-serif font-bold text-primaria flex items-center gap-2">
                    <Activity className="h-5 w-5 text-secundaria" />
                    Cadastrar movimentação
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateMovement} className="space-y-3">
                    <select className="w-full h-10 rounded-md border border-borda bg-white px-3 text-sm" value={movementForm.processoId} onChange={(event) => setMovementForm({ ...movementForm, processoId: event.target.value })} data-testid="select-movimentacao-processo">
                      <option value="">Selecione o processo</option>
                      {processos.map((processo) => <option key={processo.id} value={processo.id}>{processo.numero}</option>)}
                    </select>
                    <Input placeholder="Tipo da movimentação" value={movementForm.tipo} onChange={(event) => setMovementForm({ ...movementForm, tipo: event.target.value })} data-testid="input-movimentacao-tipo" />
                    <textarea className="min-h-24 w-full rounded-md border border-borda bg-white px-3 py-2 text-sm" placeholder="Texto Original (Tribunal)" value={movementForm.textoOriginal} onChange={(event) => setMovementForm({ ...movementForm, textoOriginal: event.target.value })} data-testid="textarea-movimentacao-original" />
                    <textarea className="min-h-24 w-full rounded-md border border-secundaria/40 bg-secundaria/5 px-3 py-2 text-sm" placeholder="Texto Traduzido por IA" value={movementForm.textoTraduzido} onChange={(event) => setMovementForm({ ...movementForm, textoTraduzido: event.target.value })} data-testid="textarea-movimentacao-traduzido" />
                    <Button type="submit" className="w-full bg-primaria text-white hover:bg-primaria/90" data-testid="button-cadastrar-movimentacao">Cadastrar movimentação</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card className="border-borda bg-white">
              <CardHeader>
                <h2 className="text-xl font-serif font-bold text-primaria">Usuários cadastrados</h2>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {usuarios.map((usuario) => (
                    <div key={usuario.id} className="rounded-lg border border-borda p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primaria">{usuario.nome}</p>
                        <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        <Badge variant="outline" className="mt-2 border-secundaria/40 text-primaria">{usuario.perfil}</Badge>
                      </div>
                      {usuario.id !== "0" && (
                        <Button variant="outline" size="sm" onClick={() => deleteUsuario(usuario.id)} className="border-red-200 text-red-700 hover:bg-red-50" data-testid={`button-excluir-usuario-${usuario.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredProcessos.length === 0 ? (
          <div className="bg-white rounded-lg border border-borda p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-primaria mb-2">Nenhum processo encontrado</h3>
            <p className="text-muted-foreground max-w-md">Não encontramos nenhum processo com os termos buscados. Tente usar outros termos ou limpe a busca.</p>
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
                        <span className="text-muted-foreground w-20">Cliente:</span>
                        <span className="font-medium">{processo.clienteNome}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Scale className="h-4 w-4 text-gray-400" />
                        <span className="text-muted-foreground w-20">Vara:</span>
                        <span>{processo.vara}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50/30 pt-3 pb-3 border-t border-gray-50 flex flex-col md:flex-row justify-end gap-2">
                  {isAdmin && (
                    <Button variant="outline" onClick={() => deleteProcesso(processo.id)} className="w-full md:w-auto border-red-200 text-red-700 hover:bg-red-50" data-testid={`button-excluir-processo-${processo.id}`}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  )}
                  <Link href={`/processo/${processo.id}`} className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-primaria text-white hover:bg-primaria/90" data-testid={`button-ver-processo-${processo.id}`}>
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
