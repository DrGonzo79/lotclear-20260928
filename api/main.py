import json
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

DATA=json.loads((Path(__file__).parent.parent/"data"/"demo.json").read_text())
app=FastAPI(title="LotClear demo API",version="0.1.0")

class AuditRequest(BaseModel):
    deal_id: str=Field(min_length=3,max_length=20,pattern=r"^[A-Z0-9-]+$")
    state: Literal["FL","GA","NC"]
    documents: list[str]=Field(min_length=1,max_length=12)

def audit_packet(item:AuditRequest):
    deal=next((row for row in DATA["deals"] if row["id"]==item.deal_id),None)
    if not deal:
        raise HTTPException(status_code=404,detail="Deal not found")
    if len(item.documents)!=len(set(item.documents)):
        raise HTTPException(status_code=422,detail="Duplicate document identifiers are not allowed")
    unknown=set(item.documents)-set(DATA["documents"])
    if unknown:
        raise HTTPException(status_code=422,detail=f"Unknown documents: {', '.join(sorted(unknown))}")
    rule=DATA["requirements"][item.state]
    required=list(rule["items"])
    if item.state=="GA" and not deal["hasLien"]:
        required=[x for x in required if x!="lien_release"]
    missing=[x for x in required if x not in item.documents]
    readiness=max(0,round((len(required)-len(missing))/len(required)*100))
    return {"deal_id":deal["id"],"state":item.state,"missing":missing,"readiness":readiness,"status":"ready" if not missing else "hold","estimated_clearance_days":rule["slaDays"] if not missing else None,"bank_hold":deal["bankHold"],"demo":True}

@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/packet-audit")
def packet_audit(item:AuditRequest): return audit_packet(item)
