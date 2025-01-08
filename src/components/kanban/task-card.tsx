import { Card, CardContent, CardHeader } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { useSortable } from "@dnd-kit/sortable";
    import { CSS } from "@dnd-kit/utilities";
    import { cn } from "@/lib/utils";
    import { MoreVertical, Pencil, Trash2, Check } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    
    interface TaskCardProps {
      id: string;
      title: string;
      description?: string;
      priority?: "low" | "medium" | "high";
      dueDate?: Date;
      category?: string;
      project?: string;
      tags?: string[];
      color?: string;
      progress?: number;
      status?: string;
      actions?: { id: string; name: string; completed: boolean; tag?: string }[];
    }
    
    const priorityColors = {
      low: "bg-yellow-500/10 text-yellow-500",
      medium: "bg-green-500/10 text-green-500",
      high: "bg-red-500/10 text-red-500",
    };
    
    const statusColors = {
      todo: "bg-gray-500/10 text-gray-500",
      "in-progress": "bg-blue-500/10 text-blue-500",
      done: "bg-green-500/10 text-green-500",
    };
    
    export function TaskCard({ id, title, description, priority, dueDate, category, project, tags, color, progress, status, actions }: TaskCardProps) {
      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id });
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    
      return (
        <Card
          ref={setNodeRef}
          style={style}
          className={cn(
            "hover:scale-[1.02] transition-all cursor-grab active:cursor-grabbing",
            isDragging && "opacity-50",
            color && `bg-[${color}]`
          )}
          {...attributes}
          {...listeners}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-red-500 text-sm">{title}</h4>
              {priority && (
                <Badge variant="secondary" className={cn("ml-2", priorityColors[priority])}>
                  {priority}
                </Badge>
              )}
            </div>
          </CardHeader>
          {description && (
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground">{description}</p>
              {project && (
                <p className="text-xs text-green-500">
                  {project}
                </p>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs" style={{ backgroundColor: color, color: 'black' }}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {progress !== undefined && (
                <p className="text-xs text-muted-foreground">
                  Progression: {progress}%
                </p>
              )}
            </CardContent>
          )}
          <div className="absolute right-2 top-2 flex gap-1 items-center">
            {status && (
              <Badge variant="outline" className={cn("text-xs", statusColors[status])}>
                {status}
              </Badge>
            )}
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
        </Card>
      );
    }
