import { useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { create } from "zustand";
import { catalogs as baseCatalogs, LOCALES, LOCALE_IDS, type Locale } from "./catalogs";

export type { Locale };
export { LOCALES, LOCALE_IDS };

const STORAGE_KEY = "havn-locale-v1";

const extra: Record<Locale, Record<string, string>> = {
  sv: {
    "mp.invite": "Bjud in vänner",
    "mp.inviteHint": "Du tar första stolen. Växla fler platser till människa för vänner — de ansluter med länken. Datorplatser stannar som dator.",
    "mp.copyInvite": "Kopiera inbjudan",
    "mp.copied": "Kopierad",
    "mp.joining": "Ansluter till ön",
    "mp.waitingHost": "Väntar på att värden öppnar kartan…",
    "mp.failed": "Kunde inte nå värden. Be dem skicka länken igen, eller prova ett annat nät.",
    "mp.full": "Bord fullt",
    "mp.fullBody": "Alla mänskliga platser vid det här bordet är redan tagna.",
    "mp.shareTitle": "Havn",
    "mp.shareText": "Kom och spela Havn med mig.",
    "mp.code": "Kod {code}",
    "mp.keepPlaying": "Fortsätt vänta på ön",
    "mp.showInvite": "Visa inbjudan",
    "mp.dropped": "Länken bröts",
    "mp.droppedBody": "Kunde inte nå din medspelare. Dela inbjudan igen från ett öppnare nät.",
    "mp.connecting": "Öppnar en kanal. Dela länken — vänner tar de mänskliga stolarna.",
    "mp.waitingGuest": "Dela länken. Vänner tar de mänskliga stolarna; datorplatser stannar som dator.",
    "mp.friend": "Vän",
    "mp.peerConnecting": "En vän ansluter…",
    "mp.inviteTitle": "Ta med vänner",
    "mp.inviteKicker": "Inbjudan",
    "mp.linkLabel": "Inbjudningslänk",
    "mp.hostSeat": "Värd",
    "mp.connectedAs": "Ansluten",
    "mp.openSeat": "Väntar",
    "mp.waitingSeat": "Väntar på att {name} ska sätta sig…",
    "mp.computerEmpty": "Låt datorn ta tomma stolar",
    "ui.youHave": "Dina kort",
    "ui.nowThen": "nu → efter",
    "ui.youHold": "du har {n}",
  },
  en: {
    "mp.invite": "Invite friends",
    "mp.inviteHint": "You take the first seat. Switch extra seats to human for friends — they join with the link. Computer seats stay computer.",
    "mp.copyInvite": "Copy invite",
    "mp.copied": "Copied",
    "mp.joining": "Joining the island",
    "mp.waitingHost": "Waiting for the host to open the map…",
    "mp.failed": "Could not reach the host. Ask them to share the link again, or try another network.",
    "mp.full": "Table is full",
    "mp.fullBody": "Every human seat at this table is already taken.",
    "mp.shareTitle": "Havn",
    "mp.shareText": "Come play Havn with me.",
    "mp.code": "Code {code}",
    "mp.keepPlaying": "Keep waiting on the island",
    "mp.showInvite": "Show invite",
    "mp.dropped": "Link dropped",
    "mp.droppedBody": "Could not reach your counterpart. Share the invite again from a less-restricted network.",
    "mp.connecting": "Opening a channel. Share this link — friends take the human seats.",
    "mp.waitingGuest": "Share this link. Friends take the human seats; computer seats stay computer.",
    "mp.friend": "Friend",
    "mp.peerConnecting": "A friend is connecting…",
    "mp.inviteTitle": "Bring friends",
    "mp.inviteKicker": "Invite",
    "mp.linkLabel": "Invite link",
    "mp.hostSeat": "Host",
    "mp.connectedAs": "Seated",
    "mp.openSeat": "Waiting",
    "mp.waitingSeat": "Waiting for {name} to sit down…",
    "mp.computerEmpty": "Let the computer take empty seats",
    "ui.youHave": "Your cards",
    "ui.nowThen": "now → after",
    "ui.youHold": "you have {n}",
  },
  de: {
    "mp.invite": "Freunde einladen",
    "mp.inviteHint": "Du nimmst den ersten Platz. Schalte weitere Plätze auf Mensch für Freunde — sie kommen über den Link. Computerplätze bleiben Computer.",
    "mp.copyInvite": "Einladung kopieren",
    "mp.copied": "Kopiert",
    "mp.joining": "Insel wird betreten",
    "mp.waitingHost": "Warte, bis der Gastgeber die Karte öffnet…",
    "mp.failed": "Gastgeber nicht erreichbar. Bitte den Link erneut senden oder ein anderes Netz versuchen.",
    "mp.full": "Tisch voll",
    "mp.fullBody": "Alle menschlichen Plätze an diesem Tisch sind belegt.",
    "mp.shareTitle": "Havn",
    "mp.shareText": "Komm und spiele Havn mit mir.",
    "mp.code": "Code {code}",
    "mp.keepPlaying": "Auf der Insel weiterwarten",
    "mp.showInvite": "Einladung zeigen",
    "mp.dropped": "Verbindung getrennt",
    "mp.droppedBody": "Mitspieler nicht erreichbar. Teile die Einladung erneut aus einem offeneren Netz.",
    "mp.connecting": "Kanal wird geöffnet. Teile den Link — Freunde nehmen die menschlichen Plätze.",
    "mp.waitingGuest": "Teile den Link. Freunde nehmen die menschlichen Plätze; Computerplätze bleiben Computer.",
    "mp.friend": "Freund",
    "mp.peerConnecting": "Ein Freund verbindet sich…",
    "mp.inviteTitle": "Freunde mitbringen",
    "mp.inviteKicker": "Einladung",
    "mp.linkLabel": "Einladungslink",
    "mp.hostSeat": "Gastgeber",
    "mp.connectedAs": "Verbunden",
    "mp.openSeat": "Wartet",
    "mp.waitingSeat": "Warte, bis {name} Platz nimmt…",
    "mp.computerEmpty": "Computer übernimmt leere Plätze",
    "ui.youHave": "Deine Karten",
    "ui.nowThen": "jetzt → danach",
    "ui.youHold": "du hast {n}",
  },
  es: {
    "mp.invite": "Invitar amigos",
    "mp.inviteHint": "Tú ocupas el primer asiento. Cambia más asientos a humano para amigos: se unen con el enlace. Los asientos de ordenador siguen siendo el ordenador.",
    "mp.copyInvite": "Copiar invitación",
    "mp.copied": "Copiado",
    "mp.joining": "Llegando a la isla",
    "mp.waitingHost": "Esperando a que el anfitrión abra el mapa…",
    "mp.failed": "No se pudo alcanzar al anfitrión. Pídele el enlace de nuevo o prueba otra red.",
    "mp.full": "Mesa llena",
    "mp.fullBody": "Todos los asientos humanos de esta mesa ya están ocupados.",
    "mp.shareTitle": "Havn",
    "mp.shareText": "Ven a jugar Havn conmigo.",
    "mp.code": "Código {code}",
    "mp.keepPlaying": "Seguir esperando en la isla",
    "mp.showInvite": "Mostrar invitación",
    "mp.dropped": "Enlace caído",
    "mp.droppedBody": "No se pudo alcanzar a tu compañero. Comparte la invitación de nuevo desde otra red.",
    "mp.connecting": "Abriendo un canal. Comparte este enlace: los amigos ocupan los asientos humanos.",
    "mp.waitingGuest": "Comparte este enlace. Los amigos ocupan los asientos humanos; el ordenador se queda el resto.",
    "mp.friend": "Amigo",
    "mp.peerConnecting": "Un amigo se está conectando…",
    "mp.inviteTitle": "Trae amigos",
    "mp.inviteKicker": "Invitación",
    "mp.linkLabel": "Enlace de invitación",
    "mp.hostSeat": "Anfitrión",
    "mp.connectedAs": "Sentado",
    "mp.openSeat": "Esperando",
    "mp.waitingSeat": "Esperando a que {name} se siente…",
    "mp.computerEmpty": "Que el ordenador ocupe los asientos vacíos",
    "ui.youHave": "Tus cartas",
    "ui.nowThen": "ahora → después",
    "ui.youHold": "tienes {n}",
  },
  fr: {
    "mp.invite": "Inviter des amis",
    "mp.inviteHint": "Vous prenez le premier siège. Passez d'autres sièges en humain pour les amis — ils rejoignent via le lien. Les sièges ordinateur restent l'ordinateur.",
    "mp.copyInvite": "Copier l'invitation",
    "mp.copied": "Copié",
    "mp.joining": "Arrivée sur l'île",
    "mp.waitingHost": "En attente que l'hôte ouvre la carte…",
    "mp.failed": "Impossible de joindre l'hôte. Demandez le lien à nouveau, ou essayez un autre réseau.",
    "mp.full": "Table complète",
    "mp.fullBody": "Tous les sièges humains de cette table sont déjà pris.",
    "mp.shareTitle": "Havn",
    "mp.shareText": "Viens jouer à Havn avec moi.",
    "mp.code": "Code {code}",
    "mp.keepPlaying": "Continuer d'attendre sur l'île",
    "mp.showInvite": "Afficher l'invitation",
    "mp.dropped": "Lien coupé",
    "mp.droppedBody": "Impossible de joindre votre partenaire. Partagez l'invitation depuis un autre réseau.",
    "mp.connecting": "Ouverture d'un canal. Partagez ce lien — les amis prennent les sièges humains.",
    "mp.waitingGuest": "Partagez ce lien. Les amis prennent les sièges humains ; l'ordinateur garde le reste.",
    "mp.friend": "Ami",
    "mp.peerConnecting": "Un ami se connecte…",
    "mp.inviteTitle": "Amener des amis",
    "mp.inviteKicker": "Invitation",
    "mp.linkLabel": "Lien d'invitation",
    "mp.hostSeat": "Hôte",
    "mp.connectedAs": "Assis",
    "mp.openSeat": "En attente",
    "mp.waitingSeat": "En attente que {name} s'assoie…",
    "mp.computerEmpty": "Laisser l'ordinateur prendre les sièges vides",
    "ui.youHave": "Vos cartes",
    "ui.nowThen": "avant → après",
    "ui.youHold": "vous en avez {n}",
  },
};

type Vars = Record<string, string | number>;

function lookup(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
}

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LOCALE_IDS as string[]).includes(saved)) return saved as Locale;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined") {
    const nav = navigator.language.slice(0, 2);
    if ((LOCALE_IDS as string[]).includes(nav)) return nav as Locale;
  }
  return "sv";
}

