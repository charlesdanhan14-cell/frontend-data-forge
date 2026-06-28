import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface StudentFormProps {
  onSuccess: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSuccess }) => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    matricule: '',
    first_name: '',
    last_name: '',
    gender: 'M',
    date_of_birth: '',
    place_of_birth: '',
    nationality: 'Ivoirienne',
    address: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.establishment_id) {
      toast.error('Vous devez être rattaché à un établissement');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('students').insert([
        {
          ...formData,
          establishment_id: profile.establishment_id,
          status: 'active',
        },
      ]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Élève ajouté avec succès');
        onSuccess();
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="matricule">Matricule</Label>
          <Input id="matricule" value={formData.matricule} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Sexe</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculin</SelectItem>
              <SelectItem value="F">Féminin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Nom</Label>
          <Input id="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="first_name">Prénoms</Label>
          <Input id="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">Date de naissance</Label>
          <Input id="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="place_of_birth">Lieu de naissance</Label>
          <Input id="place_of_birth" value={formData.place_of_birth} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationalité</Label>
          <Input id="nationality" value={formData.nationality} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" value={formData.phone} onChange={handleChange} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Adresse / Quartier</Label>
        <Input id="address" value={formData.address} onChange={handleChange} />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
