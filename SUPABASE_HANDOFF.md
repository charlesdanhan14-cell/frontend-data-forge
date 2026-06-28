# Supabase Database Setup - Handoff to Frontend Engineer

## ✅ Database Status: COMPLETE

The Supabase database is fully configured and ready for frontend integration.

---

## 🔐 Supabase Credentials

**Project URL:** `https://nupcsauyhkauqxdlvwsp.supabase.co`

**Anon Key:** 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cGNzYXV5aGthdXF4ZGx2d3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5OTYwNDEsImV4cCI6MjA5NzU3MjA0MX0.4ytKp7M4mnPwoFfQ3QEfpA9NPzG_HtKwwg81DoxYlvw
```

---

## 📦 TypeScript Types

**Location:** `src/integrations/supabase/types.ts`

These types are auto-generated from the database schema and include:
- All table definitions (Row, Insert, Update types)
- Relationship mappings
- Helper function signatures

---

## 🗄️ Database Schema Overview

This is a **School Management System** (Système de Gestion Scolaire) with the following core modules:

### Core Tables (20+ tables)

#### 1. **Establishments & Organization**
- `establishments` - Schools/institutions
- `academic_years` - School years
- `terms` - Academic terms (trimesters/semesters)
- `levels` - Education levels (6ème, 5ème, etc.)
- `classes` - Classes/sections
- `subjects` - Subjects/courses
- `class_subjects` - Class-subject assignments with teachers

#### 2. **Users & Roles**
- `profiles` - User profiles (extends auth.users)
  - Roles: SUPER_ADMIN, DIRECTOR, TEACHER, ACCOUNTANT, SUPERVISOR, SECRETARY, PARENT, STUDENT
- `staff` - Staff members (teachers, admin, etc.)
- `parents` - Parent records
- `students` - Student records

#### 3. **Academic Management**
- `grade_types` - Types of assessments (exam, quiz, homework, etc.)
- `grade_entries` - Grade books/assessments
- `student_grades` - Individual student grades
- `timetable_slots` - Class schedules

#### 4. **Attendance & Discipline**
- `attendance_sessions` - Attendance sessions (morning/afternoon)
- `attendance_records` - Individual attendance records
- `discipline_records` - Discipline incidents

#### 5. **Finance**
- `invoices` - Student invoices (tuition, fees, etc.)
- `payments` - Payment records
- `expenses` - School expenses

#### 6. **Audit & Logging**
- `audit_logs` - System audit trail

---

## 🔒 Security & RLS

**Row Level Security (RLS)** is enabled on ALL tables with comprehensive policies:

### Helper Functions (SECURITY DEFINER)
- `is_super_admin(user_id)` - Check if user is SUPER_ADMIN
- `is_establishment_director(user_id, establishment_id)` - Check if user is director of establishment
- `is_establishment_member(user_id, establishment_id)` - Check if user belongs to establishment
- `get_user_role(user_id)` - Get user's role

### RLS Policy Pattern
- **SUPER_ADMIN**: Full access to all data
- **DIRECTOR**: Full access within their establishment
- **TEACHER**: Read access to their classes, write access to grades for their subjects
- **ACCOUNTANT**: Full access to financial data (invoices, payments, expenses)
- **SECRETARY**: Write access to students and parents
- **SUPERVISOR**: Write access to attendance and discipline
- **STUDENT**: Read access to their own grades and records
- **PARENT**: Read access to their children's data

---

## 🚀 Frontend Setup Instructions

### 1. Install Supabase Client
```bash
bun add @supabase/supabase-js
```

### 2. Create Supabase Client
Create `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://nupcsauyhkauqxdlvwsp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cGNzYXV5aGthdXF4ZGx2d3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5OTYwNDEsImV4cCI6MjA5NzU3MjA0MX0.4ytKp7M4mnPwoFfQ3QEfpA9NPzG_HtKwwg81DoxYlvw'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### 3. Set Up Auth Context
Create an Auth context to manage user sessions and profile data.

### 4. Use TypeScript Types
Import types for type-safe database operations:

```typescript
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types'

type Student = Tables<'students'>
type NewStudent = TablesInsert<'students'>
type UpdateStudent = TablesUpdate<'students'>
```

---

## 📝 Important Notes

1. **Profile Creation**: When a new user signs up, the `handle_new_user()` trigger automatically creates a profile record. The role is taken from `raw_user_meta_data.role` (defaults to 'TEACHER').

2. **Establishment Assignment**: Users must be assigned to an establishment via their profile to access any data.

3. **Multi-Tenancy**: The system is multi-tenant. Each establishment's data is isolated via RLS policies.

4. **Audit Logging**: Consider implementing audit logging for critical operations (the `audit_logs` table is ready).

5. **File Storage**: If you need file uploads (photos, documents), you'll need to set up Supabase Storage buckets.

---

## 🎯 Next Steps for Frontend

1. ✅ Create Supabase client
2. ✅ Set up Auth context/hooks
3. ✅ Build login/signup pages
4. ✅ Create dashboard based on user role
5. ✅ Implement CRUD operations for each module
6. ✅ Add proper error handling and loading states
7. ✅ Implement role-based UI (show/hide features based on role)

---

## 🔧 Database Migrations

**Applied Migrations:**
1. `20250101000001_create_core_schema` - Core tables and RLS
2. `20250101000002_revoke_function_access` - Security hardening
3. `20250101000003_create_grades_attendance_finance` - Academic and financial tables
4. `20250101000004_fix_security_definer_functions` - Revoke function access
5. `20250101000005_move_rls_trigger_to_private_schema` - Move event trigger to private schema

---

## 📞 Support

If you encounter any issues:
- Check RLS policies if data is not accessible
- Verify user has correct role and establishment assignment
- Check browser console for detailed error messages
- Use Supabase dashboard to inspect data and logs

---

**Status:** ✅ Database ready for frontend integration
**Date:** 2025-01-XX
**Supabase Project:** nupcsauyhkauqxdlvwsp