interface LocaleState {
  locale: Locale;
  ready: boolean;
  setLocale: (locale: Locale) => void;
  hydrateLocale: () => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "sv",
  ready: true,
  setLocale: (locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    set({ locale });
  },
  hydrateLocale: () => {
    set({ locale: detectLocale(), ready: true });
  },
}));

export function t(path: string, vars?: Vars): string {
  const locale = useLocaleStore.getState().locale;
  const fromCat = lookup(baseCatalogs[locale], path) ?? lookup(baseCatalogs.en, path);
  const raw =
    (typeof fromCat === "string" ? fromCat : undefined) ??
    extra[locale]?.[path] ??
    extra.en[path] ??
    path;
  return interpolate(raw, vars);
}

export function useT() {
  const locale = useLocaleStore((s) => s.locale);
  return useCallback(
    (path: string, vars?: Vars) => {
      void locale;
      return t(path, vars);
    },
    [locale],
  );
}

export function aiNames(locale?: Locale): string[] {
  const loc = locale ?? useLocaleStore.getState().locale;
  return [...baseCatalogs[loc].ai];
}

export function youNames(): Set<string> {
  return new Set(LOCALE_IDS.map((id) => baseCatalogs[id].start.you));
}

export function allAiNames(): Set<string> {
  return new Set(LOCALE_IDS.flatMap((id) => [...baseCatalogs[id].ai]));
}

export function LocaleSwitch({ compact = false }: { compact?: boolean }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const label = t("start.language");
  return jsx("div", {
    className: "flex flex-wrap gap-1",
    role: "group",
    "aria-label": label,
    children: LOCALES.map((item) =>
      jsx(
        "button",
        {
          type: "button",
          className: [
            "rounded-[var(--radius-sm)] font-medium uppercase tracking-wide",
            compact ? "h-9 min-w-9 px-2 text-xs" : "h-10 px-3 text-sm",
            locale === item.id
              ? "bg-accent text-accent-fg"
              : "border border-border bg-surface-2 text-muted hover:text-fg",
          ].join(" "),
          onClick: () => setLocale(item.id),
          "aria-pressed": locale === item.id,
          "aria-label": item.native,
          children: item.id,
        },
        item.id,
      ),
    ),
  });
}
