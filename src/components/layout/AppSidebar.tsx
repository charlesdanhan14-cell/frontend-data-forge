import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  Settings, 
  LogOut,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export const AppSidebar: React.FC = () => {
  const { profile, signOut } = useAuth();
  const location = useLocation();

  const menuItems = [
    { title: 'Tableau de bord', icon: LayoutDashboard, path: '/', roles: ['SUPER_ADMIN', 'DIRECTOR', 'TEACHER', 'ACCOUNTANT', 'SUPERVISOR', 'SECRETARY'] },
    { title: 'Établissements', icon: Building2, path: '/establishments', roles: ['SUPER_ADMIN'] },
    { title: 'Élèves', icon: Users, path: '/students', roles: ['SUPER_ADMIN', 'DIRECTOR', 'SECRETARY', 'SUPERVISOR'] },
    { title: 'Classes', icon: BookOpen, path: '/classes', roles: ['SUPER_ADMIN', 'DIRECTOR', 'TEACHER', 'SECRETARY'] },
    { title: 'Notes', icon: GraduationCap, path: '/grades', roles: ['SUPER_ADMIN', 'DIRECTOR', 'TEACHER'] },
    { title: 'Finance', icon: CreditCard, path: '/finance', roles: ['SUPER_ADMIN', 'DIRECTOR', 'ACCOUNTANT'] },
    { title: 'Administration', icon: ShieldCheck, path: '/admin', roles: ['SUPER_ADMIN', 'DIRECTOR'] },
  ];

  const filteredItems = menuItems.filter(item => 
    profile && item.roles.includes(profile.role)
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">D</div>
          <span>Dala School</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
          <p className="text-xs text-muted-foreground mt-1">{profile?.role}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};
