import { useMemo, useState } from "react";
import { Activity, CalendarDays, ClipboardCheck, Dumbbell, Footprints, Info, MapPin, Plus, Ruler, Timer, Trophy, X } from "lucide-react";
import type { BellaData, TafAttempt } from "../types";
import { Button, Card, Field, Modal, PageHeading, Pill } from "../components/common";
import { formatTafValue, getTafBest, TAF_EXERCISES, type TafDemoKind, type TafExercise } from "../lib/tafService";
import { TAF_SOURCES } from "../lib/tafSources";

const MEDIA = {
  "distance-run": { file: "running.gif", storageFile: "running-optimized_f290e3b5.gif", source: "https://commons.wikimedia.org/wiki/File:Running.gif", credit: "Fengalon · domínio público" },
  "pull-up": { file: "pull-up.gif", storageFile: "pull-up_d3c4a899.gif", source: "https://commons.wikimedia.org/wiki/File:Pullup.gif", credit: "Extremistpullup · CC BY-SA 3.0" },
} as const;

function localDateInputValue() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

function demoImageUrl(demo: TafDemoKind) {
  const asset = MEDIA[demo as keyof typeof MEDIA];
  if (!asset) return "";
  return import.meta.env.BASE_URL === "/BELLA-FIT/" ? `${import.meta.env.BASE_URL}media/taf/${asset.file}` : `/manus-storage/${asset.storageFile}`;
}

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Data não disponível" : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function DemoArt({ exercise }: { exercise: TafExercise }) {
  const media = MEDIA[exercise.demo as keyof typeof MEDIA];
  const src = demoImageUrl(exercise.demo);
  if (media && src) return <div className="taf-demo"><img src={src} alt={`Ilustração em movimento de ${exercise.name}`} loading="lazy"/><span className="taf-demo-tag"><Activity size={12}/> DEMONSTRAÇÃO</span><a className="taf-demo-credit" href={media.source} target="_blank" rel="noreferrer">{media.credit}</a></div>;
  return <div className={`taf-demo taf-demo-vector taf-demo-${exercise.demo}`} role="img" aria-label={`Ilustração esquemática de ${exercise.name}`}>
    <span className="taf-demo-tag"><Activity size={12}/> ILUSTRAÇÃO ESQUEMÁTICA</span>
    <div className="taf-vector-stage" aria-hidden="true"><span className="taf-vector-ground"/><span className="taf-vector-person"><i/><b/><em/></span>{exercise.demo === "rope" && <span className="taf-vector-rope"/>}{exercise.demo === "jump" && <span className="taf-vector-distance"/>}{exercise.demo === "rower" && <span className="taf-vector-seat"/>}</div>
    <span className="taf-demo-caption">Movimento representativo · consulte o protocolo do edital</span>
  </div>;
}

