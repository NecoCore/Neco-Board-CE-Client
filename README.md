# Neco Board Client

A modern Kanban-style project management board built with React 19, TypeScript, and Vite. Supports real-time collaboration via SignalR, drag-and-drop task management, and flexible API connection via runtime environment variables.

> **Related repositories:**
> - API (backend monorepo): [NecoCore/Neco-Board-CE-Mono](https://github.com/NecoCore/Neco-Board-CE-Mono)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Docker Hub](#docker-hub)
- [Running with Docker](#running-with-docker)
  - [Connecting to the API](#connecting-to-the-api)
  - [Environment Variables](#environment-variables)
  - [Examples](#examples)
- [Running Locally (Development)](#running-locally-development)
- [Building for Production](#building-for-production)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Features

- Project and task management with Kanban boards
- Real-time updates via SignalR WebSockets
- Drag-and-drop task reordering
- Task priorities, statuses, and user assignments
- User authentication and role-based access (Owner, Moderator, User, Viewer)
- Avatar support and profile settings
- Dark/light theme support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Server State | TanStack Query v5 |
| Real-time | Microsoft SignalR |
| Forms | React Hook Form + Zod |
| Drag & Drop | @hello-pangea/dnd |
| HTTP | Axios |
| Container | Docker + Nginx |

---

## Docker Hub

Pre-built images are published automatically on every release.

| Service | Docker Hub |
|---|---|
| **Client** (this repo) | [ren4el/neco-board-client](https://hub.docker.com/repository/docker/ren4el/neco-board-client/general) |
| **API** | [ren4el/neco-board-api](https://hub.docker.com/repository/docker/ren4el/neco-board-api/general) |

**Pull the latest client image:**

```bash
docker pull ren4el/neco-board-client:latest
```

**Available tags:**

| Tag | Description |
|---|---|
| `latest` | Latest stable build from the default branch |
| `beta-0.1` | Beta pre-release 0.1 |
| `v1.2.3` | Exact release version |
| `v1.2` | Latest patch of a minor version |
| `main` / `master` | Build from the named branch |
| `sha-<commit>` | Build tied to a specific commit |

---

## Running with Docker

The image is served by Nginx and supports **runtime configuration** — you do not need to rebuild the image to change the API endpoint. All API settings are injected via environment variables at container start.

### Connecting to the API

The client resolves the API base URL at runtime using one of two approaches:

**Option A — Full URL (recommended):**

Set `SERVER_URL` to the complete base URL of your API server:

```
SERVER_URL=https://api.example.com
```

**Option B — Parts (protocol + host + port):**

Set the three individual variables and the client will compose the URL as `{SERVER_PROTOCOL}://{SERVER_HOST}:{SERVER_PORT}`:

```
SERVER_PROTOCOL=https
SERVER_HOST=api.example.com
SERVER_PORT=443
```

If `SERVER_URL` is set and non-empty, it always takes priority over the individual parts.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `SERVER_URL` | *(empty)* | Full base URL of the API. Takes priority over the fields below when set. |
| `SERVER_PROTOCOL` | `http` | Protocol used to reach the API (`http` or `https`). |
| `SERVER_HOST` | `localhost` | Hostname or IP address of the API server. |
| `SERVER_PORT` | `5000` | Port the API server listens on. |

### Examples

**Local API on port 5000 (default):**

```bash
docker run -d -p 80:80 ren4el/neco-board-client:latest
```

**Local API on a custom port:**

```bash
docker run -d -p 80:80 \
  -e SERVER_PORT=8080 \
  ren4el/neco-board-client:latest
```

**Remote API with HTTPS using a full URL:**

```bash
docker run -d -p 80:80 \
  -e SERVER_URL=https://api.example.com \
  ren4el/neco-board-client:latest
```

**Remote API with HTTPS using individual parts:**

```bash
docker run -d -p 80:80 \
  -e SERVER_PROTOCOL=https \
  -e SERVER_HOST=api.example.com \
  -e SERVER_PORT=443 \
  ren4el/neco-board-client:latest
```

**Using Docker Compose (client + API together):**

```yaml
services:
  neco-board-client:
    image: ren4el/neco-board-client:latest
    ports:
      - "80:80"
    environment:
      SERVER_URL: "http://neco-board-api:5000"
    depends_on:
      - neco-board-api
    restart: unless-stopped

  neco-board-api:
    image: ren4el/neco-board-api:latest
    ports:
      - "5000:5000"
    restart: unless-stopped
```

After starting, open your browser at `http://localhost`.

---

## Running Locally (Development)

### Prerequisites

- Node.js 18+
- npm

### Steps

1. Clone the repository:

```bash
git clone https://github.com/NecoCore/neco-board-client.git
cd neco-board-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `public/config.js` file to point the dev build at your API:

```js
window.__ENV__ = {
  SERVER_PROTOCOL: "http",
  SERVER_HOST: "localhost",
  SERVER_PORT: "5000",
  SERVER_URL: ""
};
```

> In development, `public/config.js` is served as a static file by Vite and loaded by `index.html` before the app bundle.

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Building for Production

```bash
npm run build
```

Output is placed in the `dist/` directory. Serve it with any static file server or use the provided Dockerfile.

---

## CI/CD Pipeline

The repository uses GitHub Actions to build and push the Docker image to Docker Hub automatically.

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** in your repository and add:

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username (`ren4el`) |
| `DOCKERHUB_TOKEN` | A Docker Hub Access Token (create one at hub.docker.com → Account Settings → Personal Access Tokens) |

### Trigger Conditions

| Event | Action |
|---|---|
| Push to `main` or `master` | Build + push with `latest` and branch tags |
| Push a tag `v*.*.*` | Build + push with semver tags |
| Push a tag `beta-*` or `alpha-*` | Build + push with the pre-release tag as-is |
| Manual (`workflow_dispatch`) | Build + push on demand |

### Releasing a Beta Version

To publish a `beta-0.1` image, create and push a Git tag:

```bash
git tag beta-0.1
git push origin beta-0.1
```

The pipeline will automatically build and push the image as:

```
ren4el/neco-board-client:beta-0.1
```

Pull it with:

```bash
docker pull ren4el/neco-board-client:beta-0.1
```

### Releasing a Stable Version

```bash
git tag v1.0.0
git push origin v1.0.0
```

This produces three tags: `v1.0.0`, `v1.0`, and `latest`.

### Pipeline Steps

1. Checkout the repository
2. Generate Docker image tags and labels from Git metadata
3. Set up Docker Buildx with GitHub Actions cache
4. Authenticate with Docker Hub
5. Build the multi-stage Docker image and push all generated tags
