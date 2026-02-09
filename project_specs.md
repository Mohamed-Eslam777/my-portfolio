Pyramid Agent
Production-grade AI agent scaffold for Pyramid Ascension: FastAPI backend, Streamlit dashboard, OpenAI Assistants v2 (file_search), MongoDB metadata, and a structured orchestrator (/agent/run).

Project Overview
Agent acts as Project Director/Content Producer with knowledge of lore (bibles).
Supports structured runs (plan/execute), KB management (seed + uploads), and CRUD for episodes/factions/characters/tasks.
Complete Streamlit UI with 15 tabs: Console, Agent Run, Runs, Knowledge Base, Episodes, Factions, Characters, Tasks, Seasons, Events, Nodes, Versions, Memory, Projects, and Canon Index.
Tech Stack
Backend: FastAPI, Pydantic v2, Motor (MongoDB), OpenAI Assistants v2.
Frontend: Streamlit (multi-tab dashboard).
Container: Docker + docker-compose.
Quickstart (Docker)
docker compose up --build --remove-orphans
Backend on 8000, Streamlit on 8501.

Note: Use --remove-orphans flag to clean up any orphaned containers from previous deployments (e.g., containers from renamed services).

Local Run
pip install -r requirements.txt
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
streamlit run ui/app.py --server.port 8501
Environment Variables
Key	Description
OpenAI Configuration	
OPENAI_API_KEY	OpenAI API key (required)
OPENAI_ASSISTANT_ID	Optional assistant reuse
OPENAI_VECTOR_STORE_ID	Vector store for file_search
OPENAI_IMAGE_MODEL	Image model (default: dall-e-3)
Database Configuration	
MONGODB_URI	Mongo connection string (default: mongodb://mongo:27017/pyramid)
REDIS_URL	Redis connection string (default: redis://redis:6379/0)
Server Configuration	
BACKEND_HOST	FastAPI host (default: 0.0.0.0)
BACKEND_PORT	FastAPI port (default: 8000)
FRONTEND_PORT	Streamlit port (default: 8501)
LOG_LEVEL	Logging level: info/debug/etc (default: info)
Security	
API_KEY	API key for protected endpoints
API_KEY_ENABLED	Enable/disable API key check (default: true)
API_KEY_HASH_SALT	Optional salt for API key hashing
Rate Limiting	
RATE_LIMIT_ENABLED	Enable rate limiting (default: true)
RATE_LIMIT_PER_MINUTE	Requests per minute (default: 100)
ElevenLabs TTS	
ELEVENLABS_API_KEY	ElevenLabs API key for TTS tool
ELEVENLABS_VOICE_ID	Default voice id (optional)
Video Generation (Runway)	
RUNWAY_API_KEY	API key for Runway video generation
Image Generation (Stable Diffusion)	
SD_API_URL	Stable Diffusion web API base (expects /generate)
SD_API_KEY	Stable Diffusion API key (if required)
Google Drive	
DRIVE_FOLDER_ID	Google Drive folder to upload artifacts
DRIVE_SERVICE_ACCOUNT_JSON	Service account JSON (inline)
DRIVE_SERVICE_ACCOUNT_FILE	Path to service account JSON (alternative)
GOOGLE_DRIVE_FOLDER_ID	Alias for DRIVE_FOLDER_ID
GOOGLE_SERVICE_ACCOUNT_FILE	Alias for DRIVE_SERVICE_ACCOUNT_FILE
Midjourney	
MJ_WEBHOOK_URL	Midjourney webhook endpoint
MJ_WEBHOOK_TOKEN	Midjourney webhook auth (optional)
Notion Integration	
NOTION_API_KEY	Notion API key (for export)
NOTION_PAGE_ID	Notion page/block id to append blocks
N8N Integration	
N8N_WEBHOOK_URL	N8N webhook URL for triggering workflows
Worker Configuration	
MAX_RUN_RETRIES	Max automatic retries for queued runs (default: 0)
RETRY_SCHEDULER_ENABLED	Enable periodic retry of failed runs (default: false)
RETRY_SCHEDULER_INTERVAL_SECONDS	Interval for retry scheduler (default: 600)
Budget Limits (per run)	
MAX_TOTAL_TOKENS_PER_RUN	Max tokens per run (default: 120000)
MAX_TOOL_CALLS_PER_RUN	Max tool calls per run (default: 20)
MAX_IMAGES_PER_RUN	Max images per run (default: 6)
MAX_TTS_SECONDS_PER_RUN	Max TTS seconds per run (default: 180)
MAX_EXECUTION_TIME_SECONDS_PER_RUN	Max execution time in seconds (default: 480)
MAX_VIDEOS_PER_RUN	Max videos per run (default: 3)
MAX_VIDEO_SECONDS_PER_RUN	Max video seconds per run (default: 180)
Quota Limits (per project per day)	
QUOTA_REQUESTS_PER_DAY	Max requests per day (default: 500)
QUOTA_RUNS_PER_DAY	Max runs per day (default: 100)
QUOTA_IMAGES_PER_DAY	Max images per day (default: 200)
QUOTA_VIDEOS_PER_DAY	Max videos per day (default: 20)
QUOTA_TOKENS_PER_DAY	Optional token cap per day
API Summary
Health: GET /health
Metrics: GET /metrics, GET /metrics/prometheus
WebSocket: WS /ws/runs/{run_id}, WS /ws/chat
Agent chat: POST /agent/chat, POST /agent/chat/stream
Agent run (structured): POST /agent/run
Ingest (seed bibles): POST /agent/ingest
Knowledge Base: /kb/upload, /kb/list, /kb/ingest/{id}, /kb/{id}, /kb/sync-seed
CRUD: /episodes, /factions, /characters, /tasks
Story structure: /seasons, /events, /nodes, /events/season-map/{season_id}
Runs: /runs (list), /runs/{run_id} (detail), exports /runs/{run_id}/export/json, /runs/{run_id}/export/docx
Run controls: POST /runs/{run_id}/cancel, POST /runs/{run_id}/restart, bulk restart failed POST /runs/restart-failed
Scheduler hook: POST /runs/schedule/retry-failed (optional filters: limit, project_id) for cron/n8n
Versions: /versions (create/list/get) and /versions/{version_id}/restore
Canon: /canon-index (list/get), auto-ingest rules from bible docs POST /canon-index/ingest
Memory: /memory supports filters project_id, tag, kind, run_id and text query q
Projects: /projects list/create/delete
API Keys: /api-keys/generate, /api-keys/list (with scoping support)
Quotas: enforced per project for runs/images/videos/requests (defaults; override in projects.quota)
Storyboard/Image: generate_storyboard (batch scene prompts -> images) and generate_image_sd (single prompt) via tools.
Drive upload: artifacts best-effort upload; drive_link surfaced in Runs tab.
KB Uploads: accepts pdf/docx/txt; docx/pdf auto-extracted before ingest.
Testing
Unit: pytest tests/unit
Integration (in-process ASGI): pytest tests/integration
Minimal smoke (already added): /health, route presence, canon ingest/rules engine.
E2E stub (skips without keys): tests/integration/test_agent_run_stub.py
Runway Video (optional)
Set RUNWAY_API_KEY in environment.
Tool: generate_video (prompt/style/duration/aspect_ratio/run_id) returns artifact with provider=url; artifacts recorded under assets collection and surfaced in runs tab.
Security (API Key)
فعّل الحماية عبر API_KEY_ENABLED=true مع ضبط API_KEY.
عند التفعيل أرسل الهيدر X-API-Key: <your_key> مع الطلبات المحمية (مثل /agent/run و /kb/*).
مثال cURL:
curl -X POST http://localhost:8000/agent/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_key" \
  -d '{"command":"..."}'
ملاحظة: لا تفعّل API_KEY_ENABLED إلا بعد ضبط قيمة API_KEY.
مثال cURL لـ /agent/run
بدون حماية:
curl -X POST http://localhost:8000/agent/run \
  -H "Content-Type: application/json" \
  -d '{
    "command": "Draft episode outline for S1E3 with focus on Robots vs Old Wardens",
    "language": "en",
    "context": {"season_id": "S1", "episode_id": "E03"},
    "mode": "execute",
    "constraints": {"max_steps": 3, "tools_allowed": ["generate_image"]}
  }'
مع حماية:
curl -X POST http://localhost:8000/agent/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_key" \
  -d '{
    "command": "Draft episode outline for S1E3 with focus on Robots vs Old Wardens",
    "language": "en",
    "context": {"season_id": "S1", "episode_id": "E03"},
    "mode": "execute",
    "constraints": {"max_steps": 3, "tools_allowed": ["generate_image"]}
  }'
n8n Integration (ready)
Direct: POST /agent/run (structured JSON). Add X-API-Key if enabled.
Integration wrappers (all API key protected): /integrations/n8n/run, /integrations/n8n/kb/sync-seed, /integrations/n8n/kb/upload-and-ingest, /integrations/n8n/health.
KB prep: /kb/sync-seed, /kb/upload, /kb/ingest/{id}.
Example workflow: see docs/n8n_workflow_example.json (HTTP Request node -> /integrations/n8n/run with command/context).
Tools (Assistants function calls)
The agent has access to the following tools:

generate_image: DALL·E (OpenAI Images) - Generate images from text prompts. Saves artifacts under data/artifacts/<run_id>/.
generate_tts: ElevenLabs TTS - Generate character voice overs. Saves audio artifacts under data/artifacts/<run_id>/.
generate_video: RunwayML - Generate short video clips based on prompts, style, duration, and aspect ratio.
generate_image_sd: Stable Diffusion - Generate images using Stable Diffusion API.
generate_image_mj: Midjourney - Generate images via Midjourney webhook.
generate_storyboard: Storyboard Generator - Generate storyboard frames from a list of scene prompts.
save_text_to_file: File Operations - Save text content to files (docx/txt).
upload_to_drive: Google Drive - Upload files to Google Drive using service account.
trigger_n8n_webhook: N8N Integration - Trigger N8N webhooks with event_type and payload.
trigger_production_run: Production Trigger - Start a full production run for a season/episode.
UI Features (Streamlit Dashboard)
The Streamlit UI (ui/app.py) provides a complete management interface with the following tabs:

Console: Chat with the Project Director agent
Agent Run: Execute structured agent runs with full control
Runs: View, filter, cancel, restart, and export agent runs (JSON/DOCX)
Knowledge Base: Sync seed folder, upload files, ingest, and manage KB files
Episodes: CRUD operations for episodes
Factions: CRUD operations for factions
Characters: CRUD operations for characters
Tasks: CRUD operations for tasks
Seasons: CRUD operations for seasons
Events: CRUD operations for events
Nodes: CRUD operations for story nodes
Versions: Create, list, and restore assistant versions
Memory: View and search long-term memory entries (semantic search)
Projects: Manage projects and view quotas
Canon Index: View and ingest canon rules
Folder Structure (brief)
src/api/ (routes: agent, kb, episodes, factions, characters, tasks, seasons, events, nodes, runs, versions, memory, projects, canon_index, integrations)
src/services/ (ai_service, orchestrator, kb_service, run_service, memory_service, version_service, projects_service, canon_index_service)
src/models/ (chat, run, db, factions, characters, tasks, seasons, events, nodes)
src/db/ (mongo)
ui/ (Streamlit app with complete dashboard)
data/bibles/ (seed lore), data/uploads/ (user uploads)
docs/ (user guides AR/EN, architecture, maintenance, API usage)
Security (API Key)
يمكنك تفعيل حماية API عبر ضبط API_KEY_ENABLED=true في .env مع توفير API_KEY.
عند التفعيل، أرسل الهيدر X-API-Key: <your_key> مع كل طلب محمي.
مثال cURL (على سبيل المثال لـ /agent/run لاحقًا):
curl -H "X-API-Key: your_key" http://localhost:8000/agent/run
ملاحظة: لا تفعّل API_KEY_ENABLED إلا بعد ضبط قيمة API_KEY.
مثال cURL لـ /agent/run
بدون حماية (API_KEY_ENABLED=false):
curl -X POST http://localhost:8000/agent/run \
  -H "Content-Type: application/json" \
  -d '{
    "command": "Draft episode outline for S1E3 with focus on Robots vs Old Wardens",
    "language": "en",
    "context": {"season_id": "S1", "episode_id": "E03"},
    "mode": "execute",
    "constraints": {"max_steps": 3, "tools_allowed": ["generate_image"]}
  }'
مع حماية (API_KEY_ENABLED=true):
curl -X POST http://localhost:8000/agent/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_key" \
  -d '{
    "command": "Draft episode outline for S1E3 with focus on Robots vs Old Wardens",
    "language": "en",
    "context": {"season_id": "S1", "episode_id": "E03"},
    "mode": "execute",
    "constraints": {"max_steps": 3, "tools_allowed": ["generate_image"]}
  }'
الاستجابة ستكون JSON structured مثل:
{
  "run_id": "...",
  "status": "completed",
  "analysis": {...},
  "plan": [...],
  "execution": [...],
  "report": {...},
  "trace": {...}
}
If you see openai_failed with insufficient_quota/rate_limit_exceeded, check OpenAI billing. 
Pyramid Agent - Full Repository Audit Report
Date: 2025-01-26
Audit Type: READ-ONLY Comprehensive Repository Analysis
Scope: Full codebase inspection without modifications

1. Executive Summary
Pyramid Agent is a production-grade AI agent system for Sci-Fi series production management. The system is fully functional and production-ready, with comprehensive features implemented across backend, frontend, and integration layers.

What Exists and Works Today:
✅ Backend API: FastAPI-based REST API with 25+ route modules, WebSocket support, authentication, rate limiting, and monitoring
✅ AI Orchestration: Structured agent workflow (Analyze → Plan → Execute → Report) with OpenAI Assistants v2 integration
✅ Knowledge Base: RAG system using OpenAI Vector Stores with 31 story bible files ingested
✅ Content Generation: Tools for scripts, images (DALL-E, Stable Diffusion, Midjourney), video (Runway), TTS (ElevenLabs), and storyboards
✅ Workflow Management: Full CRUD for episodes, factions, characters, tasks, seasons, events, and nodes
✅ Memory System: Long-term semantic memory with MongoDB storage and sentence-transformers embeddings
✅ Multi-Agent System: 5 agent types (Writer, Designer, Producer, Reviewer, Director) with specialized configurations
✅ UI Dashboard: Streamlit-based interface with 15+ tabs for complete project management
✅ N8N Integration: Dedicated endpoints and webhook tools for workflow automation
✅ Version Control: Assistant versioning system with restore capabilities
✅ Canon Validation: Rules engine for story consistency checking
✅ Monitoring: Health checks, metrics, Prometheus integration, cost tracking
✅ Documentation: Comprehensive guides in English and Arabic
Status: The system is production-ready with all major features implemented. All router imports are correctly present (verified in src/api/main.py lines 20-44).

2. Project Tree
pyramid-agent/
├── src/                          # Main source code
│   ├── api/                      # FastAPI application
│   │   ├── main.py              # ✅ Entry point (FastAPI app)
│   │   └── routes/              # 25 route modules
│   │       ├── agent.py         # Agent chat/run endpoints
│   │       ├── agent_types.py   # Agent type management
│   │       ├── agent_collaboration.py  # Multi-agent workflows
│   │       ├── api_keys.py      # API key management
│   │       ├── auth.py          # Authentication
│   │       ├── canon_index.py   # Canon rules
│   │       ├── characters.py    # Character CRUD
│   │       ├── costs.py         # Cost tracking
│   │       ├── episodes.py      # Episode CRUD
│   │       ├── events.py        # Event CRUD
│   │       ├── factions.py      # Faction CRUD
│   │       ├── integrations.py  # N8N integration
│   │       ├── kb.py            # Knowledge Base
│   │       ├── memory.py        # Memory endpoints
│   │       ├── metrics.py       # Metrics endpoint
│   │       ├── nodes.py         # Node CRUD
│   │       ├── projects.py      # Project management
│   │       ├── runs.py          # Run management
│   │       ├── seasons.py       # Season CRUD
│   │       ├── tasks.py         # Task CRUD
│   │       ├── templates.py     # Template management
│   │       ├── version_info.py  # Version info
│   │       ├── versions.py      # Version management
│   │       ├── webhooks.py      # Webhook management
│   │       └── websocket.py     # WebSocket routes
│   ├── core/                    # Core configuration
│   │   ├── agent_types.py       # Agent type system (5 types)
│   │   ├── api_key_manager.py   # API key management
│   │   ├── auth.py              # Auth utilities
│   │   ├── config.py            # Settings (Pydantic)
│   │   ├── monitoring.py        # Monitoring setup
│   │   ├── rate_limit.py        # Rate limiting
│   │   └── security.py          # Security utilities
│   ├── db/                      # Database layer
│   │   ├── indexes.py           # MongoDB indexes (13 collections)
│   │   └── mongo.py             # MongoDB client (Motor)
│   ├── models/                  # Pydantic models (17 files, 48 models)
│   │   ├── characters.py
│   │   ├── chat.py
│   │   ├── db.py
│   │   ├── events.py
│   │   ├── factions.py
│   │   ├── integrations.py
│   │   ├── lore.py
│   │   ├── nodes.py
│   │   ├── run.py               # Run request/response models
│   │   ├── seasons.py
│   │   ├── tasks.py
│   │   ├── treatment.py
│   │   ├── video.py
│   │   ├── webhook.py
│   │   └── workflow.py
│   ├── services/                # Business logic (47 Python files)
│   │   ├── ai_service.py        # OpenAI Assistants v2 integration
│   │   ├── orchestrator.py      # Workflow orchestration (1189 lines)
│   │   ├── orchestrator_service.py  # Orchestrator singleton
│   │   ├── kb_service.py        # Knowledge Base service (RAG)
│   │   ├── memory_service.py    # Long-term memory (semantic)
│   │   ├── shared_memory_service.py  # Inter-agent memory
│   │   ├── run_service.py       # Run management
│   │   ├── workflow_service.py  # Workflow state machine
│   │   ├── agent_collaboration.py  # Multi-agent workflows
│   │   ├── canon_validator.py   # Canon validation
│   │   ├── canon_index_service.py  # Canon rules engine
│   │   ├── canon_rules_engine.py   # Rules enforcement
│   │   ├── template_service.py  # Template management
│   │   ├── version_service.py   # Version management
│   │   ├── projects_service.py  # Project management
│   │   ├── video_service.py     # Video generation
│   │   ├── treatment_service.py # Treatment generation
│   │   ├── drive_service.py     # Google Drive integration
│   │   ├── notion_service.py    # Notion export
│   │   ├── n8n_webhook_service.py  # N8N integration
│   │   ├── webhook_service.py   # Webhook management
│   │   ├── artifacts_service.py # Artifact tracking
│   │   ├── budget.py            # Budget tracking
│   │   ├── cost_tracker.py      # Cost tracking
│   │   ├── quota_service.py     # Quota management
│   │   ├── rate_limit_service.py  # Rate limiting
│   │   ├── cache_service.py     # Redis caching
│   │   ├── metrics_service.py   # Metrics collection
│   │   ├── prometheus_service.py  # Prometheus metrics
│   │   ├── health_service.py    # Health checks
│   │   ├── notification_service.py  # Notifications
│   │   ├── narrative_review.py  # Narrative review
│   │   ├── performance_optimizer.py  # Performance optimization
│   │   ├── extraction_service.py  # Document extraction
│   │   ├── doc_extraction.py    # DOCX/PDF extraction
│   │   ├── sd_service.py        # Stable Diffusion
│   │   ├── midjourney_service.py  # Midjourney
│   │   ├── lore_service.py      # Lore management
│   │   ├── task_service.py      # Task management
│   │   ├── agent_prompt_service.py  # Agent prompts
│   │   └── vector_store/        # Vector store abstraction
│   │       ├── interface.py     # VectorStoreInterface
│   │       ├── factory.py       # Factory pattern
│   │       └── openai_adapter.py  # OpenAI Vector Stores
│   ├── tools/                   # AI agent tools (14 files)
│   │   ├── registry.py          # Tool registry
│   │   ├── image_generation.py  # DALL-E tool
│   │   ├── image_generation_sd.py  # Stable Diffusion
│   │   ├── image_generation_mj.py  # Midjourney
│   │   ├── storyboard_generator.py  # Storyboard batch
│   │   ├── tts_elevenlabs.py    # ElevenLabs TTS
│   │   ├── video_generation.py  # Runway video
│   │   ├── drive_tool.py        # Google Drive
│   │   ├── file_ops.py          # File I/O
│   │   ├── n8n_tool.py          # N8N webhooks
│   │   ├── notion_tool.py       # Notion export
│   │   ├── treatment_generator.py  # Treatment generation
│   │   └── trigger_production.py   # Production trigger
│   ├── utils/                   # Utilities
│   │   ├── artifact_manager.py  # Artifact management
│   │   └── docx_generator.py    # DOCX generation
│   ├── prompts/                 # Prompt templates
│   └── worker.py                # ✅ Background job worker (RQ)
├── ui/                          # Streamlit frontend
│   ├── app.py                   # ✅ Frontend entry point (1713 lines, 15+ tabs)
│   └── components/              # UI components
│       ├── gallery.py           # Artifact gallery
│       ├── lore_book.py         # Story bible viewer
│       ├── system_status.py     # Health dashboard
│       └── webhook_manager.py   # Webhook management UI
├── tests/                       # Test suite
│   ├── conftest.py              # Pytest configuration
│   ├── unit/                    # Unit tests (4 files)
│   │   ├── test_canon_rules_engine.py
│   │   ├── test_canon_ingest.py
│   │   └── test_worker.py
│   ├── integration/             # Integration tests (6 files)
│   │   ├── test_agent_run_stub.py
│   │   ├── test_health.py
│   │   ├── test_n8n_webhook.py
│   │   ├── test_notion.py
│   │   └── test_routes.py
│   ├── fixtures/                # Test fixtures
│   └── test_*.py                # Additional tests (10 files)
├── data/                        # Data directory
│   ├── bibles/                  # Story bible files (31 .docx files)
│   │   ├── armor_narrative.docx
│   │   ├── armor_visual.docx
│   │   ├── characters_narrative_main.docx
│   │   ├── characters_visual.docx
│   │   ├── faction_*.docx (5 files)
│   │   ├── season_0*.docx (5 files)
│   │   ├── tech_narrative.docx
│   │   ├── tech_visual.docx
│   │   ├── vehicles_narrative.docx
│   │   ├── vehicles_visual.docx
│   │   ├── weapons_narrative.docx
│   │   ├── weapons_visual.docx
│   │   ├── world_cities_narrative.docx
│   │   ├── world_cities_visual.docx
│   │   ├── file_production_workflow.docx
│   │   ├── director_style_bible.docx
│   │   ├── audio_music_bible.docx
│   │   ├── audience_engagement_hooks.docx
│   │   ├── energy_system_bible.docx
│   │   ├── technical_production_specs.docx
│   │   ├── timeline_mapping.docx
│   │   ├── vfx_specs.docx
│   │   ├── master_prompts.docx
│   │   └── structured/
│   ├── config/
│   │   └── external_tools.json  # External tool config
│   ├── uploads/                 # User uploads
│   └── artifacts/               # Generated artifacts
│       ├── audio/
│       ├── images/
│       ├── treatments/
│       └── videos/
├── docs/                        # Documentation (9 files)
│   ├── API_USAGE_GUIDE.md
│   ├── ARCHITECTURE.md
│   ├── USER_GUIDE_EN.md
│   ├── USER_GUIDE_AR.md
│   ├── N8N_BIDIRECTIONAL_GUIDE.md
│   ├── MAINTENANCE_PLAN.md
│   ├── IMPROVEMENTS.md
│   ├── n8n_workflow_example.json
│   └── sprint*.md (2 files)
├── scripts/                     # Utility scripts
│   ├── demo_lore_integration.py
│   ├── demo_webhook_integration.py
│   ├── generate_handover_docs.py
│   ├── seed_knowledge_base.py
│   └── test_rag_workflow_notion.py
├── prometheus/                  # Prometheus config
│   ├── prometheus.yml
│   └── alerts.yml
├── Dockerfile                   # ✅ Container definition
├── docker-compose.yml           # ✅ Multi-service setup
├── docker-compose.monitoring.yml  # Monitoring stack
├── requirements.txt             # ✅ Python dependencies
├── pyproject.toml               # ✅ Project config (ruff, mypy, pytest)
├── pytest.ini                   # Pytest configuration
├── env.example.txt              # ✅ Environment variables template
├── README.md                    # ✅ Main documentation
├── PROJECT_COMPLETE.md          # Project completion summary
├── PROJECT_STATUS_REPORT.md     # Status report (partially outdated)
├── CAPABILITIES.md              # Generated capabilities doc
├── DATA_STRUCTURES.md           # Generated models doc
├── HANDOVER_GUIDE.md            # Handover documentation
├── SPRINT_SUMMARY.md            # Sprint summary
└── service_account.json         # Google Drive service account (if configured)

Excluded Directories (not shown in tree):

venv/ - Python virtual environment
__pycache__/ - Python bytecode cache
.git/ - Git repository (if present)
*.pyc - Compiled Python files
node_modules/ - N/A (not a Node.js project)
.next/, dist/, build/ - N/A (not applicable)
Note: The venv/ directory exists but is excluded from detailed listing.

3. Entry Points & Runtime Topology
Backend Entry Point
File: src/api/main.py
How to invoke:

# Local development
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

# Production (via Docker)
docker compose up backend
# Command: uvicorn src.api.main:app --host 0.0.0.0 --port 8000
Evidence:

src/api/main.py:55-60 - FastAPI app initialization
docker-compose.yml:16-52 - Backend service definition
Dockerfile:28 - Default CMD
README.md:23 - Quickstart instructions
Frontend Entry Point
File: ui/app.py
How to invoke:

# Local development
streamlit run ui/app.py --server.port 8501

# Production (via Docker)
docker compose up ui
# Command: streamlit run ui/app.py --server.port=8501 --server.address=0.0.0.0
Evidence:

ui/app.py:1-28 - Streamlit app setup
docker-compose.yml:85-98 - UI service definition
README.md:24 - Quickstart instructions
Worker/Queue Entry Point
File: src/worker.py
How to invoke:

# Local development
rq worker runs --url redis://localhost:6379/0

# Production (via Docker)
docker compose up worker
# Command: rq worker runs --url redis://redis:6379/0
Evidence:

src/worker.py:108-151 - Worker startup function
docker-compose.yml:54-83 - Worker service definition
src/worker.py:64-105 - process_run() function for async job execution
API Routes/Controllers
Evidence: src/api/main.py:20-86 - All 25 routers included:

Agent Routes (/agent/*)

POST /agent/chat - Chat with agent
POST /agent/chat/stream - Streaming chat
POST /agent/run - Structured agent run
POST /agent/ingest - KB ingestion
File: src/api/routes/agent.py
Knowledge Base Routes (/kb/*)

POST /kb/upload - Upload files
GET /kb/list - List KB files
POST /kb/ingest/{id} - Ingest file
POST /kb/sync-seed - Sync seed folder
File: src/api/routes/kb.py
Runs Routes (/runs/*)

GET /runs - List runs
GET /runs/{run_id} - Get run details
POST /runs/{run_id}/cancel - Cancel run
POST /runs/{run_id}/restart - Restart run
GET /runs/{run_id}/export/json - Export JSON
GET /runs/{run_id}/export/docx - Export DOCX
File: src/api/routes/runs.py
CRUD Routes

Episodes: src/api/routes/episodes.py
Factions: src/api/routes/factions.py
Characters: src/api/routes/characters.py
Tasks: src/api/routes/tasks.py
Seasons: src/api/routes/seasons.py
Events: src/api/routes/events.py
Nodes: src/api/routes/nodes.py
Memory Routes (/memory/*)

GET /memory - List/search memory
POST /memory - Create memory entry
File: src/api/routes/memory.py
Integrations Routes (/integrations/n8n/*)

POST /integrations/n8n/run - N8N wrapper for agent run
POST /integrations/n8n/kb/sync-seed - KB sync
POST /integrations/n8n/kb/upload-and-ingest - Upload and ingest
GET /integrations/n8n/health - Health check
File: src/api/routes/integrations.py
Additional Routes

Versions: src/api/routes/versions.py
Projects: src/api/routes/projects.py
Canon Index: src/api/routes/canon_index.py
API Keys: src/api/routes/api_keys.py
Webhooks: src/api/routes/webhooks.py
WebSocket: src/api/routes/websocket.py
Metrics: src/api/routes/metrics.py
Costs: src/api/routes/costs.py
Agent Types: src/api/routes/agent_types.py
Agent Collaboration: src/api/routes/agent_collaboration.py
Templates: src/api/routes/templates.py
Auth: src/api/routes/auth.py
CLI Commands
Evidence:

Ingest Bibles: ingest_bibles.py - Script to ingest story bibles
Seed Knowledge Base: scripts/seed_knowledge_base.py
Demo Scripts: scripts/demo_*.py - Various demo scripts
Generate Docs: scripts/generate_handover_docs.py - Auto-generate documentation
4. Configuration & Environment
Environment Variables
File: env.example.txt

Categories:

OpenAI Configuration

OPENAI_API_KEY - OpenAI API key (required)
OPENAI_ASSISTANT_ID - Optional assistant ID to reuse
OPENAI_VECTOR_STORE_ID - Vector store ID for file_search
OPENAI_IMAGE_MODEL - Image model (default: dall-e-3)
Database Configuration

MONGODB_URI - MongoDB connection string (default: mongodb://mongo:27017/pyramid)
REDIS_URL - Redis connection string (default: redis://redis:6379/0)
Server Configuration

BACKEND_HOST - FastAPI host (default: 0.0.0.0)
BACKEND_PORT - FastAPI port (default: 8000)
FRONTEND_PORT - Streamlit port (default: 8501)
LOG_LEVEL - Logging level (default: info)
Security

API_KEY - API key for protected endpoints
API_KEY_ENABLED - Enable/disable API key check (default: true)
API_KEY_HASH_SALT - Optional salt for API key hashing
Rate Limiting

RATE_LIMIT_ENABLED - Enable rate limiting (default: true)
RATE_LIMIT_PER_MINUTE - Requests per minute (default: 100)
Media Generation

ELEVENLABS_API_KEY - ElevenLabs TTS API key
ELEVENLABS_VOICE_ID - Default voice ID
RUNWAY_API_KEY - Runway video generation API key
SD_API_URL - Stable Diffusion API URL
SD_API_KEY - Stable Diffusion API key
MJ_WEBHOOK_URL - Midjourney webhook endpoint
MJ_WEBHOOK_TOKEN - Midjourney webhook auth token
Integrations

DRIVE_FOLDER_ID - Google Drive folder ID
DRIVE_SERVICE_ACCOUNT_FILE - Path to service account JSON
NOTION_API_KEY - Notion API key
NOTION_PAGE_ID - Notion page ID
N8N_WEBHOOK_URL - N8N webhook URL
Worker Configuration

MAX_RUN_RETRIES - Max retries for queued runs (default: 0)
RETRY_SCHEDULER_ENABLED - Enable retry scheduler (default: false)
RETRY_SCHEDULER_INTERVAL_SECONDS - Retry interval (default: 600)
Budget Limits (per run)

MAX_TOTAL_TOKENS_PER_RUN - Max tokens (default: 120000)
MAX_TOOL_CALLS_PER_RUN - Max tool calls (default: 20)
MAX_IMAGES_PER_RUN - Max images (default: 6)
MAX_TTS_SECONDS_PER_RUN - Max TTS seconds (default: 180)
MAX_EXECUTION_TIME_SECONDS_PER_RUN - Max execution time (default: 480)
MAX_VIDEOS_PER_RUN - Max videos (default: 3)
MAX_VIDEO_SECONDS_PER_RUN - Max video seconds (default: 180)
Quota Limits (per project per day)

QUOTA_REQUESTS_PER_DAY - Max requests (default: 500)
QUOTA_RUNS_PER_DAY - Max runs (default: 100)
QUOTA_IMAGES_PER_DAY - Max images (default: 200)
QUOTA_VIDEOS_PER_DAY - Max videos (default: 20)
QUOTA_TOKENS_PER_DAY - Optional token cap
Monitoring

SENTRY_DSN - Sentry DSN for error tracking
SENTRY_ENVIRONMENT - Sentry environment (default: production)
SENTRY_TRACES_SAMPLE_RATE - Sentry trace sample rate (default: 0.1)
SENTRY_PROFILES_SAMPLE_RATE - Sentry profile sample rate (default: 0.1)
Evidence: env.example.txt:1-81 - Complete environment variable template

Package Management
File: requirements.txt

Key Dependencies:

fastapi>=0.115.0 - Web framework
uvicorn[standard]>=0.30.0 - ASGI server
pydantic>=2.9.0 - Data validation
streamlit>=1.38.0 - UI framework
openai>=1.50.0 - OpenAI SDK
motor>=3.5.0 - MongoDB async driver
redis>=5.0.0 - Redis client
rq>=1.15.0 - Redis Queue
elevenlabs>=1.0.0 - ElevenLabs TTS
sentence-transformers>=2.2.2 - Semantic embeddings
torch==2.4.1+cpu - PyTorch (CPU-only)
prometheus-client>=0.19.0 - Prometheus metrics
sentry-sdk>=2.0.0 - Error tracking
python-docx>=1.1.0 - DOCX generation
pdfplumber>=0.11.0 - PDF extraction
notion-client>=2.2.0 - Notion API
google-api-python-client>=2.148.0 - Google Drive API
slowapi>=0.1.9 - Rate limiting
websockets>=12.0 - WebSocket support
httpx>=0.27.0 - Async HTTP client
ruff>=0.1.0 - Linting (dev)
mypy>=1.7.0 - Type checking (dev)
pytest>=8.3.0 - Testing (dev)
Evidence: requirements.txt:1-40 - Complete dependency list

File: pyproject.toml

Configuration:

Ruff linting configuration
MyPy type checking configuration
Pytest configuration
Evidence: pyproject.toml:1-36 - Project configuration

Docker Configuration
File: Dockerfile

Evidence:

Dockerfile:1-30 - Multi-stage Python 3.11-slim image
Base image: python:3.11-slim
Installs system dependencies and Python packages
Exposes ports 8000 (backend) and 8501 (frontend)
Default CMD: uvicorn src.api.main:app --host 0.0.0.0 --port 8000
File: docker-compose.yml

Services:

mongo - MongoDB 6 database
Port: 27017
redis - Redis 7 cache/queue
Port: 6379
backend - FastAPI application
Port: 8000
Depends on: mongo, redis
Health check: curl -f http://localhost:8000/health
worker - RQ worker for background jobs
Depends on: backend, mongo, redis
ui - Streamlit frontend
Port: 8501
Depends on: backend
Evidence: docker-compose.yml:1-98 - Complete service definitions

Configuration Files
Evidence:

OpenAI Config: src/core/config.py:36-38 - OpenAI settings
Vector DB Config: src/services/kb_service.py:73-88 - Vector store configuration
Auth Config: src/core/auth.py - Authentication middleware
CORS Config: Not explicitly configured (FastAPI defaults)
Storage Config: src/tools/drive_tool.py - Google Drive service account
Logging Config: src/api/main.py:108-146 - Structured JSON logging
Monitoring Config: prometheus/prometheus.yml - Prometheus scrape config
Monitoring Config: prometheus/alerts.yml - Alert rules
5. Tech Stack (Evidence-Based)
Component	Choice	Evidence (File Paths)
Language	Python 3.11+	Dockerfile:1, pyproject.toml:22, requirements.txt
Backend Framework	FastAPI	requirements.txt:3, src/api/main.py:11,55
ASGI Server	Uvicorn	requirements.txt:4, docker-compose.yml:20, Dockerfile:28
Data Validation	Pydantic v2	requirements.txt:5-6, src/models/ (17 files)
Frontend Framework	Streamlit	requirements.txt:7, ui/app.py:16, docker-compose.yml:90
Database	MongoDB	requirements.txt:14, src/db/mongo.py, docker-compose.yml:4-8
Database Driver	Motor (async)	requirements.txt:14, src/db/mongo.py
Vector DB / RAG	OpenAI Vector Stores	src/services/kb_service.py:73-88, src/services/vector_store/openai_adapter.py, src/services/ai_service.py (file_search tool)
Semantic Embeddings	sentence-transformers (all-MiniLM-L6-v2)	requirements.txt:21, src/services/memory_service.py
LLM Integration	OpenAI Assistants API v2	requirements.txt:9, src/services/ai_service.py:12,27-62
Function Calling	OpenAI Assistants v2 Tools	src/services/ai_service.py:100-200, src/tools/registry.py
LangChain/LlamaIndex	None (Direct OpenAI SDK)	No imports found - direct OpenAI SDK usage
Background Jobs	RQ (Redis Queue)	requirements.txt:17, src/worker.py:12,108-151
Cache	Redis	requirements.txt:16, src/services/cache_service.py, docker-compose.yml:10-14
Image Generation	DALL-E 3, Stable Diffusion, Midjourney	src/tools/image_generation.py, src/tools/image_generation_sd.py, src/tools/image_generation_mj.py
Video Generation	RunwayML	src/tools/video_generation.py, src/services/video_service.py
TTS	ElevenLabs	requirements.txt:15, src/tools/tts_elevenlabs.py
File Storage	Google Drive API	requirements.txt:24-25, src/tools/drive_tool.py, src/services/drive_service.py
External Integration	N8N Webhooks	src/tools/n8n_tool.py, src/api/routes/integrations.py, src/services/n8n_webhook_service.py
Document Export	Notion API	requirements.txt:27, src/tools/notion_tool.py, src/services/notion_service.py
Testing Framework	pytest	requirements.txt:12, pytest.ini, tests/ (18 test files, 56 test functions)
Linting	ruff	requirements.txt:33, pyproject.toml:1-16
Type Checking	mypy	requirements.txt:34, pyproject.toml:21-27
Monitoring	Prometheus, Sentry	requirements.txt:37-38, src/services/prometheus_service.py, src/core/monitoring.py, prometheus/
Containerization	Docker + docker-compose	Dockerfile, docker-compose.yml, docker-compose.monitoring.yml
Logging	Python logging (structured JSON)	src/api/main.py:108-146 - StructuredFormatter class
6. Architecture Overview
System Architecture
┌─────────────────────────────────────────────────────────┐
│              Streamlit UI (Frontend)                    │
│  15+ Tabs: Console, Agent Run, Runs, KB, Episodes,     │
│  Factions, Characters, Tasks, Seasons, Events, Nodes,  │
│  Versions, Memory, Projects, Canon Index               │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/WebSocket
┌──────────────────────▼──────────────────────────────────┐
│              FastAPI Backend (API Layer)                │
│  - 25 Route Modules                                     │
│  - Authentication (API Key)                             │
│  - Rate Limiting                                        │
│  - WebSocket Manager                                    │
│  - Request/Response Logging                             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Core Services Layer                        │
│  - AI Service (OpenAI Assistants v2)                    │
│  - Orchestrator (Analyze→Plan→Execute→Report)           │
│  - KB Service (RAG via Vector Stores)                   │
│  - Memory Service (Semantic embeddings)                 │
│  - Workflow Service (State machine)                     │
│  - Run Service (Run management)                         │
│  - Canon Validator (Rules engine)                       │
│  - Version Service (Versioning)                         │
│  - Budget Tracker (Cost tracking)                       │
│  - Performance Optimizer                                │
│  - Template Service                                     │
│  - Agent Collaboration (Multi-agent)                    │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Tools Layer (14 Tools)                     │
│  - Image Generation (DALL-E, SD, Midjourney)            │
│  - Video Generation (Runway)                            │
│  - TTS (ElevenLabs)                                     │
│  - Storyboard Generator                                 │
│  - File Operations                                      │
│  - Google Drive Upload                                  │
│  - N8N Webhooks                                         │
│  - Notion Export                                        │
│  - Treatment Generator                                  │
│  - Production Trigger                                   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Data Layer                                 │
│  - MongoDB (Metadata: runs, episodes, factions, etc.)   │
│  - Redis (Cache + Job Queue)                           │
│  - OpenAI Vector Stores (RAG)                           │
│  - File System (Artifacts: data/artifacts/)            │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              External Integrations                      │
│  - OpenAI (GPT-4, DALL-E, Vector Stores)               │
│  - Google Drive API                                     │
│  - RunwayML API                                         │
│  - ElevenLabs API                                       │
│  - Stable Diffusion API                                 │
│  - Midjourney Webhooks                                  │
│  - Notion API                                           │
│  - N8N Webhooks                                         │
└─────────────────────────────────────────────────────────┘
Data Flow
Agent Run Flow:

Client sends POST /agent/run with command
Backend creates run record in MongoDB (status: "queued")
Job enqueued to Redis Queue (RQ)
Worker picks up job, executes process_run()
Orchestrator executes: Analyze → Plan → Execute → Report
Progress updates sent via WebSocket
Run record updated in MongoDB (status: "completed"/"failed")
Client receives final response or polls /runs/{run_id}
Evidence:

src/api/routes/agent.py:98-141 - Run endpoint
src/worker.py:64-105 - Job processing
src/services/orchestrator.py:67-1179 - Orchestration logic
Knowledge Base Flow:

Files uploaded to data/bibles/ or data/uploads/
KB service syncs seed folder or processes upload
Files extracted (DOCX/PDF → text) if needed
Files uploaded to OpenAI Vector Store
Metadata stored in MongoDB (kb_files collection)
Vector store ID associated with assistant for RAG
Evidence:

src/services/kb_service.py:100-200 - File ingestion
src/services/doc_extraction.py - Document extraction
src/services/ai_service.py:200-400 - Vector store integration
Memory Flow:

Agent logs memory entry (via orchestrator)
Text embedded using sentence-transformers
Embedding stored in MongoDB (agent_memories collection)
Semantic search via cosine similarity
Results cached in Redis
Evidence:

src/services/memory_service.py - Memory service implementation
src/services/orchestrator.py:800-900 - Memory logging in orchestrator
Key Modules
Evidence:

AI Service: src/services/ai_service.py:27-1059 - OpenAI integration, tool registration, file_search
Orchestrator: src/services/orchestrator.py:67-1179 - Structured workflow pipeline
KB Service: src/services/kb_service.py:1-388 - RAG, vector store management
Memory Service: src/services/memory_service.py - Semantic memory with embeddings
Workflow Service: src/services/workflow_service.py:37-301 - State machine (Planning → Writing → Review → Production → Delivery → Completed)
Canon Validator: src/services/canon_validator.py - Story consistency rules
Run Service: src/services/run_service.py - Run CRUD and management
Version Service: src/services/version_service.py - Assistant versioning
Budget Tracker: src/services/budget.py - Cost and resource limits
7. Implemented Features vs Requirements
Requirements Checklist
Requirement	Status	Evidence
Requirements → Production Tasks Decomposition	✅ IMPLEMENTED	src/services/orchestrator.py:143-300 - Plan generation phase creates structured plan steps
Full Workflow Management	✅ IMPLEMENTED	src/services/workflow_service.py:37-301 - State machine with phases: Planning → Writing → Review → Production → Delivery → Completed
Writing Outputs	✅ IMPLEMENTED	src/services/orchestrator.py:400-600 - Execution phase generates treatments/outlines/scripts, src/tools/treatment_generator.py - Treatment generation tool
Design (Image Generation)	✅ IMPLEMENTED	src/tools/image_generation.py (DALL-E), src/tools/image_generation_sd.py (Stable Diffusion), src/tools/image_generation_mj.py (Midjourney)
Storyboard Generation	✅ IMPLEMENTED	src/tools/storyboard_generator.py - Batch storyboard generation from scene prompts
Assets Management	✅ IMPLEMENTED	src/services/artifacts_service.py - Artifact tracking, src/tools/drive_tool.py - Google Drive uploads, data/artifacts/ directory structure
Revisions	✅ IMPLEMENTED	src/services/version_service.py - Version management, src/api/routes/versions.py - Version CRUD and restore
Task State Tracking	✅ IMPLEMENTED	src/api/routes/tasks.py - Task CRUD, src/models/tasks.py - Task model with status field, src/services/orchestrator.py:469-489 - Auto-creation from plan steps
Notes + Reporting	✅ IMPLEMENTED	src/services/orchestrator.py:700-900 - Report generation phase, src/api/routes/runs.py:100-150 - Run export (JSON/DOCX)
Writing Outputs (Treatments/Outlines/Scripts)	✅ IMPLEMENTED	src/tools/treatment_generator.py - Treatment generation, src/services/orchestrator.py - Script/outline generation via execution phase
Lore/Characters/Worldbuilding Docs	✅ IMPLEMENTED	src/api/routes/characters.py, src/api/routes/factions.py, src/api/routes/seasons.py, src/api/routes/events.py, src/api/routes/nodes.py - Full CRUD for lore entities
Image Generation Integration	✅ IMPLEMENTED	DALL-E (src/tools/image_generation.py), Stable Diffusion (src/tools/image_generation_sd.py), Midjourney (src/tools/image_generation_mj.py)
TTS/Voice Generation	✅ IMPLEMENTED	src/tools/tts_elevenlabs.py - ElevenLabs TTS integration
Video Generation	✅ IMPLEMENTED	src/tools/video_generation.py - RunwayML video generation
Tool Execution Layer	✅ IMPLEMENTED	src/tools/registry.py - Tool registry, src/services/ai_service.py:100-200 - Tool execution via OpenAI function calling
File Send/Receive	✅ IMPLEMENTED	src/tools/file_ops.py - File I/O, src/tools/drive_tool.py - Google Drive uploads
Knowledge Base Ingestion	✅ IMPLEMENTED	src/services/kb_service.py:100-200 - File upload and ingestion, src/services/doc_extraction.py - DOCX/PDF extraction, data/bibles/ - 31 story bible files
Indexing + Retrieval (RAG)	✅ IMPLEMENTED	src/services/kb_service.py:73-88 - OpenAI Vector Stores integration, src/services/ai_service.py - file_search tool
Long-term Memory	✅ IMPLEMENTED	src/services/memory_service.py - Semantic memory with sentence-transformers embeddings stored in MongoDB
Bilingual Support	✅ IMPLEMENTED	src/models/run.py:14 - Language parameter (ar/en), src/services/orchestrator.py:184-198,310-328,552-572 - Bilingual prompts
Single Interface	✅ IMPLEMENTED	ui/app.py - Streamlit dashboard with 15+ tabs, src/api/main.py - REST API with 25+ route modules
N8N-ready Integration	✅ IMPLEMENTED	src/api/routes/integrations.py - Dedicated N8N endpoints, src/tools/n8n_tool.py - N8N webhook tool, docs/n8n_workflow_example.json - Example workflow
Stable API	✅ IMPLEMENTED	FastAPI with OpenAPI docs at /docs, src/api/main.py - Well-structured routes
Webhooks (if applicable)	⚠️ PARTIAL	Outbound webhooks implemented (src/tools/n8n_tool.py), but no generic webhook receiver for external callbacks
Agent Versioning	✅ IMPLEMENTED	src/services/version_service.py - Version management, src/api/routes/versions.py - Version CRUD and restore
Documentation (AR + EN)	✅ IMPLEMENTED	docs/USER_GUIDE_EN.md, docs/USER_GUIDE_AR.md, docs/API_USAGE_GUIDE.md, docs/ARCHITECTURE.md
Feature Implementation Details
Evidence by Feature:

Workflow Management

File: src/services/workflow_service.py:27-34 - Valid phase transitions defined
File: src/models/workflow.py - WorkflowState and WorkflowPhase models
File: src/services/orchestrator.py:143-300 - Plan generation creates structured steps
Task State Tracking

File: src/models/tasks.py - Task model with status field
File: src/api/routes/tasks.py - Full CRUD endpoints
File: src/services/orchestrator.py:469-489 - Tasks auto-created from plan steps
Content Generation

File: src/tools/treatment_generator.py - Series treatment generation
File: src/services/orchestrator.py:400-600 - Execution phase generates content
File: src/utils/docx_generator.py - DOCX export utilities
Image Generation

File: src/tools/image_generation.py:1-100 - DALL-E tool
File: src/tools/image_generation_sd.py - Stable Diffusion tool
File: src/tools/image_generation_mj.py - Midjourney tool
File: src/tools/storyboard_generator.py - Batch storyboard generation
TTS/Voice

File: src/tools/tts_elevenlabs.py - ElevenLabs TTS integration
Video Generation

File: src/tools/video_generation.py - RunwayML video generation
File: src/services/video_service.py - Video service layer
Knowledge Base/RAG

File: src/services/kb_service.py:73-200 - Vector store integration
File: src/services/doc_extraction.py - Document extraction (DOCX/PDF)
File: src/services/ai_service.py:200-400 - file_search tool integration
File: data/bibles/ - 31 story bible files present
Long-term Memory

File: src/services/memory_service.py - Semantic memory implementation
File: src/services/memory_service.py:50-100 - Embedding generation with sentence-transformers
File: src/db/indexes.py:136-152 - Memory collection indexes
Multi-Agent System

File: src/core/agent_types.py:10-291 - 5 agent types (Writer, Designer, Producer, Reviewer, Director)
File: src/services/agent_collaboration.py - Multi-agent workflows
File: src/services/shared_memory_service.py - Inter-agent memory sharing
Bilingual Support

File: src/models/run.py:14 - Language field (ar/en)
File: src/services/orchestrator.py:184-198 - Bilingual prompt generation
N8N Integration

File: src/api/routes/integrations.py - Dedicated N8N endpoints
File: src/tools/n8n_tool.py - N8N webhook tool
File: docs/n8n_workflow_example.json - Example workflow
Version Control

File: src/services/version_service.py - Version management
File: src/api/routes/versions.py - Version CRUD and restore endpoints
Canon Validation

File: src/services/canon_validator.py - Validation service
File: src/services/canon_rules_engine.py - Rules enforcement
File: src/services/canon_index_service.py - Canon rules management
8. Gaps / Missing Pieces vs Client Requirements
Critical Issues
None Found ✅

Note: Previous audit report (PROJECT_STATUS_REPORT.md) mentioned missing router imports, but verification shows all imports are present in src/api/main.py:20-44. The issue has been resolved.

Missing/Incomplete Features
Webhook Receiver (Inbound)

Status: ⚠️ PARTIAL
Current: Outbound webhooks implemented (src/tools/n8n_tool.py)
Missing: Generic webhook receiver endpoint for external systems to send callbacks
Impact: Cannot receive real-time callbacks from N8N or other external systems
File to Modify: src/api/routes/webhooks.py (exists but may need inbound endpoint)
Task Dependencies

Status: ⚠️ PARTIAL
Current: Tasks can be created and tracked, but no dependency relationships
Missing: depends_on field in task model, dependency resolution logic
Impact: Cannot enforce task ordering or parallelization
Files to Modify: src/models/tasks.py, src/services/orchestrator.py
Revision Comparison/Diff

Status: ⚠️ PARTIAL
Current: Version system exists with restore capability
Missing: UI for comparing versions side-by-side, diff visualization
Impact: Difficult to see what changed between versions
Files to Create/Modify: src/services/version_diff_service.py (new), ui/app.py
Dedicated Vector Database

Status: ⚠️ ARCHITECTURAL CHOICE
Current: Uses OpenAI Vector Stores (vendor lock-in)
Missing: Pinecone, Weaviate, Qdrant, or Chroma integration
Impact: Limited scalability options, vendor lock-in
Files to Modify: src/services/vector_store/ (abstraction exists, but only OpenAI adapter)
Hybrid Search (Keyword + Semantic)

Status: ⚠️ PARTIAL
Current: Semantic search via embeddings
Missing: Keyword search combined with semantic search
Impact: May miss exact keyword matches
Files to Create/Modify: src/services/hybrid_search_service.py (new)
Batch Media Processing

Status: ⚠️ PARTIAL
Current: Individual image/video generation tools exist
Missing: Batch API endpoints for generating multiple images/videos
Impact: Slower for bulk operations
Files to Create: src/api/routes/media.py (new), src/services/batch_media_service.py (new)
OAuth 2.0 / JWT Authentication

Status: ⚠️ PARTIAL
Current: API key authentication implemented
Missing: OAuth 2.0 or JWT token support
Impact: Less flexible authentication options
Files to Modify: src/core/auth.py, src/core/api_key_manager.py
Arabic UI (RTL Support)

Status: ⚠️ PARTIAL
Current: Backend supports Arabic language, documentation in Arabic exists
Missing: Right-to-left (RTL) layout support in Streamlit UI
Impact: Arabic UI may not display optimally
Files to Modify: ui/app.py, create ui/components/arabic_support.py
Mobile Responsive UI

Status: ⚠️ LIMITED
Current: Streamlit UI may not be fully responsive
Missing: Mobile-optimized layouts
Impact: Poor mobile experience
Files to Modify: ui/app.py
GraphQL API

Status: ❌ MISSING
Current: REST API only
Missing: GraphQL endpoint option
Impact: Less flexible querying for clients
Files to Create: src/api/graphql/ (new schema)
Architectural Gaps
Vector Database Scalability

Issue: OpenAI Vector Stores may not scale to very large knowledge bases
Recommendation: Consider adding Pinecone/Weaviate/Qdrant adapter
Evidence: src/services/vector_store/ - Factory pattern exists, only OpenAI adapter
Memory Storage Scalability

Issue: Embeddings stored in MongoDB may become slow with millions of entries
Recommendation: Consider dedicated vector database for memory embeddings
Evidence: src/services/memory_service.py - MongoDB storage for embeddings
Error Recovery

Current: Basic retry logic exists for runs
Missing: Circuit breaker pattern, exponential backoff for external APIs
Evidence: src/worker.py:134-146 - Basic retry scheduler
9. Quality Assessment
Stability
Status: ✅ GOOD

Evidence:

✅ Comprehensive error handling in orchestrator (src/services/orchestrator.py:400-600)
✅ Budget limits prevent runaway costs (src/services/budget.py)
✅ Health checks implemented (src/api/main.py:337-464)
✅ Graceful degradation (non-critical services marked as degraded, not fatal)
⚠️ Basic retry logic exists (src/worker.py:134-146), but no circuit breakers
Scalability
Status: ⚠️ MODERATE

Evidence:

✅ Async/await architecture throughout (src/services/ - all async)
✅ Background job processing via RQ (src/worker.py)
✅ Database indexes optimized (src/db/indexes.py:13-272 - 13 collections indexed)
✅ Redis caching (src/services/cache_service.py)
⚠️ Vector store vendor lock-in (OpenAI only) - src/services/vector_store/openai_adapter.py
⚠️ Memory embeddings in MongoDB may not scale to millions - src/services/memory_service.py
Recommendations:

Consider dedicated vector database for memory embeddings
Add horizontal scaling support for workers
Consider adding connection pooling configuration
Security
Status: ✅ GOOD

Evidence:

✅ API key authentication (src/core/api_key_manager.py, src/api/main.py:173-249)
✅ API key scoping (READ/WRITE permissions) - src/core/api_key_manager.py:APIKeyScope
✅ Rate limiting (src/core/rate_limit.py, src/services/rate_limit_service.py)
✅ Request ID tracking for audit (src/api/main.py:170-171)
✅ Structured logging without exposing secrets (src/api/main.py:108-146)
⚠️ No OAuth 2.0 / JWT support (API keys only)
⚠️ No webhook signature validation (mentioned in gaps)
Testing
Status: ⚠️ PARTIAL

Evidence:

✅ Test suite exists (tests/ - 18 files, 56 test functions found)
✅ Unit tests (tests/unit/ - 4 files)
✅ Integration tests (tests/integration/ - 6 files)
✅ Pytest configuration (pytest.ini, pyproject.toml:29-34)
⚠️ Test coverage unknown (no coverage report found)
⚠️ E2E tests limited (tests/integration/test_agent_run_stub.py - stub only)
Test Files:

tests/unit/test_canon_rules_engine.py
tests/unit/test_canon_ingest.py
tests/unit/test_worker.py
tests/integration/test_agent_run_stub.py
tests/integration/test_health.py
tests/integration/test_n8n_webhook.py
tests/integration/test_notion.py
tests/integration/test_routes.py
tests/test_agent_types.py
tests/test_shared_memory.py
tests/test_template_service.py
tests/test_memory_semantic.py
tests/test_orchestrator_language.py
tests/test_orchestrator_safety.py
tests/test_orchestrator_parsing.py
tests/test_security_api_key.py
tests/test_kb_service_hash.py
Logging
Status: ✅ EXCELLENT

Evidence:

✅ Structured JSON logging (src/api/main.py:108-146 - StructuredFormatter class)
✅ Request ID tracking (src/api/main.py:170-171)
✅ Log levels configurable (src/core/config.py:43, env.example.txt:15)
✅ Error logging with stack traces (src/api/main.py:279-306)
✅ Performance logging (latency tracking) - src/api/main.py:308-332
Documentation
Status: ✅ EXCELLENT

Evidence:

✅ README.md with quickstart (README.md)
✅ API documentation (OpenAPI at /docs)
✅ User guides in English and Arabic (docs/USER_GUIDE_EN.md, docs/USER_GUIDE_AR.md)
✅ Architecture documentation (docs/ARCHITECTURE.md)
✅ API usage guide (docs/API_USAGE_GUIDE.md)
✅ Maintenance plan (docs/MAINTENANCE_PLAN.md)
✅ N8N integration guide (docs/N8N_BIDIRECTIONAL_GUIDE.md)
✅ Handover guide (HANDOVER_GUIDE.md)
✅ Generated documentation (CAPABILITIES.md, DATA_STRUCTURES.md)
✅ Sprint documentation (docs/sprint*.md)
10. Prioritized Next Steps
P0 - Critical (Immediate)
None ✅ - No critical blocking issues found.

P1 - High Priority (Week 1-2)
Add Webhook Receiver Endpoint

Why: Enable bidirectional N8N integration
Files to Modify: src/api/routes/webhooks.py (add inbound endpoint)
Files to Create: src/services/webhook_receiver_service.py (if needed)
Effort: 2-3 days
Implement Task Dependencies

Why: Enable proper workflow orchestration
Files to Modify: src/models/tasks.py (add depends_on field), src/services/orchestrator.py (dependency resolution)
Effort: 2-3 days
Add Vector Database Adapter (Optional)

Why: Reduce vendor lock-in, improve scalability
Files to Modify: src/services/vector_store/ (add Pinecone/Weaviate adapter)
Effort: 3-5 days
Implement Hybrid Search

Why: Improve search quality (keyword + semantic)
Files to Create: src/services/hybrid_search_service.py
Files to Modify: src/services/kb_service.py, src/services/memory_service.py
Effort: 2-3 days
P2 - Medium Priority (Week 3-4)
Version Comparison UI

Why: Improve user experience for version management
Files to Create: src/services/version_diff_service.py
Files to Modify: ui/app.py (add diff view)
Effort: 2-3 days
Batch Media Processing API

Why: Improve performance for bulk operations
Files to Create: src/api/routes/media.py, src/services/batch_media_service.py
Effort: 2-3 days
Enhanced Error Recovery

Why: Improve resilience to external API failures
Files to Create: src/services/circuit_breaker.py
Files to Modify: src/tools/*.py (add circuit breaker to external API calls)
Effort: 2-3 days
Arabic UI (RTL Support)

Why: Complete bilingual support
Files to Create: ui/components/arabic_support.py
Files to Modify: ui/app.py
Effort: 2-3 days
P3 - Low Priority (Future)
OAuth 2.0 / JWT Authentication

Why: More flexible authentication options
Files to Modify: src/core/auth.py, src/core/api_key_manager.py
Effort: 3-5 days
GraphQL API

Why: More flexible querying for clients
Files to Create: src/api/graphql/ (schema and resolvers)
Effort: 5-7 days
Mobile Responsive UI

Why: Improve mobile experience
Files to Modify: ui/app.py
Effort: 3-5 days
Test Coverage Improvement

Why: Increase confidence in code changes
Action: Add pytest-cov, generate coverage reports, increase coverage to 80%+
Effort: Ongoing
11. Conclusion
Pyramid Agent is a production-ready system with comprehensive features implemented. All major client requirements have been met, with minor gaps in optional features (webhook receiver, task dependencies, version comparison UI).

The system demonstrates:

✅ Solid Architecture: Well-structured, modular, async/await throughout
✅ Comprehensive Features: All core requirements implemented
✅ Good Documentation: Extensive guides in English and Arabic
✅ Production Quality: Error handling, logging, monitoring, health checks
⚠️ Scalability Considerations: Some architectural choices (OpenAI Vector Stores, MongoDB embeddings) may need review at scale
Recommendation: System is ready for production deployment. Address P1 priorities (webhook receiver, task dependencies) for enhanced functionality, but these are not blockers.

Report Generated: 2025-01-26
Audit Type: READ-ONLY (No code modifications made)
Evidence-Based: All claims backed by file paths and code references.

# 🚀 Nexus AI | Production-Grade Data Annotation Platform

> **An advanced, full-stack platform built for the modern AI economy, featuring real-time communication, intelligent task management, and a seamless Dark UI.**

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.1-green)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black)](https://socket.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Credits](#credits)

---

## 🎯 Overview

Nexus AI is a sophisticated, production-ready data annotation platform designed to streamline the workflow between administrators and contributors. The platform leverages AI-powered automation, real-time communication, and gamification to create an efficient, engaging work environment.

### Core Concept

The platform enables:
- **Administrators** to create, manage, and review data annotation projects
- **Contributors** to submit high-quality annotations with AI-assisted quality checks
- **Automated triage** that intelligently routes submissions based on quality scores
- **Real-time notifications** for instant feedback and updates
- **Performance tracking** with a tiered gamification system

---

## ✨ Key Features

### 🤖 AI-Powered Triage System
- **Automated Quality Scoring**: AI simulates quality assessment (50-100% range)
- **Smart Status Assignment**: 
  - Auto-Approve (≥98%): Instant approval for exceptional submissions
  - Auto-Reject (<70%): Immediate rejection for low-quality work
  - Human Review (70-97%): Manual review for borderline cases
- **Scheduled Auto-Approval**: High-quality pending submissions (≥90%) automatically approved after 3 days
- **Consistency Warnings**: Detects contradictions between AI scores and content quality

### 🏆 Tiered Gamification System
- **Four-Tier Ranking**: Bronze → Silver → Gold → Elite
- **Performance Metrics**: 
  - Approval Rate calculation
  - Total/Approved submissions tracking
  - Automatic tier upgrades based on performance
- **Visual Tier Badges**: Displayed on Profile and Dashboard pages

### 📊 Advanced Admin Tools
- **Bulk Review Operations**: Approve/reject multiple submissions simultaneously
- **Real-Time Dashboard**: Comprehensive statistics and metrics
- **User Management**: Paginated user list with search and filtering
- **AI Instruction Generation**: Automated project instruction generation
- **Audit Logging**: Complete trail of all admin actions

### 🔔 Real-Time Notifications
- **Socket.io Integration**: Instant notifications via WebSocket
- **Personalized Rooms**: Each user receives notifications in their private room
- **Toast Notifications**: Immediate visual feedback for all events
- **Notification History**: Track and manage all received notifications

### 🌍 Internationalization (i18n)
- **Full RTL/LTR Support**: Seamless Arabic (RTL) and English (LTR) support
- **Language Context**: Global language management with Local Storage persistence
- **Dynamic Text Direction**: Automatic UI adaptation based on selected language
- **Professional Translations**: High-quality Arabic translations for all admin content

### 🔐 Security & Authentication
- **JWT-Based Auth**: Secure token-based authentication
- **Role-Based Access Control**: Admin/User/Freelancer role separation
- **Password Reset Flow**: Secure forgot/reset password functionality
- **Protected Routes**: Frontend route protection with middleware
- **Password Hashing**: bcryptjs for secure password storage

### 🎨 Modern UI/UX
- **Dark Theme**: Sleek, modern dark interface with glassmorphism effects
- **Framer Motion**: Smooth animations and transitions throughout
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Skeleton Loaders**: Enhanced loading UX with skeleton screens
- **Responsive Design**: Fully responsive across all devices

### 🧪 Code Quality
- **Jest & Supertest**: Comprehensive backend testing with MongoDB Memory Server
- **Centralized API Layer**: DRY principle with dedicated `api.js` service
- **Error Handling**: Detailed error logging and user-friendly error messages
- **Validation**: Robust input validation on both frontend and backend

### 💼 Additional Features
- **Wallet System**: Track earnings, request payouts, view transaction history
- **Analytics Dashboard**: Performance metrics and earnings visualization
- **Application System**: User onboarding with technical assessments
- **Project Management**: Create, edit, and manage annotation projects
- **Task Submission**: Submit completed tasks with AI quality checks

### 🎯 Task Repetition & Submission Limits
- **User Repetition Control (`isRepeatable`)**: 
  - Admins can set tasks as **'One-time'** (hides from user after first completed submission) or **'Repeatable'** (infinitely repeatable)
  - One-time tasks automatically disappear from the user's dashboard after they complete one submission
  - Repeatable tasks remain available for unlimited submissions
- **Aggregate Submission Cap (`maxTotalSubmissions`)**: 
  - Admins can set a total submission limit for the entire project (e.g., 1000 tasks)
  - Projects are automatically hidden from all users once the limit is reached
  - Submissions are blocked when the project reaches its maximum capacity
  - Optional field (null = no limit)

### 📊 Advanced Analytics Dashboard (Role-Based)
- **Role-Based Views:** The analytics page is dynamic and shows different data based on user role (Admin vs. Freelancer)
- **Admin View (Project Performance):**
  - **KPI Cards:** Overall stats (Total Payout, Total Approved, Overall Approval Rate, Total Projects)
  - **Bar Chart:** Top 10 Projects ranked by total payout using Chart.js
  - **Detailed Table:** Full performance metrics for every project (submissions, approval rates, earnings)
- **Admin View (Top Performers):**
  - **Top 10 Freelancers:** A ranked table showing top freelancers by earnings, including their tier, approval rate, and total approved/rejected tasks
  - **Comprehensive Metrics:** Name, email, tier badge, submission counts, and total earnings
- **Freelancer View (Personal Performance):**
  - **KPI Cards:** Personal stats (My Tier, Total Earnings, Approval Rate, Pending Earnings)
  - **Doughnut Chart:** A visual breakdown of personal submissions (Approved, Rejected, Pending) using Chart.js
  - **Performance Summary:** Detailed table showing all personal submission metrics

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM 6.20.1** - Client-side routing
- **Framer Motion 12.23.24** - Animation library
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Axios 1.6.2** - HTTP client
- **Socket.io Client 4.8.1** - Real-time WebSocket communication
- **i18next 25.6.0** - Internationalization framework
- **React Toastify 11.0.5** - Toast notifications
- **JWT Decode 4.0.0** - Token decoding

### Backend
- **Node.js 22.x** - Runtime environment
- **Express.js 4.19.2** - Web framework
- **MongoDB 8.0.1** (Mongoose) - Database & ODM
- **Socket.io 4.8.1** - Real-time server
- **JWT 9.0.2** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **@google/generative-ai 0.24.1** - Google Generative AI for quality scoring
- **nodemailer 6.10.1** - Email service for password reset and notifications
- **express-rate-limit 8.2.1** - Rate limiting middleware
- **cors 2.8.5** - Cross-origin resource sharing

### Testing
- **Jest 29.7.0** - Testing framework
- **Supertest 6.3.4** - HTTP assertion library
- **MongoDB Memory Server 10.3.0** - In-memory MongoDB for testing

### Development Tools
- **Concurrently 8.2.1** - Run multiple commands simultaneously
- **Nodemon 3.0.1** - Auto-restart server on changes
- **CRACO 7.1.0** - Create React App Configuration Override

---

## 📁 Project Structure

```
nexus-ai/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── SkeletonLoader.jsx
│   │   ├── context/       # React Context providers
│   │   │   ├── LanguageContext.js
│   │   │   └── SocketContext.js
│   │   ├── i18n/          # Internationalization files
│   │   │   ├── en.json
│   │   │   ├── ar.json
│   │   │   └── i18n.js
│   │   ├── pages/         # Page components (17 pages)
│   │   │   ├── DashboardPage.js
│   │   │   ├── AdminPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── WalletPage.js
│   │   │   ├── Analytics.jsx
│   │   │   ├── ApplicationPage.js
│   │   │   ├── QualificationCenterPage.jsx
│   │   │   ├── QualificationTestPage.jsx
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── AuditLogPage.jsx
│   │   │   ├── UserManagementPage.jsx
│   │   │   ├── TaskPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   └── AboutUs.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js Backend Application
│   ├── controllers/       # Business logic controllers
│   │   ├── admin.controller.js
│   │   ├── user.controller.js
│   │   └── qualification.controller.js
│   ├── middleware/        # Express middleware
│   │   └── auth.middleware.js
│   ├── models/            # Mongoose models
│   │   ├── User.model.js
│   │   ├── Project.model.js
│   │   ├── Submission.model.js
│   │   ├── PayoutRequest.model.js
│   │   ├── AuditLog.model.js
│   │   ├── QualificationTest.model.js
│   │   └── QualificationSubmission.model.js
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── user.routes.js
│   │   ├── wallet.routes.js
│   │   ├── admin.routes.js
│   │   └── qualification.routes.js
│   ├── socket.js          # Socket.io initialization
│   ├── utils/             # Utility functions
│   │   ├── logger.js
│   │   ├── emailSender.js
│   │   ├── emailService.js
│   │   └── auditLog.js
│   ├── tests/             # Test files
│   │   ├── setup.js
│   │   └── projects.test.js
│   ├── server.js          # Main server file
│   └── .env               # Environment variables (create this)
│
├── package.json           # Root package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 22.x
- **MongoDB** (local installation or MongoDB Atlas connection string)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd nexus-ai
```

### Step 2: Install Root Dependencies

```bash
npm install
```

### Step 3: Install Client Dependencies

```bash
npm run client:install
# OR
cd client && npm install && cd ..
```

### Step 4: Install Server Dependencies

Server dependencies are installed via the root `npm install`. No additional step needed.

### Step 5: Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nexus-ai
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nexus-ai

# JWT Secret Key
JWT_SECRET=your_super_secret_key_for_mohamed_dataannotation_2025

# Server Port
PORT=5000

# Frontend URL (for CORS and Socket.io)
FRONTEND_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

#### Frontend Environment Variables (Optional)

Create a `.env` file in the `client/` directory if you need to override defaults:

```env
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000/api
```

#### Additional Backend Environment Variables (Optional)

For email functionality and AI service:

```env
# Google Generative AI API Key (for AI quality scoring)
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Email Configuration (for password reset and notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@nexus-ai.com
```

---

## ▶️ Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This command will:
- Start the backend server on `http://localhost:5000`
- Start the frontend development server on `http://localhost:3000`
- Enable hot-reload for both servers

### Separate Execution

#### Backend Only

```bash
npm run server
# OR
cd server && node server.js
```

#### Frontend Only

```bash
npm run client
# OR
cd client && npm start
```

### Production Build

```bash
# Build the frontend
cd client && npm run build

# Start production server
npm start
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests in CI Mode

```bash
npm run test:ci
```

### Test Coverage

The test suite includes:
- **Project Update Security Tests**: Admin vs. non-admin access validation
- **AI Auto-Triage Logic Tests**: Verify correct status assignment based on AI scores
- **MongoDB Memory Server**: Isolated test database for fast, clean tests

---

## 📡 API Documentation

### Authentication Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password with token
- `GET /api/auth/analytics` - Get personal performance stats for the logged-in user (tier, earnings, approval rate, submission counts)

### Project Routes

- `GET /api/projects` - Get available projects (filtered by `isRepeatable` logic, `maxTotalSubmissions` cap, and user's `skillDomain`)
- `GET /api/projects/all` - Get all projects (Admin only)
- `POST /api/projects` - Create new project (Admin only). Accepts `isRepeatable` (boolean) and `maxTotalSubmissions` (number or null) in request body
- `PUT /api/projects/:id` - Update project (Admin only). Accepts `isRepeatable` (boolean) and `maxTotalSubmissions` (number or null) for updates
- `POST /api/projects/:id/submit` - Submit completed task. Blocks submission if `maxTotalSubmissions` limit is reached
- `GET /api/projects/stats` - Get admin statistics (Admin only)
- `GET /api/projects/submissions/pending` - Get pending submissions (Admin only)
- `PUT /api/projects/submissions/:id/review` - Review submission (Admin only)
- `PUT /api/projects/submissions/bulk-review` - Bulk review submissions (Admin only)

### Admin Routes

- `GET /api/admin/analytics/project-performance` - Get aggregated performance stats for all projects (Admin only)
- `GET /api/admin/analytics/freelancer-performance` - Get top 10 freelancers ranked by earnings (Admin only)

### User Routes

- `PUT /api/users/profile/update` - Update user profile
- `GET /api/users/admin/all` - Get all users with pagination (Admin only)
- `PUT /api/users/admin/update/:id` - Update user role/status (Admin only)
- `DELETE /api/users/admin/clean-db` - Clean database (Admin only, for testing)

### Wallet Routes

- `GET /api/wallet/available-balance` - Get available balance
- `GET /api/wallet/pending-review-balance` - Get pending review balance
- `POST /api/wallet/request-payout` - Request payout
- `GET /api/wallet/admin/pending-requests` - Get pending payout requests (Admin only)
- `PUT /api/wallet/admin/review/:id` - Review payout request (Admin only)

### Qualification Routes

- `GET /api/qualification/tests` - Get available qualification tests
- `POST /api/qualification/tests/:id/submit` - Submit qualification test
- `GET /api/qualification/submissions` - Get user's qualification submissions (User only)
- `GET /api/qualification/submissions/all` - Get all qualification submissions (Admin only)

---

## 📸 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=Dashboard+View)
*Clean, modern dashboard showing available projects with tier badges*

### Admin Panel
![Admin Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=Admin+Dashboard)
*Comprehensive admin interface with statistics, submission review, and bulk operations*

### Dark UI Theme
![Dark UI](https://via.placeholder.com/800x400/1e293b/ffffff?text=Dark+UI+Theme)
*Sleek glassmorphism design with smooth animations*

---

## 🔧 Key Configuration Files

### Backend Configuration
- `server/server.js` - Main server entry point
- `server/socket.js` - Socket.io initialization
- `server/middleware/auth.middleware.js` - Authentication middleware

### Frontend Configuration
- `client/src/App.js` - Main React component with routing
- `client/src/services/api.js` - Centralized API service
- `client/src/context/SocketContext.js` - Socket.io client context
- `client/tailwind.config.js` - Tailwind CSS configuration

---

## 🎯 Feature Highlights

### AI Auto-Triage Flow
1. User submits a task
2. AI generates quality score (50-100%)
3. System automatically assigns status:
   - **≥98%**: Auto-Approved
   - **<70%**: Auto-Rejected
   - **70-97%**: Pending (Human Review)
4. High-quality pending (≥90%) scheduled for auto-approval after 3 days

### Gamification System
- **Bronze**: Default tier (<70% approval rate)
- **Silver**: 70-84% approval rate
- **Gold**: 85-94% approval rate
- **Elite**: ≥95% approval rate

### Real-Time Notifications
- Instant alerts for submission approval/rejection
- Payout completion notifications
- Socket.io-based WebSocket communication
- Personalized notification rooms per user

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Credits

**Designed & Built by [Mohamed Eslam](https://www.linkedin.com/in/mohamed-eslam)**

### Contact & Links

- **LinkedIn**: [Mohamed Eslam](https://www.linkedin.com/in/mohamed-eslam)
- **Project Repository**: [GitHub Repository](https://github.com/yourusername/nexus-ai)

---

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for efficient data annotation workflows
- Designed with user experience and developer experience in mind

---

## 📊 Project Statistics

- **Frontend Components**: 17 pages and 5 reusable components
- **Backend Routes**: 25+ API endpoints across 6 route files
- **Database Models**: 7 Mongoose schemas
- **Test Coverage**: Critical security and business logic tests
- **Languages Supported**: English (LTR), Arabic (RTL)
- **Real-Time Features**: Socket.io integration with personalized rooms

---

## 🚧 Roadmap

Future enhancements planned:
- [ ] Email notifications integration
- [ ] Advanced analytics and reporting
- [ ] Mobile app support
- [ ] Payment gateway integration
- [ ] Enhanced AI scoring algorithms
- [ ] Multi-language expansion

---

**Made with ❤️ by  Mohamed  Eslam**

*Last Updated: 2025*
# 🔍 Code Audit Report - Nexus AI Platform

**Date:** January 2025  
**Auditor:** Senior Technical Lead & Documentation Expert  
**Project:** Nexus AI (Mohamed DataAnnotation)  
**Version:** 0.1.0

---

## 📋 Executive Summary

This comprehensive audit examines the Nexus AI platform's codebase for code quality, security vulnerabilities, performance bottlenecks, and best practices. The platform is a full-stack data annotation system built with React, Node.js, Express, and MongoDB.

**Overall Assessment:** The codebase demonstrates good architectural patterns with clear separation of concerns. However, several areas require attention for production readiness, particularly around security hardening, error handling, and performance optimization.

---

## 1. 🔒 Security Audit

### ✅ Security Strengths

1. **Environment Variables**: `.env` files are properly excluded via `.gitignore`
2. **Password Hashing**: Uses `bcryptjs` for secure password storage
3. **JWT Authentication**: Token-based authentication implemented
4. **Rate Limiting**: `express-rate-limit` middleware included in dependencies
5. **CORS Configuration**: CORS middleware present for cross-origin protection
6. **Role-Based Access Control**: Admin/User/Freelancer role separation

### ⚠️ Security Concerns & Recommendations

#### **CRITICAL: Missing Security Headers**
**Issue:** No security headers middleware (Helmet.js) detected
**Risk:** Vulnerable to XSS, clickjacking, and other common web attacks
**Recommendation:**
```javascript
// server/server.js
const helmet = require('helmet');
app.use(helmet());
```

#### **HIGH: Input Validation**
**Issue:** Need to verify comprehensive input validation on all endpoints
**Risk:** Potential injection attacks, data corruption
**Recommendation:**
- Implement `express-validator` or `joi` for request validation
- Validate all user inputs (email format, password strength, MongoDB ObjectId format)
- Sanitize user-generated content before database operations

#### **HIGH: JWT Token Security**
**Issue:** Need to verify JWT implementation details
**Risk:** Token theft, replay attacks
**Recommendation:**
- Implement token refresh mechanism
- Set appropriate token expiration times
- Store tokens in httpOnly cookies (more secure than localStorage)
- Implement token blacklisting for logout

#### **MEDIUM: MongoDB Injection Prevention**
**Issue:** Need to verify all queries use parameterized queries
**Risk:** NoSQL injection attacks
**Recommendation:**
- Ensure all Mongoose queries use parameterized methods
- Never concatenate user input directly into queries
- Use Mongoose's built-in sanitization

#### **MEDIUM: API Key Management**
**Issue:** Google Generative AI API key must be stored securely
**Risk:** API key exposure could lead to unauthorized usage and costs
**Recommendation:**
- Verify `GOOGLE_AI_API_KEY` is only in `.env` file (not committed)
- Use environment-specific API keys
- Implement API key rotation strategy
- Monitor API usage for anomalies

#### **MEDIUM: Email Service Security**
**Issue:** Email credentials need secure storage
**Risk:** Email account compromise
**Recommendation:**
- Use app-specific passwords for Gmail
- Consider using dedicated email service (SendGrid, AWS SES)
- Encrypt email credentials in environment variables

#### **LOW: Error Message Information Disclosure**
**Issue:** Error messages may expose sensitive information
**Risk:** Information leakage to attackers
**Recommendation:**
- Implement generic error messages for production
- Log detailed errors server-side only
- Use error codes instead of detailed messages

#### **LOW: Session Management**
**Issue:** Verify session timeout and concurrent session handling
**Risk:** Session hijacking
**Recommendation:**
- Implement session timeout
- Limit concurrent sessions per user
- Implement device fingerprinting

---

## 2. 📊 Code Quality Audit

### ✅ Code Quality Strengths

1. **Separation of Concerns**: Clear MVC-like structure (routes, controllers, models)
2. **Centralized API Service**: `client/src/services/api.js` follows DRY principle
3. **Component Reusability**: Reusable components (Navbar, Footer, ProtectedRoute)
4. **Context Management**: React Context for global state (Language, Socket)
5. **Testing Infrastructure**: Jest and Supertest configured
6. **Internationalization**: Proper i18n implementation with RTL support

### ⚠️ Code Quality Issues & Recommendations

#### **HIGH: Missing Code Comments**
**Issue:** Limited inline documentation and JSDoc comments
**Risk:** Difficult maintenance and onboarding
**Recommendation:**
- Add JSDoc comments to all functions and classes
- Document complex business logic (AI triage algorithm, tier calculation)
- Add file-level comments explaining module purpose

#### **MEDIUM: Error Handling Consistency**
**Issue:** Need to verify consistent error handling patterns
**Risk:** Inconsistent user experience, difficult debugging
**Recommendation:**
- Create centralized error handler middleware
- Standardize error response format
- Implement proper error logging with context

#### **MEDIUM: Code Duplication**
**Issue:** Potential code duplication across controllers
**Risk:** Maintenance burden, inconsistency
**Recommendation:**
- Extract common logic into utility functions
- Create base controller class for shared functionality
- Use middleware for common operations

#### **MEDIUM: Type Safety**
**Issue:** JavaScript lacks compile-time type checking
**Risk:** Runtime errors, difficult refactoring
**Recommendation:**
- Consider migrating to TypeScript
- At minimum, add JSDoc type annotations
- Use PropTypes for React components

#### **LOW: File Organization**
**Issue:** Some files may be too large (need verification)
**Risk:** Difficult navigation and maintenance
**Recommendation:**
- Split large files into smaller modules
- Group related functionality together
- Maintain consistent naming conventions

#### **LOW: Magic Numbers/Strings**
**Issue:** Hardcoded values in code
**Risk:** Difficult to maintain and update
**Recommendation:**
- Extract magic numbers to constants
- Create configuration files for thresholds (AI scores, tier percentages)
- Use enums for status values

---

## 3. ⚡ Performance Audit

### ✅ Performance Strengths

1. **Database Indexing**: Need to verify, but Mongoose models likely have indexes
2. **Pagination**: User list endpoint supports pagination
3. **Build Optimization**: Production build configured with `CI=false`
4. **Code Splitting**: React Router enables route-based code splitting

### ⚠️ Performance Concerns & Recommendations

#### **HIGH: Database Query Optimization**
**Issue:** Need to verify database indexes and query efficiency
**Risk:** Slow queries, poor scalability
**Recommendation:**
- Add indexes on frequently queried fields:
  - `User.email` (unique index)
  - `Submission.userId`, `Submission.projectId`, `Submission.status`
  - `Project.isActive`, `Project.skillDomain`
  - `PayoutRequest.status`, `PayoutRequest.userId`
- Use `explain()` to analyze query performance
- Implement query result caching for read-heavy operations

#### **HIGH: N+1 Query Problem**
**Issue:** Potential N+1 queries when fetching related data
**Risk:** Excessive database calls, slow response times
**Recommendation:**
- Use Mongoose `.populate()` efficiently
- Implement data aggregation for analytics endpoints
- Consider using MongoDB aggregation pipeline for complex queries

#### **MEDIUM: API Response Size**
**Issue:** Large payloads may impact performance
**Risk:** Slow network transfer, high bandwidth usage
**Recommendation:**
- Implement field selection (only return needed fields)
- Add pagination to all list endpoints
- Use compression middleware (gzip)
- Consider GraphQL for flexible data fetching

#### **MEDIUM: Frontend Bundle Size**
**Issue:** Large JavaScript bundles may slow initial load
**Risk:** Poor user experience, especially on mobile
**Recommendation:**
- Analyze bundle size with `webpack-bundle-analyzer`
- Implement lazy loading for routes
- Code split large dependencies (Chart.js, Framer Motion)
- Use dynamic imports for heavy components

#### **MEDIUM: Real-Time Connection Management**
**Issue:** Socket.io connections need proper management
**Risk:** Memory leaks, server overload
**Recommendation:**
- Implement connection cleanup on disconnect
- Limit connections per user/IP
- Use Redis adapter for horizontal scaling
- Monitor socket connection count

#### **MEDIUM: Image/Asset Optimization**
**Issue:** Need to verify image optimization
**Risk:** Slow page loads
**Recommendation:**
- Optimize images (WebP format, compression)
- Implement lazy loading for images
- Use CDN for static assets
- Consider image optimization service

#### **LOW: Caching Strategy**
**Issue:** No caching layer detected
**Risk:** Unnecessary database queries
**Recommendation:**
- Implement Redis for session and data caching
- Cache frequently accessed data (project lists, user profiles)
- Use HTTP caching headers for static assets
- Implement cache invalidation strategy

#### **LOW: Database Connection Pooling**
**Issue:** Need to verify MongoDB connection pooling
**Risk:** Connection exhaustion under load
**Recommendation:**
- Configure appropriate connection pool size
- Monitor connection pool usage
- Implement connection retry logic

---

## 4. 🏗️ Architecture & Best Practices

### ✅ Architecture Strengths

1. **Monorepo Structure**: Clear separation of client and server
2. **RESTful API Design**: Logical endpoint structure
3. **Middleware Pattern**: Proper use of Express middleware
4. **Model-View-Controller**: Clear separation of concerns
5. **Environment Configuration**: Proper use of environment variables

### ⚠️ Architecture Recommendations

#### **HIGH: API Versioning**
**Issue:** No API versioning detected
**Risk:** Breaking changes affect clients
**Recommendation:**
- Implement API versioning (`/api/v1/...`)
- Maintain backward compatibility
- Document deprecation policy

#### **MEDIUM: Logging Strategy**
**Issue:** Need comprehensive logging strategy
**Risk:** Difficult debugging and monitoring
**Recommendation:**
- Implement structured logging (Winston, Pino)
- Log levels: error, warn, info, debug
- Centralized log aggregation (ELK stack, CloudWatch)
- Log important events (login, submission, payout)

#### **MEDIUM: Monitoring & Observability**
**Issue:** No application monitoring detected
**Risk:** Unable to detect issues proactively
**Recommendation:**
- Implement application performance monitoring (APM)
- Set up error tracking (Sentry, Rollbar)
- Monitor key metrics (response time, error rate, database queries)
- Set up alerts for critical failures

#### **MEDIUM: Database Migrations**
**Issue:** No migration system detected
**Risk:** Difficult schema updates, data loss
**Recommendation:**
- Implement migration system (migrate-mongo)
- Version control database schema changes
- Test migrations in staging environment

#### **LOW: API Documentation**
**Issue:** API documentation may be incomplete
**Risk:** Difficult integration, unclear contracts
**Recommendation:**
- Use OpenAPI/Swagger for API documentation
- Generate documentation from code
- Include request/response examples
- Document error responses

---

## 5. 🧪 Testing & Quality Assurance

### ✅ Testing Strengths

1. **Test Framework**: Jest and Supertest configured
2. **Test Database**: MongoDB Memory Server for isolated tests
3. **Test Coverage**: Some tests exist for critical paths

### ⚠️ Testing Gaps & Recommendations

#### **HIGH: Test Coverage**
**Issue:** Limited test coverage
**Risk:** Regression bugs, difficult refactoring
**Recommendation:**
- Aim for 80%+ code coverage
- Write unit tests for all controllers
- Add integration tests for critical flows
- Test error cases and edge cases

#### **MEDIUM: Frontend Testing**
**Issue:** No frontend tests detected
**Risk:** UI bugs, regression issues
**Recommendation:**
- Add React Testing Library tests
- Test critical user flows (login, submission, review)
- Add E2E tests (Cypress, Playwright)
- Test accessibility

#### **MEDIUM: Security Testing**
**Issue:** No security tests detected
**Risk:** Undetected vulnerabilities
**Recommendation:**
- Add tests for authentication/authorization
- Test input validation
- Test rate limiting
- Perform security audits regularly

#### **LOW: Performance Testing**
**Issue:** No performance tests
**Risk:** Performance degradation under load
**Recommendation:**
- Add load testing (Artillery, k6)
- Test database query performance
- Monitor API response times
- Set performance budgets

---

## 6. 📦 Dependency Management

### ✅ Dependency Strengths

1. **Modern Versions**: Using recent versions of dependencies
2. **Security**: Regular dependency updates needed

### ⚠️ Dependency Concerns

#### **HIGH: Dependency Vulnerabilities**
**Issue:** Need regular security audits
**Risk:** Known vulnerabilities in dependencies
**Recommendation:**
- Run `npm audit` regularly
- Use `npm audit fix` for automatic fixes
- Set up automated dependency updates (Dependabot)
- Review and update dependencies quarterly

#### **MEDIUM: Unused Dependencies**
**Issue:** May have unused dependencies
**Risk:** Larger bundle size, security surface
**Recommendation:**
- Use `depcheck` to find unused dependencies
- Remove unused packages
- Document why each dependency is needed

#### **LOW: Dependency Locking**
**Issue:** `package-lock.json` present (good)
**Recommendation:**
- Commit `package-lock.json` to version control
- Use exact versions for critical dependencies
- Document major dependency choices

---

## 7. 🚀 Deployment & DevOps

### ✅ Deployment Strengths

1. **Vercel Configuration**: `vercel.json` properly configured
2. **Build Scripts**: Production build scripts defined
3. **Environment Variables**: Proper environment variable usage

### ⚠️ Deployment Recommendations

#### **HIGH: CI/CD Pipeline**
**Issue:** No CI/CD pipeline detected
**Risk:** Manual deployment errors, lack of automation
**Recommendation:**
- Set up GitHub Actions or similar CI/CD
- Automated testing on pull requests
- Automated deployment to staging
- Manual approval for production

#### **MEDIUM: Environment Management**
**Issue:** Need clear environment separation
**Risk:** Configuration errors, data mixing
**Recommendation:**
- Separate dev, staging, and production environments
- Use different databases per environment
- Environment-specific configuration files
- Document environment setup process

#### **MEDIUM: Database Backups**
**Issue:** Need backup strategy
**Risk:** Data loss
**Recommendation:**
- Implement automated database backups
- Test backup restoration process
- Store backups in multiple locations
- Document disaster recovery procedure

#### **LOW: Health Checks**
**Issue:** Need application health endpoints
**Risk:** Unable to monitor application status
**Recommendation:**
- Add `/health` endpoint
- Check database connectivity
- Check external service dependencies
- Return appropriate status codes

---

## 8. 📝 Documentation

### ✅ Documentation Strengths

1. **README.md**: Comprehensive README exists
2. **Project Structure**: Well-documented structure

### ⚠️ Documentation Gaps

#### **MEDIUM: Code Documentation**
**Issue:** Limited inline code comments
**Recommendation:**
- Add JSDoc to all functions
- Document complex algorithms
- Explain business logic decisions

#### **LOW: Architecture Documentation**
**Issue:** No architecture diagrams
**Recommendation:**
- Create system architecture diagram
- Document data flow diagrams
- Document API contracts
- Create deployment diagrams

---

## 9. 🎯 Priority Action Items

### 🔴 Critical (Fix Immediately)

1. **Add Security Headers** - Implement Helmet.js middleware
2. **Input Validation** - Add comprehensive validation to all endpoints
3. **Database Indexes** - Add indexes on frequently queried fields
4. **Error Handling** - Implement centralized error handling

### 🟡 High Priority (Fix Soon)

1. **JWT Security** - Implement token refresh and secure storage
2. **API Key Security** - Verify secure storage of API keys
3. **Test Coverage** - Increase test coverage to 80%+
4. **Logging** - Implement structured logging
5. **Query Optimization** - Optimize database queries

### 🟢 Medium Priority (Plan for Next Sprint)

1. **Code Comments** - Add JSDoc documentation
2. **CI/CD Pipeline** - Set up automated testing and deployment
3. **Monitoring** - Implement APM and error tracking
4. **Caching** - Implement Redis caching layer
5. **API Versioning** - Add versioning to API

### 🔵 Low Priority (Nice to Have)

1. **TypeScript Migration** - Consider migrating to TypeScript
2. **Performance Testing** - Add load testing
3. **Architecture Diagrams** - Create visual documentation
4. **Frontend Testing** - Add React component tests

---

## 10. 📊 Summary Scorecard

| Category | Score | Status |
|----------|-------|--------|
| **Security** | 6/10 | ⚠️ Needs Improvement |
| **Code Quality** | 7/10 | ✅ Good |
| **Performance** | 6/10 | ⚠️ Needs Improvement |
| **Architecture** | 8/10 | ✅ Excellent |
| **Testing** | 4/10 | ⚠️ Needs Improvement |
| **Documentation** | 7/10 | ✅ Good |
| **Overall** | 6.3/10 | ⚠️ Good Foundation, Needs Hardening |

---

## 11. 🎓 Best Practices Recommendations

### Security Best Practices

1. **Defense in Depth**: Implement multiple security layers
2. **Principle of Least Privilege**: Limit user permissions
3. **Secure by Default**: Default to secure configurations
4. **Regular Audits**: Perform security audits quarterly
5. **Security Training**: Educate team on security best practices

### Code Quality Best Practices

1. **Code Reviews**: Require peer reviews for all changes
2. **Linting**: Use ESLint and Prettier for code consistency
3. **Pre-commit Hooks**: Run tests and linting before commits
4. **Refactoring**: Regularly refactor technical debt
5. **Documentation**: Keep documentation up to date

### Performance Best Practices

1. **Monitor First**: Measure before optimizing
2. **Database Optimization**: Index properly, optimize queries
3. **Caching Strategy**: Cache frequently accessed data
4. **Load Testing**: Test under realistic load
5. **Performance Budgets**: Set and monitor performance budgets

---

## 12. 📚 Resources & References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#security)

---

## 13. ✅ Conclusion

The Nexus AI platform demonstrates a solid architectural foundation with good separation of concerns and modern technology choices. The codebase is well-organized and follows many best practices.

**Key Strengths:**
- Clear project structure
- Modern tech stack
- Good component organization
- Real-time features implemented

**Areas for Improvement:**
- Security hardening (headers, validation, JWT)
- Performance optimization (indexes, caching, queries)
- Test coverage expansion
- Monitoring and observability

With the recommended improvements, this platform will be production-ready and scalable. The priority should be on security and performance optimizations, followed by comprehensive testing and monitoring.

---

**Report Generated:** January 2025  
**Next Review:** Recommended in 3 months or after major changes

---

*This audit report is a comprehensive analysis based on codebase structure, dependencies, and best practices. For specific implementation details, refer to the actual source code.*   


# Election Campaign Website

A modern, responsive single-page application (SPA) built with React and TypeScript for an election campaign. The website features AI-powered brand analysis, dynamic content management, and a fully Arabic (RTL) interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Project Overview

This is a professional election campaign website featuring:

- **Dynamic Hero Section** with candidate information and countdown timer
- **AI-Powered Brand Analysis** that extracts brand colors and information from video frames
- **Campaign Platform Display** showcasing 8 key platform points
- **News & Gallery Sections** with interactive carousels
- **Testimonials Section** with auto-rotating testimonials
- **Contact Form** integrated with Formspree
- **Dark Mode Support** with smooth theme transitions
- **Fully Responsive Design** optimized for all devices
- **RTL (Right-to-Left) Layout** for Arabic content

## 🛠 Tech Stack

### Core Technologies
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.0** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### State Management
- **Zustand 4.4.7** - Lightweight state management

### UI & Animation
- **Framer Motion 11.0.8** - Animation library
- **Lucide React** - Icon library
- **Headless UI** - Unstyled UI components
- **GSAP 3.13.0** - Animation library (available but not actively used)

### AI Integration
- **@ai-sdk/openai** - AI SDK for OpenAI-compatible APIs
- **ai (Vercel AI SDK)** - AI utilities
- **Youware AI API** - Custom AI service for brand analysis and copy refinement

### Forms
- **@formspree/react** - Form submission service

### Internationalization (Available but not active)
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   ```bash
   npm run dev
   ```
   The development server should start at `http://localhost:5173` (or the next available port).

## 💻 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

### Development Workflow

1. **Make changes** to files in the `src/` directory
2. **View changes** instantly in the browser (HMR)
3. **Build for production** after completing features:
   ```bash
   npm run build
   ```
4. **Preview production build** locally:
   ```bash
   npm run preview
   ```

### Important Notes

- Always run `npm run build` after making code changes to ensure there are no build errors
- Use absolute paths (`/assets/...`) for images and media files in production
- The AI configuration is loaded from `yw_manifest.json` and injected into `globalThis.ywConfig`

## 🏗 Building for Production

### Create Production Build

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Processes and optimizes CSS (Tailwind)
- Bundles and minifies assets
- Outputs production-ready files to the `dist/` directory

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

### Build Output

The `dist/` directory contains:
- `index.html` - Main HTML file
- `assets/` - Optimized JavaScript, CSS, and static assets

## 📁 Project Structure

```
Website/
├── dist/                    # Production build output (generated)
├── node_modules/            # Dependencies (generated)
├── public/                  # Static assets
│   └── assets/             # Images, videos, media files
│       ├── gallery1-8.jpg   # Gallery images
│       ├── news1-6.jpg      # News section images
│       ├── hero-bg.jpg      # Hero background
│       ├── candidate.png    # Candidate photo
│       └── *.mp4           # Video files (if any)
├── src/
│   ├── ai/                 # AI integration modules
│   │   ├── brand.ts        # Brand analysis from images
│   │   ├── copy.ts         # Copy refinement service
│   │   └── useVideoBrandAnalysis.ts  # React hook for video analysis
│   ├── components/         # React components
│   │   ├── About.tsx       # Candidate biography
│   │   ├── ContactForm.tsx # Contact form (Formspree)
│   │   ├── Countdown.tsx   # Election countdown timer
│   │   ├── Footer.tsx      # Site footer
│   │   ├── Gallery.tsx     # Photo/video gallery
│   │   ├── Hero.tsx        # Hero section (legacy)
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── NewsSection.tsx # Campaign news carousel
│   │   ├── NewsTicker.tsx  # Scrolling news ticker
│   │   ├── PlatformList.tsx # Campaign platform points
│   │   ├── Preloader.tsx   # Loading screen
│   │   ├── Stats.tsx       # Statistics display
│   │   ├── Testimonials.tsx # Support messages
│   │   └── VideoHero.tsx   # Main hero section
│   ├── data/               # Static data
│   │   └── platform.ts     # Platform points data
│   ├── pages/              # Page components
│   │   └── Home.tsx        # Main homepage
│   ├── store/              # State management
│   │   └── brand.ts        # Zustand store for brand state
│   ├── styles/             # Style utilities
│   │   └── motion.ts       # Animation variants
│   ├── types/              # TypeScript types
│   │   └── platform.ts     # Platform point types
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles + Tailwind imports
│   └── vite-env.d.ts       # Vite type definitions
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Node
├── tailwind.config.cjs     # Tailwind CSS configuration
├── postcss.config.cjs      # PostCSS configuration
├── yw_manifest.json        # AI configuration manifest
└── YOUWARE.md              # Youware-specific documentation (Arabic)
```

## ✨ Key Features

### 1. **AI-Powered Brand Analysis**
   - Automatically extracts brand colors, candidate name, and slogan from video frames
   - Updates UI dynamically based on analyzed content
   - Configured via `yw_manifest.json`

### 2. **Dynamic Content Management**
   - Zustand store for centralized state management
   - Real-time updates to candidate information
   - Responsive to AI analysis results

### 3. **Interactive Components**
   - **News Carousel**: Drag-to-scroll news section
   - **Gallery**: Tabbed photo/video gallery with navigation
   - **Testimonials**: Auto-rotating testimonial carousel
   - **Countdown Timer**: Real-time election countdown

### 4. **Form Integration**
   - Contact form powered by Formspree
   - Form ID: `xvglljdq`
   - Success/error handling with user feedback

### 5. **Dark Mode**
   - Toggle between light and dark themes
   - Preference saved in localStorage
   - Smooth transitions between themes

### 6. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm, md, lg, xl
   - Optimized for all screen sizes

### 7. **RTL Support**
   - Full right-to-left layout for Arabic content
   - Proper text alignment and navigation flow

### 8. **Performance Optimizations**
   - Code splitting via Vite
   - Optimized asset loading
   - Lazy loading for images (via browser)
   - Smooth animations with Framer Motion

## ⚙️ Configuration

### AI Configuration (`yw_manifest.json`)

The AI services are configured in `yw_manifest.json`:

```json
{
  "project_type": "react",
  "ai_config": {
    "brand_extractor": {
      "model": "gemini-2.5-flash",
      "temperature": 0.3,
      "maxTokens": 4000,
      "system_prompt": "..."
    },
    "copy_refiner": {
      "model": "claude-4-sonnet",
      "temperature": 0.8,
      "maxTokens": 2000,
      "system_prompt": "..."
    }
  }
}
```

### Tailwind Configuration (`tailwind.config.cjs`)

Custom theme includes:
- **Primary Color**: Deep green (`#144d2e`) for campaign branding
- **Accent Color**: Rich red (`#c62828`) for CTAs
- **Custom Font**: Cairo (Arabic-friendly)
- **Custom Animations**: Marquee animation for news ticker

### TypeScript Configuration

- Strict mode enabled
- ES2020 target
- React JSX runtime
- Module resolution: bundler

## 🚢 Deployment

### Static Hosting

This is a static site and can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3 + CloudFront**: Upload `dist/` to S3 bucket
- **Any static hosting service**

### Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Test the build locally**:
   ```bash
   npm run preview
   ```

3. **Deploy the `dist/` directory** to your hosting service

### Environment Variables

Currently, no environment variables are required. AI API keys are handled via Youware configuration.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:

1. **Clear cache and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check TypeScript errors**:
   ```bash
   npx tsc --noEmit
   ```

3. **Verify all imports** are correct

### AI Configuration Not Loading

- Ensure `yw_manifest.json` exists in the root directory
- Check that the Youware Vite plugin is configured (if using)
- Verify `globalThis.ywConfig` is populated in the browser console

### Form Submission Issues

- Verify Formspree form ID is correct in `ContactForm.tsx`
- Check Formspree dashboard for submission logs
- Ensure form fields match Formspree configuration

## 🤝 Contributing

### Development Guidelines

1. **Code Style**:
   - Use TypeScript for all new files
   - Follow existing component patterns
   - Use functional components with hooks

2. **Component Structure**:
   - One component per file
   - Export as named exports
   - Use TypeScript interfaces for props

3. **Styling**:
   - Use Tailwind CSS classes
   - Follow existing color scheme
   - Maintain RTL support for Arabic

4. **State Management**:
   - Use Zustand for global state
   - Keep component state local when possible

5. **Testing**:
   - Always run `npm run build` before committing
   - Test in both light and dark modes
   - Verify responsive behavior

## 📄 License

This project is private and proprietary.

## 👤 Author

Designed and developed by **Mohamed Eslam**

---

**Note**: This is a campaign website. All content is specific to the election campaign and should be updated accordingly for different campaigns.
# Code Audit Report

**Project**: Election Campaign Website  
**Date**: 2025  
**Auditor**: Senior Technical Lead  
**Scope**: Full codebase analysis covering code quality, security, performance, and best practices

---

## Executive Summary

This audit examined the entire codebase of the election campaign website. The project is well-structured with modern React patterns, but several areas require attention:

- **Security**: ⚠️ **CRITICAL** - Hardcoded API key found
- **Code Quality**: ⚠️ **MODERATE** - Mixed language comments, some code duplication
- **Performance**: ✅ **GOOD** - Well-optimized with modern tools
- **Architecture**: ✅ **GOOD** - Clean component structure

**Overall Grade**: B+ (Good with room for improvement)

---

## 1. Security Audit

### 🔴 CRITICAL ISSUES

#### 1.1 Hardcoded API Key
**Location**: `src/ai/brand.ts:38`, `src/ai/copy.ts:26`

```typescript
const openai = createOpenAI({ 
  baseURL: "https://api.youware.com/public/v1/ai", 
  apiKey: "sk-YOUWARE"  // ⚠️ HARDCODED API KEY
});
```

**Risk Level**: HIGH  
**Impact**: If this is a real API key, it could be exposed in client-side code, leading to unauthorized API usage and potential cost overruns.

**Recommendation**:
- Move API key to environment variables
- Use Vite's `import.meta.env` for environment variables
- Create `.env.local` file (add to `.gitignore`)
- Update code:
  ```typescript
  const apiKey = import.meta.env.VITE_YOUWARE_API_KEY || "sk-YOUWARE";
  ```

#### 1.2 Formspree Form ID Exposure
**Location**: `src/components/ContactForm.tsx:8`

```typescript
const [state, handleSubmit] = useForm("xvglljdq");
```

**Risk Level**: LOW-MEDIUM  
**Impact**: Form ID is exposed in client code. While Formspree IDs are typically public, consider moving to environment variables for consistency.

**Recommendation**:
- Move to environment variable: `VITE_FORMSPREE_ID`
- Add rate limiting on Formspree dashboard
- Implement client-side validation to prevent spam

### 🟡 MODERATE ISSUES

#### 1.3 No Input Sanitization
**Location**: `src/components/ContactForm.tsx`

**Issue**: User input is sent directly to Formspree without client-side sanitization.

**Recommendation**:
- Add input validation using Zod (already in dependencies)
- Sanitize HTML content if allowing rich text
- Implement character limits

#### 1.4 No CSRF Protection
**Issue**: Forms don't implement CSRF tokens (though Formspree may handle this server-side).

**Recommendation**:
- Verify Formspree's CSRF protection
- Consider adding additional client-side checks

### ✅ SECURITY STRENGTHS

- No sensitive data stored in localStorage (except dark mode preference)
- No database credentials exposed
- Using HTTPS for external API calls
- Proper use of `rel="noopener noreferrer"` for external links

---

## 2. Code Quality Audit

### 🟡 MODERATE ISSUES

#### 2.1 Mixed Language Comments
**Issue**: Comments are in both Arabic and English, making code less accessible to international developers.

**Examples**:
- `src/components/Navbar.tsx`: Mix of Arabic and English comments
- `src/ai/copy.ts`: Arabic comments with English code

**Impact**: Reduces code maintainability for non-Arabic speakers.

**Recommendation**:
- Standardize on English for code comments
- Keep Arabic for user-facing content only
- Add JSDoc comments in English for public APIs

#### 2.2 Code Duplication

**Location**: Multiple components

**Examples**:
1. **Duplicate Testimonials**: `src/components/Testimonials.tsx:22` and `src/components/Testimonials.tsx:144` - Same testimonial appears twice (id: 22 and id: 7)
2. **Repeated Animation Patterns**: Similar animation code across components
3. **Repeated Styling Patterns**: Similar Tailwind class combinations

**Recommendation**:
- Extract common animation variants to `src/styles/motion.ts`
- Create reusable component variants
- Use composition patterns for repeated UI elements
- Remove duplicate testimonials

#### 2.3 Inconsistent Error Handling

**Location**: `src/ai/useVideoBrandAnalysis.ts:28-30`

```typescript
catch (err: any) {
  console.error("API Error - Brand analysis failed:", err?.message || err);
}
```

**Issues**:
- Using `any` type
- Only logging to console, no user feedback
- No retry mechanism

**Recommendation**:
- Create proper error types
- Add user-facing error messages
- Implement retry logic for network failures
- Use error boundaries for React errors

#### 2.4 Missing Type Safety

**Locations**:
- `src/components/NewsSection.tsx:93` - `onDragEnd` uses `any` types
- `src/data/platform.ts:8` - Icon type is `any`

**Recommendation**:
```typescript
// Instead of:
icon: any

// Use:
icon: LucideIcon
```

#### 2.5 Dead Code

**Location**: `src/components/Hero.tsx`

**Issue**: `Hero.tsx` exists but is not used (replaced by `VideoHero.tsx`).

**Recommendation**: Remove unused files to reduce confusion.

### ✅ CODE QUALITY STRENGTHS

- Good TypeScript usage overall
- Consistent component structure
- Proper use of React hooks
- Clean separation of concerns
- Well-organized file structure

---

## 3. Performance Audit

### ✅ STRENGTHS

#### 3.1 Build Optimization
- Vite provides excellent build performance
- Code splitting enabled
- Asset optimization

#### 3.2 Runtime Performance
- Efficient React rendering with proper keys
- Framer Motion animations are GPU-accelerated
- Lazy loading potential (not currently implemented)

### 🟡 OPTIMIZATION OPPORTUNITIES

#### 3.1 Large Testimonials Array
**Location**: `src/components/Testimonials.tsx:6-243`

**Issue**: 38 hardcoded testimonials increase bundle size.

**Recommendation**:
- Move to separate JSON file
- Load dynamically or paginate
- Consider virtual scrolling for large lists

#### 3.2 Image Optimization
**Location**: `public/assets/`

**Issue**: No image optimization strategy visible.

**Recommendation**:
- Use WebP format with fallbacks
- Implement lazy loading for images
- Add `loading="lazy"` attribute to images
- Consider using a CDN for assets

#### 3.3 Unused Dependencies
**Location**: `package.json`

**Potential Unused**:
- `cannon-es` - Physics engine (not found in code)
- `matter-js` - Physics engine (not found in code)
- `three` - 3D library (not found in code)
- `i18next` packages - i18n not actively used

**Recommendation**:
- Audit dependencies: `npm run build` and check for unused imports
- Remove unused packages to reduce bundle size
- Consider using `depcheck` tool

#### 3.4 No Code Splitting for Routes
**Issue**: Single-page app, but could benefit from route-based code splitting if routes are added.

**Recommendation**:
- Use React.lazy() when adding routes
- Implement route-based code splitting

### 📊 Performance Metrics

| Metric | Status | Notes |
|--------|--------|-------|
| Bundle Size | ⚠️ Unknown | Run `npm run build` and analyze |
| First Contentful Paint | ✅ Good | Fast with Vite |
| Time to Interactive | ✅ Good | React 18 optimizations |
| Image Loading | ⚠️ Could improve | No lazy loading |
| Animation Performance | ✅ Excellent | Framer Motion GPU-accelerated |

---

## 4. Architecture & Best Practices

### ✅ STRENGTHS

1. **Component Structure**: Well-organized, single responsibility
2. **State Management**: Appropriate use of Zustand for global state
3. **Type Safety**: Good TypeScript coverage
4. **Styling**: Consistent Tailwind usage
5. **File Organization**: Logical directory structure

### 🟡 IMPROVEMENTS NEEDED

#### 4.1 Missing Error Boundaries
**Issue**: No React error boundaries to catch component errors.

**Recommendation**:
```typescript
// Add ErrorBoundary component
class ErrorBoundary extends React.Component {
  // Implementation
}
```

#### 4.2 No Loading States
**Location**: AI API calls

**Issue**: No loading indicators for async operations.

**Recommendation**:
- Add loading states to AI operations
- Show skeleton loaders
- Provide user feedback

#### 4.3 Hardcoded Data
**Locations**:
- `src/components/NewsSection.tsx:6-61` - Hardcoded news items
- `src/components/Testimonials.tsx:6-243` - Hardcoded testimonials

**Recommendation**:
- Move to JSON files or API
- Consider CMS integration
- Enable content updates without code changes

#### 4.4 No Environment Configuration
**Issue**: No `.env` file structure for different environments.

**Recommendation**:
- Create `.env.example` template
- Use environment variables for:
  - API endpoints
  - Form IDs
  - Feature flags

#### 4.5 Missing Documentation
**Issue**: Limited inline documentation for complex logic.

**Recommendation**:
- Add JSDoc comments for functions
- Document AI integration flow
- Add component prop documentation

---

## 5. Accessibility Audit

### 🟡 ISSUES FOUND

#### 5.1 Missing ARIA Labels
**Location**: Multiple components

**Examples**:
- Navigation buttons lack aria-labels
- Form inputs could have better labels
- Icon-only buttons need descriptions

**Recommendation**:
```typescript
<button aria-label="Previous testimonial">
  <ChevronLeft />
</button>
```

#### 5.2 Keyboard Navigation
**Issue**: Some interactive elements may not be fully keyboard accessible.

**Recommendation**:
- Test full keyboard navigation
- Ensure focus indicators are visible
- Add keyboard shortcuts where appropriate

#### 5.3 Color Contrast
**Issue**: Not verified against WCAG standards.

**Recommendation**:
- Test color contrast ratios
- Ensure minimum 4.5:1 for text
- Test in both light and dark modes

### ✅ ACCESSIBILITY STRENGTHS

- Semantic HTML usage
- Proper heading hierarchy
- Alt text for images (where present)
- RTL support for Arabic

---

## 6. Testing & Quality Assurance

### 🔴 CRITICAL GAPS

#### 6.1 No Test Suite
**Issue**: No unit tests, integration tests, or E2E tests found.

**Recommendation**:
- Add Vitest for unit testing
- Test critical components (forms, AI integration)
- Add E2E tests with Playwright or Cypress
- Aim for 70%+ code coverage

#### 6.2 No Linting Configuration
**Issue**: No ESLint or Prettier configuration visible.

**Recommendation**:
- Add ESLint with React plugin
- Configure Prettier for code formatting
- Add pre-commit hooks (Husky)
- Enforce consistent code style

#### 6.3 No Type Checking in CI
**Issue**: No automated type checking pipeline.

**Recommendation**:
- Add `tsc --noEmit` to CI/CD
- Fail builds on type errors

---

## 7. Dependency Audit

### Security Vulnerabilities
**Action Required**: Run `npm audit` to check for known vulnerabilities.

```bash
npm audit
npm audit fix
```

### Dependency Versions
**Status**: Most dependencies are up-to-date, but verify:
- React 18.3.1 (latest stable)
- Vite 7.0.0 (latest)
- TypeScript 5.8.3 (latest)

**Recommendation**: Regularly update dependencies and test after updates.

---

## 8. Recommendations Summary

### 🔴 High Priority

1. **Move API key to environment variables** (Security)
2. **Remove duplicate testimonials** (Code Quality)
3. **Add error boundaries** (Reliability)
4. **Implement input validation** (Security)
5. **Add loading states for async operations** (UX)

### 🟡 Medium Priority

1. **Standardize comment language to English** (Maintainability)
2. **Extract common animation patterns** (DRY principle)
3. **Move hardcoded data to JSON/API** (Flexibility)
4. **Add image lazy loading** (Performance)
5. **Remove unused dependencies** (Bundle size)
6. **Add ARIA labels** (Accessibility)

### 🟢 Low Priority

1. **Add JSDoc comments** (Documentation)
2. **Create `.env.example`** (Configuration)
3. **Add keyboard navigation improvements** (Accessibility)
4. **Consider CMS integration** (Content management)

---

## 9. Action Items Checklist

### Immediate (This Week)
- [ ] Move API key to environment variable
- [ ] Remove duplicate testimonials
- [ ] Add error boundaries
- [ ] Run `npm audit` and fix vulnerabilities

### Short Term (This Month)
- [ ] Standardize comments to English
- [ ] Extract common animation patterns
- [ ] Add input validation
- [ ] Implement loading states
- [ ] Add ESLint and Prettier

### Long Term (Next Quarter)
- [ ] Add test suite (Vitest + Playwright)
- [ ] Move hardcoded data to API/CMS
- [ ] Implement image optimization
- [ ] Add comprehensive accessibility improvements
- [ ] Set up CI/CD pipeline

---

## 10. Conclusion

The codebase demonstrates solid modern React practices with good architecture and performance. However, security concerns (hardcoded API key) and code quality issues (mixed languages, duplication) need immediate attention.

**Priority Focus Areas**:
1. Security hardening
2. Code quality improvements
3. Testing infrastructure
4. Performance optimizations

With the recommended improvements, this codebase can achieve an **A grade** and production-ready status.

---

**Report Generated**: 2025  
**Next Review**: Recommended in 3 months or after major changes
   

# Legal Document Simplifier

A modern web application that uses AI (Google Gemini) to analyze and simplify complex legal documents. The application can process single documents to extract key obligations and risks, or compare two documents to identify differences and missing clauses. All output is provided in clear, simple Arabic language.

## 🎯 Features

- **Document Simplification**: Analyze a single legal document to extract:
  - Top 3 most crucial user obligations
  - Top 2 highest-risk clauses favoring the service provider/landlord
  
- **Document Comparison**: Compare two legal documents to identify:
  - 3 most crucial differences between documents
  - 1 major clause present in Document 2 but missing in Document 1

- **Real-time Document Assessment**: Automatic document type detection as you type (debounced)

- **Export/Print**: Save or print analysis reports as PDF

- **Modern UI**: Beautiful, responsive design with smooth animations

- **Bilingual Support**: Results displayed in Arabic with English labels

## 🛠️ Tech Stack

### Backend
- **Python 3.x**
- **Flask** - Web framework
- **google-genai** - Google Gemini AI API client
- **python-dotenv** - Environment variable management
- **requests** - HTTP library

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **External Libraries**:
  - Google Fonts (Montserrat, Lato)
  - Font Awesome 6.4.0
  - AOS (Animate On Scroll) 2.3.1

### AI/ML
- **Google Gemini 2.5 Flash** - AI model for document analysis
- **Structured JSON Output** - Schema-validated responses

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.7+** (recommended: Python 3.9 or higher)
- **pip** (Python package manager)
- **Google Gemini API Key** - Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd AI-Legal-Document-Analyzer-main
```

### Step 2: Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_secret_key_here
```

**Important Notes:**
- Replace `your_gemini_api_key_here` with your actual Google Gemini API key
- Replace `your_secret_key_here` with a random secret string (for Flask session security)
- Never commit the `.env` file to version control

### Step 5: Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000` (or `http://127.0.0.1:5000`).

Open your web browser and navigate to the URL to access the application.

## 📁 Project Structure

```
AI-Legal-Document-Analyzer-main/
├── app.py                 # Main Flask application
│   ├── Routes: /, /simplify, /assess
│   ├── AI integration with Gemini
│   └── Text preprocessing utilities
│
├── requirements.txt       # Python dependencies
│
├── .env                  # Environment variables (not in repo)
│
├── static/
│   ├── main.js           # Frontend JavaScript logic
│   │   ├── Form handling
│   │   ├── API communication
│   │   ├── Dynamic UI updates
│   │   └── Export/print functionality
│   │
│   └── style.css         # Modern CSS styling
│       ├── Responsive design
│       ├── Animations
│       └── Print media queries
│
└── templates/
    └── index.html        # Main HTML interface
        ├── Document input forms
        ├── Results display area
        └── Footer with social links
```

## 🔄 How It Works

### Data Flow

1. **User Input**: User pastes legal document(s) into the web form
2. **Frontend Processing**: JavaScript validates input and sends POST request to `/simplify`
3. **Text Preprocessing**: Backend cleans and normalizes the text (removes excessive whitespace)
4. **AI Processing**: Flask routes the request to Google Gemini API with structured prompts
5. **Response Handling**: AI returns structured JSON; backend parses and returns to frontend
6. **UI Rendering**: JavaScript dynamically renders results with animations
7. **Optional Assessment**: Real-time document type detection via `/assess` endpoint

### API Endpoints

#### `GET /`
Renders the main HTML interface.

#### `POST /simplify`
Analyzes legal document(s) and returns structured analysis.

**Request Body (Form Data):**
- `legal_text_1` (required): First document text
- `legal_text_2` (optional): Second document text (for comparison mode)

**Response:**
```json
{
  "success": true,
  "analysis": {
    "obligations": ["...", "...", "..."],
    "risks": ["...", "..."]
  },
  "mode": "simplification"
}
```

Or for comparison mode:
```json
{
  "success": true,
  "analysis": {
    "differences": ["...", "...", "..."],
    "missing_clause": "..."
  },
  "mode": "comparison"
}
```

#### `POST /assess`
Quickly assesses document type and validity.

**Request Body (Form Data):**
- `text`: Document text to assess

**Response:**
```json
{
  "success": true,
  "type": "Contract",
  "valid": true
}
```

## 🎨 Key Features Explained

### Document Simplification Mode
When only one document is provided, the AI extracts:
- **Obligations**: The 3 most crucial obligations the user must fulfill
- **Risks**: The 2 highest-risk clauses that favor the service provider/landlord

### Document Comparison Mode
When two documents are provided, the AI identifies:
- **Differences**: The 3 most crucial differences between the documents
- **Missing Clause**: The most significant clause present in Document 2 but missing in Document 1

### Real-time Assessment
As you type in the first textarea, the application automatically detects the document type after a 1-second delay (debounced). This helps users understand if their input is being recognized as a legal document.

## 🔒 Security Considerations

- **API Keys**: Stored in `.env` file (never commit to version control)
- **Secret Key**: Used for Flask session security
- **Input Validation**: Basic validation on both frontend and backend
- **Error Handling**: Graceful error handling for API failures

## 🐛 Troubleshooting

### Application won't start
- Ensure Python 3.7+ is installed: `python --version`
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check that `.env` file exists with valid `GEMINI_API_KEY`

### "AI service is unavailable" error
- Verify your `GEMINI_API_KEY` is correct in `.env`
- Check your internet connection
- Ensure you have API quota remaining on Google Gemini

### Results not displaying
- Check browser console for JavaScript errors
- Verify the document text is sufficient (at least 100 characters)
- Ensure the document is in a format the AI can process

## 📝 Development Notes

- The application runs in debug mode by default (`debug=True` in `app.py`)
- For production, set `debug=False` and use a production WSGI server (e.g., Gunicorn)
- Consider adding rate limiting for production use
- Add `.env` to `.gitignore` to prevent committing secrets

## 👤 Author

**Mohammed Eslam**

- WhatsApp: [Contact](https://wa.me/201050586075)
- LinkedIn: [Mohammed Maklad](https://www.linkedin.com/in/mohammed-maklad-469557381/)
- GitHub: [Mohamed-Eslam777](https://github.com/Mohamed-Eslam777)

## 📄 License

This project is open source and available for use and modification.

## 🙏 Acknowledgments

- Google Gemini AI for document analysis capabilities
- Flask community for the excellent web framework
- All open-source libraries used in this project

---

**Made with ❤️ by Mohammed Eslam**
# Code Audit Report
**AI Legal Document Analyzer**  
**Date:** 2024  
**Auditor:** Senior Technical Lead & Documentation Expert

---

## Executive Summary

This audit examines the codebase for code quality, security vulnerabilities, performance issues, and best practices. The application is a Flask-based web service that uses Google Gemini AI to analyze legal documents. Overall, the codebase is well-structured and functional, but several improvements are recommended for production readiness.

**Overall Assessment:** ⚠️ **Good Foundation, Needs Production Hardening**

---

## 1. Code Quality Analysis

### ✅ Strengths

1. **Clean Architecture**
   - Clear separation of concerns (routes, utilities, configuration)
   - Well-organized file structure
   - Single responsibility principle mostly followed

2. **Readable Code**
   - Descriptive function names (`clean_document_text`, `simplify`, `assess`)
   - Good use of comments in critical sections
   - Consistent code formatting

3. **Error Handling**
   - Try-except blocks implemented for AI API calls
   - Graceful degradation when API is unavailable
   - User-friendly error messages

### ⚠️ Issues & Recommendations

#### 1.1 Missing Input Validation
**Severity:** Medium  
**Location:** `app.py` lines 89-98

**Issue:**
```python
legal_text_1 = request.form.get("legal_text_1")
legal_text_2 = request.form.get("legal_text_2")
# No validation for:
# - Maximum length limits
# - Content type validation
# - Malicious input patterns
```

**Recommendation:**
- Add maximum length validation (e.g., 50,000 characters)
- Implement content sanitization
- Add rate limiting per IP address
- Validate text encoding

**Example Fix:**
```python
MAX_TEXT_LENGTH = 50000

def validate_text(text):
    if not text:
        return None
    if len(text) > MAX_TEXT_LENGTH:
        raise ValueError(f"Text exceeds maximum length of {MAX_TEXT_LENGTH} characters")
    # Additional validation...
    return text
```

#### 1.2 Hardcoded Configuration Values
**Severity:** Low  
**Location:** `app.py` lines 138, 200

**Issue:**
- Model name hardcoded: `'gemini-2.5-flash'`
- Text truncation limit hardcoded: `text[:2000]`
- No configuration file for these values

**Recommendation:**
- Move to environment variables or config file
- Allow model selection via configuration

#### 1.3 Missing Type Hints
**Severity:** Low  
**Location:** Throughout `app.py`

**Issue:**
- No type hints for function parameters and return values
- Reduces code maintainability and IDE support

**Recommendation:**
```python
from typing import Optional, Dict, Any

def clean_document_text(text: Optional[str]) -> str:
    """Removes excessive whitespace..."""
    ...
```

#### 1.4 Inconsistent Error Handling
**Severity:** Medium  
**Location:** `app.py` lines 157-161, 215-219

**Issue:**
- Some errors return generic messages
- Error logging is minimal (only `print()` statements)
- No structured logging

**Recommendation:**
- Implement proper logging with Python's `logging` module
- Use different log levels (DEBUG, INFO, WARNING, ERROR)
- Log to file in production
- Include request IDs for traceability

#### 1.5 Code Duplication
**Severity:** Low  
**Location:** `app.py` lines 114-127, 184-196

**Issue:**
- Similar schema definition patterns repeated
- Similar error handling patterns

**Recommendation:**
- Create helper functions for schema creation
- Centralize error response formatting

---

## 2. Security Analysis

### ✅ Security Strengths

1. **Environment Variables**
   - API keys stored in `.env` file (not hardcoded)
   - Uses `python-dotenv` for secure key management

2. **No SQL Injection Risk**
   - No database interactions
   - No user-generated SQL queries

3. **CSRF Protection**
   - Flask has built-in CSRF protection (though not explicitly configured)

### 🔴 Critical Security Issues

#### 2.1 Missing `.gitignore` for `.env`
**Severity:** Critical  
**Location:** Root directory

**Issue:**
- `.env` file may be accidentally committed to version control
- Exposes API keys and secrets

**Recommendation:**
Create `.gitignore`:
```
.env
.env.local
*.pyc
__pycache__/
venv/
*.log
```

#### 2.2 No Input Sanitization
**Severity:** High  
**Location:** `app.py` lines 93-95

**Issue:**
- User input sent directly to AI API without sanitization
- Potential for prompt injection attacks
- No validation of text content

**Recommendation:**
- Implement input sanitization
- Add content filtering
- Limit special characters that could manipulate prompts
- Consider using a whitelist approach for allowed characters

#### 2.3 Missing Rate Limiting
**Severity:** High  
**Location:** All routes

**Issue:**
- No protection against abuse
- Vulnerable to DoS attacks
- API costs could escalate from abuse

**Recommendation:**
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["100 per hour"]
)

@app.route("/simplify", methods=["POST"])
@limiter.limit("10 per minute")
def simplify():
    ...
```

#### 2.4 Debug Mode Enabled
**Severity:** Medium  
**Location:** `app.py` line 223

**Issue:**
```python
app.run(debug=True)  # ⚠️ Security risk in production
```

**Recommendation:**
- Use environment variable to control debug mode
- Never enable debug in production
- Use proper WSGI server (Gunicorn, uWSGI)

**Fix:**
```python
if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
    app.run(debug=debug_mode, host="0.0.0.0", port=5000)
```

#### 2.5 Missing HTTPS Enforcement
**Severity:** Medium  
**Location:** Production deployment

**Issue:**
- No HTTPS enforcement
- API keys transmitted over HTTP (if deployed without HTTPS)

**Recommendation:**
- Use reverse proxy (Nginx) with SSL certificates
- Implement HSTS headers
- Use Flask-Talisman for security headers

#### 2.6 Secret Key Management
**Severity:** Medium  
**Location:** `app.py` line 13

**Issue:**
```python
app.secret_key = os.environ.get("SECRET_KEY")
# No fallback or validation
```

**Recommendation:**
- Validate secret key is set and strong
- Generate secure random key if missing (with warning)
- Minimum length requirement (32+ characters)

---

## 3. Performance Analysis

### ✅ Performance Strengths

1. **Debounced Assessment**
   - Smart use of debouncing in frontend (1 second delay)
   - Reduces unnecessary API calls

2. **Text Truncation**
   - Assessment endpoint limits input to 2000 characters
   - Reduces API processing time

### ⚠️ Performance Issues

#### 3.1 No Caching
**Severity:** Medium  
**Location:** All routes

**Issue:**
- Same document analyzed multiple times = multiple API calls
- No caching of results
- Increased API costs and latency

**Recommendation:**
- Implement Redis or in-memory caching
- Cache results based on document hash
- Set appropriate TTL (e.g., 24 hours)

**Example:**
```python
import hashlib
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_cache_key(text):
    return hashlib.sha256(text.encode()).hexdigest()

# Before API call:
cache_key = get_cache_key(legal_text_1)
cached_result = redis_client.get(cache_key)
if cached_result:
    return jsonify(json.loads(cached_result))
```

#### 3.2 Synchronous API Calls
**Severity:** Low  
**Location:** `app.py` lines 137-145

**Issue:**
- Blocking I/O operations
- No async processing
- User waits for entire AI processing

**Recommendation:**
- Consider async/await with `aiohttp` for non-blocking calls
- Or implement background task processing with Celery
- Return job ID and poll for results

#### 3.3 No Request Timeout
**Severity:** Medium  
**Location:** AI API calls

**Issue:**
- No timeout on Gemini API calls
- Could hang indefinitely if API is slow/unresponsive

**Recommendation:**
```python
import requests

response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=contents,
    config=types.GenerateContentConfig(
        system_instruction=system_prompt,
        response_mime_type="application/json",
        response_schema=target_schema,
        timeout=30  # 30 second timeout
    )
)
```

#### 3.4 Large Text Processing
**Severity:** Low  
**Location:** `app.py` line 93

**Issue:**
- No chunking for very large documents
- Entire document sent to API at once
- May hit API token limits

**Recommendation:**
- Implement document chunking for large texts
- Process chunks and aggregate results
- Add progress indicators for long documents

#### 3.5 No Connection Pooling
**Severity:** Low  
**Location:** Gemini client initialization

**Issue:**
- New connections may be created for each request
- No connection reuse

**Recommendation:**
- Verify if `google-genai` client supports connection pooling
- Consider using a singleton pattern for client instance

---

## 4. Code Organization & Best Practices

### ⚠️ Issues

#### 4.1 Missing Configuration Management
**Severity:** Low

**Issue:**
- Configuration scattered throughout code
- No centralized config file

**Recommendation:**
Create `config.py`:
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
    GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    MAX_TEXT_LENGTH = int(os.environ.get("MAX_TEXT_LENGTH", "50000"))
    DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
```

#### 4.2 Missing Tests
**Severity:** High

**Issue:**
- No unit tests
- No integration tests
- No test coverage

**Recommendation:**
- Add pytest for testing
- Create test files:
  - `test_app.py` - Route testing
  - `test_utils.py` - Utility function testing
- Aim for 80%+ code coverage

#### 4.3 Missing API Documentation
**Severity:** Low

**Issue:**
- No OpenAPI/Swagger documentation
- API endpoints not documented

**Recommendation:**
- Add Flask-RESTX or Flask-Swagger
- Document all endpoints with request/response examples

#### 4.4 No Logging Strategy
**Severity:** Medium

**Issue:**
- Only `print()` statements for errors
- No structured logging
- No log rotation

**Recommendation:**
```python
import logging
from logging.handlers import RotatingFileHandler

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s',
    handlers=[
        RotatingFileHandler('app.log', maxBytes=10000000, backupCount=5),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)
```

---

## 5. Frontend Code Quality

### ✅ Strengths

1. **Modern JavaScript**
   - Uses ES6+ features (async/await, arrow functions)
   - Good use of debouncing

2. **Responsive Design**
   - Mobile-friendly CSS
   - Proper media queries

### ⚠️ Issues

#### 5.1 No Error Boundaries
**Severity:** Low

**Issue:**
- JavaScript errors could break entire UI
- No graceful error handling in frontend

**Recommendation:**
- Add try-catch blocks around critical operations
- Implement error boundaries for UI components

#### 5.2 Inline Event Handlers
**Severity:** Low

**Issue:**
- Some event handlers could be better organized
- Code could be more modular

**Recommendation:**
- Consider organizing JavaScript into modules
- Use event delegation where appropriate

#### 5.3 No Input Validation on Frontend
**Severity:** Medium

**Issue:**
- Basic validation exists but could be enhanced
- No character count display
- No file upload validation (if added later)

**Recommendation:**
- Add real-time character count
- Validate text length before submission
- Show helpful error messages

---

## 6. Dependencies & Maintenance

### ⚠️ Issues

#### 6.1 Missing Version Pinning
**Severity:** Medium  
**Location:** `requirements.txt`

**Issue:**
```
Flask
requests
python-dotenv
google-genai
```
No version numbers specified.

**Recommendation:**
```
Flask==3.0.0
requests==2.31.0
python-dotenv==1.0.0
google-genai==0.2.2
```

#### 6.2 No Dependency Security Scanning
**Severity:** Low

**Recommendation:**
- Use `pip-audit` or `safety` to check for vulnerabilities
- Set up automated dependency updates (Dependabot)

---

## 7. Actionable Recommendations Summary

### 🔴 Critical (Fix Immediately)

1. **Create `.gitignore`** - Prevent committing `.env` file
2. **Disable Debug Mode** - Use environment variable for production
3. **Add Rate Limiting** - Protect against abuse
4. **Add Input Sanitization** - Prevent prompt injection attacks

### 🟡 High Priority (Fix Soon)

1. **Add Logging** - Replace `print()` with proper logging
2. **Add Tests** - Unit and integration tests
3. **Add Input Validation** - Maximum length, content validation
4. **Pin Dependency Versions** - Specify exact versions in `requirements.txt`

### 🟢 Medium Priority (Plan for Next Sprint)

1. **Implement Caching** - Reduce API calls and costs
2. **Add Configuration Management** - Centralize config in `config.py`
3. **Add API Documentation** - Swagger/OpenAPI docs
4. **Add Request Timeouts** - Prevent hanging requests
5. **Improve Error Handling** - Structured error responses

### 🔵 Low Priority (Nice to Have)

1. **Add Type Hints** - Improve code maintainability
2. **Refactor Code Duplication** - DRY principle
3. **Add Frontend Error Boundaries** - Better UX
4. **Implement Async Processing** - For long-running tasks

---

## 8. Code Quality Score

| Category | Score | Notes |
|----------|-------|-------|
| **Architecture** | 8/10 | Clean structure, good separation |
| **Security** | 5/10 | Missing critical protections |
| **Performance** | 6/10 | No caching, synchronous calls |
| **Maintainability** | 7/10 | Readable but missing tests/docs |
| **Best Practices** | 6/10 | Good foundation, needs hardening |
| **Overall** | **6.4/10** | **Good for MVP, needs production fixes** |

---

## 9. Conclusion

The codebase demonstrates good foundational practices with clean architecture and readable code. However, **critical security and production-readiness issues** must be addressed before deployment:

1. **Security hardening** (rate limiting, input sanitization, debug mode)
2. **Testing infrastructure** (unit tests, integration tests)
3. **Production configuration** (logging, error handling, caching)
4. **Documentation** (API docs, deployment guides)

With these improvements, the application will be production-ready and maintainable for long-term use.

---

**Next Steps:**
1. Review and prioritize recommendations
2. Create tickets for critical issues
3. Implement fixes in order of severity
4. Re-audit after major changes

---

*Report generated by Senior Technical Lead & Documentation Expert*

# Interactive Data Dashboard

A modern, client-side React application for visualizing CSV data through interactive bar and pie charts. Upload your CSV files, select dimensions and measures, and instantly see your data come to life with beautiful, animated visualizations.

## 🎯 Project Description

This dashboard allows users to:
- Upload CSV files directly from their browser
- Dynamically select which columns to analyze (dimension and measure)
- View aggregated data in real-time through bar and pie charts
- Experience smooth animations and a custom cursor interface

**Live Demo:** [https://Mohamed-Eslam777.github.io/data-dashboard](https://Mohamed-Eslam777.github.io/data-dashboard)

## 🛠️ Tech Stack

### Core Technologies
- **React** 19.2.0 - UI framework
- **React DOM** 19.2.0 - DOM rendering
- **React Scripts** 5.0.1 - Build tooling (Create React App)

### Data Processing & Visualization
- **PapaParse** 5.5.3 - CSV parsing library
- **Chart.js** 4.5.1 - Chart rendering engine
- **react-chartjs-2** 5.3.1 - React wrapper for Chart.js

### Testing
- **@testing-library/react** 16.3.0 - React component testing
- **@testing-library/jest-dom** 6.9.1 - DOM matchers
- **@testing-library/user-event** 13.5.0 - User interaction simulation

### UI/UX Libraries
- **AOS (Animate On Scroll)** - Animation library (via CDN)
- Custom CSS animations and cursor effects

### Deployment
- **gh-pages** 6.3.0 - GitHub Pages deployment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher recommended)
- **npm** (v6.0.0 or higher) or **yarn** (v1.22.0 or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mohamed-Eslam777/data-dashboard.git
cd data-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Start the Development Server

```bash
npm start
```

The application will open automatically in your browser at [http://localhost:3000](http://localhost:3000).

The page will reload automatically when you make changes to the code.

## 📁 Project Structure

```
data-dashboard-main/
├── public/
│   ├── favicon.ico          # Site favicon
│   ├── index.html           # Main HTML template
│   ├── logo192.png          # PWA icon (192x192)
│   ├── logo512.png          # PWA icon (512x512)
│   ├── manifest.json        # Progressive Web App manifest
│   └── robots.txt           # Search engine crawler instructions
│
├── src/
│   ├── components/
│   │   ├── AnimatedLogo.js  # Rotating logo component
│   │   ├── BarChart.js      # Bar chart visualization component
│   │   ├── FileUpload.js    # CSV file upload handler
│   │   └── PieChart.js      # Pie chart visualization component
│   │
│   ├── App.js               # Main application component (state & logic)
│   ├── App.css              # Global styles & custom cursor
│   ├── App.test.js          # Basic test file
│   ├── cursor.js            # Custom cursor implementation
│   ├── index.js             # React application entry point
│   ├── index.css            # Base CSS styles
│   ├── logo.svg             # React logo (unused)
│   ├── reportWebVitals.js   # Web performance metrics
│   └── setupTests.js        # Jest test configuration
│
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies & scripts
├── package-lock.json        # Dependency lock file
└── README.md                # This file
```

## 🎮 Usage Guide

### 1. Upload a CSV File

- Click the "Choose a CSV file" button
- Select a CSV file from your computer
- The file will be automatically parsed

**CSV Format Requirements:**
- First row should contain column headers
- Data should be comma-separated
- Empty lines will be automatically skipped

### 2. Select Analysis Columns

After uploading, you'll see two dropdown menus:

- **Analyze by (Dimension):** Select the categorical column (e.g., "Category", "Month", "Region")
- **Show values of (Measure):** Select the numerical column to aggregate (e.g., "Sales", "Revenue", "Count")

### 3. View Visualizations

Once both selections are made, the dashboard will automatically:
- Group data by the selected dimension
- Sum the values for the selected measure
- Display results in both bar and pie charts

### Example CSV Format

```csv
Category,Sales,Date
Electronics,1500,2024-01-15
Clothing,800,2024-01-16
Electronics,2000,2024-01-17
Clothing,1200,2024-01-18
Food,500,2024-01-19
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This launches the test runner in interactive watch mode. Tests are located in `src/App.test.js`.

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized, minified files ready for deployment.

## 📦 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
npm run build
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch, making it available at:
`https://[your-username].github.io/data-dashboard`

## ✨ Key Features

- ✅ **Client-Side Processing:** All data processing happens in the browser (no backend required)
- ✅ **Real-Time Updates:** Charts update instantly when column selections change
- ✅ **Dual Visualization:** View data in both bar and pie chart formats simultaneously
- ✅ **Custom Cursor:** Unique interactive cursor experience
- ✅ **Smooth Animations:** AOS (Animate On Scroll) library for elegant transitions
- ✅ **Responsive Design:** Works on desktop and mobile devices
- ✅ **Offline Capable:** No API calls required - fully functional offline

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts development server on port 3000 |
| `npm test` | Launches test runner in watch mode |
| `npm run build` | Creates optimized production build |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, React will prompt you to use a different port.

### CSV Parsing Errors

- Ensure your CSV file has headers in the first row
- Check that the file is properly formatted (comma-separated)
- Verify there are no encoding issues (use UTF-8)

### Charts Not Displaying

- Make sure you've selected both a dimension and a measure
- Verify that your measure column contains numeric values
- Check the browser console for any error messages

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Mohamed Eslam**
- GitHub: [@Mohamed-Eslam777](https://github.com/Mohamed-Eslam777)

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- CSV parsing by [PapaParse](https://www.papaparse.com/)
- Animations by [AOS](https://michalsnik.github.io/aos/)

---

**Note:** This is a client-side application. All data processing occurs in your browser, and no data is sent to any server.
# Code Audit Report
**Project:** Interactive Data Dashboard  
**Date:** 2024  
**Auditor Role:** Senior Technical Lead & Documentation Expert

---

## Executive Summary

This audit examines the codebase for code quality, security vulnerabilities, performance issues, and provides actionable recommendations for improvement. The project is a React-based client-side data visualization dashboard with CSV parsing capabilities.

**Overall Assessment:** The codebase is functional and follows React best practices in most areas, but there are several opportunities for improvement in code organization, error handling, testing coverage, and performance optimization.

---

## 1. Code Quality Analysis

### ✅ Strengths

1. **Component Structure:** Well-organized component-based architecture
2. **Modern React:** Uses React hooks (useState, useEffect) appropriately
3. **Separation of Concerns:** Components are focused and single-purpose
4. **Clean Code:** Generally readable and maintainable

### ⚠️ Issues Identified

#### 1.1 Missing Code Comments
**Severity:** Medium  
**Location:** Throughout codebase

**Issue:**
- Most functions lack JSDoc comments
- Complex logic (especially in `App.js` data processing) needs explanation
- No inline comments explaining business logic

**Example:**
```javascript
// App.js - Line 44-56: Grouping logic lacks explanation
const groupedData = fullData.reduce((acc, row) => {
  const dimension = row[selectedDimension];
  const measure = parseFloat(row[selectedMeasure]) || 0;
  // ... complex aggregation logic
}, {});
```

**Recommendation:**
- Add JSDoc comments to all functions
- Document complex algorithms
- Explain business logic decisions

#### 1.2 Hardcoded Values
**Severity:** Low  
**Location:** Multiple files

**Issues:**
- Chart colors hardcoded in `App.js` (lines 78-81)
- Chart titles hardcoded in `BarChart.js` and `PieChart.js`
- Animation durations hardcoded in `index.html`

**Recommendation:**
- Extract constants to a `constants.js` file
- Create a theme configuration object
- Make values configurable

#### 1.3 Inconsistent Error Handling
**Severity:** Medium  
**Location:** `FileUpload.js`, `App.js`

**Issues:**
- `FileUpload.js` uses `alert()` for errors (poor UX)
- No error boundaries in React components
- No validation for empty CSV files
- No handling for malformed data

**Recommendation:**
```javascript
// Implement proper error handling
const [error, setError] = useState(null);

// Use toast notifications instead of alerts
// Add React Error Boundaries
// Validate data before processing
```

#### 1.4 Test Coverage
**Severity:** High  
**Location:** `src/App.test.js`

**Issue:**
- Only one basic test exists
- No tests for data processing logic
- No tests for file upload functionality
- No tests for chart rendering
- No integration tests

**Recommendation:**
- Add unit tests for data aggregation logic
- Test file upload component
- Test chart components with mock data
- Add integration tests for full user flow

#### 1.5 Code Duplication
**Severity:** Low  
**Location:** `BarChart.js`, `PieChart.js`

**Issue:**
- Similar chart configuration code duplicated
- Both components have nearly identical options structure

**Recommendation:**
- Create a shared chart configuration utility
- Extract common chart options

---

## 2. Security Analysis

### ✅ Security Strengths

1. **No Backend:** Client-side only reduces attack surface
2. **No API Keys:** No hardcoded secrets found
3. **No External Data Sources:** No XSS vulnerabilities from external APIs
4. **Input Validation:** PapaParse handles CSV parsing safely

### ⚠️ Security Concerns

#### 2.1 File Upload Security
**Severity:** Medium  
**Location:** `FileUpload.js`

**Issues:**
- No file size validation
- No file type verification beyond `.csv` extension
- Large files could cause memory issues
- No sanitization of parsed data

**Recommendation:**
```javascript
// Add file size limit
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

if (file.size > MAX_FILE_SIZE) {
  setError('File size exceeds 10MB limit');
  return;
}

// Verify file is actually CSV
if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
  setError('Invalid file type');
  return;
}
```

#### 2.2 XSS Potential
**Severity:** Low  
**Location:** `App.js` (data rendering)

**Issue:**
- User data is rendered directly in charts
- While Chart.js handles this safely, column names from CSV could be malicious

**Recommendation:**
- Sanitize column names before rendering
- Validate data structure before processing

#### 2.3 CDN Dependencies
**Severity:** Low  
**Location:** `public/index.html`

**Issue:**
- AOS library loaded from unpkg CDN (no integrity checks)
- Potential supply chain attack risk

**Recommendation:**
- Use Subresource Integrity (SRI) hashes
- Or install AOS via npm instead of CDN

```html
<script 
  src="https://unpkg.com/aos@next/dist/aos.js" 
  integrity="sha384-[hash]" 
  crossorigin="anonymous">
</script>
```

#### 2.4 No Content Security Policy
**Severity:** Low  
**Location:** `public/index.html`

**Issue:**
- No CSP headers defined
- Could allow injection attacks

**Recommendation:**
- Add CSP meta tag or configure via server headers

---

## 3. Performance Analysis

### ✅ Performance Strengths

1. **Client-Side Processing:** Fast local processing
2. **React Optimization:** Uses functional components and hooks
3. **Chart.js:** Efficient chart rendering library

### ⚠️ Performance Issues

#### 3.1 Large Dataset Handling
**Severity:** Medium  
**Location:** `App.js` (useEffect)

**Issue:**
- No pagination or chunking for large CSV files
- Processing entire dataset in single reduce operation
- Could freeze UI with very large files (10,000+ rows)

**Recommendation:**
```javascript
// Implement Web Workers for large file processing
// Add pagination/virtualization
// Use requestIdleCallback for non-critical processing
// Add progress indicators
```

#### 3.2 Unnecessary Re-renders
**Severity:** Low  
**Location:** `App.js`

**Issue:**
- `useEffect` dependencies could cause unnecessary recalculations
- No memoization of processed data

**Recommendation:**
```javascript
// Memoize processed data
const processedData = useMemo(() => {
  // ... processing logic
}, [fullData, selectedDimension, selectedMeasure]);

// Use React.memo for chart components
export default React.memo(BarChart);
```

#### 3.3 CDN Loading
**Severity:** Low  
**Location:** `public/index.html`

**Issue:**
- AOS library blocks rendering (synchronous script)
- No lazy loading

**Recommendation:**
- Load AOS asynchronously
- Or use npm package with code splitting

#### 3.4 Custom Cursor Performance
**Severity:** Low  
**Location:** `cursor.js`

**Issue:**
- Mousemove event fires on every pixel movement
- Could cause performance issues on slower devices

**Recommendation:**
```javascript
// Throttle mousemove events
let ticking = false;
window.addEventListener('mousemove', e => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Update cursor position
      ticking = false;
    });
    ticking = true;
  }
});
```

#### 3.5 Bundle Size
**Severity:** Low

**Issue:**
- No bundle analysis
- Chart.js is a large library

**Recommendation:**
- Analyze bundle size: `npm run build -- --analyze`
- Consider tree-shaking unused Chart.js features
- Implement code splitting for routes (if added)

---

## 4. Architecture & Best Practices

### ⚠️ Issues

#### 4.1 State Management
**Severity:** Low  
**Location:** `App.js`

**Issue:**
- All state in single component
- Could benefit from Context API or state management library if app grows

**Recommendation:**
- Consider Context API for shared state
- Or Redux/Zustand if complexity increases

#### 4.2 Missing PropTypes/TypeScript
**Severity:** Medium

**Issue:**
- No type checking
- Props not validated
- Could lead to runtime errors

**Recommendation:**
- Add PropTypes to all components
- Or migrate to TypeScript for better type safety

#### 4.3 No Environment Configuration
**Severity:** Low

**Issue:**
- No `.env` file support
- Hardcoded configuration values

**Recommendation:**
- Add environment variable support
- Extract configuration to separate file

#### 4.4 Missing Accessibility
**Severity:** Medium

**Issues:**
- No ARIA labels on interactive elements
- File input not properly labeled
- Charts may not be accessible to screen readers
- Custom cursor hides default cursor (accessibility issue)

**Recommendation:**
```javascript
// Add ARIA labels
<input
  id="csv-upload"
  type="file"
  accept=".csv"
  aria-label="Upload CSV file for data visualization"
  onChange={handleChange}
/>

// Add keyboard navigation support
// Ensure charts have alt text/descriptions
```

---

## 5. Code Organization

### ⚠️ Issues

#### 5.1 CSS Organization
**Severity:** Low  
**Location:** `App.css`

**Issue:**
- All styles in single file
- No CSS modules or styled-components
- Could become unmaintainable as app grows

**Recommendation:**
- Split CSS into component-specific files
- Consider CSS Modules or styled-components
- Use CSS variables for theming

#### 5.2 Utility Functions
**Severity:** Low

**Issue:**
- Data processing logic embedded in component
- No utility functions file

**Recommendation:**
- Create `utils/dataProcessing.js`
- Extract data aggregation logic
- Make functions testable

#### 5.3 Constants Management
**Severity:** Low

**Issue:**
- Magic numbers and strings throughout code
- No centralized constants

**Recommendation:**
- Create `constants/index.js`
- Define chart colors, sizes, limits

---

## 6. Documentation

### ⚠️ Issues

#### 6.1 Code Documentation
**Severity:** Medium

**Issue:**
- Minimal inline comments
- No JSDoc documentation
- Complex logic unexplained

**Recommendation:**
- Add comprehensive JSDoc comments
- Document all props and functions
- Explain business logic

#### 6.2 README Quality
**Severity:** Low (Now Fixed)

**Issue:**
- Previously had default Create React App README
- Missing project-specific information

**Status:** ✅ Updated with comprehensive documentation

---

## 7. Recommendations Summary

### 🔴 High Priority

1. **Add Comprehensive Testing**
   - Unit tests for data processing
   - Component tests
   - Integration tests

2. **Improve Error Handling**
   - Replace alerts with proper error UI
   - Add error boundaries
   - Validate inputs

3. **Add Type Safety**
   - Implement PropTypes or TypeScript
   - Validate component props

### 🟡 Medium Priority

4. **Performance Optimization**
   - Add Web Workers for large files
   - Implement memoization
   - Optimize re-renders

5. **Security Enhancements**
   - Add file size validation
   - Implement SRI for CDN resources
   - Add input sanitization

6. **Accessibility Improvements**
   - Add ARIA labels
   - Ensure keyboard navigation
   - Test with screen readers

### 🟢 Low Priority

7. **Code Organization**
   - Extract utility functions
   - Organize CSS better
   - Create constants file

8. **Documentation**
   - Add JSDoc comments
   - Document complex logic
   - Create developer guide

9. **Feature Enhancements**
   - Add data export functionality
   - Support multiple chart types
   - Add data filtering options

---

## 8. Code Quality Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Test Coverage | ~5% | 80%+ | ❌ Needs Improvement |
| Code Comments | Minimal | Comprehensive | ⚠️ Needs Work |
| Type Safety | None | PropTypes/TS | ❌ Missing |
| Error Handling | Basic | Comprehensive | ⚠️ Needs Work |
| Performance | Good | Optimized | ✅ Acceptable |
| Security | Good | Hardened | ⚠️ Needs Work |
| Accessibility | Basic | WCAG 2.1 AA | ⚠️ Needs Work |

---

## 9. Conclusion

The **Interactive Data Dashboard** is a well-structured React application that successfully delivers its core functionality. The codebase demonstrates good understanding of React patterns and modern JavaScript practices.

**Key Strengths:**
- Clean component architecture
- Modern React hooks usage
- Functional and user-friendly

**Areas for Improvement:**
- Testing coverage is critically low
- Error handling needs enhancement
- Performance optimizations for large datasets
- Security hardening for file uploads
- Accessibility compliance

**Overall Grade: B+**

With the recommended improvements, this codebase could easily reach production-grade quality suitable for enterprise use.

---

## 10. Action Items Checklist

- [ ] Add comprehensive test suite (unit + integration)
- [ ] Implement proper error handling with user-friendly UI
- [ ] Add PropTypes or migrate to TypeScript
- [ ] Add file size and type validation
- [ ] Implement Web Workers for large file processing
- [ ] Add memoization to prevent unnecessary re-renders
- [ ] Extract utility functions and constants
- [ ] Add JSDoc documentation
- [ ] Improve accessibility (ARIA labels, keyboard nav)
- [ ] Add SRI hashes for CDN resources
- [ ] Create error boundaries
- [ ] Optimize custom cursor performance
- [ ] Add data validation and sanitization
- [ ] Implement proper loading states
- [ ] Add progress indicators for file processing

---

**Report Generated:** 2024  
**Next Review Recommended:** After implementing high-priority items.