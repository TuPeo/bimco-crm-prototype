# BIMCO CRM Prototype - AI Agent Instructions

## Project Overview

This is a **BIMCO CRM prototype** built with **Next.js 15.4.7**, **TypeScript**, and **Tailwind CSS**. It's designed as a maritime industry Customer Relationship Management system with integrated design components from the BIMCO Storybook.

**Primary Purpose**: Maritime CRM system for managing companies, contacts, courses/events, fleets, and providing dashboard analytics with maritime industry-specific workflows.

## Architecture & Tech Stack

### Core Technologies
- **Next.js 15.4.7** with App Router architecture (not Pages Router)
- **React 19.1.0** with strict TypeScript enforcement  
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS 3.4.0** with custom BIMCO design system
- **Recharts 3.1.2** for data visualization and dashboard charts

### Key Dependencies
```json
{
  "@headlessui/react": "^2.2.7",     // UI components
  "@heroicons/react": "^2.2.0",      // Icons
  "clsx": "^2.1.1",                  // Conditional classes
  "date-fns": "^4.1.0",              // Date formatting for charts
  "lucide-react": "^0.540.0",        // Additional icons
  "recharts": "^3.1.2"               // Chart components
}
```

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main dashboard
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── companies/         # Companies management
│   ├── contacts/          # Contact management  
│   ├── courses/           # Course/event management
│   └── notifications/     # System notifications
├── components/
│   ├── charts/            # Data visualization components
│   ├── Header.tsx         # Navigation header
│   └── Layout.tsx         # Page layout wrapper
├── data/
│   └── mockData.ts        # Maritime CRM test data
├── styles/
│   └── bimco-colors.css   # BIMCO design system colors
└── types/
    └── index.ts           # TypeScript interfaces
```

## BIMCO Design System Integration

### Color Palette (Critical for Brand Consistency)
The project integrates BIMCO's maritime branding through `src/styles/bimco-colors.css`:

```css
:root {
  --bimco-blue-primary: #003366;      /* Deep maritime blue */
  --bimco-blue-secondary: #0066CC;    /* Lighter blue */
  --bimco-cream-primary: #F5F0E8;     /* Warm cream */
  --bimco-cream-secondary: #FAF7F2;   /* Light cream */
  /* + extensive maritime color system */
}
```

**Key Design Principles:**
- Always use BIMCO color variables instead of arbitrary colors
- Chart components must use maritime-appropriate color schemes
- Component styling should reflect professional maritime industry aesthetics
- Responsive design with mobile-first approach

### Storybook Component Integration
- BIMCO Storybook located at `../bimco-storybook/`  
- Contains pre-built maritime industry components
- Use existing BIMCO components before creating new ones
- Follow established component patterns from storybook

## Data Models & Business Logic

### Core Entities (Maritime CRM Focus)
Based on `specs/overview/system-overview.md`:

1. **Companies** - Maritime companies with registration numbers, fleet associations
2. **Contacts** - Maritime professionals with role classifications  
3. **Courses/Events** - Maritime training, conferences, certification programs
4. **Fleets** - Vessel information, IHS data, maintenance schedules
5. **Notifications** - System alerts, course reminders, compliance notifications

### Key TypeScript Interfaces
```typescript
// Company with maritime-specific fields
interface Company {
  id: string;
  registrationNumber: string;  // Maritime company registration
  name: string;
  companyType: 'Member' | 'Non-member' | 'Supplier';
  memberStatus: string;
  industry: string;
  fleetSize?: number;  // Number of vessels
  // ... address, contacts, etc.
}

// Maritime professional contact
interface Contact {
  id: string;
  contactNumber: string;  // Format: CompanyReg_ContactNum
  firstName: string;
  lastName: string;
  classification: string;  // BI-ADM, BI-ASIA, etc.
  role: string;
  company: Company;
  // ... communication details
}
```

### Mock Data Guidelines
`src/data/mockData.ts` contains:
- **Realistic maritime industry data** (shipping companies, ports, vessel types)
- **Chart datasets** for dashboard visualizations
- **Activity feeds** with maritime-specific events
- **Statistics** reflecting real-world maritime CRM metrics

Always use maritime terminology (vessels, cargo, shipping lanes, ports, etc.) in sample data.

## Dashboard & Data Visualization

### Chart Components (`src/components/charts/`)
All chart components follow this pattern:

```typescript
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartProps {
  data: ChartDataItem[];
  title: string;
}

