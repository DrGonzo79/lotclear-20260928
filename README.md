# LotClear

LotClear is a runnable prototype for independent used-car dealers that want to catch title-packet defects before submission. The static demo uses explicit fictional fixtures. The FastAPI service implements the same packet-audit operation as tested source; it is **not deployed** by GitHub Pages.

## Run

```bash
npm ci
npm run dev
cd api && uv sync --frozen && uv run uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm run audit:prod
cd api && uv sync --frozen && uv run pytest
```

## What works

- Select a fictional deal and filing state, then mark which documents are present.
- Audit the packet against transparent demo rules and name missing blockers.
- Inspect state requirements, resolve a blocker, reset state, and copy a clerk checklist.
- Exercise a real `POST /packet-audit` domain operation with validation and named failures.

Source inspiration: [Ideabrowser public idea](https://www.ideabrowser.com/hub/ideas/handle-vehicle-titles-for-independent-car-dealers-331857f4). This repository summarizes the concept and does not reproduce subscriber content or private metadata.
