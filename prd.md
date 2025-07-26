**Product Requirement Document (PRD)**
**Project:** AI Therapist Hackathon MVP
**Tech Stack:**

* **Frontend:** Next.js + TypeScript + LiveKit
* **Backend:** FastAPI (Python)
* **AI/Media Layer:** Gemini Live APIs (multimodal video + audio), optional OpenAI Whisper for fallback

---

## 1. Frontend PRD

### 1.1. Purpose & Scope

Build a responsive, low-latency client interface that lets users seamlessly switch among multiple therapeutic “modes” (text, audio, video, “Safe-Space” VR mode), capture/send live streams to the backend via LiveKit, render real-time AI responses (captions, synthesized therapist avatar + voice via Gemini Live API), and adapt the UI environment dynamically based on detected sentiment.

### 1.2. Product Objectives

* **Ultra-low latency** live streaming & response (≤200 ms round-trip)
* **Multimodal interaction**: text chat, voice-only, video-chat, immersive “Safe-Space” background
* **Adaptive UI**: real-time environment adaptation (“ChromaCalm™” background color shifts to soothe based on sentiment scores)
* **User-centric controls**: easily swap modes, adjust text size, toggle captions, adjust avatar style

### 1.3. Key Features

1. **Mode Selector**

   * Dropdown/tabs to pick interaction mode
   * Persists preference (localStorage)
2. **Live Media Streaming**

   * 📹 Video + 🎙️ Audio capture via MediaDevices API → LiveKit
   * Chunked upload & playback pipeline
3. **Real-time AI Response Rendering**

   * Display incoming TTS audio via `<audio>` tag
   * Overlay captions (WebVTT) synced to audio
   * Render therapist avatar video stream from Gemini Live API
4. **ChromaCalm™ Environment** (Unique Hack Feature!)

   * Animated background gradient that shifts toward cooler hues when sentiment is “stressed,” warmer when “calm”
   * Utilizes real-time sentiment metadata from backend
5. **Accessibility & Controls**

   * Caption font-size adjustment
   * Dark/light theme toggle
   * “Panic” quick-exit button to hide UI

### 1.4. User Stories

| ID | Role      | Feature                               | Acceptance Criteria                                                                       |
| -- | --------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| F1 | As a user | Select interaction mode               | Mode switch occurs instantly; media pipeline restarts seamlessly                          |
| F2 | As a user | Talk to therapist via video           | My camera/mic feed publishes to backend; I see avatar + hear TTS audio with <200 ms delay |
| F3 | As a user | Read captions                         | Captions appear in sync; adjustable font size                                             |
| F4 | As a user | Experience adaptive UI                | Background color shifts according to sentiment score every 5 s                            |
| F5 | As a user | Mute/unmute audio, hide/show captions | Controls must react within 50 ms                                                          |

### 1.5. Functional Requirements

* **FR1**: Integrate LiveKit client SDK for real-time media transport
* **FR2**: Implement React context to manage mode state & preferences
* **FR3**: Fetch AI avatar stream & audio endpoint from backend; stream into `<video>`/`<audio>`
* **FR4**: Implement ChromaCalm™ engine: map sentiment score (–1 … +1) → HSL color; animate via CSS variables
* **FR5**: Provide ARIA labels, keyboard navigation, WCAG AA compliance

### 1.6. Non-Functional Requirements

* **NFR1**: Round-trip latency ≤200 ms
* **NFR2**: 99th-percentile frame drop <1%
* **NFR3**: Frontend bundle ≤150 KB gzipped (code-splitting)
* **NFR4**: 99.9% uptime for mode selector & media pipeline

---

## 2. Backend PRD

### 2.1. Purpose & Scope

Develop a low-latency FastAPI service that ingests live video/audio chunks from LiveKit, forwards to Gemini Live APIs for real-time analysis & TTS/avatar generation, processes sentiment metadata, and returns synchronized streams & data to the frontend.

### 2.2. Product Objectives

* **Real-time processing** of live media → AI inference → back to user ≤200 ms
* **Modular pipeline**: pluggable Gemini Live API calls, fallback to Whisper + external TTS
* **Sentiment engine** to drive UI adaptation (ChromaCalm™)
* **Secure & scalable**: JWT auth, horizontal scaling, autoscaling on load spikes

### 2.3. Key Features

1. **Media Ingestion Endpoint**

   * `POST /stream/video-chunk`
   * Accepts media packets via WebSocket or HTTP2 chunked transfer
2. **AI Orchestration Service**

   * **Video** → Gemini Vision API for avatar lip sync & emotion
   * **Audio** → Gemini Audio API for TTS response
   * **Optional** fallback: Whisper for STT & Azure TTS
3. **Sentiment Analysis Module**

   * Real-time NLP on transcribed text → sentiment score (–1 … +1) → exposed via “/sentiment” channel
4. **Streaming Response**

   * WebSocket or Server-Sent Events (SSE) to push back:

     * Therapist avatar video stream
     * TTS audio URL/tokenized stream
     * Captions (WebVTT)
     * Sentiment metadata JSON
5. **Session Management**

   * Maintain ephemeral session state (mode, user prefs, sentiment history) in Redis
   * JWT-based user authentication

### 2.4. User Stories

| ID | Role             | Feature                      | Acceptance Criteria                                     |
| -- | ---------------- | ---------------------------- | ------------------------------------------------------- |
| B1 | As an API client | Send video/audio chunks      | Endpoint accepts & acknowledges within 20 ms            |
| B2 | As an API client | Receive AI avatar stream     | Avatar frames arrive via WebSocket at 30 fps            |
| B3 | As an API client | Receive TTS audio & captions | Audio packets stream; captions aligned via timestamp    |
| B4 | As an API client | Fetch sentiment updates      | JSON payload `{score: 0.4, timestamp: ...}` every 5 s   |
| B5 | As a dev         | Scale horizontally           | New container spins up & registers to service discovery |

### 2.5. Functional Requirements

* **FR1**: Expose WebSocket endpoint `/ws/therapy/{session_id}` for bi-directional media & data
* **FR2**: Implement async handlers in FastAPI using `starlette.websockets`
* **FR3**: Build adapters for:

  * `GeminiLiveAPI.video_infer()` → returns avatar H.264 chunks
  * `GeminiLiveAPI.audio_tts()` → returns Opus audio stream & captions
* **FR4**: Integrate Redis for session & pub/sub sentiment channels
* **FR5**: JWT middleware for auth & session validation

### 2.6. Non-Functional Requirements

* **NFR1**: End-to-end processing latency ≤200 ms (95th percentile)
* **NFR2**: Throughput: support 500 concurrent sessions on a single node
* **NFR3**: JSON payloads <1 KB for metadata; chunk sizes ≤64 KB
* **NFR4**: Secure TLS 1.3, strict CORS policy
* **NFR5**: 24/7 monitoring + alerting on latency & error rates (Prometheus + Grafana)

---

### 3. Unique Hack-Winning Feature: **ChromaCalm™ Adaptive Environment**

* **What it is:** a live, mood-reactive UI environment that shifts color, ambient sounds, and background visuals in real time, driven by sentiment scores from the backend.
* **Why it wins:** blends therapeutic atmosphere with AI insights, offering a truly immersive, personalized session that goes beyond standard avatar/chatbot interfaces.

---

> **Next Steps:**
>
> 1. Wireframe key screens & WebSocket flows
> 2. Prototype LiveKit integration in Next.js
> 3. Implement minimal FastAPI skeleton + Gemini Live adapter
> 4. Demo ChromaCalm™ in “Video Mode” at hackathon pitch 