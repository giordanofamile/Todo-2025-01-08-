import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KanbanBoard } from "@/components/kanban/kanban-board";

const Index = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Mes Tâches</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos projets et tâches
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Tâche
        </Button>
      </div>

      <KanbanBoard />
    </div>
  );
};

export default Index;
