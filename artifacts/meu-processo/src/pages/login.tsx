import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, ChevronRight } from "lucide-react";

export default function Login() {
  const { user, login, loginWithCredentials } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginWithCredentials(email, password);

    if (!success) {
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-fundo text-foreground">
      {/* Left side - Brand */}
      <div className="md:w-1/2 bg-primaria flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-primaria/80"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-secundaria/20 rounded-full flex items-center justify-center mb-6 border border-secundaria/50">
            <Scale className="h-10 w-10 text-secundaria" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            MEU<span className="text-secundaria">PROCESSO</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md font-sans">
            Acompanhe o andamento das suas ações jurídicas de forma clara, simples e transparente.
          </p>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-primaria mb-2">Acesso ao Portal</h2>
            <p className="text-muted-foreground">Informe suas credenciais para visualizar seus processos.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primaria font-medium">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="border-borda focus-visible:ring-secundaria"
                  autoComplete="email"
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-primaria font-medium">Senha</Label>
                  <a href="#" className="text-sm text-secundaria hover:underline">Esqueceu a senha?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="border-borda focus-visible:ring-secundaria"
                  autoComplete="current-password"
                  data-testid="input-password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" data-testid="text-login-error">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-primaria hover:bg-primaria/90 text-white py-6 text-lg" data-testid="button-login">
              Entrar <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-borda">
            <p className="text-sm text-center text-muted-foreground mb-4">Acesso rápido para demonstração:</p>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => login("ADVOGADO")}
                className="border-secundaria/50 hover:bg-secundaria/10 text-primaria"
                data-testid="button-demo-advogado"
              >
                Perfil Advogado
              </Button>
              <Button 
                variant="outline" 
                onClick={() => login("CLIENTE")}
                className="border-secundaria/50 hover:bg-secundaria/10 text-primaria"
                data-testid="button-demo-cliente"
              >
                Perfil Cliente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
