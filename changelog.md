# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2023-10-27

### Added

- **Project Initialization:**
  - Created `prd.md` with detailed product requirements for the AI Therapist MVP.
  - Created `structure.md` to outline the project's architecture and file layout.
  - Created `implementation-plan.md` to define the development roadmap and tasks.
  - Created this `changelog.md` to track progress.
- **Task 1.1: Initialize Project Repository - DONE**

### Changed

- Updated `implementation-plan.md` and `structure.md` to use Render for backend deployment.

### Added

- **Task 1.2: Setup Next.js Frontend - DONE**
  - Initialized Next.js application with TypeScript, Tailwind CSS.
  - Configured `shadcn/ui` and added initial components.

### Added

- **Task 1.3: Setup FastAPI Backend - DONE**
  - Initialized FastAPI application with a basic endpoint.
  - Added dependencies to `requirements.txt`.
- **Task 1.4: Dockerize Services - REMOVED**
  - Removed Docker files and updated plan.

### Added

- **Task 2.1: Build the Landing Page - DONE**
  - Created the initial landing page for users to join a therapy session.

### Added

- **Task 2.2: Implement LiveKit Token Generation - DONE**
  - Created an API route to generate LiveKit JWT tokens.
  - Added `livekit-server-sdk` dependency.

### Added

- **Task 2.3: Create the Therapy Session UI - DONE**
  - Created the main therapy session view with a basic video conference layout.
  - Integrated the LiveKit React SDK to handle room connection and media.

### Added

- **Task 2.4: Build UI Components - DONE**
  - Created `ModeSelector.tsx` for switching interaction modes.
  - Created `Controls.tsx` for media controls (mute, etc.).
  - Created `VideoView.tsx` to display participant videos.

### Added

- **Task 3.1: Implement Backend WebSocket Endpoint - DONE**
  - Created a WebSocket endpoint in the FastAPI backend.
  - Added the `websockets` dependency.

### Added

- **Task 3.2: Integrate LiveKit Webhooks - DONE**
  - Added a webhook receiver to the backend to handle LiveKit events.
  - Added the `livekit` server SDK dependency.

### Added

- **Task 3.3: Implement AI Orchestration - DONE**
  - Created a placeholder AI orchestration service.

### Added

- **Task 3.4: Connect Frontend to Backend WebSocket - DONE**
  - Connected the frontend therapy session component to the backend WebSocket.
  - Added a custom hook to manage the WebSocket connection.
  - Implemented a basic chat interface for testing.

### Added

- **Task 4.1: Implement Sentiment Analysis (Mock) - DONE**
  - Created a mock sentiment analysis service in the backend.
  - The WebSocket now pushes a random sentiment score to the frontend every 5 seconds.

### Added

- **Task 4.2: Build the ChromaCalm™ Component - DONE**
  - Created the `ChromaCalm.tsx` component and `useChromaCalm.ts` hook.
  - The application background now changes dynamically based on the mock sentiment score.
