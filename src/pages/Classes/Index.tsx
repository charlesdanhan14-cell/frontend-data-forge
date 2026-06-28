import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type ClassWithDetails = Tables<'classes'> & {
  levels: { name: string } | null;
  profiles: { full_name: string } | null;
};

const ClassesPage: React.FC = () => {
  const { profile } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    if (!profile?.establishment_id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          levels(name),
          profiles:main_teacher_id(full_name)
        `)
        .eq('establishment_id', profile.establishment_id)
        .order('name', { ascending: true });

      if (error) {
        toast.error(error.message);
      } else {
        setClasses(data || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [profile?.establishment_id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">Gérez les classes et les affectations des professeurs.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle classe
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Chargement...</p>
        ) : classes.length === 0 ? (
          <p className="text-muted-foreground italic col-span-full">Aucune classe enregistrée.</p>
        ) : (
          classes.map((cls) => (
            <div key={cls.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  cls.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {cls.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <h3 className="font-bold text-lg">{cls.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cls.levels?.name || 'Sans niveau'}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Capacité: <span className="font-medium">{cls.capacity} élèves</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Prof. Principal: <span className="font-medium">{cls.profiles?.full_name || 'Non assigné'}</span></span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">Détails de la classe</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
