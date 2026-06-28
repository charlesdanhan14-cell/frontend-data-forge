import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Building2, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type Establishment = Tables<'establishments'>;

const EstablishmentsPage: React.FC = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEstablishments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('establishments')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        toast.error(error.message);
      } else {
        setEstablishments(data || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des établissements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Établissements</h1>
          <p className="text-muted-foreground">Gérez les établissements scolaires du réseau.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un établissement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Chargement...</p>
        ) : establishments.length === 0 ? (
          <p className="text-muted-foreground italic col-span-full">Aucun établissement enregistré.</p>
        ) : (
          establishments.map((est) => (
            <div key={est.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                {est.logo_url ? (
                  <img src={est.logo_url} alt="" className="h-12 w-12 rounded object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{est.name}</h3>
                  <p className="text-sm text-muted-foreground">{est.code}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{est.city}, {est.country}</span>
                </div>
                {est.phone_primary && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{est.phone_primary}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full mt-6">Voir les détails</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EstablishmentsPage;
