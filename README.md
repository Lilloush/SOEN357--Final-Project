# FocusRoom - Collaborative Virtual Study Space

A collaborative virtual study room application that enables students to work together in real-time with integrated screen sharing, whiteboard, file sharing, and 3D virtual room visualization capabilities.

## Project Overview

FocusRoom is a prototype web application developed as part of **SOEN357 - User Interface Design** coursework. The application provides students with a virtual collaborative environment that mimics the experience of studying together in person, enhanced with digital tools for productivity and engagement.

This project demonstrates the integration of modern web technologies with 3D visualization concepts to create an immersive study experience.

---

## Team Members

| Name | Student ID |
|------|------------|
| Ali Mcheick | 40208790 |
| Mohamad Edelby | 40251628 |
| Lilia Messaoudi | 40252419 |
| Brian Hariri | 40190861 |
| Hagop Minassian | 40040098 |
| Rim Charafeddine | 40282994 |

---

## Features

### Core Functionality
- **User Authentication**: Login system with persistent user sessions
- **Room Management**: Create and join study rooms using unique room codes
- **Participant Management**: View all participants in a room with their status

### Collaboration Tools
- **Screen Sharing**: Share your screen with room participants in real-time
- **Interactive Whiteboard**:
  - Drawing tools (pen and eraser) with customizable colors and stroke sizes
  - PDF and image annotation support
  - Pan and zoom functionality (hold Space to pan)
  - Download whiteboard as PNG
  - Import images and PDFs as backgrounds
- **File Sharing**: Share and view various file types with participants
- **Video/Audio Controls**:
  - Toggle microphone and camera
  - Real-time participant status indicators
  - Picture-in-picture view during screen sharing

### User Experience
- **Profile Management**: User profile customization
- **Settings Panel**:
  - Dark mode toggle
  - Auto-join preferences for mic/camera
  - Notification settings
- **Virtual Room Preview**: Concept visualization of the 3D virtual study space

---

## Technology Stack

### Frontend
- **React** 19.2.0 - UI framework
- **Vite** 7.2.2 - Build tool and development server
- **JavaScript (JSX)** - Primary programming language

### Libraries & Tools
- **PDF.js** (pdfjs-dist 5.4.449) - PDF rendering and viewing
- **WebRTC APIs** - Screen sharing, audio, and video capabilities
- **Canvas API** - Whiteboard drawing functionality
- **LocalStorage API** - User session and preferences persistence
- **ESLint** - Code quality and linting

### 3D Visualization
- **FBX Model** - 3D model format for FocusRoom virtual space
- Located in `/3d-models/` directory with VR implementation outputs

---

## Project Structure

```
SOEN357--Final-Project/
├── focusroom-web/           # Main web application
│   ├── src/
│   │   ├── App.jsx          # Main application component & routing
│   │   ├── Login.jsx        # User authentication
│   │   ├── mainPage.jsx     # Dashboard/home page
│   │   ├── room.jsx         # Main room interface with all features
│   │   ├── Profile.jsx      # User profile management
│   │   ├── Settings.jsx     # Application settings
│   │   ├── VirtualRoom.jsx  # 3D virtual room preview/entry
│   │   ├── main.jsx         # Application entry point
│   │   └── App.css          # Styles
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
│
├── 3d-models/               # 3D visualization assets
│   ├── focusroom.fbx        # 3D model of FocusRoom
│   ├── output/              # Model outputs
│   └── vr-implementation-output-limited/  # VR concept demonstrations
│
└── README.md                # This file
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager
- Modern web browser with WebRTC support (Chrome, Firefox, Edge, Safari)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd SOEN357--Final-Project
```

### Step 2: Navigate to Web Application
```bash
cd focusroom-web
```

### Step 3: Install Dependencies
```bash
npm install
```
or if using yarn:
```bash
yarn install
```

### Step 4: Start Development Server
```bash
npm run dev
```
or:
```bash
yarn dev
```

