import { useState } from "react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Textarea } from "@/components/ui/textarea";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
    import { Label } from "@/components/ui/label";
    import { Calendar } from "@/components/ui/calendar";
    import { format } from "date-fns";
    import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { Slider } from "@/components/ui/slider";
    
    interface NewTaskFormProps {
      onSubmit: (task: {
        title: string;
        description?: string;
        priority?: "low" | "medium" | "high";
        dueDate?: Date;
        category?: string;
        project?: string;
        tags?: string[];
        progress?: number;
        status?: string;
      }) => void;
    }
    
    export function NewTaskForm({ onSubmit }: NewTaskFormProps) {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
      const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
      const [category, setCategory] = useState("");
      const [project, setProject] = useState("");
      const [tags, setTags] = useState("");
      const [showCalendar, setShowCalendar] = useState(false);
      const [showCategoryDialog, setShowCategoryDialog] = useState(false);
      const [showProjectDialog, setShowProjectDialog] = useState(false);
      const [progress, setProgress] = useState<number>(0);
      const [status, setStatus] = useState("todo");
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
          title,
          description,
          priority,
          dueDate,
          category,
          project,
          tags: tags.split(",").map((tag) => tag.trim()),
          progress,
          status,
        });
      };
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre de la tâche"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description de la tâche"
              className="min-h-[80px] text-sm"
            />
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="priority">Priorité</Label>
            <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
              <SelectTrigger className="text-sm" style={{ backgroundColor: priority === "low" ? "rgba(255, 255, 0, 0.1)" : priority === "medium" ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)" }}>
                <SelectValue placeholder="Sélectionner la priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Basse</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
              </SelectContent>
            </Select>
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="dueDate">Date d'échéance</Label>
            <div className="relative">
              <Input
                type="text"
                id="dueDate"
                value={dueDate ? format(dueDate, "MMM dd, yyyy") : ""}
                placeholder="Sélectionner la date d'échéance"
                className="text-sm"
                readOnly
                onClick={() => setShowCalendar(true)}
              />
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1.5 h-7 w-7"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    className="rounded-md border"
                    onMonthChange={() => setShowCalendar(true)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sélectionner la catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Travail</SelectItem>
                <SelectItem value="personal">Personnel</SelectItem>
                <SelectItem value="shopping">Courses</SelectItem>
                <SelectItem value="edit">Modifier les catégories</SelectItem>
              </SelectContent>
            </Select>
            {category === "edit" && (
              <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Modifier les catégories</DialogTitle>
                  </DialogHeader>
                  <div>
                    {/* Add category editing UI here */}
                    <p>L'interface d'édition des catégories sera ici</p>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="project">Projet</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sélectionner le projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Site Web</SelectItem>
                <SelectItem value="mobile-app">Application Mobile</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="edit">Modifier les projets</SelectItem>
              </SelectContent>
            </Select>
            {project === "edit" && (
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
    
          <div className="space-y-2">
            <Label htmlFor="tags">Étiquettes</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Entrez les étiquettes séparées par des virgules"
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Progression</Label>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
            />
            <p className="text-sm text-muted-foreground">
              {progress}%
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sélectionner le status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
    
          <Button type="submit" className="w-full">Créer une tâche</Button>
        </form>
      );
    }
