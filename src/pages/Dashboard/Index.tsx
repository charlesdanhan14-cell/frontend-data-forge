import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Users, GraduationCap, BookOpen, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { profile } = useAuth();

  const stats = [
    { title: 'Total Élèves', value: '0', icon: Users, color: 'text-blue-500' },
    { title: 'Total Classes', value: '0', icon: BookOpen, color: 'text-green-500' },
    { title: 'Taux de réussite', value: '0%', icon: GraduationCap, color: 'text-purple-500' },
    { title: 'Recettes (CFA)', value: '0', icon: CreditCard, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bonjour, {profile?.full_name}</h1>
        <p className="text-muted-foreground">Voici un aperçu de votre établissement pour aujourd'hui.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Aucune activité récente pour le moment.</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Événements à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Aucun événement prévu.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
