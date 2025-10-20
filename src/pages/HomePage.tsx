import { Building2, User, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, UserRole } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/ThemeToggle';
const roleOptions: { role: UserRole; title: string; description: string; icon: React.ElementType }[] = [
  { role: 'admin', title: 'Administrator', description: 'Oversee projects, manage teams, and view analytics.', icon: Briefcase },
  { role: 'freelancer', title: 'Freelancer', description: 'Track your time, manage tasks, and view earnings.', icon: User },
  { role: 'client', title: 'Client', description: 'Monitor project progress and communicate with the team.', icon: Building2 },
];
export function HomePage() {
  const { setRole } = useAuth();
  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
      <ThemeToggle className="absolute top-6 right-6" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))] -z-10" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <Building2 className="h-10 w-10 text-indigo-500" />
          <h1 className="text-5xl font-bold tracking-tighter">Architex Axis</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The central hub for managing your architectural projects with precision and clarity.
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
      >
        {roleOptions.map((option) => (
          <motion.div
            key={option.role}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Card
              onClick={() => setRole(option.role)}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-500/50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <option.icon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <footer className="absolute bottom-8 text-center text-muted-foreground/80">
          <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}