import { useState } from "react";
    import { cn } from "@/lib/utils";
    import { Button } from "@/components/ui/button";
    import { ThemeToggle } from "@/components/theme-toggle";
    import { ChevronLeft, LayoutDashboard, Plus, Settings, ListPlus, List } from "lucide-react";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    
    export function Sidebar() {
      const [collapsed, setCollapsed] = useState(false);
      const [showProjectDialog, setShowProjectDialog] = useState(false);
    
      return (
        <div
          className={cn(
            "h-screen fixed left-0 top-0 z-40 glass transition-all duration-300",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
              <h2
                className={cn(
                  "font-semibold transition-all duration-300",
                  collapsed && "opacity-0"
                )}
              >
                Kanban
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="h-8 w-8"
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    collapsed && "rotate-180"
                  )}
                />
              </Button>
            </div>
    
            <div className="flex-1 px-3">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    collapsed && "justify-center"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className={cn("transition-all", collapsed && "hidden")}>
                    Dashboard
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    collapsed && "justify-center"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  <span className={cn("transition-all", collapsed && "hidden")}>
                    New Task
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    collapsed && "justify-center"
                  )}
                  onClick={() => setShowProjectDialog(true)}
                >
                  <ListPlus className="h-4 w-4" />
                  <span className={cn("transition-all", collapsed && "hidden")}>
                    New Project
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    collapsed && "justify-center"
                  )}
                >
                  <List className="h-4 w-4" />
                  <span className={cn("transition-all", collapsed && "hidden")}>
                    Projects
                  </span>
                </Button>
              </div>
            </div>
    
            <div className="p-4 flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-10 w-10", collapsed && "mx-auto")}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {showProjectDialog && (
            <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier les projets</DialogTitle>
                </DialogHeader>
                <div>
                  {/* Add project editing UI here */}
                  <p>L'interface d'édition des projets sera ici</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      );
    }
