# Implementation Plan

This document outlines the step-by-step plan to build the AI Therapist MVP.

## Phase 1: Project Setup & Foundations (Day 1)

- [x] **Task 1.1: Initialize Project Repository**

  - Create a new Git repository.
  - Add `prd.md`, `structure.md`, `implementation-plan.md`, and `changelog.md`.

- [x] **Task 1.2: Setup Next.js Frontend**

  - Initialize a new Next.js project with TypeScript and Tailwind CSS.
  - `npx create-next-app@latest frontend --typescript --tailwind --eslint`
  - Install Shadcn UI and basic components.
  - `npx shadcn-ui@latest init`
  - `npx shadcn-ui@latest add button dropdown-menu`

- [x] **Task 1.3: Setup FastAPI Backend**

  - Create a `backend` directory with a `requirements.txt`.
  - Initialize a virtual environment.
  - Install FastAPI, Uvicorn, and other dependencies.
  - `pip install fastapi uvicorn python-dotenv`
  - Create a basic "Hello World" endpoint.

## Phase 2: Core Frontend & Media (Day 1-2)

- [x] **Task 2.1: Build the Landing Page**

  - Create a simple landing page (`frontend/app/page.tsx`) that prompts the user to enter a room name.

- [x] **Task 2.2: Implement LiveKit Token Generation**

  - Create the `/api/token` route in Next.js.
  - Install `livekit-server-sdk`.
  - The route will take a room name and user identity and return a LiveKit access token.

- [x] **Task 2.3: Create the Therapy Session UI**

  - Create the main therapy view at `app/(therapy)/[roomName]/page.tsx`.
  - Integrate the `livekit-client` SDK.
  - Implement basic video conferencing: connect to a room, publish local video/audio, and display participant tracks.
  - Use `@livekit/components-react` for a quick setup.

- [x] **Task 2.4: Build UI Components**
  - Create `ModeSelector.tsx` to switch between modes (initially just "Video").
  - Create `Controls.tsx` for mute/unmute and other media controls.
  - Create `VideoView.tsx` to render the user's self-view and the AI therapist's video.

## Phase 3: Backend AI Integration (Day 2)

- [x] **Task 3.1: Implement Backend WebSocket Endpoint**

  - Create the `/ws/therapy/{session_id}` endpoint in FastAPI.
  - It should handle WebSocket connections, receiving and sending messages.

- [x] **Task 3.2: Integrate LiveKit Webhooks**

  - Configure LiveKit to send webhook events to the backend (e.g., when a participant joins).
  - Create a backend endpoint to handle these webhooks.

- [x] **Task 3.3: Implement AI Orchestration**

  - Create `services/ai_orchestrator.py`.
  - Write a placeholder function to simulate receiving a media chunk and returning a "response" (e.g., a pre-recorded video/audio file URL). This will be replaced with actual Gemini API calls later.

- [x] **Task 3.4: Connect Frontend to Backend WebSocket**
  - The frontend therapy session component should connect to the FastAPI WebSocket.
  - It should send user media (or metadata about it) and receive AI responses.

## Phase 4: ChromaCalm™ and Final Touches (Day 3)

- [x] **Task 4.1: Implement Sentiment Analysis (Mock)**

  - In the backend, create a mock sentiment service (`services/sentiment.py`) that generates a random sentiment score between -1 and +1 every few seconds.
  - Push this score to the frontend via the WebSocket.

- [x] **Task 4.2: Build the ChromaCalm™ Component**

  - Create `ChromaCalm.tsx` and the `useChromaCalm.ts` hook.
  - The component will receive the sentiment score from the WebSocket connection.
  - It will use the score to update CSS variables, animating the background color.

- [ ] **Task 4.3: Refine UI and Accessibility**

  - Ensure all components are responsive and accessible.
  - Add ARIA labels and keyboard navigation.
  - Implement dark/light mode toggle.

- [ ] **Task 4.4: (Stretch Goal) Gemini Live API Integration**
  - If time permits, replace the mock AI orchestrator with actual calls to the Gemini Live APIs.
  - Handle real-time video/audio streaming to and from Gemini.

## Phase 5: Deployment & Pitch Prep

- [ ] **Task 5.1: Deploy Backend to Render**

  - Connect the GitHub repository to Render.
  - Create a new "Blueprint" service using the `render.yaml` file.
  - Set necessary environment variables in the Render dashboard.

- [ ] **Task 5.2: Deploy Frontend to Vercel**

  - Connect the GitHub repository to Vercel.
  - Configure the project and environment variables.

- [ ] **Task 5.3: Prepare Demo**
  - Record a video demonstrating the full user flow, especially the ChromaCalm™ feature.
  - Prepare slides for the hackathon pitch.
