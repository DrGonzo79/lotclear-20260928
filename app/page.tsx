"use client";
import {useMemo,useState} from "react";
import {ArrowRight,Check,Clipboard,FileCheck2,FolderOpen,RefreshCw,ShieldAlert,Truck,TriangleAlert} from "lucide-react";
import demo from "../data/demo.json";

type StateCode=keyof typeof demo.requirements;
type Audit={missing:string[];readiness:number;status:"ready"|"hold";days:number|null};

export default function Dashboard(){
  const [dealId,setDealId]=useState("D-1842");
  const deal=demo.deals.find(x=>x.id===dealId)!;
  const [state,setState]=useState<StateCode>(deal.state as StateCode);
  const [documents,setDocuments]=useState<string[]>(deal.documents);
  const [busy,setBusy]=useState(false);
  const [audit,setAudit]=useState<Audit|null>(null);
  const [error,setError]=useState("");
  const [showRule,setShowRule]=useState(false);
  const [copied,setCopied]=useState(false);
  const rule=demo.requirements[state];
  const allRelevant=useMemo(()=>Array.from(new Set([...rule.items,...documents])),[rule,documents]);

  function chooseDeal(id:string){
    const next=demo.deals.find(x=>x.id===id)!;
    setDealId(id);setState(next.state as StateCode);setDocuments(next.documents);reset();
  }
  function reset(){setAudit(null);setError("");setShowRule(false);setCopied(false)}
  function toggle(doc:string){setDocuments(current=>current.includes(doc)?current.filter(x=>x!==doc):[...current,doc]);setAudit(null);setCopied(false)}
  function run(){
    if(!dealId||!state||documents.length===0){setError("Choose a deal, state and at least one document before auditing.");return}
    setError("");setBusy(true);setAudit(null);
    window.setTimeout(()=>{
      let required=[...rule.items];
      if(state==="GA"&&!deal.hasLien)required=required.filter(x=>x!=="lien_release");
      const missing=required.filter(x=>!documents.includes(x));
      setAudit({missing,readiness:Math.round((required.length-missing.length)/required.length*100),status:missing.length?"hold":"ready",days:missing.length?null:rule.slaDays});
      setBusy(false);
    },650);
  }
  async function copy(){
    if(!audit)return;
    const missing=audit.missing.map(x=>demo.documents[x as keyof typeof demo.documents]).join(", ")||"none";
    try{await navigator.clipboard.writeText(`LotClear demo — ${deal.id}, ${deal.vehicle}, ${rule.name}: ${audit.readiness}% ready; missing: ${missing}. Fictional data; verify with the state DMV.`);setCopied(true)}
    catch{setError("Clipboard access was blocked. The audit remains visible on screen.")}
  }

  return <main>
    <aside className="rail"><div className="mark"><FileCheck2/></div><nav aria-label="Prototype navigation"><button className="active" aria-label="Packet audit"><FolderOpen/></button><button aria-label="Dealer queue" disabled><Truck/></button><button aria-label="Compliance alerts" disabled><ShieldAlert/></button></nav><span>LC</span></aside>
    <div className="shell">
      <header><a className="brand" href="#top">LotClear</a><span className="demo-tag">Fictional title desk demo</span></header>
      <section id="top" className="hero"><div><p className="eyebrow">DEAL JACKET → STATE RULES → CLEAR TITLE</p><h1>Catch the rejection<br/><em>before the DMV does.</em></h1><p>Audit a used-car title packet against a state-specific demo ruleset, expose the exact missing document, and release held-up cash faster.</p></div><div className="hero-card"><span>Cash tied to selected deal</span><strong>${deal.bankHold.toLocaleString()}</strong><small>Fictional bank-hold value · not a lender integration</small></div></section>
      <div className="notice" role="note"><TriangleAlert/><span><b>Simulation only.</b> Rules and records are illustrative, not legal advice. No filing occurs and every requirement must be verified with the relevant DMV.</span></div>
      <section className="control-card"><div className="section-title"><div><p>01 · PACKET INTAKE</p><h2>Build the deal jacket</h2></div><button className="icon" onClick={()=>chooseDeal("D-1842")} aria-label="Reset packet"><RefreshCw/></button></div>
        <div className="controls"><label>Deal<select aria-label="Deal" value={dealId} onChange={e=>chooseDeal(e.target.value)}>{demo.deals.map(x=><option value={x.id} key={x.id}>{x.id} · {x.vehicle}</option>)}</select></label><label>Filing state<select aria-label="Filing state" value={state} onChange={e=>{setState(e.target.value as StateCode);reset()}}>{Object.entries(demo.requirements).map(([code,value])=><option value={code} key={code}>{value.name}</option>)}</select></label></div>
        <div className="deal-line"><div><small>{deal.buyer} · VIN ••••{deal.vinSuffix}</small><b>{deal.vehicle}</b><span>{deal.hasLien?"Lien shown on source title":"No source lien"} · demo record</span></div><button className="link-button" onClick={()=>setShowRule(true)}>View {rule.name} rule</button></div>
        <fieldset><legend>Documents in packet</legend><div className="checks">{allRelevant.map(doc=><label key={doc}><input type="checkbox" checked={documents.includes(doc)} onChange={()=>toggle(doc)}/><span><Check/>{demo.documents[doc as keyof typeof demo.documents]}</span></label>)}</div></fieldset>
        <button className="primary" onClick={run} disabled={busy}>{busy?"Checking packet…":"Run packet audit"}<ArrowRight/></button>{error&&<p className="error" role="alert">{error}</p>}
      </section>
      <section className="results" aria-live="polite">{!audit?<div className="empty"><FileCheck2/><div><b>No packet audit yet</b><span>Select the documents actually present, then run the state rules check.</span></div></div>:<>
        <div className="section-title"><div><p>02 · READINESS DECISION</p><h2>{audit.status==="ready"?"Ready for human review":"Hold before submission"}</h2></div><span className={`confidence ${audit.status}`}>{audit.readiness}% complete</span></div>
        <div className="metrics"><article><span>Packet status</span><strong>{audit.status==="ready"?"READY":"HOLD"}</strong><small>{audit.status==="ready"?"No demo-rule gaps":"Do not submit yet"}</small></article><article><span>Missing items</span><strong>{audit.missing.length}</strong><small>state-specific blockers</small></article><article><span>Expected clearance</span><strong>{audit.days?`${audit.days}d`:"—"}</strong><small>after a complete packet</small></article></div>
        {audit.missing.length?<div className="blockers"><p>REQUIRED NEXT</p>{audit.missing.map(x=><div key={x}><ShieldAlert/><span><b>{demo.documents[x as keyof typeof demo.documents]}</b><small>Add this item, then rerun the audit.</small></span></div>)}</div>:<div className="ready-box"><Check/><div><b>Packet passes the demo ruleset.</b><span>Route it to a qualified title clerk for verification and filing.</span></div></div>}
        <button className="secondary" onClick={copy}><Clipboard/>{copied?"Checklist copied":"Copy clerk checklist"}</button>
      </>}</section>
      {showRule&&<div className="drawer" role="dialog" aria-label="State rule detail"><button aria-label="Close state rule" onClick={()=>setShowRule(false)}>×</button><p>DEMO RULESET · {state}</p><h3>{rule.name}</h3><p className="body">{rule.notes}</p><ul>{rule.items.map(x=><li key={x}>{demo.documents[x as keyof typeof demo.documents]}</li>)}</ul><small>Illustrative as of September 2026. Confirm current agency instructions before relying on this workflow.</small></div>}
      <footer><span>LotClear · Prototype, September 2026</span><a href="https://www.ideabrowser.com/hub/ideas/handle-vehicle-titles-for-independent-car-dealers-331857f4">Public source idea ↗</a></footer>
    </div>
  </main>
}
