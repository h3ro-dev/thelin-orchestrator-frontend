# Thelin Orchestrator - System Architecture

## Visual System Diagram

```
                                    THELIN ORCHESTRATOR
                        Jason Thelin's Cognitive Prosthetic System

    +---------------------------------------------------------------------------+
    |                              CAPTURE LAYER                                 |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     +------------------+                                                  |
    |     |  LIMITLESS       |     Lifelogs every 30 min                       |
    |     |  PENDANT         | -----> via REST API                             |
    |     |  (Wearable)      |     sk-79cdee53-...                             |
    |     +------------------+                                                  |
    |                                                                           |
    +---------------------------------------------------------------------------+

                                        |
                                        | Raw Lifelogs (text, timestamps, speakers)
                                        v

    +---------------------------------------------------------------------------+
    |                         INGESTION LAYER (Mac Studio 1)                    |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     +------------------+         +------------------+                     |
    |     |  limitless_      |         |  PostgreSQL 16   |                     |
    |     |  client.py       | ------> |  thelin_         |                     |
    |     |                  |  Store  |  orchestrator    |                     |
    |     +------------------+         +------------------+                     |
    |                                        |                                  |
    |     Tailscale: 100.105.46.22          |                                  |
    |                                        |                                  |
    +---------------------------------------------------------------------------+

                                        |
                                        | Unclassified lifelogs
                                        v

    +---------------------------------------------------------------------------+
    |                    MULTI-MODEL CONSENSUS CLASSIFIER                       |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     PHASE 1: Parallel Classification (Fast Models)                        |
    |     +------------------+         +------------------+                     |
    |     |   GPT-5.1        |         |  Grok 4.1 Fast   |                     |
    |     |   (OpenAI)       |   ||    |  (xAI)           |                     |
    |     +------------------+         +------------------+                     |
    |              |                          |                                 |
    |              +----------+---------------+                                 |
    |                         |                                                 |
    |                         v                                                 |
    |              +--------------------+                                       |
    |              | Early Consensus?   |                                       |
    |              | (Both agree)       |                                       |
    |              +--------------------+                                       |
    |                    |         |                                            |
    |               YES  |         | NO                                         |
    |                    v         v                                            |
    |     PHASE 2: +------------------+                                         |
    |              | Claude Sonnet 4  |  Review & Validate                      |
    |              | (Anthropic)      |                                         |
    |              +------------------+                                         |
    |                         |                                                 |
    |                         v                                                 |
    |              +--------------------+                                       |
    |              | Still Disagreement?|                                       |
    |              +--------------------+                                       |
    |                    |         |                                            |
    |               NO   |         | YES                                        |
    |                    v         v                                            |
    |     PHASE 3: +------------------+                                         |
    |              |  GPT-5.1 Pro     |  Final Arbiter                          |
    |              |  (OpenAI)        |                                         |
    |              +------------------+                                         |
    |                                                                           |
    +---------------------------------------------------------------------------+

                                        |
                    +-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v

    +---------------+   +---------------+   +---------------+
    |    NOISE      |   |    BOOK       |   |   BUSINESS    |
    |   (Discard)   |   |  (Leadership  |   |   (Ideas &    |
    |               |   |   & Culture)  |   |   Ventures)   |
    +---------------+   +---------------+   +---------------+
                              |                   |
                              v                   v

    +---------------------------------------------------------------------------+
    |                         AGENT PROCESSING LAYER                            |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     +------------------+         +------------------+                     |
    |     |   BOOK AGENT     |         |  BUSINESS AGENT  |                     |
    |     +------------------+         +------------------+                     |
    |     |                  |         |                  |                     |
    |     | - Extract thesis |         | - Extract idea   |                     |
    |     | - Map to chapter |         | - Find synergies |                     |
    |     | - Generate PR    |         | - Research market|                     |
    |     | - Create branch  |         | - Create demo    |                     |
    |     |                  |         |                  |                     |
    |     +------------------+         +------------------+                     |
    |              |                          |                                 |
    |              v                          v                                 |
    |     +------------------+         +------------------+                     |
    |     | h3ro-dev/        |         | h3ro-dev/        |                     |
    |     | thelin-book-ai-  |         | [idea-name]-demo |                     |
    |     | leadership       |         |                  |                     |
    |     | (GitHub Repo)    |         | (GitHub Repo)    |                     |
    |     +------------------+         +------------------+                     |
    |                                                                           |
    +---------------------------------------------------------------------------+

                                        |
                                        | Processed results
                                        v

    +---------------------------------------------------------------------------+
    |                           API LAYER (FastAPI)                             |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     Mac Studio 1 - Port 3001                                              |
    |     http://100.105.46.22:3001                                             |
    |                                                                           |
    |     +------------------+  +------------------+  +------------------+       |
    |     | GET /api/stats   |  | GET /api/book-   |  | GET /api/        |       |
    |     |                  |  | additions        |  | business-ideas   |       |
    |     | Today's metrics  |  | Pending PRs      |  | New ideas        |       |
    |     +------------------+  +------------------+  +------------------+       |
    |                                                                           |
    |     +------------------+  +------------------+  +------------------+       |
    |     | GET /api/        |  | POST /api/       |  | GET /api/        |       |
    |     | questions        |  | questions/:id/   |  | lifelogs         |       |
    |     |                  |  | answer           |  |                  |       |
    |     | Clarifications   |  | Jason's input    |  | Raw data         |       |
    |     +------------------+  +------------------+  +------------------+       |
    |                                                                           |
    +---------------------------------------------------------------------------+

                                        |
                                        | HTTPS via Tailscale
                                        v

    +---------------------------------------------------------------------------+
    |                      PRESENTATION LAYER (Vercel)                          |
    +---------------------------------------------------------------------------+
    |                                                                           |
    |     https://thelin-orchestrator.vercel.app                                |
    |                                                                           |
    |     +------------------+                                                  |
    |     |   CLERK AUTH     |  Single-user: Jason Thelin                       |
    |     +------------------+                                                  |
    |              |                                                            |
    |              v                                                            |
    |     +---------------------------------------------------------------+     |
    |     |                      DASHBOARD                                 |     |
    |     +---------------------------------------------------------------+     |
    |     |                                                               |     |
    |     |  +-------------+  +-------------+  +-------------+            |     |
    |     |  | Today's     |  | Book        |  | Business    |            |     |
    |     |  | Stats       |  | Additions   |  | Ideas       |            |     |
    |     |  | [47 logs]   |  | [3 pending] |  | [5 new]     |            |     |
    |     |  +-------------+  +-------------+  +-------------+            |     |
    |     |                                                               |     |
    |     |  +-------------------------------------------------------+    |     |
    |     |  |              QUESTIONS FOR JASON                      |    |     |
    |     |  |                                                       |    |     |
    |     |  |  Q: Which chapter for this insight?                   |    |     |
    |     |  |  [ ] Introduction  [ ] AI Shift  [x] Adaptive Lead.   |    |     |
    |     |  |                                                       |    |     |
    |     |  +-------------------------------------------------------+    |     |
    |     |                                                               |     |
    |     +---------------------------------------------------------------+     |
    |                                                                           |
    +---------------------------------------------------------------------------+


## Data Flow Summary

```
Limitless Pendant
       |
       | (every 30 min)
       v
