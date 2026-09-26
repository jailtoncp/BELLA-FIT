import type { DayKey, ExerciseDefinition, ExerciseSet, Workout, WorkoutExercise } from "../types";
import { EXERCISE_IMAGES } from "./exerciseImages";
import { EXERCISE_FOCUS } from "./exerciseFocus";

const rows: Array<[string, string, string, string, number, string, number, string, string]> = [
  ["hip-thrust", "Hip Thrust", "Glúteos", "Barra", 4, "12", 90, "Extensão de quadril com ênfase em glúteos.", "Apoie a parte superior das costas no banco, mantenha o queixo recolhido e suba até alinhar quadril e tronco."],
  ["elevacao-pelvica", "Elevação pélvica", "Glúteos", "Barra", 4, "12", 90, "Movimento de extensão de quadril feito no solo.", "Mantenha os pés firmes, contraia o abdômen e pause no topo sem hiperestender a lombar."],
  ["glute-bridge", "Glute Bridge", "Glúteos", "Peso corporal", 3, "15", 60, "Ponte de glúteos para ativação e controle.", "Deite-se, aproxime os calcanhares do quadril e eleve a pelve com controle."],
  ["coice", "Coice", "Glúteos", "Cabo", 3, "12", 60, "Extensão unilateral de quadril no cabo.", "Estabilize o tronco e mova a perna sem embalar o corpo."],
  ["abducao", "Abdução", "Glúteos", "Máquina", 3, "15", 60, "Abdução de quadril com resistência controlada.", "Mantenha o tronco estável e retorne devagar, sem deixar a carga bater."],
  ["agachamento-sumo", "Agachamento sumô", "Glúteos", "Halter", 3, "12", 90, "Agachamento com base ampla e pés apontados para fora.", "Desça entre os quadris mantendo joelhos alinhados com os pés."],
  ["agachamento", "Agachamento", "Pernas", "Barra", 4, "10", 120, "Agachamento multiarticular para membros inferiores.", "Tronco firme, pés estáveis e joelhos acompanhando a direção dos dedos."],
  ["leg-press", "Leg Press", "Pernas", "Máquina", 4, "12", 90, "Empurrada de pernas em máquina guiada.", "Desça até onde a pelve permaneça apoiada e empurre sem travar os joelhos."],
  ["hack", "Hack", "Pernas", "Máquina", 3, "10", 90, "Agachamento guiado no aparelho hack.", "Mantenha as costas apoiadas, controle a descida e evite travar os joelhos."],
  ["extensora", "Cadeira extensora", "Pernas", "Máquina", 3, "12", 60, "Extensão de joelho para quadríceps.", "Ajuste o eixo da máquina ao joelho e suba sem impulso."],
  ["flexora", "Cadeira flexora", "Pernas", "Máquina", 3, "12", 60, "Flexão de joelho para posteriores de coxa.", "Mantenha o quadril apoiado e controle a volta da carga."],
  ["stiff", "Stiff", "Posterior", "Barra", 4, "10", 90, "Hinge de quadril com foco em posteriores.", "Leve o quadril para trás, mantenha a coluna neutra e a barra próxima às pernas."],
  ["afundo", "Afundo", "Pernas", "Halteres", 3, "10", 90, "Movimento unilateral de membros inferiores.", "Dê um passo confortável e desça mantendo o tronco firme."],
  ["passada", "Passada", "Pernas", "Halteres", 3, "12", 90, "Passos alternados para força e estabilidade.", "Mantenha espaço entre os pés e controle cada troca de apoio."],
  ["panturrilha", "Panturrilha", "Pernas", "Máquina", 4, "15", 60, "Elevação dos calcanhares para panturrilhas.", "Use amplitude completa, pause no topo e desça com controle."],
  ["puxada-frontal", "Puxada frontal", "Costas", "Cabo", 4, "10", 75, "Puxada vertical para dorsais.", "Puxe em direção à parte alta do peito sem balançar o tronco."],
  ["remada-baixa", "Remada baixa", "Costas", "Cabo", 3, "12", 75, "Remada horizontal para costas.", "Inicie o movimento com as escápulas e mantenha o peito aberto."],
  ["remada-unilateral", "Remada unilateral", "Costas", "Halter", 3, "10", 75, "Remada unilateral apoiada.", "Mantenha o tronco estável e conduza o cotovelo para trás."],
  ["remada-curvada", "Remada curvada", "Costas", "Barra", 4, "8", 90, "Remada inclinada para costas.", "Incline o tronco com coluna neutra e puxe a barra em direção ao abdômen."],
  ["supino", "Supino", "Peito", "Barra", 4, "8", 90, "Press horizontal para peitoral.", "Mantenha os pés firmes e desça a barra com controle."],
  ["crucifixo", "Crucifixo", "Peito", "Halteres", 3, "12", 60, "Adução horizontal com ênfase no peitoral.", "Flexione levemente os cotovelos e use amplitude confortável."],
  ["crossover", "Crossover", "Peito", "Cabo", 3, "12", 60, "Adução de braços em cabos.", "Mantenha o tronco estável e aproxime as mãos sem perder o controle."],
  ["elevacao-lateral", "Elevação lateral", "Ombros", "Halteres", 3, "12", 60, "Elevação lateral para deltoides.", "Eleve os braços até a linha dos ombros sem usar impulso."],
  ["elevacao-frontal", "Elevação frontal", "Ombros", "Halteres", 3, "12", 60, "Elevação anterior dos braços.", "Suba até a altura dos ombros com punhos neutros."],
  ["desenvolvimento", "Desenvolvimento", "Ombros", "Halteres", 4, "10", 75, "Press vertical para ombros.", "Mantenha o abdômen ativo e empurre sem arquear a lombar."],
  ["rosca-direta", "Rosca direta", "Bíceps", "Barra", 3, "12", 60, "Flexão de cotovelos com barra.", "Mantenha os cotovelos próximos ao tronco e evite balançar."],
  ["rosca-alternada", "Rosca alternada", "Bíceps", "Halteres", 3, "10", 60, "Rosca unilateral alternada.", "Gire a palma na subida se for confortável e controle a descida."],
  ["rosca-martelo", "Rosca martelo", "Bíceps", "Halteres", 3, "12", 60, "Rosca com pegada neutra.", "Mantenha os punhos alinhados e os cotovelos estáveis."],
  ["triceps-pulley", "Tríceps pulley", "Tríceps", "Cabo", 3, "12", 60, "Extensão de cotovelos na polia.", "Fixe os cotovelos junto ao corpo e estenda sem projetar os ombros."],
  ["triceps-frances", "Tríceps francês", "Tríceps", "Halter", 3, "12", 60, "Extensão acima da cabeça para tríceps.", "Mantenha os cotovelos apontados para frente e mova os antebraços."],
  ["triceps-testa", "Tríceps testa", "Tríceps", "Barra", 3, "10", 60, "Extensão de cotovelos deitada.", "Desça a barra com controle, mantendo os braços estáveis."],
  ["abdominal", "Abdominal", "Abdômen", "Peso corporal", 3, "15", 45, "Flexão controlada do tronco.", "Expire ao subir e mantenha a lombar confortável."],
  ["prancha", "Prancha", "Abdômen", "Peso corporal", 3, "45", 45, "Isometria de estabilização do tronco.", "Alinhe cabeça, tronco e quadril e respire sem prender o ar."],
  ["elevacao-pernas", "Elevação de pernas", "Abdômen", "Peso corporal", 3, "12", 45, "Elevação controlada das pernas.", "Mantenha o abdômen ativo e evite arquear a lombar."],
];

