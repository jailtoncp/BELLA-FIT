const DATABASE_NAME = "bella-fit-local-media";
const DATABASE_VERSION = 1;
const STORE_NAME = "exercise-gifs";
export const MAX_EXERCISE_GIF_BYTES = 12 * 1024 * 1024;

type StoredExerciseGif = {
  key: string;
  accountId: string;
  exerciseId: string;
  blob: Blob;
  updatedAt: string;
};

function openDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") return Promise.reject(new Error("O armazenamento local de arquivos não está disponível neste navegador."));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      const store = database.objectStoreNames.contains(STORE_NAME)
        ? request.transaction?.objectStore(STORE_NAME)
        : database.createObjectStore(STORE_NAME, { keyPath: "key" });
      if (store && !store.indexNames.contains("by-account")) store.createIndex("by-account", "accountId", { unique: false });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o armazenamento local de GIFs."));
    request.onblocked = () => reject(new Error("Feche outras abas do BELLA FIT e tente novamente."));
  });
}

export async function validateExerciseGif(file: File): Promise<void> {
  if (!file.size) throw new Error("O arquivo GIF está vazio.");
  if (file.size > MAX_EXERCISE_GIF_BYTES) throw new Error("Escolha um GIF de até 12 MB para manter o app leve no celular.");
  const signature = await file.slice(0, 6).text();
  if (signature !== "GIF87a" && signature !== "GIF89a") throw new Error("Esse arquivo não parece ser um GIF válido. Escolha um arquivo .gif animado.");
}

export async function saveExerciseGif(accountId: string, exerciseId: string, blob: Blob): Promise<void> {
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put({
      key: `${accountId}:${exerciseId}`,
      accountId,
      exerciseId,
      blob,
      updatedAt: new Date().toISOString(),
    } satisfies StoredExerciseGif);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível salvar o GIF neste dispositivo."));
    transaction.onabort = () => reject(transaction.error ?? new Error("O salvamento do GIF foi interrompido."));
  }).finally(() => database.close());
}

export async function loadExerciseGifs(accountId: string): Promise<Record<string, Blob>> {
  const database = await openDatabase();
  return new Promise<Record<string, Blob>>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).index("by-account").getAll(accountId);
    request.onsuccess = () => {
      const stored = request.result as StoredExerciseGif[];
      resolve(Object.fromEntries(stored.filter((item) => item.blob instanceof Blob).map((item) => [item.exerciseId, item.blob])));
    };
    request.onerror = () => reject(request.error ?? new Error("Não foi possível carregar os GIFs deste perfil."));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => database.close();
    transaction.onabort = () => database.close();
  });
}
