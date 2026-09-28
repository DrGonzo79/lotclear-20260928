from fastapi.testclient import TestClient
from main import app

client=TestClient(app)

def test_health(): assert client.get("/health").json()=={"status":"ok"}

def test_audit_finds_missing_document():
    response=client.post("/packet-audit",json={"deal_id":"D-1842","state":"FL","documents":["signed_title","bill_of_sale","insurance_proof"]})
    assert response.status_code==200
    assert response.json()["missing"]==["odometer_statement"]
    assert response.json()["status"]=="hold"

def test_complete_packet_is_ready():
    response=client.post("/packet-audit",json={"deal_id":"D-2024","state":"NC","documents":["notarized_title","mvr1_application","damage_disclosure","odometer_statement"]})
    assert response.json()["readiness"]==100
    assert response.json()["estimated_clearance_days"]==15

def test_unknown_deal_and_invalid_payload():
    assert client.post("/packet-audit",json={"deal_id":"D-9999","state":"FL","documents":["signed_title"]}).status_code==404
    assert client.post("/packet-audit",json={"deal_id":"bad id","state":"XX","documents":[]}).status_code==422

def test_duplicate_documents_rejected():
    response=client.post("/packet-audit",json={"deal_id":"D-1842","state":"FL","documents":["signed_title","signed_title"]})
    assert response.status_code==422
    assert "Duplicate" in response.json()["detail"]
