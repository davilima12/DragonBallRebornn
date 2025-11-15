import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Characters from "@/pages/Characters";
import CharacterDetail from "@/pages/CharacterDetail";
import Shop from "@/pages/Shop";
import Deposit from "@/pages/Deposit";
import SellPoints from "@/pages/SellPoints";
import Ranking from "@/pages/Ranking";
import Guilds from "@/pages/Guilds";
import GuildDetail from "@/pages/GuildDetail";
import Support from "@/pages/Support";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/characters" component={Characters} />
      <Route path="/character/:id" component={CharacterDetail} />
      <Route path="/shop" component={Shop} />
      <Route path="/deposit" component={Deposit} />
      <Route path="/sell-points" component={SellPoints} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/guilds" component={Guilds} />
      <Route path="/guild/:name" component={GuildDetail} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
