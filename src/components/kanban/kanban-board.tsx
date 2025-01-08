import { useState } from "react";
    import { Card, CardContent } from "@/components/ui/card";
    import { Plus, MoreVertical } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import {
      DndContext,
      DragEndEvent,
      DragOverlay,
      DragStartEvent,
      PointerSensor,
      useSensor,
      useSensors,
    } from "@dnd-kit/core";
    import { TaskCard } from "./task-card";
    import { useToast } from "@/components/ui/use-toast";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { NewTaskForm } from "./new-task-form";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    
    export interface Task {
      id: string;
      title: string;
      description?: string;
      priority?: "low" | "medium" | "high";
      columnId: string;
      dueDate?: Date;
      category?: string;
      project?: string;
      tags?: string[];
      color?: string;
      progress?: number;
      status?: string;
      actions?: { id: string; name: string; completed: boolean; tag?: string }[];
    }
    
    const INITIAL_COLUMNS = [
      { id: "todo", title: "To Do" },
      { id: "in-progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ];
    
    const generateRandomColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 80%)`;
    };
    
    export function KanbanBoard() {
      const [tasks, setTasks] = useState<Task[]>([]);
      const [activeTask, setActiveTask] = useState<Task | null>(null);
      const { toast } = useToast();
    
      const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 8,
          },
        })
      );
    
      const handleDragStart = (event: DragStartEvent) => {
        const task = tasks.find((t) => t.id === event.active.id);
        if (task) setActiveTask(task);
      };
    
      const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (!over) return;
    
        const activeTask = tasks.find((t) => t.id === active.id);
        const overColumn = INITIAL_COLUMNS.find((col) => col.id === over.id);
    
        if (activeTask && overColumn) {
          setTasks((tasks) =>
            tasks.map((task) =>
              task.id === activeTask.id
                ? { ...task, columnId: overColumn.id }
                : task
            )
          );
    
          toast({
            title: "Tâche déplacée",
            description: `Tâche déplacée vers ${overColumn.title}`,
          });
        }
    
        setActiveTask(null);
      };
    
      const addNewTask = (task: Omit<Task, "id" | "columnId" | "color">) => {
        const newTask: Task = {
          ...task,
          id: crypto.randomUUID(),
          columnId: task.status || "todo",
          color: generateRandomColor(),
        };
    
        setTasks((prev) => [...prev, newTask]);
        toast({
          title: "Tâche créée",
          description: "Nouvelle tâche ajoutée à la liste To Do",
        });
      };
    
      return (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {INITIAL_COLUMNS.map((column) => {
              const columnTasks = tasks.filter((task) => task.columnId === column.id);
              
              return (
                <div key={column.id} className="flex-shrink-0 w-80">
                  <Card className="glass" id={column.id}>
                    <div className="p-4 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{column.title}</h3>
                        <span className="text-muted-foreground text-sm">
                          {columnTasks.length}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuItem>Supprimer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-4 min-h-[200px]">
                      {columnTasks.map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                      {column.id === "todo" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-muted-foreground gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Ajouter une tâche
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                            </DialogHeader>
                            <NewTaskForm onSubmit={addNewTask} />
                          </DialogContent>
                        </Dialog>
                      )}
                      {column.id === "in-progress" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-muted-foreground gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Ajouter une tâche
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                            </DialogHeader>
                            <NewTaskForm onSubmit={addNewTask} />
                          </DialogContent>
                        </Dialog>
                      )}
                      {column.id === "done" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-muted-foreground gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Ajouter une tâche
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                            </DialogHeader>
                            <NewTaskForm onSubmit={addNewTask} />
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          <DragOverlay>
            {activeTask && <TaskCard {...activeTask} />}
          </DragOverlay>
        </DndContext>
      );
    }
