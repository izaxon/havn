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
    "ai.title": "AI-läge",
    "ai.body": "En agent kan spela den här platsen utan att klicka. Samma token är alltid samma plats.",
    "ai.token": "Plats-token",
    "ai.copy": "Kopiera token",
    "ai.copied": "Kopierad",
    "ai.docs": "API-dokumentation",
    "ai.taken": "Den här platsen har redan en token i en annan flik.",
    "ai.waiting": "Väntar på en plats…",
    "ai.room": "Rum {code}",
    "rules.api": "En agent kan spela via API:t. Öppna AI-läge i partiet, kopiera plats-token och läs dokumentationen.",
    "mp.guestLink": "Stanna på den här sidan. Länken nedan är gästens (?join=). Värdens sida är ?match=.",
    "mp.aiDocs": "En AI spelar med rumskoden och en plats-token från AI-läge.",
    "ui.tradeBanner": "{from} erbjuder {to} {give} och vill ha {want}.",
    "ui.tradeWaiting": "Spelet väntar på {name}. Ta tillbaka budet om de inte svarar, så kan du fortsätta.",
    "ui.tradeBannerAll": "{from} erbjuder alla {give} och vill ha {want}.",
    "ui.toAll": "Alla",
    "ui.rollHint": "Kasta tärning (mellanslag)",
    "ui.confirmSwap": "Bekräfta: byt {rate} {give} mot {get}",
    "ui.theirCards": "{name} har {n} kort",
    "ui.costs": "Kostar",
    "ui.odds": "6 och 8 kommer oftast.",
    "ui.portNote": "Gul ring är en hamn. Det krävs en by eller stad där.",
    "ui.latest": "Senaste",
    "ui.undo": "Ångra",
    "ui.undoHint": "Bytet med banken gick igenom.",
    "ui.musicOn": "Spela musik",
    "ui.musicOff": "Stäng av musiken",
    "start.pro": "Pro",
    "start.proHint": "Datorerna spelar skarpare. Gäller hela matchen.",
    "start.proOn": "På",
    "start.proOff": "Av",
    "engine.undoBank": "{name} ångrade bytet med banken.",
    "ai.resume": "Samma token tar tillbaka den här platsen. Ett väntande bud syns direkt.",
    "ai.pending": "Obesvarat bud",
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
    "ai.title": "AI mode",
    "ai.body": "An agent can play this seat without clicking. The same token always means the same seat.",
    "ai.token": "Seat token",
    "ai.copy": "Copy token",
    "ai.copied": "Copied",
    "ai.docs": "API documentation",
    "ai.taken": "This seat already has a token in another tab.",
    "ai.waiting": "Waiting for a seat…",
    "ai.room": "Room {code}",
    "rules.api": "An agent can play through the API. Open AI mode in the match, copy the seat token, and read the docs.",
    "mp.guestLink": "Stay on this page. The link below is the guest's (?join=). The host's page is ?match=.",
    "mp.aiDocs": "An AI plays with the room code and a seat token from AI mode.",
    "ui.tradeBanner": "{from} offers {to} {give} and wants {want}.",
    "ui.tradeWaiting": "The game is waiting for {name}. Take the offer back if they do not answer, and you can continue.",
    "ui.tradeBannerAll": "{from} offers everyone {give} and wants {want}.",
    "ui.toAll": "Everyone",
    "ui.rollHint": "Roll dice (or press space)",
    "ui.confirmSwap": "Confirm: trade {rate} {give} for {get}",
    "ui.theirCards": "{name} has {n} cards",
    "ui.costs": "Costs",
    "ui.odds": "6 and 8 come up most often.",
    "ui.portNote": "A gold ring is a port. You need a settlement or city there.",
    "ui.latest": "Latest",
    "ui.undo": "Undo",
    "ui.undoHint": "The bank trade went through.",
    "ui.musicOn": "Play music",
    "ui.musicOff": "Mute music",
    "start.pro": "Pro",
    "start.proHint": "Computers play sharper. Fixed for the match.",
    "start.proOn": "On",
    "start.proOff": "Off",
    "engine.undoBank": "{name} undid the bank trade.",
    "ai.resume": "The same token takes this seat back. A waiting trade shows up immediately.",
    "ai.pending": "Unanswered trade",
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
    "ai.title": "KI-Modus",
    "ai.body": "Ein Agent kann diesen Platz spielen, ohne zu klicken. Dasselbe Token ist immer derselbe Platz.",
    "ai.token": "Platz-Token",
    "ai.copy": "Token kopieren",
    "ai.copied": "Kopiert",
    "ai.docs": "API-Dokumentation",
    "ai.taken": "Dieser Platz hat bereits ein Token in einem anderen Tab.",
    "ai.waiting": "Warte auf einen Platz…",
    "ai.room": "Raum {code}",
    "rules.api": "Ein Agent kann über die API spielen. Öffne den KI-Modus, kopiere das Token und lies die Dokumentation.",
    "mp.guestLink": "Bleib auf dieser Seite. Der Link unten ist für den Gast (?join=). Die Seite des Gastgebers ist ?match=.",
    "mp.aiDocs": "Eine KI spielt mit dem Raumcode und einem Platz-Token aus dem KI-Modus.",
    "ui.tradeBanner": "{from} bietet {to} {give} und will {want}.",
    "ui.tradeWaiting": "Das Spiel wartet auf {name}. Nimm das Angebot zurück, wenn niemand antwortet.",
    "ui.tradeBannerAll": "{from} bietet allen {give} und will {want}.",
    "ui.toAll": "Alle",
    "ui.rollHint": "Würfeln (Leertaste)",
    "ui.confirmSwap": "Bestätigen: {rate} {give} gegen {get}",
    "ui.theirCards": "{name} hat {n} Karten",
    "ui.costs": "Kosten",
    "ui.odds": "6 und 8 fallen am häufigsten.",
    "ui.portNote": "Ein goldener Ring ist ein Hafen. Dafür brauchst du eine Siedlung oder Stadt.",
    "ui.latest": "Zuletzt",
    "ui.undo": "Rückgängig",
    "ui.undoHint": "Der Tausch mit der Bank ist durch.",
    "ui.musicOn": "Musik abspielen",
    "ui.musicOff": "Musik stummschalten",
    "start.pro": "Pro",
    "start.proHint": "Die Computer spielen schärfer. Gilt für die ganze Partie.",
    "start.proOn": "An",
    "start.proOff": "Aus",
    "engine.undoBank": "{name} hat den Banktausch rückgängig gemacht.",
    "ai.resume": "Dasselbe Token holt diesen Platz zurück. Ein offenes Angebot ist sofort sichtbar.",
    "ai.pending": "Unbeantwortetes Angebot",
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
    "ai.title": "Modo IA",
    "ai.body": "Un agente puede jugar este asiento sin hacer clic. El mismo token es siempre el mismo asiento.",
    "ai.token": "Token del asiento",
    "ai.copy": "Copiar token",
    "ai.copied": "Copiado",
    "ai.docs": "Documentación del API",
    "ai.taken": "Este asiento ya tiene un token en otra pestaña.",
    "ai.waiting": "Esperando un asiento…",
    "ai.room": "Sala {code}",
    "rules.api": "Un agente puede jugar por el API. Abre el modo IA, copia el token y lee la documentación.",
    "mp.guestLink": "Quédate en esta página. El enlace de abajo es del invitado (?join=). La página del anfitrión es ?match=.",
    "mp.aiDocs": "Una IA juega con el código de sala y un token de asiento del modo IA.",
    "ui.tradeBanner": "{from} ofrece a {to} {give} y quiere {want}.",
    "ui.tradeWaiting": "La partida espera a {name}. Retira la oferta si no responden y podrás seguir.",
    "ui.tradeBannerAll": "{from} ofrece a todos {give} y quiere {want}.",
    "ui.toAll": "Todos",
    "ui.rollHint": "Lanzar dados (espacio)",
    "ui.confirmSwap": "Confirmar: cambia {rate} {give} por {get}",
    "ui.theirCards": "{name} tiene {n} cartas",
    "ui.costs": "Cuesta",
    "ui.odds": "6 y 8 salen más a menudo.",
    "ui.portNote": "El aro dorado es un puerto. Hace falta un poblado o una ciudad ahí.",
    "ui.latest": "Último",
    "ui.undo": "Deshacer",
    "ui.undoHint": "El cambio con el banco ya está hecho.",
    "ui.musicOn": "Reproducir música",
    "ui.musicOff": "Silenciar la música",
    "start.pro": "Pro",
    "start.proHint": "Los ordenadores juegan mejor. Vale para toda la partida.",
    "start.proOn": "Sí",
    "start.proOff": "No",
    "engine.undoBank": "{name} deshizo el cambio con el banco.",
    "ai.resume": "El mismo token recupera este asiento. Una oferta pendiente se ve al momento.",
    "ai.pending": "Oferta sin respuesta",
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
    "ai.title": "Mode IA",
    "ai.body": "Un agent peut jouer ce siège sans cliquer. Le même jeton désigne toujours le même siège.",
    "ai.token": "Jeton de siège",
    "ai.copy": "Copier le jeton",
    "ai.copied": "Copié",
    "ai.docs": "Documentation de l'API",
    "ai.taken": "Ce siège a déjà un jeton dans un autre onglet.",
    "ai.waiting": "En attente d'un siège…",
    "ai.room": "Salle {code}",
    "rules.api": "Un agent peut jouer via l'API. Ouvre le mode IA, copie le jeton et lis la documentation.",
    "mp.guestLink": "Reste sur cette page. Le lien ci-dessous est celui de l'invité (?join=). La page de l'hôte est ?match=.",
    "mp.aiDocs": "Une IA joue avec le code de salle et un jeton de siège du mode IA.",
    "ui.tradeBanner": "{from} offre à {to} {give} et veut {want}.",
    "ui.tradeWaiting": "La partie attend {name}. Retire l'offre s'il n'y a pas de réponse, et tu peux continuer.",
    "ui.tradeBannerAll": "{from} offre à tous {give} et veut {want}.",
    "ui.toAll": "Tout le monde",
    "ui.rollHint": "Lancer les dés (espace)",
    "ui.confirmSwap": "Confirmer : échanger {rate} {give} contre {get}",
    "ui.theirCards": "{name} a {n} cartes",
    "ui.costs": "Coûts",
    "ui.odds": "6 et 8 sortent le plus souvent.",
    "ui.portNote": "L'anneau doré est un port. Il faut une colonie ou une ville dessus.",
    "ui.latest": "Dernier",
    "ui.undo": "Annuler",
    "ui.undoHint": "L'échange avec la banque est fait.",
    "ui.musicOn": "Jouer la musique",
    "ui.musicOff": "Couper la musique",
    "start.pro": "Pro",
    "start.proHint": "Les ordinateurs jouent mieux. Vaut pour toute la partie.",
    "start.proOn": "Oui",
    "start.proOff": "Non",
    "engine.undoBank": "{name} a annulé l'échange avec la banque.",
    "ai.resume": "Le même jeton reprend ce siège. Une offre en attente apparaît tout de suite.",
    "ai.pending": "Offre sans réponse",
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

export function friendNames(): Set<string> {
  return new Set(LOCALE_IDS.map((id) => extra[id]["mp.friend"]).filter((name): name is string => !!name));
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
