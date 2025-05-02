# Hospital Triage System

A Next.js application with TypeScript and Tailwind CSS that implements a hospital triage system based on flowcharts. The system guides users through a series of questions to assess their symptoms and assign appropriate priority levels.

## Features

- Digital implementation of a hospital triage flowchart
- User-friendly interface for symptom assessment
- Priority level assignment based on responses
- Emergency detection for critical conditions
- Interactive flowchart visualization
- Responsive design for all devices

## Tech Stack

- Next.js (React framework)
- TypeScript (Type-safe JavaScript)
- Tailwind CSS (Utility-first CSS framework)
- Context API (State management)

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── triage/          # Triage-specific components
│   │   ├── index.ts     # Barrel file for exports
│   │   ├── ...          # Individual triage components
│   └── ui/              # Reusable UI components
├── context/             # Context providers
│   └── TriageContext.tsx # Triage state management
├── types/               # TypeScript type definitions
│   └── index.ts         # Type definitions for the app
├── public/              # Static assets
└── ...                  # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hospital-triage-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

The triage system follows this general flow:

1. **Start Screen**: Basic information and emergency warning
2. **Basic Information**: Collect user demographics
3. **Initial Questions**: Screen for common symptoms
4. **Triage Decision**: Route to appropriate assessment based on symptoms
5. **Symptom-Specific Assessment**: Detailed questions about the selected symptom
6. **Priority Assignment**: Assign priority level based on responses
7. **Results**: Display assigned priority level and instructions

## Flowchart Implementation

The system implements a digital version of a medical triage flowchart, with logic for:

- Symptom identification
- Pain assessment (level, location, duration)
- Emergency detection
- Priority level assignment (1-5)

Users can view a visual representation of the flowchart by clicking the flowchart button in the bottom right corner of the screen.

## Customization

### Adding New Symptom Paths

1. Update the `PainArea` type in `types/index.ts`
2. Add a new case in the `TriageRouter` component
3. Create a new assessment component or adapt the existing `PainAssessment` component
4. Update the priority calculation logic in `TriageContext.tsx`

### Modifying Priority Rules

The priority assignment logic is in the `calculatePriority` function in `TriageContext.tsx`. Modify this function to implement different triage protocols or priority rules.

## Deployment

This is a Next.js application and can be deployed on platforms like Vercel, Netlify, or any hosting service that supports Node.js applications.

```bash
# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

## License

[MIT](LICENSE)

## Disclaimer

This system is for demonstration purposes only and is not a substitute for professional medical advice. In case of emergency, seek immediate medical attention.