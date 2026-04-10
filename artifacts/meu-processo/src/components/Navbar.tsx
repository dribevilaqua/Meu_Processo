import { useAuth } from "@/context/AuthContext";
import { Scale, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navbar() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) return null;

  return (
    <header className="bg-primaria text-primaria-foreground shadow-md sticky top-0 z-10 border-b-2 border-secundaria">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setLocation("/dashboard")}
        >
          <Scale className="h-6 w-6 text-secundaria" />
          <span className="font-serif text-xl font-bold tracking-tight text-white">MEU<span className="text-secundaria">PROCESSO</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-primaria-foreground/80">
            <UserIcon className="h-4 w-4" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-medium text-white">{user.nome}</span>
              <span className="text-xs">{user.perfil === "ADVOGADO" ? user.oab : "Cliente"}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              logout();
              setLocation("/");
            }}
            className="text-white hover:text-secundaria hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
