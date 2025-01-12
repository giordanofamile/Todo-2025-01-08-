import { ThemeProvider } from "@/components/theme-provider";
    import { Sidebar } from "@/components/sidebar";
    import { Toaster } from "@/components/ui/toaster";
    import { Toaster as Sonner } from "@/components/ui/sonner";
    import { TooltipProvider } from "@/components/ui/tooltip";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Index from "./pages/Index";
    
    const queryClient = new QueryClient();
    
    const App = () => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="kanban-theme">
          <TooltipProvider>
            <BrowserRouter>
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 ml-16 lg:ml-64 p-4">
                  <Routes>
                    <Route path="/" element={<Index />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
    
    export default App;