The application will start on `http://localhost:5173` (default Vite port).

---

## Usage Guide

### Getting Started

1. **Login**: Open the application and enter your name to create a user session
2. **Dashboard**: View options to create/join rooms, access profile, settings, or virtual room preview
3. **Join/Create Room**: Enter a room code to join an existing room or create a new one

### Using Room Features

#### Screen Sharing
- Click the **"Screen"** button in the sidebar controls
- Select the screen/window you want to share
- Click **"Stop"** to end screen sharing

#### Whiteboard
- Click the **"Board"** button to open the whiteboard
- **Drawing Tools**:
  - Select **Pen** or **Eraser**
  - Choose color using the color picker
  - Adjust stroke size with the slider
  - Hold **Space** and drag to pan around the canvas
- **Media Import**:
  - Click **"Add media"** to import images or PDFs
  - Draw annotations on top of imported media
- **Actions**:
  - **Undo**: Remove the last stroke
  - **Clear**: Clear all strokes
  - **Remove bg**: Remove background media
  - **Download**: Save whiteboard as PNG

#### File Sharing
- Click the **"File"** button to open a file
- Select an image or document from your system
- The file will be displayed to all participants
- Click **"Close"** to close the file viewer

#### Audio/Video
- Click the microphone or camera icons to toggle them on/off
- Participant status is visible in the participants panel
- Your video appears as picture-in-picture during screen sharing

### Settings
- Access settings from the dashboard
- Toggle **Dark Mode** for a darker interface theme
- Configure **Auto-join** preferences for mic/camera
- Manage **Notifications**

---

## 3D Virtual Room

The `/3d-models/` directory contains:

- **focusroom.fbx**: 3D model representing the virtual study room environment
- **output/**: Generated model outputs
- **vr-implementation-output-limited/**: VR concept demonstrations showing how FocusRoom could be experienced in a virtual reality environment

These assets demonstrate the vision for an immersive 3D/VR version of FocusRoom, where users could navigate a virtual study space. The current web prototype provides the collaboration tools, while the 3D models showcase the spatial concept.

---

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## Technical Details

### Browser Permissions Required
- **Microphone**: For audio communication
- **Camera**: For video sharing
- **Screen Sharing**: For screen capture (getDisplayMedia API)

### Data Storage
- User sessions and preferences are stored in browser **LocalStorage**
- No backend database is required for this prototype
- Data persists across browser sessions until cleared

### Current Hosting
- Self-hosted on local machine for development and demonstration
- Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

---

## Project Status

**Status**: Prototype

This is a functional prototype demonstrating the core concepts and features of FocusRoom. It includes:
- ✅ Fully functional web interface with collaboration tools
- ✅ Real-time screen sharing, whiteboard, and file sharing
- ✅ User authentication and room management
- ✅ 3D model concept visualization
- ⚠️ No real-time synchronization between multiple users (prototype limitation)
- ⚠️ 3D/VR integration not implemented in web app (concept only)

---

## Future Enhancements

Potential improvements for future iterations:
- Real-time multi-user synchronization using WebSockets or WebRTC data channels
- Backend server for persistent room data and user management
- Integration of 3D virtual room into web application using Three.js or Unity WebGL
- Mobile responsive design
- Chat functionality
- Recording capabilities
- Breakout rooms
- Calendar integration for scheduled study sessions

---

## Browser Compatibility

Tested and compatible with:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari (macOS/iOS)

**Note**: Some features like screen sharing may have varying support across browsers.

---

## Course Information

**Course**: SOEN357 - User Interface Design
**Institution**: Concordia University
**Project Type**: Final Project - Collaborative Study Application Prototype

---

## License

This project is developed for educational purposes as part of SOEN357 coursework.

---

## Acknowledgments

- PDF.js library by Mozilla for PDF rendering capabilities
- React and Vite teams for excellent development tools
- All team members for their contributions to this project

---

**For questions or support, please contact any team member listed above.**