+------+------+
| Ingestion   |  limitless_client.py
+------+------+
       |
       v
+------+------+
| PostgreSQL  |  lifelogs table
+------+------+
       |
       v
+------+------+     +------+------+
| GPT-5.1     | --> | Grok 4.1    |  Parallel
+------+------+     +------+------+
       |                   |
       +--------+----------+
                |
                v
         +------+------+
         | Consensus?  |
         +------+------+
                |
        +-------+-------+
        |               |
        v               v
   (agreement)    +------+------+
        |         | Claude 4    |  Review
        |         +------+------+
        |               |
        +-------+-------+
                |
        +-------+-------+
        |               |
        v               v
   (resolved)    +------+------+
        |        | GPT-5.1 Pro |  Arbiter
        |        +------+------+
        |               |
        +-------+-------+
                |
    +-----------+-----------+
    |           |           |
    v           v           v
  NOISE      BOOK      BUSINESS
    |           |           |
    x     +-----+-----+  +--+--+
          | Book      |  | Biz |
          | Agent     |  | Agt |
          +-----+-----+  +--+--+
                |           |
                v           v
          GitHub PR    Demo Repo
                |           |
                +-----+-----+
                      |
                      v
               +-----------+
               | Dashboard |
               +-----------+
```


## LangGraph Recommendation

For the agent routing layer, I recommend implementing **LangGraph** for the following benefits:

### Why LangGraph Over Raw LangChain

1. **State Machine for Classification Flow**
   - The multi-model consensus is naturally a directed graph
   - LangGraph's conditional edges handle the "consensus reached?" branching elegantly

2. **Agent Orchestration**
   - Book Agent and Business Agent can be graph nodes
   - Parallel execution with proper state management
   - Human-in-the-loop for Jason's question responses

3. **Persistence & Checkpointing**
   - Save classification state mid-flow
   - Resume if any model fails
   - Audit trail for decisions

### Proposed LangGraph Structure

```python
from langgraph.graph import StateGraph, END