export default function TafPage({ data, onSave }: { data: BellaData; onSave: (attempt: TafAttempt) => void }) {
  const [category, setCategory] = useState("Todas");
  const [activeExercise, setActiveExercise] = useState<TafExercise | null>(null);
  const [recording, setRecording] = useState(false);
  const [value, setValue] = useState("");
  const [measuredAt, setMeasuredAt] = useState(localDateInputValue);
  const [exam, setExam] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");
  const attempts = data.tafAttempts ?? [];
  const categories = useMemo(() => ["Todas", ...Array.from(new Set(TAF_EXERCISES.map((exercise) => exercise.category)))], []);
  const visibleExercises = category === "Todas" ? TAF_EXERCISES : TAF_EXERCISES.filter((exercise) => exercise.category === category);
  const recordedExercises = new Set(attempts.map((attempt) => attempt.exerciseId));
  const latest = attempts[0];
  const attemptExercise = TAF_EXERCISES.find((exercise) => exercise.id === latest?.exerciseId);
  const recentAttempts = attempts.slice(0, 8);

  function openExercise(exercise: TafExercise) {
    setActiveExercise(exercise); setRecording(false); setValue(""); setMeasuredAt(localDateInputValue()); setExam(""); setNotes(""); setFormError("");
  }

  function saveAttempt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeExercise) return;
    const numericValue = Number(value.replace(",", "."));
    if (!Number.isFinite(numericValue) || numericValue <= 0) { setFormError("Informe um resultado maior que zero."); return; }
    if (!measuredAt || Number.isNaN(new Date(`${measuredAt}T12:00:00`).getTime())) { setFormError("Informe a data da tentativa."); return; }
    const id = globalThis.crypto?.randomUUID?.() ?? `taf-${Date.now().toString(36)}`;
    onSave({ id, exerciseId: activeExercise.id, value: numericValue, unit: activeExercise.defaultUnit, measuredAt: new Date(`${measuredAt}T12:00:00`).toISOString(), exam: exam.trim() || undefined, notes: notes.trim() || undefined });
    setActiveExercise(null); setRecording(false);
  }

  return <div className="page taf-page">
    <PageHeading eyebrow="TREINO DE APTIDÃO FÍSICA" title={<>Preparação para o <em>TAF</em></>} description="Acompanhe suas marcas nas provas físicas presentes em concursos policiais. Cada edital define o próprio protocolo." actions={<Pill tone="rose"><ClipboardCheck size={13}/> ÁREA EXCLUSIVA TAF</Pill>}/>
    <div className="taf-notice" role="note"><Info size={18}/><p><strong>Sem índices universais.</strong> As modalidades, a execução e os critérios mudam entre concursos. Use a área para registrar seus próprios resultados e confirme cada regra no edital vigente.</p></div>
    <div className="taf-stats" aria-label="Resumo do acompanhamento TAF"><Card className="taf-stat"><span className="taf-stat-icon"><ClipboardCheck size={18}/></span><span className="eyebrow">TENTATIVAS REGISTRADAS</span><strong>{attempts.length}</strong><small>no seu perfil local</small></Card><Card className="taf-stat"><span className="taf-stat-icon"><Activity size={18}/></span><span className="eyebrow">MODALIDADES ACOMPANHADAS</span><strong>{recordedExercises.size}<small>/{TAF_EXERCISES.length}</small></strong><small>com ao menos uma marca</small></Card><Card className="taf-stat taf-stat-last"><span className="taf-stat-icon"><CalendarDays size={18}/></span><span className="eyebrow">ÚLTIMA TENTATIVA</span><strong className="taf-stat-date">{latest ? dateLabel(latest.measuredAt) : "—"}</strong><small>{attemptExercise?.name ?? "Registre sua primeira marca"}</small></Card></div>
    <section className="taf-library" aria-labelledby="taf-library-title"><div className="taf-section-heading"><div><span className="eyebrow">PROVAS E EXERCÍCIOS</span><h2 id="taf-library-title">Biblioteca TAF</h2></div><Field label="FILTRAR MODALIDADE"><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></Field></div>
      <div className="taf-exercise-grid">{visibleExercises.map((exercise) => {
        const personalBest = getTafBest(attempts, exercise);
        const last = attempts.find((attempt) => attempt.exerciseId === exercise.id);
        return <Card className="taf-exercise-card" key={exercise.id}>
          <DemoArt exercise={exercise}/>
          <div className="taf-card-copy"><Pill tone="neutral">{exercise.category.toUpperCase()}</Pill><h3>{exercise.name}</h3><p>{exercise.purpose}</p><div className="taf-card-muscles"><Dumbbell size={14}/><span>{exercise.muscles}</span></div></div>
          <div className="taf-card-marks"><div><span className="eyebrow"><Trophy size={12}/> MELHOR MARCA</span><strong>{personalBest === null ? "—" : formatTafValue(personalBest, exercise.defaultUnit)}</strong></div>{last && <div className="taf-last-mark"><span>Última · {dateLabel(last.measuredAt)}</span><b>{formatTafValue(last.value, last.unit)}</b></div>}</div>
          <div className="taf-card-footer"><span className="taf-metric-note"><Ruler size={13}/>{exercise.metricLabel}</span><Button onClick={() => openExercise(exercise)}><Plus size={15}/> REGISTRAR MARCA</Button></div>
          <details className="taf-sources"><summary>Ver referências e variações de edital</summary><div>{(TAF_SOURCES[exercise.id] ?? []).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.context}</span></a>)}</div></details>
        </Card>;
      })}</div>
    </section>
    <section className="taf-history" aria-labelledby="taf-history-title"><div className="taf-section-heading"><div><span className="eyebrow">HISTÓRICO PESSOAL</span><h2 id="taf-history-title">Suas últimas marcas</h2></div>{attempts.length > 8 && <span className="taf-total-note">{attempts.length} tentativas no total</span>}</div>
      {recentAttempts.length ? <div className="taf-history-list">{recentAttempts.map((attempt) => {
        const exercise = TAF_EXERCISES.find((item) => item.id === attempt.exerciseId);
        if (!exercise) return null;
        return <Card className="taf-history-row" key={attempt.id}><div className="taf-history-icon"><Activity size={16}/></div><div className="taf-history-copy"><strong>{exercise.name}</strong><span><CalendarDays size={12}/>{dateLabel(attempt.measuredAt)}{attempt.exam && <> · <MapPin size={12}/>{attempt.exam}</>}</span>{attempt.notes && <small>{attempt.notes}</small>}</div><strong className="taf-history-value">{formatTafValue(attempt.value, attempt.unit)}</strong></Card>;
      })}</div> : <Card className="taf-history-empty"><span><Footprints size={22}/></span><div><strong>Suas marcas começam aqui.</strong><p>Escolha uma modalidade acima para registrar uma tentativa. O acompanhamento é pessoal e separado dos treinos de musculação.</p></div></Card>}
    </section>
    <p className="taf-disclaimer"><Info size={14}/> Ferramenta de registro pessoal. Não calcula aptidão, nota ou aprovação. Consulte o edital e a equipe aplicadora do concurso para as regras oficiais.</p>
    <Modal open={!!activeExercise} title={activeExercise?.name ?? "Modalidade TAF"} eyebrow="DETALHES E ACOMPANHAMENTO" onClose={() => setActiveExercise(null)} wide>
      {activeExercise && <div className="taf-modal-content"><DemoArt exercise={activeExercise}/>{!recording ? <><div className="taf-modal-detail"><span className="eyebrow">FINALIDADE</span><p>{activeExercise.purpose}</p><span className="eyebrow">FOCO MUSCULAR / FÍSICO</span><p>{activeExercise.muscles}</p></div><div className="taf-modal-cue"><Info size={15}/><p>{activeExercise.cue} Referências abaixo são exemplos de editais específicos e não estabelecem regra geral.</p></div><div className="taf-modal-sources"><span className="eyebrow">REFERÊNCIAS OFICIAIS CONSULTADAS</span>{(TAF_SOURCES[activeExercise.id] ?? []).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div><div className="modal-actions"><Button variant="outline" onClick={() => setActiveExercise(null)}><X size={15}/> FECHAR</Button><Button onClick={() => setRecording(true)}><Plus size={15}/> REGISTRAR TENTATIVA</Button></div></> : <form className="taf-record-form" onSubmit={saveAttempt}>
        <div className="taf-form-intro"><Timer size={18}/><p>Registre sua marca pessoal. A unidade acompanha esta modalidade; critérios de aprovação dependem do edital.</p></div>
        <div className="taf-record-grid"><Field label={activeExercise.metricLabel.toUpperCase()}><span className="taf-value-input"><input aria-label={activeExercise.metricLabel} type="number" min={activeExercise.defaultUnit === "reps" ? "1" : "0.01"} step={activeExercise.defaultUnit === "reps" ? "1" : "any"} inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} required placeholder={activeExercise.defaultUnit === "reps" ? "Ex.: 30" : "Ex.: 12,5"}/><span>{activeExercise.unitLabel}</span></span></Field><Field label="DATA DA TENTATIVA"><input type="date" value={measuredAt} onChange={(event) => setMeasuredAt(event.target.value)} required/></Field></div>
        <Field label="CONCURSO OU EDITAL (OPCIONAL)"><input value={exam} onChange={(event) => setExam(event.target.value)} maxLength={80} placeholder="Ex.: concurso/corporação"/></Field>
        <Field label="OBSERVAÇÕES (OPCIONAL)"><textarea value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={240} rows={3} placeholder="Percurso, protocolo usado ou contexto da tentativa"/></Field>
        {formError && <div role="alert" className="form-message error-message">{formError}</div>}
        <div className="modal-actions"><Button type="button" variant="outline" onClick={() => setRecording(false)}>VOLTAR</Button><Button type="submit"><ClipboardCheck size={15}/> SALVAR MARCA</Button></div>
      </form>}</div>}
    </Modal>
  </div>;
}
