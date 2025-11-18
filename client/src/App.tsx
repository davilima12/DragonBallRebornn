import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import GlobalLoading from "@/components/GlobalLoading";
import { useQueryLoading } from "@/hooks/use-query-loading";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import AccountSettings from "@/pages/AccountSettings";
import Characters from "@/pages/Characters";
import CreateCharacter from "@/pages/CreateCharacter";
import CharacterDetail from "@/pages/CharacterDetail";
import PlayerProfile from "@/pages/PlayerProfile";
import Shop from "@/pages/Shop";
import Deposit from "@/pages/Deposit";
import SellPoints from "@/pages/SellPoints";
import Ranking from "@/pages/Ranking";
import Guilds from "@/pages/Guilds";
import GuildDetail from "@/pages/GuildDetail";
import CreateGuild from "@/pages/CreateGuild";
import Support from "@/pages/Support";
import Downloads from "@/pages/Downloads";
import NotFound from "@/pages/not-found";

function Router() {
  // Automatically show loading for React Query operations
  useQueryLoading();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/account-settings" component={AccountSettings} />
      <Route path="/characters" component={Characters} />
      <Route path="/characters/create" component={CreateCharacter} />
      <Route path="/character/:id" component={CharacterDetail} />
      <Route path="/player/:id" component={PlayerProfile} />
      <Route path="/shop" component={Shop} />
      <Route path="/deposit" component={Deposit} />
      <Route path="/sell-points" component={SellPoints} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/guilds" component={Guilds} />
      <Route path="/guild/:name" component={GuildDetail} />
      <Route path="/create-guild" component={CreateGuild} />
      <Route path="/support" component={Support} />
      <Route path="/downloads" component={Downloads} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <AuthProvider>
            <TooltipProvider>
              <GlobalLoading />
              <Toaster />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