# Define state
class ClassificationState(TypedDict):
    lifelog: dict
    gpt_result: Optional[dict]
    grok_result: Optional[dict]
    claude_result: Optional[dict]
    final_result: Optional[dict]
    consensus_reached: bool

# Build graph
workflow = StateGraph(ClassificationState)

# Add nodes
workflow.add_node("gpt_classify", gpt_classifier)
workflow.add_node("grok_classify", grok_classifier)
workflow.add_node("check_consensus", consensus_checker)
workflow.add_node("claude_review", claude_reviewer)
workflow.add_node("gpt_pro_arbiter", gpt_pro_arbiter)
workflow.add_node("route_to_agent", agent_router)

# Add edges
workflow.add_edge("gpt_classify", "check_consensus")
workflow.add_edge("grok_classify", "check_consensus")
workflow.add_conditional_edges(
    "check_consensus",
    lambda s: "route" if s["consensus_reached"] else "review",
    {"route": "route_to_agent", "review": "claude_review"}
)
workflow.add_conditional_edges(
    "claude_review",
    lambda s: "route" if s["consensus_reached"] else "arbiter",
    {"route": "route_to_agent", "arbiter": "gpt_pro_arbiter"}
)
workflow.add_edge("gpt_pro_arbiter", "route_to_agent")
workflow.add_edge("route_to_agent", END)

# Compile
app = workflow.compile()
```

### Implementation Phases

| Phase | Component | LangGraph Benefit |
|-------|-----------|-------------------|
| 1 | Classifier Graph | Conditional routing, parallel execution |
| 2 | Book Agent Graph | GitHub PR workflow with approval loop |
| 3 | Business Agent Graph | Research -> Demo creation pipeline |
| 4 | Master Orchestrator | Coordinates all sub-graphs |


## API Routes Specification

### Base URL
```
Production: http://100.105.46.22:3001/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats` | Today's dashboard statistics |
| GET | `/book-additions` | Pending book content for review |
| GET | `/book-additions/:id` | Single book addition details |
| POST | `/book-additions/:id/approve` | Approve and merge PR |
| POST | `/book-additions/:id/reject` | Reject with feedback |
| GET | `/business-ideas` | All captured business ideas |
| GET | `/business-ideas/:id` | Single idea with details |
| POST | `/business-ideas/:id/status` | Update idea status |
| GET | `/questions` | Pending questions for Jason |
| POST | `/questions/:id/answer` | Submit Jason's answer |
| GET | `/lifelogs` | Raw lifelog data (paginated) |
| GET | `/lifelogs/:id` | Single lifelog with classification |


## Technology Stack Summary

| Layer | Technology | Location |
|-------|------------|----------|
| Capture | Limitless Pendant | Wearable |
| Ingestion | Python 3.12 + asyncpg | Mac Studio 1 |
| Database | PostgreSQL 16 | Mac Studio 1 |
| Cache | Redis | Mac Studio 1 |
| Classifier | Multi-model (GPT/Grok/Claude) | API calls |
| Routing | LangGraph (recommended) | Mac Studio 1 |
| API | FastAPI | Mac Studio 1:3001 |
| Auth | Clerk | Vercel |
| Frontend | Next.js 16 | Vercel |
| Network | Tailscale | Private mesh |
