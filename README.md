# slotz

SPA-Projekt für das Modul **Webprogrammierung**. Das Repository besteht aus zwei Services:

- **Frontend** (`slotz/`): React + TypeScript + Vite
- **Backend** (`backend1/`): Spring Boot

Diese README erklärt **zuerst den Start mit Docker Compose** und danach als Fallback den **separaten Start beider Services**.

## Projektstruktur

```text
.
├── backend1/           # Spring-Boot-Backend
├── slotz/              # React-Frontend
└── docker-compose.yml  # Startet Frontend und Backend gemeinsam
```

## Voraussetzungen

### Für den empfohlenen Start mit Docker Compose
- Docker
- Docker Compose

### Für den manuellen Fallback
- Java 25
- Maven
- Node.js 20+
- npm

## Empfohlener Start mit Docker Compose

Im Root-Verzeichnis gibt es eine `docker-compose.yml`, die **Backend** und **Frontend** gemeinsam baut und startet.

```bash
docker compose up --build
```

Danach sind die Services erreichbar unter:

- Frontend: http://localhost
- Backend: http://localhost:8080

Zum Stoppen:

```bash
docker compose down
```

### Was genau startet Docker Compose?

- Das Backend wird aus `./backend1` gebaut.
- Das Frontend wird aus `./slotz` gebaut.
- Für das Frontend wird beim Build die API-URL auf `http://localhost:8080/api` gesetzt.

Für dieses Projekt ist also der vorgesehene Hauptweg:

```bash
docker compose up --build
```

im **Root-Verzeichnis** des Repositories.

## Fallback: Frontend und Backend separat starten

Falls Docker nicht genutzt werden kann, können beide Services auch manuell gestartet werden.

## 1) Backend separat starten

Ins Backend-Verzeichnis wechseln:

```bash
cd backend1
```

Dann das Backend starten:

```bash
./mvnw spring-boot:run
```

Unter Windows:

```bat
mvnw.cmd spring-boot:run
```

Das Backend läuft dann in der Regel unter:

- http://localhost:8080

## 2) Frontend separat starten

In einem zweiten Terminal ins Frontend wechseln:

```bash
cd slotz
npm install
npm run dev
```

Das Frontend läuft dann standardmäßig unter:

- http://localhost:5173

## API-URL beim manuellen Frontend-Start

Beim Docker-Start wird für das Frontend automatisch diese API-URL verwendet:

```text
http://localhost:8080/api
```

## Nützliche Befehle

### Alles zusammen starten
```bash
docker compose up --build
```

### Alles im Hintergrund starten
```bash
docker compose up -d --build
```

### Alles stoppen
```bash
docker compose down
```

### Nur Backend manuell starten
```bash
cd backend1
./mvnw spring-boot:run
```

### Nur Frontend manuell starten
```bash
cd slotz
npm install
npm run dev
```