export const MaritimeChart = ({ data, title }: ChartProps) => {
  const MARITIME_COLORS = [
    'var(--bimco-blue-primary)',
    'var(--bimco-blue-secondary)',
    // ... BIMCO color system
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-bimco-blue-primary">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {/* Chart implementation with maritime styling */}
      </ResponsiveContainer>
    </div>
  );
};
```

**Chart Requirements:**
- Use BIMCO color palette exclusively
- Include proper TypeScript interfaces
- Responsive design (ResponsiveContainer)
- Maritime industry appropriate data representations
- Consistent styling across all charts

### Dashboard Layout
Main dashboard (`src/app/page.tsx`) includes:
- **Key metrics cards** with maritime KPIs
- **Chart grid** showing company distribution, contact roles, event trends
- **Recent activity feed** with maritime-specific events
- **Quick actions panel** for common CRM tasks
- **Live Copenhagen time** (BIMCO headquarters timezone)

## Development Patterns & Best Practices

### File Organization
- **Page components**: `src/app/[route]/page.tsx`
- **Reusable components**: `src/components/[feature]/[ComponentName].tsx`
- **Types**: Group related interfaces in logical files
- **Styles**: Component-specific styles via Tailwind, global styles in designated CSS files

### TypeScript Standards
- **Strict mode enabled** - no implicit any types
- **Interface definitions** for all props and data structures
- **Explicit return types** for complex functions
- **Import/export consistency** - use named exports for components

### CSS & Styling Approach
- **Tailwind CSS classes** for component styling
- **BIMCO color system** via CSS custom properties  
- **Responsive design** with mobile-first breakpoints
- **Avoid `@apply` directives** - use CSS custom properties instead

### Component Development
```typescript
// Preferred component pattern
interface ComponentProps {
  title: string;
  data: DataType[];
  onAction?: (id: string) => void;
}

export const MaritimeComponent = ({ 
  title, 
  data, 
  onAction 
}: ComponentProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-bimco-blue-primary mb-4">
        {title}
      </h2>
      {/* Component implementation */}
    </div>
  );
};
```

## Common Issues & Solutions

### Server Startup Problems
If encountering ENOENT package.json errors:
```bash
# Ensure you're in the correct directory
cd bimco-crm-prototype
npm run dev
```

### TypeScript Compilation Issues
- **Missing exports**: Ensure all data files export required interfaces
- **Import paths**: Use relative paths, avoid complex path mapping initially
- **Chart component imports**: Recharts components must be imported individually

### CSS Integration Problems
- **@apply directive issues**: Use CSS custom properties instead
- **Tailwind config**: Ensure BIMCO colors are properly configured
- **Import order**: globals.css must import bimco-colors.css correctly

## Maritime Industry Context

### Domain Knowledge Requirements
When working on this CRM:
- **Understand maritime terminology** (vessels, cargo, shipping, ports, classifications)
- **Company classifications** (Members vs Non-members, suppliers, etc.)
- **Contact roles** typical in maritime industry (Ship Managers, Port Agents, etc.)
- **Course types** (Safety training, certification, conferences)
- **Fleet management** (vessel tracking, maintenance, compliance)

### Business Process Awareness  
- **RBAC considerations** - Role-based access for maritime organizations
- **Compliance tracking** - Maritime regulations and certifications
- **Multi-company relationships** - Fleet owners, managers, operators
- **International scope** - Global maritime industry focus

## API Integration (Future)
Current prototype uses mock data. Future API integration should:
- Support JWT authentication for CRM users
- Handle API key authentication for external systems (MyAccount, SmartCon)
- Implement x-contactnumber-id header pattern
- Follow RESTful conventions with maritime entity endpoints

## Testing & Quality Assurance

### Before Implementation
- Review system-overview.md for business requirements
- Check existing components in BIMCO Storybook
- Verify TypeScript interfaces match maritime data models
- Ensure BIMCO color system integration

### During Development
- Test responsive design across viewports
- Verify chart interactivity and data accuracy  
- Check TypeScript compilation without errors
- Validate BIMCO branding consistency

### Post-Implementation
- Test full user workflows (view company → view contacts → register for course)
- Verify data relationships work correctly
- Check performance with larger datasets
- Validate maritime terminology usage

## Key Commands

```bash
# Development server with Turbopack
npm run dev

# Build production version
npm run build

# Start production server  
npm start

# Run linting
npm run lint

# Install new maritime-related packages
npm install [package-name]
```

## Success Criteria for AI Agents

When working on this BIMCO CRM prototype, you are successful when:

1. **Maritime Context**: All code reflects genuine maritime industry understanding
2. **Brand Consistency**: BIMCO color system and design patterns are correctly applied
3. **TypeScript Quality**: Strict typing with maritime-appropriate interfaces
4. **User Experience**: Intuitive workflows for maritime professionals
5. **Technical Standards**: Next.js 15 best practices with modern React patterns
6. **Data Integrity**: Mock data represents realistic maritime CRM scenarios

---

*This document serves as the definitive guide for AI agents working on the BIMCO CRM prototype. Always prioritize maritime industry authenticity and BIMCO brand consistency in all implementations.*
