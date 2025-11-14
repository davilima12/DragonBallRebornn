import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconColor?: string;
}

export default function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  iconColor = "text-primary" 
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 hover-elevate hover:scale-105 transition-all duration-200 cursor-pointer border-primary/20 h-full" data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