export const EXERCISE_CATALOG: ExerciseDefinition[] = rows.map(([id, name, muscle, equipment, defaultSets, defaultReps, defaultRestSeconds, description, instructions]) => ({
  id, name, muscle, equipment, defaultSets, defaultReps, defaultRestSeconds, description, instructions, imageUrl: EXERCISE_IMAGES[id], ...EXERCISE_FOCUS[id as keyof typeof EXERCISE_FOCUS],
}));

export const DAYS: Array<{ key: DayKey; label: string; short: string }> = [
  { key: "seg", label: "Segunda-feira", short: "SEG" },
  { key: "ter", label: "Terça-feira", short: "TER" },
  { key: "qua", label: "Quarta-feira", short: "QUA" },
  { key: "qui", label: "Quinta-feira", short: "QUI" },
  { key: "sex", label: "Sexta-feira", short: "SEX" },
  { key: "sab", label: "Sábado", short: "SÁB" },
  { key: "dom", label: "Domingo", short: "DOM" },
];

export const WORKOUT_COLORS = ["#d94a82", "#bb6d91", "#6a91a7", "#a67caf", "#cb8d5a", "#658f7a"];

export function makeId(prefix = "bf"): string {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`}`;
}

export function makeWorkoutExercise(definition: ExerciseDefinition): WorkoutExercise {
  const sets: ExerciseSet[] = Array.from({ length: Math.min(10, Math.max(1, definition.defaultSets)) }, () => ({
    id: makeId("set"), reps: definition.defaultReps, weight: "", method: "Repetições", seconds: 45,
  }));
  return { ...definition, sets, restSeconds: definition.defaultRestSeconds, note: "" };
}

export function makeStarterWorkouts(): Workout[] {
  const get = (id: string) => EXERCISE_CATALOG.find((item) => item.id === id)!;
  const now = new Date().toISOString();
  const starters: Array<{ title: string; description: string; days: DayKey[]; color: string; exercises: string[] }> = [
    { title: "Treino A", description: "Glúteos + posterior", days: ["seg"], color: WORKOUT_COLORS[0], exercises: ["hip-thrust", "stiff", "flexora", "abducao"] },
    { title: "Treino B", description: "Pernas completas", days: ["qua"], color: WORKOUT_COLORS[2], exercises: ["agachamento", "leg-press", "extensora", "panturrilha"] },
    { title: "Treino C", description: "Superior + postura", days: ["sex"], color: WORKOUT_COLORS[3], exercises: ["puxada-frontal", "remada-baixa", "supino", "elevacao-lateral"] },
  ];
  return starters.map((item) => ({
    id: makeId("workout"), title: item.title, description: item.description, days: item.days, color: item.color,
    exercises: item.exercises.map((id) => makeWorkoutExercise(get(id))), createdAt: now, updatedAt: now,
  }));
}
