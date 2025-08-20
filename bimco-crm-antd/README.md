# BIMCO CRM - Ant Design Edition

A modern Customer Relationship Management (CRM) system built with Next.js and Ant Design, specifically designed for BIMCO's maritime industry requirements.

## Features

### Core Modules
- **Dashboard** - Overview of key metrics and recent activities
- **Companies Management** - Comprehensive company profiles with search and filtering
- **Contacts Management** - Contact information with company associations and classifications
- **Fleet Management** - Vessel information with IHS data, maintenance history, and certificates
- **Courses & Events** - Training course and event management with participant tracking
- **Search** - Global search across all modules with segment creation
- **Segment Management** - Create and manage contact segments for targeted operations
- **Notifications** - System notifications and Dotdigital campaign management

### Key Features
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Role-Based Access Control** - Support for different user roles and permissions
- **Advanced Search & Filtering** - Powerful search capabilities across all entities
- **Data Export** - Export functionality for all major data sets
- **Segment Operations** - Create events, interactions, and manage contact statuses
- **Real-time Notifications** - System alerts and user notifications

## Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Library**: Ant Design 5.x
- **Language**: TypeScript
- **Icons**: Ant Design Icons
- **Styling**: CSS-in-JS with Ant Design theming
- **Date Handling**: Day.js

## BIMCO Brand Integration

The application follows BIMCO's brand guidelines:
- **Primary Blue**: #003f7f
- **Light Blue**: #4a90a4
- **Navy**: #1e3a8a
- **Gray Tones**: #6b7280, #f3f4f6

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── companies/         # Companies management
│   ├── contacts/          # Contacts management  
│   ├── courses/           # Courses & Events
│   ├── fleets/            # Fleet management
│   ├── search/            # Global search
│   ├── segments/          # Segment management
│   ├── notifications/     # Notifications
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard
├── components/
│   └── Layout/
│       └── MainLayout.tsx # Main application layout
├── data/
│   └── mockData.ts        # Sample data for demonstration
└── types/
    └── index.ts           # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bimco-crm-antd
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Mock Data

The application includes comprehensive mock data representing BIMCO's maritime industry context:

- **Companies**: Major shipping companies like Maersk, MSC, COSCO
- **Contacts**: Industry executives and professionals
- **Fleets**: Container ships with realistic specifications
- **Courses**: Maritime training courses and industry events

## Key Components

### Dashboard
- Key metrics overview
- Recent activities timeline
- Quick access to all modules
- Company status distribution

### Companies Management
- Tabbed interface for company details
- Advanced search and filtering
- Address management
- Contact associations
- Status and type tracking

### Contacts Management  
- Detailed contact profiles
- Company associations
- Classification codes (BI-ADM, BI-ASIA, etc.)
- Contact communication history

### Fleet Management
- Vessel specifications and capacity
- IHS (Information Handling Services) integration
- Maintenance history tracking
- Certificate management with expiry dates

### Courses & Events
- Training course scheduling
- Participant management
- Material uploads
- Venue details and logistics

### Search & Segments
- Cross-module search capabilities
- Dynamic segment creation
- Bulk operations on segments
- Export functionality

### Notifications
- System notifications
- Dotdigital campaign integration
- Email queue management
- Trigger-based alerts

## Design Principles

### User Experience
- Clean, professional interface suited for maritime industry
- Consistent navigation and interaction patterns
- Responsive design for various screen sizes
- Intuitive data entry and management workflows

### Data Management
- Comprehensive entity relationships
- Flexible search and filtering
- Bulk operations where appropriate
- Data validation and error handling

### Performance
- Optimized table rendering with pagination
- Lazy loading for large data sets
- Efficient search algorithms
- Minimal API calls through smart caching

## Future Enhancements

- Real API integration
- Advanced reporting and analytics
- Document management system
- Integration with external maritime databases
- Mobile app development
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is proprietary software developed for BIMCO.

## Support

For technical support or questions about this application, please contact the BIMCO IT department.
