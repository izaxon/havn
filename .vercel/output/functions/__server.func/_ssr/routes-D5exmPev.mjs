import { o as __toESM } from "../_runtime.mjs";
import { R as require_react, _ as useNavigate, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CircleDot, b as BookOpen, c as Route, d as LogOut, f as Link2, g as Copy, h as CreditCard, i as User, l as Plus, m as Handshake, n as VolumeX, o as Trash2, p as House, r as Volume2, s as SkipForward, t as X, u as Map$1, v as Castle, y as Bot } from "../_libs/lucide-react.mjs";
import { a as friendSeatIds, c as isRoomCode, i as asBoard, l as makeRoomCode, n as Route$2, o as inviteUrl, r as actingPlayerId, s as isNetMsg } from "./router-BY_tbpsG.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D5exmPev.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "border border-border bg-surface text-fg hover:bg-surface-2",
			ghost: "text-muted hover:text-fg hover:bg-surface",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var LOCALES = [
	{
		id: "sv",
		native: "Svenska"
	},
	{
		id: "en",
		native: "English"
	},
	{
		id: "de",
		native: "Deutsch"
	},
	{
		id: "es",
		native: "Español"
	},
	{
		id: "fr",
		native: "Français"
	}
];
var LOCALE_IDS = [
	"sv",
	"en",
	"de",
	"es",
	"fr"
];
var catalogs = {
	sv: {
		start: {
			kicker: `Ön väntar`,
			blurb: `Kolonisera ön, samla råvaror och bygg det första riket till tio segerpoäng.`,
			players: `Spelare`,
			add: `Lägg till`,
			you: `Du`,
			computer: `Dator`,
			playerN: `Spelare {n}`,
			startGame: `Starta spel`,
			continueGame: `Fortsätt sparad ö`,
			how: `Hur man spelar`,
			nameAria: `Namn spelare {n}`,
			removeAria: `Ta bort spelare`,
			language: `Språk`
		},
		ai: [
			`Sigrid`,
			`Björn`,
			`Astrid`,
			`Einar`
		],
		resource: {
			wood: `Skog`,
			brick: `Lera`,
			wool: `Ull`,
			grain: `Säd`,
			ore: `Malm`
		},
		terrain: {
			wood: `Skog`,
			brick: `Backar`,
			wool: `Betesmark`,
			grain: `Åker`,
			ore: `Berg`,
			desert: `Öken`
		},
		dev: {
			knight: `Riddare`,
			vp: `Segerpoäng`,
			roads: `Vägbygge`,
			plenty: `Överflöd`,
			monopoly: `Monopol`
		},
		devHint: {
			knight: `Flytta rövaren och stjäl ett kort.`,
			vp: `Dolt segerpoäng. Räknas när du når tio.`,
			roads: `Bygg två vägar utan kostnad.`,
			plenty: `Ta två valfria råvaror från banken.`,
			monopoly: `Alla ger dig sina kort av en råvara.`
		},
		phase: {
			setup: `Grundläggning`,
			roll: `Tärning`,
			discard: `Rövaren`,
			robber: `Rövaren`,
			main: `Handling`,
			roadBuilding: `Vägbygge`,
			gameOver: `Spelet slut`,
			menu: `Meny`
		},
		hint: {
			waitFor: `Väntar på {name}…`,
			wantsTrade: `{name} vill byta.`,
			setupSettle: `{you}: placera en by på en korsning.`,
			setupRoad: `{you}: dra en väg från byn.`,
			roll: `{you}: kasta tärningen. En riddare kan spelas före kastet.`,
			discard: `{you} har mer än sju kort och måste slänga {n}.`,
			robber: `{you}: flytta rövaren till en annan hex.`,
			freeRoad: `{you}: bygg {n} fri väg.`,
			freeRoads: `{you}: bygg {n} fria vägar.`,
			pickSettle: `Välj en korsning för en ny by.`,
			pickCity: `Välj en av dina byar att bygga ut till stad.`,
			pickRoad: `Välj en kant för en ny väg.`,
			main: `{you}: bygg, handla eller avsluta turen.`,
			win: `{name} vinner med {n} segerpoäng.`
		},
		ui: {
			round: `Runda {n}`,
			setup: `Grundläggning`,
			sound: `Ljud`,
			rules: `Regler`,
			quit: `Avsluta`,
			road: `Väg`,
			settle: `By`,
			city: `Stad`,
			card: `Kort`,
			trade: `Handla`,
			endTurn: `Avsluta tur`,
			roll: `Kasta tärning`,
			skipRoads: `Hoppa över resterande vägar`,
			turn: `Tur`,
			vp: `SP`,
			hidden: `{n} dolda`,
			cards: `{n} kort`,
			longest: `Väg`,
			army: `Här`,
			close: `Stäng`,
			nothing: `Inget`,
			youGet: `Du får`,
			youGive: `Du ger`,
			youWant: `Du vill ha`,
			decline: `Avböj`,
			accept: `Acceptera`,
			cantAfford: `Du har inte de korten — avböj eller vänta till nästa gång.`,
			thinking: `{name} tänker…`,
			retract: `Ta tillbaka`,
			tradeTitle: `Handel`,
			bank: `Banken`,
			players: `Spelare`,
			rate: `Din kurs för {resource} är {rate}:1.`,
			give: `Ge`,
			get: `Få`,
			swap: `Byt {rate} {give} mot {get}`,
			to: `Till`,
			send: `Skicka erbjudande`,
			wantsTrade: `{name} vill byta`,
			tradeTo: `Byte till {name}`,
			discardTitle: `{name}: släng {n} kort`,
			discardHint: `Sju på tärningen. Välj {n} kort att lägga tillbaka.`,
			discardBtn: `Släng {chosen}/{need}`,
			stealTitle: `Stjäl ett kort`,
			stealCards: `{n} kort`,
			plentyTitle: `Överflöd — ta två råvaror`,
			monopolyTitle: `Monopol`,
			pickTwo: `Valda {n}/2 — samma råvara går bra två gånger.`,
			pickOne: `Välj en råvara.`,
			winTitle: `{name} vinner`,
			winBody: `{name} når {n} segerpoäng och tar hem ön.`,
			backMenu: `Tillbaka till menyn`,
			crashedTitle: `Spelet snubblade`,
			crashedBody: `Partiet är sparat. Du kan fortsätta där du var.`,
			continueBtn: `Fortsätt`,
			youPronoun: `Du`
		},
		rules: {
			title: `Hur man spelar`,
			p1: `Turordning runt bordet. Varje tur: kasta tärning, handla och bygg, avsluta.`,
			p2: `Summan på tärningen ger råvaror till byar (1) och städer (2) vid den hexen. Sju väcker rövaren — den som har fler än sju kort slänger hälften, och du flyttar rövaren.`,
			p3: `By: skog + lera + ull + säd. Väg: skog + lera. Stad: två säd + tre malm. Kort: ull + säd + malm.`,
			p4: `Byar ger 1 poäng, städer 2. Längsta vägen (minst fem) och största hären (minst tre riddare) ger 2 var. Först till 10 vinner.`,
			p5: `Byar får inte ligga intill varandra. Hamnar sänker bytet med banken till 3:1 eller 2:1.`
		},
		exit: {
			title: `Lämna ön?`,
			body: `Partiet sparas. Du kan fortsätta från menyn.`,
			cancel: `Stanna`,
			confirm: `Till menyn`
		},
		engine: {
			badPlayer: `Ogiltig spelare.`,
			noCard: `Du har inte det kortet.`,
			longest: `{name} tar längsta vägen.`,
			army: `{name} tar största hären.`,
			wins: `{name} vinner ön med {n} segerpoäng!`,
			bankShort: `Banken har inte tillräckligt med {resource}.`,
			gains: `{name} får {list}.`,
			harvest: `{name} skördar {list} från andra byn.`,
			settled: `Ön är befolkad. Första turen börjar.`,
			mustDiscard: `{name} måste slänga kort.`,
			pickSeats: `Välj 2–4 spelare.`,
			playerN: `Spelare {n}`,
			setupLog: `Grundläggning: varsin by och väg, sedan tillbaka i omvänd ordning.`,
			notRunning: `Spelet är inte igång.`,
			waitTrade: `Inväntar svar på byteserbjudandet.`,
			noSettleNow: `Du kan inte bygga en by nu.`,
			notYourTurn: `Inte din tur.`,
			placeRoadFirst: `Placera en väg först.`,
			badVertex: `Ogiltig korsning.`,
			noSettlements: `Inga byar kvar.`,
			cantAffordSettle: `Inte råd med en by.`,
			foundsSettle: `{name} grundar en by.`,
			buildsSettle: `{name} bygger en by.`,
			noRoadNow: `Du kan inte bygga en väg nu.`,
			placeSettleFirst: `Placera en by först.`,
			badRoad: `Ogiltig väg.`,
			cantAffordRoad: `Inte råd med en väg.`,
			drawsRoad: `{name} drar en väg.`,
			freeRoad: `{name} bygger en fri väg.`,
			buildsRoad: `{name} bygger en väg.`,
			noCityNow: `Du kan inte bygga en stad nu.`,
			badCity: `Ogiltig stad.`,
			noCities: `Inga städer kvar.`,
			cantAffordCity: `Inte råd med en stad.`,
			buildsCity: `{name} bygger en stad.`,
			alreadyRolled: `Tärningen är redan kastad.`,
			rolled: `{name} slår {d1} och {d2} — {total}.`,
			noDiscard: `Ingen behöver slänga kort.`,
			emptyQueue: `Ingen i kön.`,
			badDiscard: `Ogiltigt släng.`,
			mustDiscardN: `Du måste slänga {n} kort.`,
			discarded: `{name} slänger {n} kort.`,
			noRobberNow: `Rövaren ska inte flyttas nu.`,
			badHex: `Ogiltig hex.`,
			moveRobberElse: `Flytta rövaren till en annan plats.`,
			cantSteal: `Du kan inte stjäla från den spelaren.`,
			pickVictim: `Välj vem du stjäl från.`,
			stole: `{name} stjäl {resource} från {other}.`,
			movedRobber: `{name} flyttar rövaren.`,
			noBuyNow: `Du kan inte köpa kort nu.`,
			noDevLeft: `Inga utvecklingskort kvar.`,
			cantAffordDev: `Inte råd med ett kort.`,
			boughtDev: `{name} köper ett utvecklingskort.`,
			notNow: `Inte nu.`,
			oneDev: `Bara ett kort per tur.`,
			playsKnight: `{name} spelar en riddare.`,
			roadsNoBuild: `{name} spelar vägbygge men kan inte bygga.`,
			playsRoads: `{name} spelar vägbygge.`,
			noFreeRoads: `Inga fria vägar just nu.`,
			plenty: `{name} tar {a} och {b} från banken.`,
			monopoly: `{name} monopoliserar {resource} ({n} kort).`,
			differentRes: `Välj två olika råvaror.`,
			needRate: `Du behöver {n} {resource}.`,
			bankEmpty: `Banken är tom.`,
			bankSwap: `{name} byter {n} {give} mot {get}.`,
			selfTrade: `Du kan inte byta med dig själv.`,
			bothWays: `Ett byte måste gå åt båda håll.`,
			noThoseCards: `Du har inte de korten.`,
			offers: `{name} erbjuder {other} ett byte.`,
			noOffer: `Inget erbjudande.`,
			declines: `{name} avböjer bytet.`,
			accepts: `{name} accepterar bytet med {other}.`,
			onlyOfferer: `Bara den som erbjuder kan dra tillbaka.`,
			retracts: `{name} tar tillbaka bytet.`,
			dontEnd: `Avsluta inte turen än.`,
			endsTurn: `{name} avslutar turen.`,
			unknown: `Okänd handling.`
		}
	},
	en: {
		start: {
			kicker: `The island waits`,
			blurb: `Settle the island, gather resources and build the first realm to ten victory points.`,
			players: `Players`,
			add: `Add`,
			you: `You`,
			computer: `Computer`,
			playerN: `Player {n}`,
			startGame: `Start game`,
			continueGame: `Continue saved island`,
			how: `How to play`,
			nameAria: `Name of player {n}`,
			removeAria: `Remove player`,
			language: `Language`
		},
		ai: [
			`Clara`,
			`Owen`,
			`Helen`,
			`Marco`
		],
		resource: {
			wood: `Lumber`,
			brick: `Brick`,
			wool: `Wool`,
			grain: `Grain`,
			ore: `Ore`
		},
		terrain: {
			wood: `Forest`,
			brick: `Hills`,
			wool: `Pasture`,
			grain: `Fields`,
			ore: `Mountains`,
			desert: `Desert`
		},
		dev: {
			knight: `Knight`,
			vp: `Victory point`,
			roads: `Road building`,
			plenty: `Year of plenty`,
			monopoly: `Monopoly`
		},
		devHint: {
			knight: `Move the robber and steal a card.`,
			vp: `Hidden victory point. Counts when you reach ten.`,
			roads: `Build two roads for free.`,
			plenty: `Take two resources of your choice from the bank.`,
			monopoly: `Everyone gives you their cards of one resource.`
		},
		phase: {
			setup: `Setup`,
			roll: `Dice`,
			discard: `Robber`,
			robber: `Robber`,
			main: `Actions`,
			roadBuilding: `Road building`,
			gameOver: `Game over`,
			menu: `Menu`
		},
		hint: {
			waitFor: `Waiting for {name}…`,
			wantsTrade: `{name} wants to trade.`,
			setupSettle: `{you}: place a settlement on a junction.`,
			setupRoad: `{you}: build a road from the settlement.`,
			roll: `{you}: roll the dice. A knight may be played before the roll.`,
			discard: `{you} have more than seven cards and must discard {n}.`,
			robber: `{you}: move the robber to another hex.`,
			freeRoad: `{you}: build {n} free road.`,
			freeRoads: `{you}: build {n} free roads.`,
			pickSettle: `Choose a junction for a new settlement.`,
			pickCity: `Choose one of your settlements to upgrade to a city.`,
			pickRoad: `Choose an edge for a new road.`,
			main: `{you}: build, trade or end the turn.`,
			win: `{name} wins with {n} victory points.`
		},
		ui: {
			round: `Round {n}`,
			setup: `Setup`,
			sound: `Sound`,
			rules: `Rules`,
			quit: `Quit`,
			road: `Road`,
			settle: `Settle`,
			city: `City`,
			card: `Card`,
			trade: `Trade`,
			endTurn: `End turn`,
			roll: `Roll dice`,
			skipRoads: `Skip remaining roads`,
			turn: `Turn`,
			vp: `VP`,
			hidden: `{n} hidden`,
			cards: `{n} cards`,
			longest: `Road`,
			army: `Army`,
			close: `Close`,
			nothing: `Nothing`,
			youGet: `You get`,
			youGive: `You give`,
			youWant: `You want`,
			decline: `Decline`,
			accept: `Accept`,
			cantAfford: `You don't have those cards — decline or wait for next time.`,
			thinking: `{name} is thinking…`,
			retract: `Take back`,
			tradeTitle: `Trade`,
			bank: `Bank`,
			players: `Players`,
			rate: `Your rate for {resource} is {rate}:1.`,
			give: `Give`,
			get: `Get`,
			swap: `Trade {rate} {give} for {get}`,
			to: `To`,
			send: `Send offer`,
			wantsTrade: `{name} wants to trade`,
			tradeTo: `Offer to {name}`,
			discardTitle: `{name}: discard {n} cards`,
			discardHint: `Seven on the dice. Choose {n} cards to return.`,
			discardBtn: `Discard {chosen}/{need}`,
			stealTitle: `Steal a card`,
			stealCards: `{n} cards`,
			plentyTitle: `Year of plenty — take two resources`,
			monopolyTitle: `Monopoly`,
			pickTwo: `Picked {n}/2 — the same resource twice is fine.`,
			pickOne: `Pick a resource.`,
			winTitle: `{name} wins`,
			winBody: `{name} reaches {n} victory points and claims the island.`,
			backMenu: `Back to menu`,
			crashedTitle: `The game stumbled`,
			crashedBody: `The match is saved. You can continue where you left off.`,
			continueBtn: `Continue`,
			youPronoun: `You`
		},
		rules: {
			title: `How to play`,
			p1: `Turns go around the table. Each turn: roll, trade and build, then end.`,
			p2: `The dice total pays resources to settlements (1) and cities (2) on that hex. Seven wakes the robber — anyone with more than seven cards discards half, and you move the robber.`,
			p3: `Settlement: lumber + brick + wool + grain. Road: lumber + brick. City: two grain + three ore. Card: wool + grain + ore.`,
			p4: `Settlements are 1 point, cities 2. Longest road (at least five) and largest army (at least three knights) are worth 2 each. First to 10 wins.`,
			p5: `Settlements may not sit next to each other. Harbors improve bank trades to 3:1 or 2:1.`
		},
		exit: {
			title: `Leave the island?`,
			body: `The match is saved. You can continue from the menu.`,
			cancel: `Stay`,
			confirm: `To menu`
		},
		engine: {
			badPlayer: `Invalid player.`,
			noCard: `You don't have that card.`,
			longest: `{name} takes longest road.`,
			army: `{name} takes largest army.`,
			wins: `{name} wins the island with {n} victory points!`,
			bankShort: `The bank hasn't enough {resource}.`,
			gains: `{name} gets {list}.`,
			harvest: `{name} harvests {list} from the second settlement.`,
			settled: `The island is settled. The first turn begins.`,
			mustDiscard: `{name} must discard cards.`,
			pickSeats: `Choose 2–4 players.`,
			playerN: `Player {n}`,
			setupLog: `Setup: each player places a settlement and a road, then back in reverse order.`,
			notRunning: `The game is not running.`,
			waitTrade: `Waiting for a reply to the trade offer.`,
			noSettleNow: `You can't build a settlement now.`,
			notYourTurn: `Not your turn.`,
			placeRoadFirst: `Place a road first.`,
			badVertex: `Invalid junction.`,
			noSettlements: `No settlements left.`,
			cantAffordSettle: `Can't afford a settlement.`,
			foundsSettle: `{name} founds a settlement.`,
			buildsSettle: `{name} builds a settlement.`,
			noRoadNow: `You can't build a road now.`,
			placeSettleFirst: `Place a settlement first.`,
			badRoad: `Invalid road.`,
			cantAffordRoad: `Can't afford a road.`,
			drawsRoad: `{name} builds a road.`,
			freeRoad: `{name} builds a free road.`,
			buildsRoad: `{name} builds a road.`,
			noCityNow: `You can't build a city now.`,
			badCity: `Invalid city.`,
			noCities: `No cities left.`,
			cantAffordCity: `Can't afford a city.`,
			buildsCity: `{name} builds a city.`,
			alreadyRolled: `The dice have already been rolled.`,
			rolled: `{name} rolls {d1} and {d2} — {total}.`,
			noDiscard: `Nobody needs to discard.`,
			emptyQueue: `Nobody in the queue.`,
			badDiscard: `Invalid discard.`,
			mustDiscardN: `You must discard {n} cards.`,
			discarded: `{name} discards {n} cards.`,
			noRobberNow: `The robber should not move now.`,
			badHex: `Invalid hex.`,
			moveRobberElse: `Move the robber somewhere else.`,
			cantSteal: `You can't steal from that player.`,
			pickVictim: `Choose who you steal from.`,
			stole: `{name} steals {resource} from {other}.`,
			movedRobber: `{name} moves the robber.`,
			noBuyNow: `You can't buy a card now.`,
			noDevLeft: `No development cards left.`,
			cantAffordDev: `Can't afford a card.`,
			boughtDev: `{name} buys a development card.`,
			notNow: `Not now.`,
			oneDev: `Only one card per turn.`,
			playsKnight: `{name} plays a knight.`,
			roadsNoBuild: `{name} plays road building but cannot build.`,
			playsRoads: `{name} plays road building.`,
			noFreeRoads: `No free roads right now.`,
			plenty: `{name} takes {a} and {b} from the bank.`,
			monopoly: `{name} monopolises {resource} ({n} cards).`,
			differentRes: `Pick two different resources.`,
			needRate: `You need {n} {resource}.`,
			bankEmpty: `The bank is empty.`,
			bankSwap: `{name} trades {n} {give} for {get}.`,
			selfTrade: `You can't trade with yourself.`,
			bothWays: `A trade must go both ways.`,
			noThoseCards: `You don't have those cards.`,
			offers: `{name} offers {other} a trade.`,
			noOffer: `No offer.`,
			declines: `{name} declines the trade.`,
			accepts: `{name} accepts the trade with {other}.`,
			onlyOfferer: `Only the one who offered can take it back.`,
			retracts: `{name} takes the offer back.`,
			dontEnd: `Don't end the turn yet.`,
			endsTurn: `{name} ends the turn.`,
			unknown: `Unknown action.`
		}
	},
	de: {
		start: {
			kicker: `Die Insel wartet`,
			blurb: `Besiedle die Insel, sammle Rohstoffe und baue das erste Reich auf zehn Siegpunkte.`,
			players: `Spieler`,
			add: `Hinzufügen`,
			you: `Du`,
			computer: `Computer`,
			playerN: `Spieler {n}`,
			startGame: `Spiel starten`,
			continueGame: `Gespeicherte Insel fortsetzen`,
			how: `Spielregeln`,
			nameAria: `Name von Spieler {n}`,
			removeAria: `Spieler entfernen`,
			language: `Sprache`
		},
		ai: [
			`Lena`,
			`Otto`,
			`Greta`,
			`Hans`
		],
		resource: {
			wood: `Holz`,
			brick: `Lehm`,
			wool: `Wolle`,
			grain: `Getreide`,
			ore: `Erz`
		},
		terrain: {
			wood: `Wald`,
			brick: `Hügel`,
			wool: `Weide`,
			grain: `Acker`,
			ore: `Gebirge`,
			desert: `Wüste`
		},
		dev: {
			knight: `Ritter`,
			vp: `Siegpunkt`,
			roads: `Straßenbau`,
			plenty: `Erfindung`,
			monopoly: `Monopol`
		},
		devHint: {
			knight: `Versetze den Räuber und stiehl eine Karte.`,
			vp: `Versteckter Siegpunkt. Zählt, wenn du zehn erreichst.`,
			roads: `Baue zwei Straßen kostenlos.`,
			plenty: `Nimm zwei beliebige Rohstoffe von der Bank.`,
			monopoly: `Alle geben dir ihre Karten einer Sorte.`
		},
		phase: {
			setup: `Gründung`,
			roll: `Würfel`,
			discard: `Räuber`,
			robber: `Räuber`,
			main: `Aktionen`,
			roadBuilding: `Straßenbau`,
			gameOver: `Spielende`,
			menu: `Menü`
		},
		hint: {
			waitFor: `Warte auf {name}…`,
			wantsTrade: `{name} will tauschen.`,
			setupSettle: `{you}: setze eine Siedlung auf eine Kreuzung.`,
			setupRoad: `{you}: baue eine Straße von der Siedlung.`,
			roll: `{you}: würfle. Ein Ritter darf vor dem Wurf gespielt werden.`,
			discard: `{you} hast mehr als sieben Karten und musst {n} abwerfen.`,
			robber: `{you}: versetze den Räuber auf ein anderes Feld.`,
			freeRoad: `{you}: baue {n} freie Straße.`,
			freeRoads: `{you}: baue {n} freie Straßen.`,
			pickSettle: `Wähle eine Kreuzung für eine neue Siedlung.`,
			pickCity: `Wähle eine deiner Siedlungen und baue sie zur Stadt aus.`,
			pickRoad: `Wähle eine Kante für eine neue Straße.`,
			main: `{you}: baue, handle oder beende den Zug.`,
			win: `{name} gewinnt mit {n} Siegpunkten.`
		},
		ui: {
			round: `Runde {n}`,
			setup: `Gründung`,
			sound: `Ton`,
			rules: `Regeln`,
			quit: `Beenden`,
			road: `Straße`,
			settle: `Siedlung`,
			city: `Stadt`,
			card: `Karte`,
			trade: `Handeln`,
			endTurn: `Zug beenden`,
			roll: `Würfeln`,
			skipRoads: `Restliche Straßen überspringen`,
			turn: `Zug`,
			vp: `SP`,
			hidden: `{n} versteckt`,
			cards: `{n} Karten`,
			longest: `Straße`,
			army: `Heer`,
			close: `Schließen`,
			nothing: `Nichts`,
			youGet: `Du erhältst`,
			youGive: `Du gibst`,
			youWant: `Du willst`,
			decline: `Ablehnen`,
			accept: `Annehmen`,
			cantAfford: `Du hast diese Karten nicht — lehne ab oder warte.`,
			thinking: `{name} überlegt…`,
			retract: `Zurücknehmen`,
			tradeTitle: `Handel`,
			bank: `Bank`,
			players: `Spieler`,
			rate: `Dein Kurs für {resource} ist {rate}:1.`,
			give: `Geben`,
			get: `Nehmen`,
			swap: `Tausche {rate} {give} gegen {get}`,
			to: `An`,
			send: `Angebot senden`,
			wantsTrade: `{name} will tauschen`,
			tradeTo: `Angebot an {name}`,
			discardTitle: `{name}: {n} Karten abwerfen`,
			discardHint: `Sieben gewürfelt. Wähle {n} Karten zum Zurücklegen.`,
			discardBtn: `Abwerfen {chosen}/{need}`,
			stealTitle: `Eine Karte stehlen`,
			stealCards: `{n} Karten`,
			plentyTitle: `Erfindung — nimm zwei Rohstoffe`,
			monopolyTitle: `Monopol`,
			pickTwo: `Gewählt {n}/2 — dieselbe Sorte zweimal ist erlaubt.`,
			pickOne: `Wähle einen Rohstoff.`,
			winTitle: `{name} gewinnt`,
			winBody: `{name} erreicht {n} Siegpunkte und holt sich die Insel.`,
			backMenu: `Zurück zum Menü`,
			crashedTitle: `Das Spiel ist gestolpert`,
			crashedBody: `Die Partie ist gespeichert. Du kannst dort weitermachen.`,
			continueBtn: `Weiter`,
			youPronoun: `Du`
		},
		rules: {
			title: `Spielregeln`,
			p1: `Die Züge gehen um den Tisch. Jeder Zug: würfeln, handeln und bauen, dann beenden.`,
			p2: `Die Würfelsumme liefert Rohstoffe an Siedlungen (1) und Städte (2) an dem Feld. Sieben weckt den Räuber — wer mehr als sieben Karten hat, wirft die Hälfte ab, und du versetzt den Räuber.`,
			p3: `Siedlung: Holz + Lehm + Wolle + Getreide. Straße: Holz + Lehm. Stadt: zwei Getreide + drei Erz. Karte: Wolle + Getreide + Erz.`,
			p4: `Siedlungen geben 1 Punkt, Städte 2. Längste Handelsstraße (mindestens fünf) und größte Rittermacht (mindestens drei Ritter) je 2. Wer zuerst 10 hat, gewinnt.`,
			p5: `Siedlungen dürfen nicht nebeneinander stehen. Häfen verbessern den Banktausch auf 3:1 oder 2:1.`
		},
		exit: {
			title: `Insel verlassen?`,
			body: `Die Partie wird gespeichert. Du kannst sie im Menü fortsetzen.`,
			cancel: `Bleiben`,
			confirm: `Zum Menü`
		},
		engine: {
			badPlayer: `Ungültiger Spieler.`,
			noCard: `Du hast diese Karte nicht.`,
			longest: `{name} holt sich die längste Handelsstraße.`,
			army: `{name} holt sich die größte Rittermacht.`,
			wins: `{name} gewinnt die Insel mit {n} Siegpunkten!`,
			bankShort: `Die Bank hat nicht genug {resource}.`,
			gains: `{name} erhält {list}.`,
			harvest: `{name} erntet {list} von der zweiten Siedlung.`,
			settled: `Die Insel ist besiedelt. Der erste Zug beginnt.`,
			mustDiscard: `{name} muss Karten abwerfen.`,
			pickSeats: `Wähle 2–4 Spieler.`,
			playerN: `Spieler {n}`,
			setupLog: `Gründung: jeder setzt eine Siedlung und eine Straße, dann zurück in umgekehrter Reihenfolge.`,
			notRunning: `Das Spiel läuft nicht.`,
			waitTrade: `Warte auf Antwort zum Tauschangebot.`,
			noSettleNow: `Du kannst jetzt keine Siedlung bauen.`,
			notYourTurn: `Nicht dein Zug.`,
			placeRoadFirst: `Setze zuerst eine Straße.`,
			badVertex: `Ungültige Kreuzung.`,
			noSettlements: `Keine Siedlungen übrig.`,
			cantAffordSettle: `Keine Siedlung leistbar.`,
			foundsSettle: `{name} gründet eine Siedlung.`,
			buildsSettle: `{name} baut eine Siedlung.`,
			noRoadNow: `Du kannst jetzt keine Straße bauen.`,
			placeSettleFirst: `Setze zuerst eine Siedlung.`,
			badRoad: `Ungültige Straße.`,
			cantAffordRoad: `Keine Straße leistbar.`,
			drawsRoad: `{name} baut eine Straße.`,
			freeRoad: `{name} baut eine freie Straße.`,
			buildsRoad: `{name} baut eine Straße.`,
			noCityNow: `Du kannst jetzt keine Stadt bauen.`,
			badCity: `Ungültige Stadt.`,
			noCities: `Keine Städte übrig.`,
			cantAffordCity: `Keine Stadt leistbar.`,
			buildsCity: `{name} baut eine Stadt.`,
			alreadyRolled: `Es wurde schon gewürfelt.`,
			rolled: `{name} würfelt {d1} und {d2} — {total}.`,
			noDiscard: `Niemand muss abwerfen.`,
			emptyQueue: `Niemand in der Reihe.`,
			badDiscard: `Ungültiges Abwerfen.`,
			mustDiscardN: `Du musst {n} Karten abwerfen.`,
			discarded: `{name} wirft {n} Karten ab.`,
			noRobberNow: `Der Räuber soll jetzt nicht versetzt werden.`,
			badHex: `Ungültiges Feld.`,
			moveRobberElse: `Versetze den Räuber woanders hin.`,
			cantSteal: `Du kannst von diesem Spieler nicht stehlen.`,
			pickVictim: `Wähle, von wem du stiehlst.`,
			stole: `{name} stiehlt {resource} von {other}.`,
			movedRobber: `{name} versetzt den Räuber.`,
			noBuyNow: `Du kannst jetzt keine Karte kaufen.`,
			noDevLeft: `Keine Entwicklungskarten übrig.`,
			cantAffordDev: `Keine Karte leistbar.`,
			boughtDev: `{name} kauft eine Entwicklungskarte.`,
			notNow: `Jetzt nicht.`,
			oneDev: `Nur eine Karte pro Zug.`,
			playsKnight: `{name} spielt einen Ritter.`,
			roadsNoBuild: `{name} spielt Straßenbau, kann aber nicht bauen.`,
			playsRoads: `{name} spielt Straßenbau.`,
			noFreeRoads: `Gerade keine freien Straßen.`,
			plenty: `{name} nimmt {a} und {b} von der Bank.`,
			monopoly: `{name} monopolisiert {resource} ({n} Karten).`,
			differentRes: `Wähle zwei verschiedene Rohstoffe.`,
			needRate: `Du brauchst {n} {resource}.`,
			bankEmpty: `Die Bank ist leer.`,
			bankSwap: `{name} tauscht {n} {give} gegen {get}.`,
			selfTrade: `Du kannst nicht mit dir selbst tauschen.`,
			bothWays: `Ein Tausch muss in beide Richtungen gehen.`,
			noThoseCards: `Du hast diese Karten nicht.`,
			offers: `{name} bietet {other} einen Tausch an.`,
			noOffer: `Kein Angebot.`,
			declines: `{name} lehnt den Tausch ab.`,
			accepts: `{name} nimmt den Tausch mit {other} an.`,
			onlyOfferer: `Nur wer angeboten hat, kann zurücknehmen.`,
			retracts: `{name} nimmt das Angebot zurück.`,
			dontEnd: `Beende den Zug noch nicht.`,
			endsTurn: `{name} beendet den Zug.`,
			unknown: `Unbekannte Handlung.`
		}
	},
	es: {
		start: {
			kicker: `La isla espera`,
			blurb: `Coloniza la isla, reúne materias primas y construye el primer reino hasta diez puntos de victoria.`,
			players: `Jugadores`,
			add: `Añadir`,
			you: `Tú`,
			computer: `Ordenador`,
			playerN: `Jugador {n}`,
			startGame: `Empezar partida`,
			continueGame: `Continuar isla guardada`,
			how: `Cómo se juega`,
			nameAria: `Nombre del jugador {n}`,
			removeAria: `Quitar jugador`,
			language: `Idioma`
		},
		ai: [
			`Clara`,
			`Diego`,
			`Elena`,
			`Marco`
		],
		resource: {
			wood: `Madera`,
			brick: `Ladrillo`,
			wool: `Lana`,
			grain: `Trigo`,
			ore: `Mineral`
		},
		terrain: {
			wood: `Bosque`,
			brick: `Colinas`,
			wool: `Pasto`,
			grain: `Campos`,
			ore: `Montañas`,
			desert: `Desierto`
		},
		dev: {
			knight: `Caballero`,
			vp: `Punto de victoria`,
			roads: `Construcción de carreteras`,
			plenty: `Invento`,
			monopoly: `Monopolio`
		},
		devHint: {
			knight: `Mueve al ladrón y roba una carta.`,
			vp: `Punto de victoria oculto. Cuenta al llegar a diez.`,
			roads: `Construye dos carreteras gratis.`,
			plenty: `Toma dos materias primas a tu elección del banco.`,
			monopoly: `Todos te dan sus cartas de una materia prima.`
		},
		phase: {
			setup: `Fundación`,
			roll: `Dados`,
			discard: `Ladrón`,
			robber: `Ladrón`,
			main: `Acciones`,
			roadBuilding: `Carreteras`,
			gameOver: `Fin de la partida`,
			menu: `Menú`
		},
		hint: {
			waitFor: `Esperando a {name}…`,
			wantsTrade: `{name} quiere comerciar.`,
			setupSettle: `{you}: coloca un poblado en un cruce.`,
			setupRoad: `{you}: construye una carretera desde el poblado.`,
			roll: `{you}: lanza los dados. Puedes jugar un caballero antes.`,
			discard: `{you} tienes más de siete cartas y debes descartar {n}.`,
			robber: `{you}: mueve al ladrón a otro hexágono.`,
			freeRoad: `{you}: construye {n} carretera gratis.`,
			freeRoads: `{you}: construye {n} carreteras gratis.`,
			pickSettle: `Elige un cruce para un poblado nuevo.`,
			pickCity: `Elige uno de tus poblados para convertirlo en ciudad.`,
			pickRoad: `Elige un borde para una carretera nueva.`,
			main: `{you}: construye, comercia o termina el turno.`,
			win: `{name} gana con {n} puntos de victoria.`
		},
		ui: {
			round: `Ronda {n}`,
			setup: `Fundación`,
			sound: `Sonido`,
			rules: `Reglas`,
			quit: `Salir`,
			road: `Carretera`,
			settle: `Poblado`,
			city: `Ciudad`,
			card: `Carta`,
			trade: `Comerciar`,
			endTurn: `Terminar turno`,
			roll: `Lanzar dados`,
			skipRoads: `Saltar carreteras restantes`,
			turn: `Turno`,
			vp: `PV`,
			hidden: `{n} ocultos`,
			cards: `{n} cartas`,
			longest: `Ruta`,
			army: `Ejército`,
			close: `Cerrar`,
			nothing: `Nada`,
			youGet: `Recibes`,
			youGive: `Das`,
			youWant: `Quieres`,
			decline: `Rechazar`,
			accept: `Aceptar`,
			cantAfford: `No tienes esas cartas — rechaza o espera a la próxima.`,
			thinking: `{name} está pensando…`,
			retract: `Retirar`,
			tradeTitle: `Comercio`,
			bank: `Banco`,
			players: `Jugadores`,
			rate: `Tu cambio de {resource} es {rate}:1.`,
			give: `Dar`,
			get: `Recibir`,
			swap: `Cambia {rate} {give} por {get}`,
			to: `A`,
			send: `Enviar oferta`,
			wantsTrade: `{name} quiere comerciar`,
			tradeTo: `Oferta a {name}`,
			discardTitle: `{name}: descarta {n} cartas`,
			discardHint: `Siete en los dados. Elige {n} cartas para devolver.`,
			discardBtn: `Descartar {chosen}/{need}`,
			stealTitle: `Robar una carta`,
			stealCards: `{n} cartas`,
			plentyTitle: `Invento — toma dos materias primas`,
			monopolyTitle: `Monopolio`,
			pickTwo: `Elegidas {n}/2 — la misma materia dos veces vale.`,
			pickOne: `Elige una materia prima.`,
			winTitle: `{name} gana`,
			winBody: `{name} llega a {n} puntos de victoria y se queda la isla.`,
			backMenu: `Volver al menú`,
			crashedTitle: `El juego tropezó`,
			crashedBody: `La partida está guardada. Puedes continuar donde lo dejaste.`,
			continueBtn: `Continuar`,
			youPronoun: `Tú`
		},
		rules: {
			title: `Cómo se juega`,
			p1: `Los turnos giran alrededor de la mesa. Cada turno: tira, comercia y construye, luego termina.`,
			p2: `La suma de los dados da materias primas a poblados (1) y ciudades (2) en ese hexágono. El siete despierta al ladrón: quien tenga más de siete cartas descarta la mitad, y tú mueves al ladrón.`,
			p3: `Poblado: madera + ladrillo + lana + trigo. Carretera: madera + ladrillo. Ciudad: dos trigo + tres mineral. Carta: lana + trigo + mineral.`,
			p4: `Los poblados valen 1 punto, las ciudades 2. La carretera más larga (al menos cinco) y el ejército más grande (al menos tres caballeros) valen 2 cada uno. El primero en 10 gana.`,
			p5: `Los poblados no pueden estar juntos. Los puertos mejoran el cambio con el banco a 3:1 o 2:1.`
		},
		exit: {
			title: `¿Dejar la isla?`,
			body: `La partida se guarda. Puedes continuar desde el menú.`,
			cancel: `Quedarme`,
			confirm: `Al menú`
		},
		engine: {
			badPlayer: `Jugador no válido.`,
			noCard: `No tienes esa carta.`,
			longest: `{name} se lleva la carretera más larga.`,
			army: `{name} se lleva el ejército más grande.`,
			wins: `¡{name} gana la isla con {n} puntos de victoria!`,
			bankShort: `El banco no tiene bastante {resource}.`,
			gains: `{name} recibe {list}.`,
			harvest: `{name} cosecha {list} del segundo poblado.`,
			settled: `La isla está poblada. Empieza el primer turno.`,
			mustDiscard: `{name} debe descartar cartas.`,
			pickSeats: `Elige de 2 a 4 jugadores.`,
			playerN: `Jugador {n}`,
			setupLog: `Fundación: cada uno coloca un poblado y una carretera, luego de vuelta en orden inverso.`,
			notRunning: `La partida no está en curso.`,
			waitTrade: `Esperando respuesta a la oferta.`,
			noSettleNow: `Ahora no puedes construir un poblado.`,
			notYourTurn: `No es tu turno.`,
			placeRoadFirst: `Coloca primero una carretera.`,
			badVertex: `Cruce no válido.`,
			noSettlements: `No quedan poblados.`,
			cantAffordSettle: `No puedes pagar un poblado.`,
			foundsSettle: `{name} funda un poblado.`,
			buildsSettle: `{name} construye un poblado.`,
			noRoadNow: `Ahora no puedes construir una carretera.`,
			placeSettleFirst: `Coloca primero un poblado.`,
			badRoad: `Carretera no válida.`,
			cantAffordRoad: `No puedes pagar una carretera.`,
			drawsRoad: `{name} construye una carretera.`,
			freeRoad: `{name} construye una carretera gratis.`,
			buildsRoad: `{name} construye una carretera.`,
			noCityNow: `Ahora no puedes construir una ciudad.`,
			badCity: `Ciudad no válida.`,
			noCities: `No quedan ciudades.`,
			cantAffordCity: `No puedes pagar una ciudad.`,
			buildsCity: `{name} construye una ciudad.`,
			alreadyRolled: `Ya se han lanzado los dados.`,
			rolled: `{name} saca {d1} y {d2} — {total}.`,
			noDiscard: `Nadie tiene que descartar.`,
			emptyQueue: `Nadie en la cola.`,
			badDiscard: `Descarte no válido.`,
			mustDiscardN: `Debes descartar {n} cartas.`,
			discarded: `{name} descarta {n} cartas.`,
			noRobberNow: `El ladrón no debe moverse ahora.`,
			badHex: `Hexágono no válido.`,
			moveRobberElse: `Mueve al ladrón a otro sitio.`,
			cantSteal: `No puedes robar a ese jugador.`,
			pickVictim: `Elige a quién robas.`,
			stole: `{name} roba {resource} a {other}.`,
			movedRobber: `{name} mueve al ladrón.`,
			noBuyNow: `Ahora no puedes comprar una carta.`,
			noDevLeft: `No quedan cartas de desarrollo.`,
			cantAffordDev: `No puedes pagar una carta.`,
			boughtDev: `{name} compra una carta de desarrollo.`,
			notNow: `Ahora no.`,
			oneDev: `Solo una carta por turno.`,
			playsKnight: `{name} juega un caballero.`,
			roadsNoBuild: `{name} juega construcción de carreteras pero no puede construir.`,
			playsRoads: `{name} juega construcción de carreteras.`,
			noFreeRoads: `No hay carreteras gratis ahora.`,
			plenty: `{name} toma {a} y {b} del banco.`,
			monopoly: `{name} monopoliza {resource} ({n} cartas).`,
			differentRes: `Elige dos materias distintas.`,
			needRate: `Necesitas {n} {resource}.`,
			bankEmpty: `El banco está vacío.`,
			bankSwap: `{name} cambia {n} {give} por {get}.`,
			selfTrade: `No puedes comerciar contigo.`,
			bothWays: `Un trueque debe ir en ambos sentidos.`,
			noThoseCards: `No tienes esas cartas.`,
			offers: `{name} ofrece un trueque a {other}.`,
			noOffer: `No hay oferta.`,
			declines: `{name} rechaza el trueque.`,
			accepts: `{name} acepta el trueque con {other}.`,
			onlyOfferer: `Solo quien ofreció puede retirarlo.`,
			retracts: `{name} retira la oferta.`,
			dontEnd: `No termines el turno todavía.`,
			endsTurn: `{name} termina el turno.`,
			unknown: `Acción desconocida.`
		}
	},
	fr: {
		start: {
			kicker: `L'île attend`,
			blurb: `Colonisez l'île, rassemblez des ressources et construisez le premier royaume jusqu'à dix points de victoire.`,
			players: `Joueurs`,
			add: `Ajouter`,
			you: `Vous`,
			computer: `Ordinateur`,
			playerN: `Joueur {n}`,
			startGame: `Commencer la partie`,
			continueGame: `Reprendre l'île sauvegardée`,
			how: `Comment jouer`,
			nameAria: `Nom du joueur {n}`,
			removeAria: `Retirer le joueur`,
			language: `Langue`
		},
		ai: [
			`Claire`,
			`Louis`,
			`Hélène`,
			`Marc`
		],
		resource: {
			wood: `Bois`,
			brick: `Brique`,
			wool: `Laine`,
			grain: `Blé`,
			ore: `Minerai`
		},
		terrain: {
			wood: `Forêt`,
			brick: `Collines`,
			wool: `Pâturage`,
			grain: `Champs`,
			ore: `Montagnes`,
			desert: `Désert`
		},
		dev: {
			knight: `Chevalier`,
			vp: `Point de victoire`,
			roads: `Construction de routes`,
			plenty: `Invention`,
			monopoly: `Monopole`
		},
		devHint: {
			knight: `Déplacez le voleur et volez une carte.`,
			vp: `Point de victoire caché. Compte lorsque vous atteignez dix.`,
			roads: `Construisez deux routes gratuitement.`,
			plenty: `Prenez deux ressources de votre choix à la banque.`,
			monopoly: `Tout le monde vous donne ses cartes d'une ressource.`
		},
		phase: {
			setup: `Fondation`,
			roll: `Dés`,
			discard: `Voleur`,
			robber: `Voleur`,
			main: `Actions`,
			roadBuilding: `Routes`,
			gameOver: `Partie terminée`,
			menu: `Menu`
		},
		hint: {
			waitFor: `En attente de {name}…`,
			wantsTrade: `{name} veut échanger.`,
			setupSettle: `{you} : placez une colonie sur une intersection.`,
			setupRoad: `{you} : construisez une route depuis la colonie.`,
			roll: `{you} : lancez les dés. Un chevalier peut être joué avant le lancer.`,
			discard: `{you} avez plus de sept cartes et devez en défausser {n}.`,
			robber: `{you} : déplacez le voleur sur une autre hexagone.`,
			freeRoad: `{you} : construisez {n} route gratuite.`,
			freeRoads: `{you} : construisez {n} routes gratuites.`,
			pickSettle: `Choisissez une intersection pour une nouvelle colonie.`,
			pickCity: `Choisissez l'une de vos colonies à transformer en ville.`,
			pickRoad: `Choisissez une arête pour une nouvelle route.`,
			main: `{you} : construisez, échangez ou terminez le tour.`,
			win: `{name} gagne avec {n} points de victoire.`
		},
		ui: {
			round: `Manche {n}`,
			setup: `Fondation`,
			sound: `Son`,
			rules: `Règles`,
			quit: `Quitter`,
			road: `Route`,
			settle: `Colonie`,
			city: `Ville`,
			card: `Carte`,
			trade: `Échanger`,
			endTurn: `Fin du tour`,
			roll: `Lancer les dés`,
			skipRoads: `Passer les routes restantes`,
			turn: `Tour`,
			vp: `PV`,
			hidden: `{n} cachés`,
			cards: `{n} cartes`,
			longest: `Route`,
			army: `Armée`,
			close: `Fermer`,
			nothing: `Rien`,
			youGet: `Vous recevez`,
			youGive: `Vous donnez`,
			youWant: `Vous voulez`,
			decline: `Refuser`,
			accept: `Accepter`,
			cantAfford: `Vous n'avez pas ces cartes — refusez ou attendez la prochaine fois.`,
			thinking: `{name} réfléchit…`,
			retract: `Retirer`,
			tradeTitle: `Échange`,
			bank: `Banque`,
			players: `Joueurs`,
			rate: `Votre cours pour {resource} est {rate}:1.`,
			give: `Donner`,
			get: `Recevoir`,
			swap: `Échanger {rate} {give} contre {get}`,
			to: `À`,
			send: `Envoyer l'offre`,
			wantsTrade: `{name} veut échanger`,
			tradeTo: `Offre à {name}`,
			discardTitle: `{name} : défaussez {n} cartes`,
			discardHint: `Sept aux dés. Choisissez {n} cartes à rendre.`,
			discardBtn: `Défausser {chosen}/{need}`,
			stealTitle: `Voler une carte`,
			stealCards: `{n} cartes`,
			plentyTitle: `Invention — prenez deux ressources`,
			monopolyTitle: `Monopole`,
			pickTwo: `Choisies {n}/2 — la même ressource deux fois convient.`,
			pickOne: `Choisissez une ressource.`,
			winTitle: `{name} gagne`,
			winBody: `{name} atteint {n} points de victoire et remporte l'île.`,
			backMenu: `Retour au menu`,
			crashedTitle: `Le jeu a trébuché`,
			crashedBody: `La partie est sauvegardée. Vous pouvez reprendre là où vous étiez.`,
			continueBtn: `Continuer`,
			youPronoun: `Vous`
		},
		rules: {
			title: `Comment jouer`,
			p1: `Les tours font le tour de la table. Chaque tour : lancez, échangez et construisez, puis terminez.`,
			p2: `Le total des dés donne des ressources aux colonies (1) et aux villes (2) sur cet hexagone. Le sept réveille le voleur — quiconque a plus de sept cartes en défausse la moitié, et vous déplacez le voleur.`,
			p3: `Colonie : bois + brique + laine + blé. Route : bois + brique. Ville : deux blé + trois minerai. Carte : laine + blé + minerai.`,
			p4: `Les colonies valent 1 point, les villes 2. La plus longue route (au moins cinq) et la plus grande armée (au moins trois chevaliers) valent 2 chacune. Le premier à 10 gagne.`,
			p5: `Les colonies ne peuvent pas être voisines. Les ports améliorent l'échange avec la banque à 3:1 ou 2:1.`
		},
		exit: {
			title: `Quitter l'île ?`,
			body: `La partie est sauvegardée. Vous pourrez la reprendre depuis le menu.`,
			cancel: `Rester`,
			confirm: `Au menu`
		},
		engine: {
			badPlayer: `Joueur invalide.`,
			noCard: `Vous n'avez pas cette carte.`,
			longest: `{name} prend la plus longue route.`,
			army: `{name} prend la plus grande armée.`,
			wins: `{name} gagne l'île avec {n} points de victoire !`,
			bankShort: `La banque n'a pas assez de {resource}.`,
			gains: `{name} reçoit {list}.`,
			harvest: `{name} récolte {list} de la deuxième colonie.`,
			settled: `L'île est peuplée. Le premier tour commence.`,
			mustDiscard: `{name} doit défausser des cartes.`,
			pickSeats: `Choisissez 2 à 4 joueurs.`,
			playerN: `Joueur {n}`,
			setupLog: `Fondation : chacun place une colonie et une route, puis retour en ordre inverse.`,
			notRunning: `La partie n'est pas en cours.`,
			waitTrade: `En attente d'une réponse à l'offre.`,
			noSettleNow: `Vous ne pouvez pas construire de colonie maintenant.`,
			notYourTurn: `Ce n'est pas votre tour.`,
			placeRoadFirst: `Placez d'abord une route.`,
			badVertex: `Intersection invalide.`,
			noSettlements: `Plus de colonies.`,
			cantAffordSettle: `Pas de quoi payer une colonie.`,
			foundsSettle: `{name} fonde une colonie.`,
			buildsSettle: `{name} construit une colonie.`,
			noRoadNow: `Vous ne pouvez pas construire de route maintenant.`,
			placeSettleFirst: `Placez d'abord une colonie.`,
			badRoad: `Route invalide.`,
			cantAffordRoad: `Pas de quoi payer une route.`,
			drawsRoad: `{name} construit une route.`,
			freeRoad: `{name} construit une route gratuite.`,
			buildsRoad: `{name} construit une route.`,
			noCityNow: `Vous ne pouvez pas construire de ville maintenant.`,
			badCity: `Ville invalide.`,
			noCities: `Plus de villes.`,
			cantAffordCity: `Pas de quoi payer une ville.`,
			buildsCity: `{name} construit une ville.`,
			alreadyRolled: `Les dés ont déjà été lancés.`,
			rolled: `{name} fait {d1} et {d2} — {total}.`,
			noDiscard: `Personne n'a besoin de défausser.`,
			emptyQueue: `Personne dans la file.`,
			badDiscard: `Défausse invalide.`,
			mustDiscardN: `Vous devez défausser {n} cartes.`,
			discarded: `{name} défausse {n} cartes.`,
			noRobberNow: `Le voleur ne doit pas bouger maintenant.`,
			badHex: `Hexagone invalide.`,
			moveRobberElse: `Déplacez le voleur ailleurs.`,
			cantSteal: `Vous ne pouvez pas voler ce joueur.`,
			pickVictim: `Choisissez à qui vous volez.`,
			stole: `{name} vole {resource} à {other}.`,
			movedRobber: `{name} déplace le voleur.`,
			noBuyNow: `Vous ne pouvez pas acheter de carte maintenant.`,
			noDevLeft: `Plus de cartes de développement.`,
			cantAffordDev: `Pas de quoi payer une carte.`,
			boughtDev: `{name} achète une carte de développement.`,
			notNow: `Pas maintenant.`,
			oneDev: `Une seule carte par tour.`,
			playsKnight: `{name} joue un chevalier.`,
			roadsNoBuild: `{name} joue construction de routes mais ne peut pas construire.`,
			playsRoads: `{name} joue construction de routes.`,
			noFreeRoads: `Pas de routes gratuites pour l'instant.`,
			plenty: `{name} prend {a} et {b} à la banque.`,
			monopoly: `{name} monopolise {resource} ({n} cartes).`,
			differentRes: `Choisissez deux ressources différentes.`,
			needRate: `Il vous faut {n} {resource}.`,
			bankEmpty: `La banque est vide.`,
			bankSwap: `{name} échange {n} {give} contre {get}.`,
			selfTrade: `Vous ne pouvez pas échanger avec vous-même.`,
			bothWays: `Un échange doit aller dans les deux sens.`,
			noThoseCards: `Vous n'avez pas ces cartes.`,
			offers: `{name} propose un échange à {other}.`,
			noOffer: `Aucune offre.`,
			declines: `{name} refuse l'échange.`,
			accepts: `{name} accepte l'échange avec {other}.`,
			onlyOfferer: `Seul celui qui a proposé peut retirer.`,
			retracts: `{name} retire l'offre.`,
			dontEnd: `Ne terminez pas le tour encore.`,
			endsTurn: `{name} termine le tour.`,
			unknown: `Action inconnue.`
		}
	}
};
var STORAGE_KEY = "havn-locale-v1";
var extra = {
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
		"mp.computerEmpty": "Låt datorn ta tomma stolar"
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
		"mp.computerEmpty": "Let the computer take empty seats"
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
		"mp.computerEmpty": "Computer übernimmt leere Plätze"
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
		"mp.computerEmpty": "Que el ordenador ocupe los asientos vacíos"
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
		"mp.computerEmpty": "Laisser l'ordinateur prendre les sièges vides"
	}
};
function lookup(obj, path) {
	return path.split(".").reduce((acc, key) => {
		if (acc && typeof acc === "object" && key in acc) return acc[key];
	}, obj);
}
function interpolate(template, vars) {
	if (!vars) return template;
	let out = template;
	for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
	return out;
}
function detectLocale() {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved && LOCALE_IDS.includes(saved)) return saved;
	} catch {}
	if (typeof navigator !== "undefined") {
		const nav = navigator.language.slice(0, 2);
		if (LOCALE_IDS.includes(nav)) return nav;
	}
	return "sv";
}
var useLocaleStore = create((set) => ({
	locale: "sv",
	ready: true,
	setLocale: (locale) => {
		try {
			localStorage.setItem(STORAGE_KEY, locale);
		} catch {}
		set({ locale });
	},
	hydrateLocale: () => {
		set({
			locale: detectLocale(),
			ready: true
		});
	}
}));
function t(path, vars) {
	const locale = useLocaleStore.getState().locale;
	const fromCat = lookup(catalogs[locale], path) ?? lookup(catalogs.en, path);
	return interpolate((typeof fromCat === "string" ? fromCat : void 0) ?? extra[locale]?.[path] ?? extra.en[path] ?? path, vars);
}
function useT() {
	const locale = useLocaleStore((s) => s.locale);
	return (0, import_react.useCallback)((path, vars) => {
		return t(path, vars);
	}, [locale]);
}
function aiNames(locale) {
	return [...catalogs[locale ?? useLocaleStore.getState().locale].ai];
}
function youNames() {
	return new Set(LOCALE_IDS.map((id) => catalogs[id].start.you));
}
function allAiNames() {
	return new Set(LOCALE_IDS.flatMap((id) => [...catalogs[id].ai]));
}
function LocaleSwitch({ compact = false }) {
	const locale = useLocaleStore((s) => s.locale);
	const setLocale = useLocaleStore((s) => s.setLocale);
	const label = t("start.language");
	return (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1",
		role: "group",
		"aria-label": label,
		children: LOCALES.map((item) => (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: [
				"rounded-[var(--radius-sm)] font-medium uppercase tracking-wide",
				compact ? "h-9 min-w-9 px-2 text-xs" : "h-10 px-3 text-sm",
				locale === item.id ? "bg-accent text-accent-fg" : "border border-border bg-surface-2 text-muted hover:text-fg"
			].join(" "),
			onClick: () => setLocale(item.id),
			"aria-pressed": locale === item.id,
			"aria-label": item.native,
			children: item.id
		}, item.id))
	});
}
var p = BookOpen;
var m = Bot;
var h = Castle;
var g = CircleDot;
var _ = CreditCard;
var v = Handshake;
var y = House;
var b = LogOut;
var ee = Map$1;
var te = Plus;
var ne = Route;
var x = SkipForward;
var S = Trash2;
var C = User;
var re = Volume2;
var ie = VolumeX;
var ae = X;
var R = cn;
var B = Button;
var V = [
	`wood`,
	`brick`,
	`wool`,
	`grain`,
	`ore`
];
var Jt = class extends Error {
	constructor(e) {
		super(e), this.name = `GameError`;
	}
};
var H = [
	{
		fill: `#b42318`,
		stroke: `#3a0d0a`,
		label: `Karmosin`
	},
	{
		fill: `#2b5f8a`,
		stroke: `#0c2233`,
		label: `Havsblå`
	},
	{
		fill: `#e8dcc4`,
		stroke: `#4a4030`,
		label: `Linne`
	},
	{
		fill: `#1f6b56`,
		stroke: `#08221b`,
		label: `Furugrön`
	}
];
var U = {
	road: {
		wood: 1,
		brick: 1
	},
	settlement: {
		wood: 1,
		brick: 1,
		wool: 1,
		grain: 1
	},
	city: {
		grain: 2,
		ore: 3
	},
	dev: {
		wool: 1,
		grain: 1,
		ore: 1
	}
};
var Yt = {
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
	8: 5,
	9: 4,
	10: 3,
	11: 2,
	12: 1
};
var Xt = Math.sqrt(3);
var Zt = [
	{
		q: 1,
		r: 0
	},
	{
		q: 1,
		r: -1
	},
	{
		q: 0,
		r: -1
	},
	{
		q: -1,
		r: 0
	},
	{
		q: -1,
		r: 1
	},
	{
		q: 0,
		r: 1
	}
];
function Qt(e, t) {
	let n = -e - t;
	return (Math.abs(e) + Math.abs(t) + Math.abs(n)) / 2;
}
function $t(e, t) {
	return `${e},${t}`;
}
function en(e, t) {
	return {
		x: 100 * Xt * (e + t / 2),
		y: 150 * t
	};
}
function tn(e, t) {
	let n = en(e, t);
	return [
		0,
		1,
		2,
		3,
		4,
		5
	].map((e) => {
		let t = Math.PI / 180 * (60 * e - 30);
		return {
			x: n.x + 100 * Math.cos(t),
			y: n.y + 100 * Math.sin(t)
		};
	});
}
function nn(e, t) {
	return `${Math.round(e)}:${Math.round(t)}`;
}
function rn(e = 2) {
	let t = [];
	for (let n = -e; n <= e; n++) for (let r = -e; r <= e; r++) Qt(n, r) <= e && t.push({
		q: n,
		r
	});
	return t;
}
function an(e, t) {
	return tn(e, t).map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(` `);
}
function on(e, t) {
	return Zt.map((n) => ({
		q: e + n.q,
		r: t + n.r
	}));
}
function sn(e) {
	let t = e >>> 0;
	return () => {
		t |= 0, t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function shuffleArr(e, t) {
	let n = e.slice();
	for (let e = n.length - 1; e > 0; e--) {
		let r = Math.floor(t() * (e + 1)), i = n[e];
		n[e] = n[r], n[r] = i;
	}
	return n;
}
function ln(e, t, n) {
	return t + Math.floor(e() * (n - t + 1));
}
var un = [
	`wood`,
	`wood`,
	`wood`,
	`wood`,
	`wool`,
	`wool`,
	`wool`,
	`wool`,
	`grain`,
	`grain`,
	`grain`,
	`grain`,
	`brick`,
	`brick`,
	`brick`,
	`ore`,
	`ore`,
	`ore`,
	`desert`
];
var dn = [
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12
];
var fn = [
	{ kind: `generic` },
	{ kind: `generic` },
	{ kind: `generic` },
	{ kind: `generic` },
	{ kind: `wood` },
	{ kind: `brick` },
	{ kind: `wool` },
	{ kind: `grain` },
	{ kind: `ore` }
];
function pn(e, t) {
	return e < t ? `${e}|${t}` : `${t}|${e}`;
}
function mn(e) {
	let t = rn(2), n = shuffleArr(un, e), r = shuffleArr(dn, e), i = t.map((e, t) => ({
		id: $t(e.q, e.r),
		q: e.q,
		r: e.r,
		terrain: n[t],
		number: null
	})), a = i.find((e) => e.terrain === `desert`), o = (e) => {
		let t = new Map(e.map((e) => [e.id, e]));
		for (let n of e) if (n.number === 6 || n.number === 8) for (let e of on(n.q, n.r)) {
			let n = t.get($t(e.q, e.r));
			if (n && (n.number === 6 || n.number === 8)) return !0;
		}
		return !1;
	};
	for (let t = 0; t < 80; t++) {
		let n = shuffleArr(dn, e), a = 0, s = i.map((e) => ({
			...e,
			number: e.terrain === `desert` ? null : n[a++]
		}));
		if (!o(s)) {
			i = s, r = n;
			break;
		}
		if (t === 79) {
			let e = 0;
			i = i.map((t) => ({
				...t,
				number: t.terrain === `desert` ? null : r[e++]
			}));
		}
	}
	let s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
	for (let e of i) {
		let t = tn(e.q, e.r).map((t) => {
			let n = nn(t.x, t.y), r = s.get(n);
			return r ? r.hexIds.includes(e.id) || r.hexIds.push(e.id) : s.set(n, {
				id: n,
				x: t.x,
				y: t.y,
				hexIds: [e.id],
				port: null,
				building: null
			}), n;
		});
		for (let n = 0; n < 6; n++) {
			let r = t[n], i = t[(n + 1) % 6], a = pn(r, i), o = s.get(r), l = s.get(i), u = c.get(a);
			if (u) u.hexIds.includes(e.id) || u.hexIds.push(e.id);
			else {
				let t = (o.x + l.x) / 2, n = (o.y + l.y) / 2, s = en(e.q, e.r), u = t - s.x, d = n - s.y, f = Math.hypot(u, d) || 1;
				u /= f, d /= f, c.set(a, {
					id: a,
					a: r,
					b: i,
					hexIds: [e.id],
					midX: t,
					midY: n,
					ox: u,
					oy: d,
					road: null,
					port: null
				});
			}
		}
	}
	let l = [...c.values()].filter((e) => e.hexIds.length === 1);
	l.sort((e, t) => Math.atan2(e.midY, e.midX) - Math.atan2(t.midY, t.midX));
	let u = shuffleArr(fn, e), d = 0;
	for (let e = 0; e < l.length && d < u.length; e += 2) {
		let t = l[e], n = u[d++];
		t.port = n;
		let r = s.get(t.a), i = s.get(t.b);
		r && !r.port && (r.port = n), i && !i.port && (i.port = n);
	}
	return {
		board: {
			hexes: i,
			vertices: [...s.values()],
			edges: [...c.values()]
		},
		robberHexId: a.id
	};
}
function hn(e) {
	return V.includes(e);
}
function W() {
	return {
		wood: 0,
		brick: 0,
		wool: 0,
		grain: 0,
		ore: 0
	};
}
function gn() {
	return {
		wood: 19,
		brick: 19,
		wool: 19,
		grain: 19,
		ore: 19
	};
}
function G(e) {
	return V.reduce((t, n) => t + e[n], 0);
}
function K(e, t) {
	return V.every((n) => e[n] >= (t[n] ?? 0));
}
function _n(e, t, n) {
	for (let r of V) {
		let i = n[r] ?? 0;
		e[r] -= i, t[r] += i;
	}
}
function vn(e) {
	let t = Array.from({ length: e }, (e, t) => t);
	return [...t, ...t.slice().reverse()];
}
function yn(e) {
	return e.phase === `discard` ? e.discardQueue[0] ?? e.currentPlayer : e.tradeOffer ? e.tradeOffer.to : e.currentPlayer;
}
function q(e, t) {
	return e.board.vertices.find((e) => e.id === t);
}
function bn(e, t) {
	return e.board.edges.find((e) => e.id === t);
}
function xn(e, t) {
	return e.board.hexes.find((e) => e.id === t);
}
function Sn(e, t) {
	let n = [];
	for (let r of e.board.edges) r.a === t ? n.push(r.b) : r.b === t && n.push(r.a);
	return n;
}
function Cn(e, t) {
	return e.board.edges.filter((e) => e.a === t || e.b === t);
}
function wn(e, t) {
	let n = q(e, t);
	return !n || n.building ? !1 : Sn(e, t).every((t) => !q(e, t)?.building);
}
function Tn(e, t, n) {
	return Cn(e, n).some((e) => e.road?.player === t);
}
function En(e, t, n) {
	let r = bn(e, n);
	if (!r) return !1;
	for (let n of [r.a, r.b]) {
		let i = q(e, n);
		if (i?.building?.player === t || !(i?.building && i.building.player !== t) && Cn(e, n).some((e) => e.id !== r.id && e.road?.player === t)) return !0;
	}
	return !1;
}
function Dn(e, t) {
	let n = e.phase === `setup`;
	return e.board.vertices.filter((r) => !(r.building || !wn(e, r.id) || !n && !Tn(e, t, r.id))).map((e) => e.id);
}
function On(e, t) {
	let n = e.players[t];
	if (!n || n.roadsLeft <= 0) return [];
	if (e.phase === `setup`) {
		let t = e.lastSettlementId;
		return t ? Cn(e, t).filter((e) => !e.road).map((e) => e.id) : [];
	}
	return e.board.edges.filter((n) => !n.road && En(e, t, n.id)).map((e) => e.id);
}
function kn(e, t) {
	return e.board.vertices.filter((e) => e.building?.player === t && e.building.type === `settlement`).map((e) => e.id);
}
function An(e, t, n) {
	let r = !1, i = !1;
	for (let a of e.board.vertices) a.building?.player !== t || !a.port || (a.port.kind === n && (i = !0), a.port.kind === `generic` && (r = !0));
	return i ? 2 : r ? 3 : 4;
}
function jn(e, t) {
	let n = e.players[t];
	if (!n) return 0;
	let r = 0;
	for (let n of e.board.vertices) n.building?.player === t && (r += n.building.type === `city` ? 2 : 1);
	return n.hasLongestRoad && (r += 2), n.hasLargestArmy && (r += 2), r;
}
function Mn(e, t) {
	return jn(e, t) + (e.players[t]?.vpCards ?? 0);
}
function Nn(e, t) {
	let n = e.board.edges.filter((e) => e.road?.player === t);
	if (n.length === 0) return 0;
	let r = new Set(e.board.vertices.filter((e) => e.building && e.building.player !== t).map((e) => e.id)), i = {};
	for (let e of n) i[e.id] = [];
	for (let e = 0; e < n.length; e++) for (let t = e + 1; t < n.length; t++) {
		let a = n[e], o = n[t], s = a.a === o.a || a.a === o.b ? a.a : a.b === o.a || a.b === o.b ? a.b : null;
		s && !r.has(s) && (i[a.id].push(o.id), i[o.id].push(a.id));
	}
	let a = 1, o = (e, t, n) => {
		n > a && (a = n);
		for (let r of i[e]) t.has(r) || (t.add(r), o(r, t, n + 1), t.delete(r));
	};
	for (let e of n) o(e.id, /* @__PURE__ */ new Set([e.id]), 1);
	return a;
}
function Pn(e) {
	return e == null ? 0 : Yt[e] ?? 0;
}
function Fn(e, t, n) {
	let r = q(e, t);
	if (!r) return -1 / 0;
	let i = 0, a = /* @__PURE__ */ new Set();
	for (let t of r.hexIds) {
		let r = xn(e, t);
		r && r.id !== e.robberHexId && (i += Pn(r.number), hn(r.terrain) && (a.add(r.terrain), n && !n.includes(r.terrain) && (i += 1.4)));
	}
	return i += a.size * 1.8, r.port && (r.port.kind === `generic` ? i += 1.2 : i += 1.6), i;
}
function In(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let i of e.board.vertices) !i.hexIds.includes(t) || !i.building || i.building.player !== n && (G(e.players[i.building.player].resources) <= 0 || r.add(i.building.player));
	return [...r];
}
function J(e) {
	return U[e];
}
function Ln(e, t) {
	let n = [];
	for (let t of V) for (let r = 0; r < e[t]; r++) n.push(t);
	return n.length === 0 ? null : n[t(n.length)];
}
var Y = {
	get wood() {
		return t(`resource.wood`);
	},
	get brick() {
		return t(`resource.brick`);
	},
	get wool() {
		return t(`resource.wool`);
	},
	get grain() {
		return t(`resource.grain`);
	},
	get ore() {
		return t(`resource.ore`);
	}
};
var Rn = {
	get wood() {
		return t(`terrain.wood`);
	},
	get brick() {
		return t(`terrain.brick`);
	},
	get wool() {
		return t(`terrain.wool`);
	},
	get grain() {
		return t(`terrain.grain`);
	},
	get ore() {
		return t(`terrain.ore`);
	},
	get desert() {
		return t(`terrain.desert`);
	}
};
var zn = {
	get knight() {
		return t(`dev.knight`);
	},
	get vp() {
		return t(`dev.vp`);
	},
	get roads() {
		return t(`dev.roads`);
	},
	get plenty() {
		return t(`dev.plenty`);
	},
	get monopoly() {
		return t(`dev.monopoly`);
	}
};
function Bn(e, t$1, viewerId) {
	let n = e.players[yn(e)], isViewer = viewerId == null || n?.id === viewerId, r = n && (n.isAi || !isViewer) ? n.name : t(`ui.youPronoun`);
	if (e.tradeOffer) {
		let offer = e.tradeOffer, from = e.players[offer.from], to = e.players[offer.to];
		if (viewerId != null) {
			if (to?.id === viewerId) return t(`hint.wantsTrade`, { name: from?.id === viewerId ? t(`ui.youPronoun`) : from?.name ?? `` });
			return t(`hint.waitFor`, { name: to?.name ?? `` });
		}
		return to?.isAi ? t(`hint.waitFor`, { name: to.name }) : t(`hint.wantsTrade`, { name: from?.isAi ? from.name : t(`ui.youPronoun`) });
	}
	if (!isViewer && n && !n.isAi) return t(`hint.waitFor`, { name: n.name });
	switch (e.phase) {
		case `setup`: return e.setupNeed === `settlement` ? t(`hint.setupSettle`, { you: r }) : t(`hint.setupRoad`, { you: r });
		case `roll`: return t(`hint.roll`, { you: r });
		case `discard`: return t(`hint.discard`, {
			you: r,
			n: Math.floor(G(n?.resources ?? W()) / 2)
		});
		case `robber`: return t(`hint.robber`, { you: r });
		case `roadBuilding`: {
			let t$2 = e.pendingFreeRoads;
			return t(t$2 === 1 ? `hint.freeRoad` : `hint.freeRoads`, {
				you: r,
				n: t$2
			});
		}
		case `main`: return t$1 === `settlement` ? t(`hint.pickSettle`) : t$1 === `city` ? t(`hint.pickCity`) : t$1 === `road` ? t(`hint.pickRoad`) : t(`hint.main`, { you: r });
		case `gameOver`: {
			let t$3 = e.players[e.winnerId ?? 0];
			return t(`hint.win`, {
				name: t$3?.name ?? `—`,
				n: Mn(e, t$3?.id ?? 0)
			});
		}
		default: return ``;
	}
}
function Vn(e) {
	return V.filter((t) => (e[t] ?? 0) > 0).map((t) => `${e[t]} ${Y[t].toLowerCase()}`).join(`, `);
}
var Hn = 10;
function pushLog(e, t) {
	e.logSeq += 1, e.log.push({
		id: e.logSeq,
		text: t
	}), e.log.length > 80 && e.log.splice(0, e.log.length - 80);
}
function Z(e, t) {
	if (!e) throw new Jt(t);
}
function Q(e, t$4) {
	let n = e.players[t$4];
	return Z(n, t(`engine.badPlayer`)), n;
}
function Un(e, t$5, n) {
	let r = e.hand.indexOf(t$5);
	if (r >= 0) {
		e.hand.splice(r, 1);
		return;
	}
	if (n) {
		let n = e.newHand.indexOf(t$5);
		if (n >= 0) {
			e.newHand.splice(n, 1);
			return;
		}
	}
	throw new Jt(t(`engine.noCard`));
}
function Wn(e) {
	let t$6 = e.players.map((t) => Nn(e, t.id)), n = Math.max(0, ...t$6), r = e.players.find((e) => e.hasLongestRoad) ?? null;
	if (n < 5) {
		for (let t of e.players) t.hasLongestRoad = !1;
		return;
	}
	let a = e.players.filter((e) => t$6[e.id] === n);
	if (!(r && t$6[r.id] === n)) {
		if (a.length === 1) {
			for (let t of e.players) t.hasLongestRoad = t.id === a[0].id;
			pushLog(e, t(`engine.longest`, { name: a[0].name }));
		} else for (let t of e.players) t.hasLongestRoad = !1;
	}
}
function Gn(e) {
	let t$7 = e.players.find((e) => e.hasLargestArmy) ?? null, n = Math.max(...e.players.map((e) => e.knightsPlayed));
	if (n < 3) return;
	let r = e.players.filter((e) => e.knightsPlayed === n);
	if (!(t$7 && t$7.knightsPlayed === n) && r.length === 1) {
		for (let t of e.players) t.hasLargestArmy = t.id === r[0].id;
		pushLog(e, t(`engine.army`, { name: r[0].name }));
	}
}
function Kn(e, t$8) {
	Mn(e, t$8) >= Hn && (e.phase = `gameOver`, e.winnerId = t$8, e.tradeOffer = null, pushLog(e, t(`engine.wins`, {
		name: Q(e, t$8).name,
		n: Mn(e, t$8)
	})));
}
function qn(e, t$10) {
	let n = e.players.map(() => W());
	for (let r of e.board.hexes) if (!(r.number !== t$10 || r.id === e.robberHexId || !hn(r.terrain))) for (let t of e.board.vertices) !t.hexIds.includes(r.id) || !t.building || (n[t.building.player][r.terrain] += t.building.type === `city` ? 2 : 1);
	for (let t$9 of V) {
		let r = n.reduce((e, n) => e + n[t$9], 0);
		if (r !== 0) {
			if (r > e.bank[t$9]) {
				pushLog(e, t(`engine.bankShort`, { resource: Y[t$9].toLowerCase() }));
				continue;
			}
			for (let r of e.players) {
				let i = n[r.id][t$9];
				i <= 0 || (r.resources[t$9] += i, e.bank[t$9] -= i);
			}
		}
	}
	for (let t$11 of e.players) {
		let r = n[t$11.id];
		G(r) > 0 && pushLog(e, t(`engine.gains`, {
			name: t$11.name,
			list: Vn(r)
		}));
	}
}
function Jn(e, t$12, n) {
	let r = q(e, t$12);
	if (!r) return;
	let a = W();
	for (let t of r.hexIds) {
		let r = xn(e, t);
		!r || !hn(r.terrain) || e.bank[r.terrain] <= 0 || (Yn(e.players[n].resources, r.terrain, 1), --e.bank[r.terrain], a[r.terrain] += 1);
	}
	G(a) > 0 && pushLog(e, t(`engine.harvest`, {
		name: Q(e, n).name,
		list: Vn(a)
	}));
}
function Yn(e, t, n) {
	e[t] += n;
}
function Xn(e, t) {
	e.currentPlayer = t, e.phase = `roll`, e.rolledThisTurn = !1, e.playedDevThisTurn = !1, e.pendingFreeRoads = 0, e.tradeOffer = null, e.offeredTradeThisTurn = !1, e.lastSettlementId = null;
}
function Zn(e) {
	let t$13 = vn(e.players.length);
	if (e.setupIndex += 1, e.setupNeed = `settlement`, e.lastSettlementId = null, e.setupIndex >= t$13.length) {
		pushLog(e, t(`engine.settled`)), e.turnNumber = 1, Xn(e, 0);
		return;
	}
	e.currentPlayer = t$13[e.setupIndex];
}
function Qn(e) {
	let t$15 = e.players.length, n = [];
	for (let r = 0; r < t$15; r++) {
		let i = (e.currentPlayer + r) % t$15;
		G(e.players[i].resources) > 7 && n.push(i);
	}
	if (n.length > 0) {
		e.phase = `discard`, e.discardQueue = n;
		pushLog(e, t(`engine.mustDiscard`, { name: Q(e, n[0]).name }));
	} else e.phase = `robber`;
}
function $n(e) {
	return shuffleArr([
		...Array(14).fill(`knight`),
		...[
			,
			,
			,
			,
			,
		].fill(`vp`),
		...[, ,].fill(`roads`),
		...[, ,].fill(`plenty`),
		...[, ,].fill(`monopoly`)
	], e);
}
function er(e) {
	let t$16 = e.seed ?? Math.floor(Math.random() * 1e9), n = sn(t$16), { board: r, robberHexId: a } = mn(n), o = e.seats.slice(0, 4);
	Z(o.length >= 2 && o.length <= 4, t(`engine.pickSeats`));
	let s = {
		revision: 1,
		phase: `setup`,
		board: r,
		players: o.map((e, t$17) => ({
			id: t$17,
			name: e.name.trim() || t(`engine.playerN`, { n: t$17 + 1 }),
			colorIndex: e.colorIndex,
			isAi: e.isAi,
			resources: W(),
			hand: [],
			newHand: [],
			vpCards: 0,
			settlementsLeft: 5,
			citiesLeft: 4,
			roadsLeft: 15,
			knightsPlayed: 0,
			hasLongestRoad: !1,
			hasLargestArmy: !1
		})),
		currentPlayer: 0,
		robberHexId: a,
		bank: gn(),
		deck: $n(n),
		discardQueue: [],
		setupIndex: 0,
		setupNeed: `settlement`,
		lastSettlementId: null,
		rolledThisTurn: !1,
		playedDevThisTurn: !1,
		pendingFreeRoads: 0,
		tradeOffer: null,
		offeredTradeThisTurn: !1,
		lastRoll: null,
		winnerId: null,
		turnNumber: 0,
		log: [],
		logSeq: 0,
		seed: t$16
	};
	return pushLog(s, t(`engine.setupLog`)), s;
}
function tr(e, t$18) {
	if (e.phase === `gameOver` || e.phase === `menu`) throw new Jt(t(`engine.notRunning`));
	if (e.tradeOffer && t$18.type !== `respondTrade` && t$18.type !== `cancelTrade`) throw new Jt(t(`engine.waitTrade`));
	let n = yn(e);
	switch (t$18.type) {
		case `placeSettlement`: {
			Z(e.phase === `setup` || e.phase === `main`, t(`engine.noSettleNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`)), Z(e.phase !== `setup` || e.setupNeed === `settlement`, t(`engine.placeRoadFirst`)), Z(Dn(e, r.id).includes(t$18.vertexId), t(`engine.badVertex`));
			let a = q(e, t$18.vertexId);
			e.phase === `main` ? (Z(r.settlementsLeft > 0, t(`engine.noSettlements`)), Z(K(r.resources, J(`settlement`)), t(`engine.cantAffordSettle`)), _n(r.resources, e.bank, J(`settlement`))) : Z(r.settlementsLeft > 0, t(`engine.noSettlements`)), a.building = {
				player: r.id,
				type: `settlement`
			}, --r.settlementsLeft, e.phase === `setup` ? (e.lastSettlementId = a.id, e.setupNeed = `road`, e.setupIndex >= e.players.length && Jn(e, a.id, r.id), pushLog(e, t(`engine.foundsSettle`, { name: r.name }))) : (pushLog(e, t(`engine.buildsSettle`, { name: r.name })), Wn(e), Kn(e, r.id));
			return;
		}
		case `placeRoad`: {
			let r = e.phase === `setup` || e.phase === `roadBuilding`;
			Z(e.phase === `setup` || e.phase === `main` || e.phase === `roadBuilding`, t(`engine.noRoadNow`));
			let a = Q(e, e.currentPlayer);
			Z(n === a.id, t(`engine.notYourTurn`)), e.phase === `setup` && Z(e.setupNeed === `road`, t(`engine.placeSettleFirst`)), Z(On(e, a.id).includes(t$18.edgeId), t(`engine.badRoad`));
			let o = bn(e, t$18.edgeId);
			r || (Z(K(a.resources, J(`road`)), t(`engine.cantAffordRoad`)), _n(a.resources, e.bank, J(`road`))), o.road = { player: a.id }, --a.roadsLeft, e.phase === `setup` ? (pushLog(e, t(`engine.drawsRoad`, { name: a.name })), Zn(e)) : e.phase === `roadBuilding` ? (--e.pendingFreeRoads, pushLog(e, t(`engine.freeRoad`, { name: a.name })), Wn(e), Kn(e, a.id), (e.pendingFreeRoads <= 0 || On(e, a.id).length === 0) && (e.pendingFreeRoads = 0, e.phase = `main`)) : (pushLog(e, t(`engine.buildsRoad`, { name: a.name })), Wn(e), Kn(e, a.id));
			return;
		}
		case `placeCity`: {
			Z(e.phase === `main`, t(`engine.noCityNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`)), Z(kn(e, r.id).includes(t$18.vertexId), t(`engine.badCity`)), Z(r.citiesLeft > 0, t(`engine.noCities`)), Z(K(r.resources, J(`city`)), t(`engine.cantAffordCity`)), _n(r.resources, e.bank, J(`city`));
			let a = q(e, t$18.vertexId);
			a.building = {
				player: r.id,
				type: `city`
			}, --r.citiesLeft, r.settlementsLeft += 1, pushLog(e, t(`engine.buildsCity`, { name: r.name })), Kn(e, r.id);
			return;
		}
		case `roll`: {
			Z(e.phase === `roll`, t(`engine.alreadyRolled`));
			let t$19 = Q(e, e.currentPlayer);
			Z(n === t$19.id, t(`engine.notYourTurn`));
			let r = sn(e.seed + e.revision * 9973 + e.turnNumber * 13), a = ln(r, 1, 6), o = ln(r, 1, 6), s = a + o;
			e.lastRoll = {
				d1: a,
				d2: o,
				total: s,
				revision: e.revision
			}, e.rolledThisTurn = !0, pushLog(e, t(`engine.rolled`, {
				name: t$19.name,
				d1: a,
				d2: o,
				total: s
			})), s === 7 ? Qn(e) : (qn(e, s), e.phase = `main`);
			return;
		}
		case `discard`: {
			Z(e.phase === `discard`, t(`engine.noDiscard`));
			let n = e.discardQueue[0];
			Z(n !== void 0, t(`engine.emptyQueue`));
			let r = Q(e, n), a = G(r.resources), o = Math.floor(a / 2), s = 0;
			for (let e of V) {
				let n = t$18.resources[e] ?? 0;
				Z(n >= 0 && n <= r.resources[e], t(`engine.badDiscard`)), s += n;
			}
			Z(s === o, t(`engine.mustDiscardN`, { n: o }));
			for (let n of V) {
				let i = t$18.resources[n] ?? 0;
				r.resources[n] -= i, e.bank[n] += i;
			}
			pushLog(e, t(`engine.discarded`, {
				name: r.name,
				n: o
			})), e.discardQueue.shift(), e.discardQueue.length === 0 && (e.phase = `robber`);
			return;
		}
		case `moveRobber`: {
			Z(e.phase === `robber`, t(`engine.noRobberNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`));
			let a = xn(e, t$18.hexId);
			Z(a, t(`engine.badHex`)), Z(a.id !== e.robberHexId, t(`engine.moveRobberElse`));
			let o = In(e, a.id, r.id);
			if (t$18.stealFrom == null ? Z(o.length === 0, t(`engine.pickVictim`)) : Z(o.includes(t$18.stealFrom), t(`engine.cantSteal`)), e.robberHexId = a.id, t$18.stealFrom != null) {
				let n = Q(e, t$18.stealFrom), a = sn(e.seed + e.revision * 17 + 3), o = Ln(n.resources, (e) => Math.floor(a() * e));
				o && (--n.resources[o], r.resources[o] += 1, pushLog(e, t(`engine.stole`, {
					name: r.name,
					resource: Y[o].toLowerCase(),
					other: n.name
				})));
			} else pushLog(e, t(`engine.movedRobber`, { name: r.name }));
			e.phase = e.rolledThisTurn ? `main` : `roll`;
			return;
		}
		case `buyDev`: {
			Z(e.phase === `main`, t(`engine.noBuyNow`));
			let t$20 = Q(e, e.currentPlayer);
			Z(n === t$20.id, t(`engine.notYourTurn`)), Z(e.deck.length > 0, t(`engine.noDevLeft`)), Z(K(t$20.resources, J(`dev`)), t(`engine.cantAffordDev`)), _n(t$20.resources, e.bank, J(`dev`));
			let r = e.deck.shift();
			r === `vp` ? (t$20.vpCards += 1, pushLog(e, t(`engine.boughtDev`, { name: t$20.name })), Kn(e, t$20.id)) : (t$20.newHand.push(r), pushLog(e, t(`engine.boughtDev`, { name: t$20.name })));
			return;
		}
		case `playKnight`: {
			let t$21 = Q(e, e.currentPlayer);
			Z(n === t$21.id, t(`engine.notYourTurn`)), Z(e.phase === `roll` || e.phase === `main`, t(`engine.notNow`)), Z(!e.playedDevThisTurn, t(`engine.oneDev`)), Un(t$21, `knight`, !1), t$21.knightsPlayed += 1, e.playedDevThisTurn = !0, e.phase = `robber`, pushLog(e, t(`engine.playsKnight`, { name: t$21.name })), Gn(e), Kn(e, t$21.id);
			return;
		}
		case `playRoads`: {
			Z(e.phase === `main`, t(`engine.notNow`));
			let t$22 = Q(e, e.currentPlayer);
			if (Z(n === t$22.id, t(`engine.notYourTurn`)), Z(!e.playedDevThisTurn, t(`engine.oneDev`)), Un(t$22, `roads`, !1), e.playedDevThisTurn = !0, On(e, t$22.id).length === 0 || t$22.roadsLeft <= 0) {
				pushLog(e, t(`engine.roadsNoBuild`, { name: t$22.name }));
				return;
			}
			e.phase = `roadBuilding`, e.pendingFreeRoads = Math.min(2, t$22.roadsLeft), pushLog(e, t(`engine.playsRoads`, { name: t$22.name }));
			return;
		}
		case `skipFreeRoad`:
			Z(e.phase === `roadBuilding`, t(`engine.noFreeRoads`)), e.pendingFreeRoads = 0, e.phase = `main`;
			return;
		case `playPlenty`: {
			Z(e.phase === `main`, t(`engine.notNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`)), Z(!e.playedDevThisTurn, t(`engine.oneDev`)), Un(r, `plenty`, !1), e.playedDevThisTurn = !0;
			for (let n of [t$18.a, t$18.b]) e.bank[n] > 0 && (--e.bank[n], r.resources[n] += 1);
			pushLog(e, t(`engine.plenty`, {
				name: r.name,
				a: Y[t$18.a].toLowerCase(),
				b: Y[t$18.b].toLowerCase()
			}));
			return;
		}
		case `playMonopoly`: {
			Z(e.phase === `main`, t(`engine.notNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`)), Z(!e.playedDevThisTurn, t(`engine.oneDev`)), Un(r, `monopoly`, !1), e.playedDevThisTurn = !0;
			let a = 0;
			for (let n of e.players) n.id !== r.id && (a += n.resources[t$18.resource], n.resources[t$18.resource] = 0);
			r.resources[t$18.resource] += a, pushLog(e, t(`engine.monopoly`, {
				name: r.name,
				resource: Y[t$18.resource].toLowerCase(),
				n: a
			}));
			return;
		}
		case `bankTrade`: {
			Z(e.phase === `main`, t(`engine.notNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`)), Z(t$18.give !== t$18.get, t(`engine.differentRes`));
			let a = An(e, r.id, t$18.give);
			Z(r.resources[t$18.give] >= a, t(`engine.needRate`, {
				n: a,
				resource: Y[t$18.give].toLowerCase()
			})), Z(e.bank[t$18.get] > 0, t(`engine.bankEmpty`)), r.resources[t$18.give] -= a, e.bank[t$18.give] += a, --e.bank[t$18.get], r.resources[t$18.get] += 1, pushLog(e, t(`engine.bankSwap`, {
				name: r.name,
				n: a,
				give: Y[t$18.give].toLowerCase(),
				get: Y[t$18.get].toLowerCase()
			}));
			return;
		}
		case `offerTrade`: {
			Z(e.phase === `main`, t(`engine.notNow`));
			let r = Q(e, e.currentPlayer);
			Z(n === r.id, t(`engine.notYourTurn`));
			let a = Q(e, t$18.to);
			Z(a.id !== r.id, t(`engine.selfTrade`));
			let o = G(t$18.give), s = G(t$18.want);
			Z(o > 0 && s > 0, t(`engine.bothWays`));
			for (let e of V) Z(r.resources[e] >= t$18.give[e], t(`engine.noThoseCards`));
			e.tradeOffer = {
				from: r.id,
				to: a.id,
				give: { ...t$18.give },
				want: { ...t$18.want }
			}, e.offeredTradeThisTurn = !0, pushLog(e, t(`engine.offers`, {
				name: r.name,
				other: a.name
			}));
			return;
		}
		case `respondTrade`: {
			let n = e.tradeOffer;
			Z(n, t(`engine.noOffer`));
			let r = Q(e, n.from), a = Q(e, n.to);
			if (!(t$18.accept && K(r.resources, n.give) && K(a.resources, n.want))) {
				pushLog(e, t(`engine.declines`, { name: a.name })), e.tradeOffer = null;
				return;
			}
			for (let e of V) r.resources[e] -= n.give[e], a.resources[e] += n.give[e], a.resources[e] -= n.want[e], r.resources[e] += n.want[e];
			pushLog(e, t(`engine.accepts`, {
				name: a.name,
				other: r.name
			})), e.tradeOffer = null;
			return;
		}
		case `cancelTrade`: {
			let t$23 = e.tradeOffer;
			Z(t$23, t(`engine.noOffer`)), Z(t$23.from === e.currentPlayer, t(`engine.onlyOfferer`)), e.tradeOffer = null, pushLog(e, t(`engine.retracts`, { name: Q(e, t$23.from).name }));
			return;
		}
		case `endTurn`: {
			Z(e.phase === `main`, t(`engine.dontEnd`));
			let t$24 = Q(e, e.currentPlayer);
			Z(n === t$24.id, t(`engine.notYourTurn`)), t$24.hand.push(...t$24.newHand), t$24.newHand = [];
			let r = (e.currentPlayer + 1) % e.players.length;
			r === 0 && (e.turnNumber += 1), pushLog(e, t(`engine.endsTurn`, { name: t$24.name })), Xn(e, r);
			return;
		}
		default: throw new Jt(t(`engine.unknown`));
	}
}
function nr(e, t) {
	try {
		let n = structuredClone(e);
		return tr(n, t), n.revision += 1, {
			ok: !0,
			state: n
		};
	} catch (e) {
		if (e instanceof Jt) return {
			ok: !1,
			error: e.message
		};
		throw e;
	}
}
function rr(e, t) {
	return K(e, t);
}
function ir(e, t) {
	let n = {};
	for (let r of V) {
		let i = (t[r] ?? 0) - e[r];
		i > 0 && (n[r] = i);
	}
	return n;
}
function ar(e, t) {
	let n = W();
	for (let r of V) n[r] = Math.max(0, e[r] - (t[r] ?? 0));
	return n;
}
function or(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e.board.vertices) if (r.building?.player === t) for (let t of r.hexIds) {
		let r = xn(e, t);
		r && hn(r.terrain) && n.add(r.terrain);
	}
	return [...n];
}
function sr(e, t, n) {
	if (t.length === 0) return null;
	let r = or(e, n), i = t[0], a = -1 / 0;
	for (let n of t) {
		let t = Fn(e, n, r);
		t > a && (a = t, i = n);
	}
	return i;
}
function cr(e, t) {
	let n = e.players[t], r = W();
	if (!n) return r;
	let i = Math.floor(G(n.resources) / 2), a = [], o = [
		`ore`,
		`grain`,
		`brick`,
		`wood`,
		`wool`
	], s = [...V].sort((e, t) => {
		let r = o.indexOf(e), i = o.indexOf(t);
		return n.resources[e] === n.resources[t] ? i - r : n.resources[t] - n.resources[e];
	});
	for (let e of s) for (let t = 0; t < n.resources[e]; t++) a.push(e);
	for (let e = 0; e < i && e < a.length; e++) r[a[e]] += 1;
	return r;
}
function lr(e, t) {
	let n = [];
	for (let r of e.board.hexes) {
		if (r.id === e.robberHexId) continue;
		let i = In(e, r.id, t), a = 0;
		hn(r.terrain) && (a += Pn(r.number) * 2);
		let o = null, s = -1;
		for (let t of i) {
			let n = jn(e, t), r = G(e.players[t].resources), i = n * 3 + r;
			i > s && (s = i, o = t), a += i;
		}
		e.board.vertices.some((e) => e.hexIds.includes(r.id) && e.building?.player === t) && (a -= 8), n.push({
			hexId: r.id,
			score: a,
			stealFrom: o
		});
	}
	n.sort((e, t) => t.score - e.score);
	let r = n[0] ?? {
		hexId: e.board.hexes.find((t) => t.id !== e.robberHexId).id,
		stealFrom: null
	};
	return {
		type: `moveRobber`,
		hexId: r.hexId,
		stealFrom: r.stealFrom
	};
}
function ur(e, t, n) {
	let r = e.players[t], i = ir(r.resources, n), a = ar(r.resources, n), o = V.filter((e) => (i[e] ?? 0) > 0);
	if (o.length === 0) return null;
	let s = o.sort((e, t) => (i[t] ?? 0) - (i[e] ?? 0))[0];
	if (e.bank[s] <= 0) return null;
	let c = V.filter((e) => e !== s).map((n) => ({
		r: n,
		n: a[n],
		rate: An(e, t, n)
	})).filter((e) => e.n >= e.rate).sort((e, t) => t.n - e.n)[0];
	return c ? {
		type: `bankTrade`,
		give: c.r,
		get: s
	} : null;
}
function dr(e, t, n) {
	if (e.offeredTradeThisTurn) return null;
	let r = e.players[t], i = V.filter((e) => e !== n && r.resources[e] >= 1).sort((e, t) => r.resources[t] - r.resources[e] || e.localeCompare(t))[0];
	if (!i) return null;
	let a = e.players.filter((e) => e.id !== t && e.resources[n] > 0).sort((e, t) => Number(e.isAi) - Number(t.isAi) || t.resources[n] - e.resources[n] || e.id - t.id)[0];
	if (!a) return null;
	let o = W(), s = W();
	return o[i] = 1, s[n] = 1, {
		type: `offerTrade`,
		to: a.id,
		give: o,
		want: s
	};
}
function fr(e, t, n) {
	let r = e.players[t], i = ir(r.resources, n), a = V.filter((e) => (i[e] ?? 0) > 0).sort((e, t) => (i[t] ?? 0) - (i[e] ?? 0));
	for (let n of a) {
		let r = dr(e, t, n);
		if (r) return r;
	}
	return null;
}
function pr(e, t) {
	let n = e.players[t], r = V.filter((e) => n.resources[e] <= 1).sort((e, t) => n.resources[e] - n.resources[t] || e.localeCompare(t));
	for (let n of r) {
		let r = dr(e, t, n);
		if (r) return r;
	}
	return null;
}
function mr(e, t) {
	let n = xn(e, e.robberHexId);
	return !n || !hn(n.terrain) || Pn(n.number) < 3 ? !1 : e.board.vertices.some((e) => e.hexIds.includes(n.id) && e.building?.player === t);
}
function hr(e, t) {
	let n = e.players[t];
	if (e.playedDevThisTurn) return null;
	if (n.hand.includes(`knight`) && (mr(e, t) || n.knightsPlayed === 2)) return { type: `playKnight` };
	if (e.phase !== `main`) return null;
	if (n.hand.includes(`monopoly`)) {
		let n = `grain`, r = -1;
		for (let i of V) {
			let a = e.players.reduce((e, n) => n.id === t ? e : e + n.resources[i], 0);
			a > r && (r = a, n = i);
		}
		if (r >= 3) return {
			type: `playMonopoly`,
			resource: n
		};
	}
	if (n.hand.includes(`plenty`)) {
		let e = U.city, t = ir(n.resources, e), r = V.filter((e) => (t[e] ?? 0) > 0);
		if (r.length > 0) {
			let e = r[0];
			return {
				type: `playPlenty`,
				a: e,
				b: r[1] ?? e
			};
		}
	}
	return n.hand.includes(`roads`) && On(e, t).length > 0 && n.roadsLeft >= 2 && Dn(e, t).length === 0 ? { type: `playRoads` } : n.hand.includes(`knight`) && jn(e, t) >= 6 ? { type: `playKnight` } : null;
}
function gr(e, t) {
	let n = On(e, t);
	if (n.length === 0) return null;
	let r = e.board.vertices.filter((t) => !t.building && _r(e, t.id)).sort((t, n) => Fn(e, n.id) - Fn(e, t.id)).slice(0, 4), i = n[0], a = -1;
	for (let t of n) {
		let n = e.board.edges.find((e) => e.id === t), o = 0;
		for (let t of r) (t.id === n.a || t.id === n.b) && (o += 12 + Fn(e, t.id));
		o += Math.random(), o > a && (a = o, i = t);
	}
	return i;
}
function _r(e, t) {
	let n = q(e, t);
	return !n || n.building ? !1 : e.board.edges.filter((e) => e.a === t || e.b === t).every((n) => !q(e, n.a === t ? n.b : n.a)?.building);
}
function vr(e, t) {
	let n = e.players[t], r = Mn(e, t);
	if (r >= 10) return { type: `endTurn` };
	let i = kn(e, t), a = Dn(e, t), o = On(e, t);
	if (r >= 8 && i.length && rr(n.resources, U.city) && n.citiesLeft > 0) return {
		type: `placeCity`,
		vertexId: i[0]
	};
	if (r >= 9 && a.length && rr(n.resources, U.settlement) && n.settlementsLeft > 0) return {
		type: `placeSettlement`,
		vertexId: sr(e, a, t)
	};
	let s = hr(e, t);
	if (s) return s;
	if (i.length && n.citiesLeft > 0) {
		if (rr(n.resources, U.city)) return {
			type: `placeCity`,
			vertexId: i[0]
		};
		let r = fr(e, t, U.city);
		if (r) return r;
		let a = ur(e, t, U.city);
		if (a) return a;
	}
	if (a.length && n.settlementsLeft > 0) {
		if (rr(n.resources, U.settlement)) return {
			type: `placeSettlement`,
			vertexId: sr(e, a, t)
		};
		let r = fr(e, t, U.settlement);
		if (r) return r;
		let i = ur(e, t, U.settlement);
		if (i) return i;
	}
	if (a.length === 0 && o.length && n.roadsLeft > 0) {
		if (rr(n.resources, U.road)) {
			let n = gr(e, t);
			if (n) return {
				type: `placeRoad`,
				edgeId: n
			};
		} else {
			let n = fr(e, t, U.road);
			if (n) return n;
			let r = ur(e, t, U.road);
			if (r) return r;
		}
	}
	if (e.deck.length > 0 && rr(n.resources, U.dev)) return { type: `buyDev` };
	if (e.deck.length > 0) {
		let n = fr(e, t, U.dev);
		if (n) return n;
	}
	let c = ur(e, t, U.dev);
	return c && e.deck.length > 0 ? c : pr(e, t) || { type: `endTurn` };
}
function yr(e) {
	if (e.phase === `gameOver` || e.phase === `menu`) return null;
	if (e.tradeOffer) {
		let t = e.tradeOffer, n = e.players[t.to];
		if (!n?.isAi) return null;
		if (!K(n.resources, t.want)) return {
			type: `respondTrade`,
			accept: !1
		};
		let r = G(t.give), i = G(t.want), a = V.some((e) => t.give[e] > 0 && n.resources[e] <= 1), o = V.some((e) => t.want[e] > 0 && n.resources[e] - t.want[e] <= 0);
		return {
			type: `respondTrade`,
			accept: r >= i && !o || a && r + 1 >= i
		};
	}
	let t = yn(e), n = e.players[t];
	if (!n?.isAi) return null;
	switch (e.phase) {
		case `discard`: return {
			type: `discard`,
			resources: cr(e, t)
		};
		case `setup`:
			if (e.setupNeed === `settlement`) {
				let n = sr(e, Dn(e, t), t);
				return n ? {
					type: `placeSettlement`,
					vertexId: n
				} : null;
			}
			{
				let n = On(e, t);
				if (n.length === 0) return null;
				let r = e.lastSettlementId, i = n[0], a = -1 / 0;
				for (let t of n) {
					let n = e.board.edges.find((e) => e.id === t);
					if (!n) continue;
					let o = Fn(e, n.a === r ? n.b : n.a);
					o > a && (a = o, i = t);
				}
				return {
					type: `placeRoad`,
					edgeId: i
				};
			}
		case `roll`: return !e.playedDevThisTurn && n.hand.includes(`knight`) && mr(e, t) ? { type: `playKnight` } : { type: `roll` };
		case `robber`: return lr(e, t);
		case `roadBuilding`: {
			let n = gr(e, t);
			return n ? {
				type: `placeRoad`,
				edgeId: n
			} : { type: `skipFreeRoad` };
		}
		case `main`: return vr(e, t);
		default: return null;
	}
}
var br = `havn-save-v1`;
var xr = `havn-mute`;
function Sr(e) {
	try {
		localStorage.setItem(br, JSON.stringify(e));
	} catch {}
}
function Cr() {
	try {
		let e = localStorage.getItem(br);
		if (!e) return null;
		let t = JSON.parse(e);
		return !t || !t.board || !Array.isArray(t.players) || t.players.length < 2 || (Array.isArray(t.discardQueue) || (t.discardQueue = []), Array.isArray(t.log) || (t.log = []), t.tradeOffer === void 0 && (t.tradeOffer = null), t.offeredTradeThisTurn ??= !1, !t.phase) ? null : t;
	} catch {
		return null;
	}
}
function wr() {
	try {
		return localStorage.getItem(xr) === `1`;
	} catch {
		return !1;
	}
}
function Tr(e) {
	try {
		localStorage.setItem(xr, e ? `1` : `0`);
	} catch {}
}
var Er = null;
function Dr() {
	if (typeof window > `u`) return null;
	if (!Er) {
		let e = window.AudioContext || window.webkitAudioContext;
		if (!e) return null;
		Er = new e();
	}
	return Er.state === `suspended` && Er.resume(), Er;
}
function Or() {
	Dr();
}
function kr(e, t, n, r, i = .06) {
	try {
		let a = Dr();
		if (!a) return;
		let o = a.createOscillator(), s = a.createGain();
		o.type = r, o.frequency.value = e;
		let c = a.currentTime + Math.max(0, t);
		s.gain.setValueAtTime(Math.max(1e-4, i), c), s.gain.exponentialRampToValueAtTime(1e-4, c + Math.max(.02, n)), o.connect(s), s.connect(a.destination), o.start(c), o.stop(c + n + .02);
	} catch {}
}
function Ar() {
	kr(220, 0, .08, `triangle`, .05), kr(330, .04, .07, `triangle`, .03);
}
function jr() {
	kr(140, 0, .05, `square`, .04), kr(180, .06, .05, `square`, .035), kr(120, .12, .08, `square`, .03);
}
function Mr() {
	kr(392, 0, .18, `sine`, .06), kr(494, .12, .2, `sine`, .06), kr(587, .24, .28, `sine`, .07);
}
function Nr() {
	kr(110, 0, .16, `sawtooth`, .04);
}
function Pr(e, t, n) {
	if (!e) try {
		t.type === `roll` ? jr() : t.type === `placeRoad` || t.type === `placeSettlement` || t.type === `placeCity` ? Ar() : t.type === `moveRobber` && Nr(), n.phase === `gameOver` && Mr();
	} catch {}
}
var statePublishers = /* @__PURE__ */ new Set();
var actionPublishers = /* @__PURE__ */ new Set();
function onPublish$1(fn) {
	statePublishers.add(fn);
	return () => {
		statePublishers.delete(fn);
	};
}
function onGuestAction$1(fn) {
	actionPublishers.add(fn);
	return () => {
		actionPublishers.delete(fn);
	};
}
function forceFriendSeats(seats) {
	let next = (Array.isArray(seats) ? seats.slice(0, 4) : []).map((s, idx) => ({
		name: s.name,
		isAi: idx === 0 ? !1 : !!s.isAi,
		colorIndex: s.colorIndex ?? idx
	}));
	if (next.length < 2) next.push({
		name: t(`mp.friend`),
		isAi: !1,
		colorIndex: 1
	});
	next[0] = {
		...next[0],
		isAi: !1
	};
	if (!next.some((s, idx) => idx > 0 && !s.isAi)) next[1] = {
		...next[1],
		isAi: !1,
		name: t(`mp.friend`)
	};
	return next;
}
function publishState(state) {
	for (let fn of statePublishers) fn(state);
}
var matchDefaults = {
	matchRole: `solo`,
	matchRoom: null,
	matchStatus: `idle`,
	matchPeerName: null,
	inviteOpen: !1,
	viewerId: 0
};
var useGame$1 = create((e, t$25) => ({
	state: null,
	buildMode: null,
	muted: !1,
	hydrated: !0,
	error: null,
	...matchDefaults,
	hydrate: () => {
		if (t$25().matchRole === `guest` || typeof window !== `undefined` && new URLSearchParams(window.location.search).has(`join`)) {
			e({
				muted: wr(),
				hydrated: !0
			});
			return;
		}
		let n = Cr(), r = n && n.phase !== `gameOver` ? n : null;
		e({
			muted: wr(),
			hydrated: !0,
			...t$25().state ? {} : { state: r }
		});
	},
	start: (opts) => {
		Or();
		let n = er(opts);
		Sr(n), e({
			state: n,
			buildMode: null,
			error: null,
			...matchDefaults
		});
	},
	startInvite: (seats) => {
		try {
			Or();
			let room = t$25().matchRoom || makeRoomCode();
			let n = er({ seats: forceFriendSeats(seats) });
			Sr(n), e({
				state: n,
				buildMode: null,
				error: null,
				matchRole: `host`,
				matchRoom: room,
				matchStatus: `waiting`,
				inviteOpen: !0,
				viewerId: 0,
				matchPeerName: null
			});
			publishState(n);
			return room;
		} catch (err) {
			e({ error: String(err && err.message ? err.message : err) });
			return ``;
		}
	},
	continueSave: () => {
		let saved = Cr();
		saved && saved.phase !== `gameOver` && e({
			state: saved,
			buildMode: null,
			error: null
		});
	},
	toMenu: () => {
		e({
			state: null,
			buildMode: null,
			error: null,
			...matchDefaults
		});
	},
	dispatch: (n) => {
		let g = t$25();
		if (!g.state) return;
		if (g.matchRole === `guest`) {
			for (let fn of actionPublishers) fn(n);
			return;
		}
		let a = nr(g.state, n);
		if (!a.ok) {
			e({ error: a.error });
			return;
		}
		Pr(g.muted, n, a.state), Sr(a.state), e({
			state: a.state,
			error: null,
			buildMode: n.type === `placeRoad` || n.type === `placeSettlement` || n.type === `placeCity` ? null : t$25().buildMode
		});
		if (g.matchRole === `host`) publishState(a.state);
	},
	adoptRemote: (remote) => {
		if (!remote) return !1;
		let cur = t$25().state;
		if (cur && (remote.revision ?? 0) < (cur.revision ?? 0)) return !1;
		e({
			state: remote,
			error: null
		});
		return !0;
	},
	setMatch: (patch) => e(patch),
	resetMatch: () => e({ ...matchDefaults }),
	claimSeat: (seat, name) => {
		let g = t$25();
		if (!g.state || g.matchRole === `guest`) return !1;
		if (!g.state.players[seat] || seat === 0) return !1;
		let next = structuredClone(g.state);
		let label = String(name || ``).trim() || t(`mp.friend`);
		if (next.players.some((p, idx) => idx !== seat && p.name === label)) label = `${label} ${seat + 1}`;
		next.players[seat].isAi = !1;
		next.players[seat].name = label;
		next.revision += 1;
		Sr(next), e({
			state: next,
			error: null
		});
		publishState(next);
		return !0;
	},
	releaseSeat: (seat) => {
		let g = t$25();
		if (!g.state || g.matchRole === `guest`) return;
		if (!g.state.players[seat] || seat === 0) return;
		let next = structuredClone(g.state);
		next.players[seat].isAi = !1;
		next.players[seat].name = t(`mp.friend`);
		next.revision += 1;
		Sr(next), e({ state: next });
		publishState(next);
	},
	fillEmptySeats: (seats) => {
		let g = t$25();
		if (!g.state || g.matchRole === `guest`) return;
		let next = structuredClone(g.state);
		let names = aiNames();
		let used = new Set(next.players.map((p) => p.name));
		let ni = 0;
		for (let seat of seats) {
			if (!next.players[seat] || seat === 0) continue;
			let name = names[ni] ?? t(`start.computer`);
			while (used.has(name)) {
				ni += 1;
				name = names[ni] ?? `${t(`start.computer`)} ${ni + 1}`;
			}
			ni += 1;
			used.add(name);
			next.players[seat].isAi = !0;
			next.players[seat].name = name;
		}
		next.revision += 1;
		Sr(next), e({ state: next });
		publishState(next);
	},
	setBuildMode: (mode) => e({ buildMode: mode }),
	toggleMute: () => {
		let n = !t$25().muted;
		Tr(n), n || Or(), e({ muted: n });
	},
	tickAi: () => {
		if (t$25().matchRole === `guest`) return;
		let { state: cur } = t$25();
		if (cur) try {
			let n = yr(cur);
			if (n) {
				t$25().dispatch(n);
				let r = t$25().state;
				r && r.revision === cur.revision && Fr(r);
				return;
			}
			Fr(cur);
		} catch {
			Fr(t$25().state ?? cur);
		}
	}
}));
function Fr(e) {
	let t = yn(e), n = e.players[t];
	if (!n?.isAi) return;
	let r = (e) => useGame$1.getState().dispatch(e);
	if (e.tradeOffer) {
		r({
			type: `respondTrade`,
			accept: !1
		});
		return;
	}
	if (e.phase === `discard`) {
		let e = Math.floor(G(n.resources) / 2), t = W(), i = e;
		for (let e of V) {
			let r = Math.min(n.resources[e], i);
			if (t[e] = r, i -= r, i <= 0) break;
		}
		r({
			type: `discard`,
			resources: t
		});
		return;
	}
	if (e.phase === `robber`) {
		let t = e.board.hexes.find((t) => t.id !== e.robberHexId);
		if (!t) return;
		let n = In(e, t.id, e.currentPlayer);
		r({
			type: `moveRobber`,
			hexId: t.id,
			stealFrom: n[0] ?? null
		});
		return;
	}
	if (e.phase === `roll`) {
		r({ type: `roll` });
		return;
	}
	e.phase === `main` ? r({ type: `endTurn` }) : e.phase === `roadBuilding` && r({ type: `skipFreeRoad` });
}
function Ir() {
	let e = Cr();
	return !!(e && e.phase !== `gameOver`);
}
var Lr = {
	1: [[1, 1]],
	2: [[0, 0], [2, 2]],
	3: [
		[0, 0],
		[1, 1],
		[2, 2]
	],
	4: [
		[0, 0],
		[0, 2],
		[2, 0],
		[2, 2]
	],
	5: [
		[0, 0],
		[0, 2],
		[1, 1],
		[2, 0],
		[2, 2]
	],
	6: [
		[0, 0],
		[0, 1],
		[0, 2],
		[2, 0],
		[2, 1],
		[2, 2]
	]
};
function Rr({ n: e, compact: t }) {
	let n = Lr[e] ?? Lr[1];
	return (0, import_jsx_runtime.jsx)(`div`, {
		className: R(`grid grid-cols-3 grid-rows-3 rounded-[var(--radius-sm)] bg-fg text-bg shadow-panel`, t ? `size-8 gap-px p-1` : `size-11 gap-0.5 p-1.5`),
		children: Array.from({ length: 9 }, (e, t) => {
			let r = t % 3, i = Math.floor(t / 3), a = n.some((e) => e[0] === r && e[1] === i);
			return (0, import_jsx_runtime.jsx)(`span`, { className: R(`size-full rounded-full`, a ? `bg-bg` : `bg-transparent`) }, t);
		})
	});
}
function zr({ d1: e, d2: t, compact: n }) {
	let r = useT();
	return (0, import_jsx_runtime.jsxs)(`div`, {
		className: R(`flex items-center`, n ? `gap-1.5` : `gap-2`),
		"aria-label": `${r(`ui.roll`)} ${e} ${t}`,
		children: [(0, import_jsx_runtime.jsx)(Rr, {
			n: e,
			compact: n
		}), (0, import_jsx_runtime.jsx)(Rr, {
			n: t,
			compact: n
		})]
	});
}
var Br = {
	wood: `#2a5c3e`,
	brick: `#b4533a`,
	wool: `#6fa35a`,
	grain: `#d4a017`,
	ore: `#6d7380`,
	desert: `#d2bf8a`,
	water: `#1a3a4a`
};
var Vr = {
	wood: `#1f4a32`,
	brick: `#6b2a22`,
	wool: `#355c32`,
	grain: `#7a5610`,
	ore: `#3a3e48`
};
function Hr() {
	return (0, import_jsx_runtime.jsx)(`g`, {
		fill: `#d5c4a1`,
		children: (0, import_jsx_runtime.jsx)(`polygon`, { points: `16,3 7,14 12,14 6,22 13,22 5,29 27,29 19,22 26,22 20,14 25,14` })
	});
}
function Ur() {
	return (0, import_jsx_runtime.jsxs)(`g`, {
		fill: `#e8b4a4`,
		children: [
			(0, import_jsx_runtime.jsx)(`rect`, {
				x: `4`,
				y: `7`,
				width: `11`,
				height: `7`,
				rx: `1`
			}),
			(0, import_jsx_runtime.jsx)(`rect`, {
				x: `17`,
				y: `7`,
				width: `11`,
				height: `7`,
				rx: `1`
			}),
			(0, import_jsx_runtime.jsx)(`rect`, {
				x: `10`,
				y: `17`,
				width: `12`,
				height: `8`,
				rx: `1`
			})
		]
	});
}
function Wr() {
	return (0, import_jsx_runtime.jsxs)(`g`, {
		fill: `#f3efe6`,
		children: [
			(0, import_jsx_runtime.jsx)(`circle`, {
				cx: `12`,
				cy: `17`,
				r: `6.2`
			}),
			(0, import_jsx_runtime.jsx)(`circle`, {
				cx: `20`,
				cy: `16`,
				r: `7`
			}),
			(0, import_jsx_runtime.jsx)(`circle`, {
				cx: `16`,
				cy: `12`,
				r: `5.5`
			})
		]
	});
}
function Gr() {
	return (0, import_jsx_runtime.jsxs)(`g`, {
		fill: `none`,
		stroke: `#f3e2a0`,
		strokeWidth: `2.2`,
		strokeLinecap: `round`,
		children: [
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 28 V8` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 10 q-7 -3 -8 4` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 10 q7 -3 8 4` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 16 q-8 -2 -9 5` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 16 q8 -2 9 5` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 22 q-8 -1 -8 5` }),
			(0, import_jsx_runtime.jsx)(`path`, { d: `M16 22 q8 -1 8 5` })
		]
	});
}
function Kr() {
	return (0, import_jsx_runtime.jsxs)(`g`, { children: [
		(0, import_jsx_runtime.jsx)(`polygon`, {
			points: `16,4 26,20 16,28 6,20`,
			fill: `#c5ccd4`
		}),
		(0, import_jsx_runtime.jsx)(`polygon`, {
			points: `16,4 16,28 6,20`,
			fill: `#9aa3ae`
		}),
		(0, import_jsx_runtime.jsx)(`polygon`, {
			points: `16,8 21,18 16,22`,
			fill: `#eef1f4`,
			opacity: `0.7`
		})
	] });
}
var qr = {
	wood: Hr,
	brick: Ur,
	wool: Wr,
	grain: Gr,
	ore: Kr
};
function Jr({ resource: e, className: t }) {
	let n = qr[e];
	return n ? (0, import_jsx_runtime.jsxs)(`svg`, {
		viewBox: `0 0 32 32`,
		className: t,
		"aria-hidden": !0,
		children: [(0, import_jsx_runtime.jsx)(`rect`, {
			width: `32`,
			height: `32`,
			rx: `7`,
			fill: Vr[e] ?? `#3a3e48`
		}), (0, import_jsx_runtime.jsx)(n, {})]
	}) : null;
}
function Yr({ resource: e, x: t, y: n, size: r }) {
	let i = qr[e];
	return i ? (0, import_jsx_runtime.jsxs)(`svg`, {
		x: t - r / 2,
		y: n - r / 2,
		width: r,
		height: r,
		viewBox: `0 0 32 32`,
		children: [(0, import_jsx_runtime.jsx)(`rect`, {
			width: `32`,
			height: `32`,
			rx: `16`,
			fill: Vr[e] ?? `#3a3e48`
		}), (0, import_jsx_runtime.jsx)(i, {})]
	}) : null;
}
function Xr() {
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-wood`,
			width: `88`,
			height: `76`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `88`,
					height: `76`,
					fill: Br.wood
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `24,70 24,58 12,58 24,28 36,58 24,58 24,70`,
					fill: `#163224`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `62,64 62,54 52,54 62,30 72,54 62,54 62,64`,
					fill: `#1c3e2c`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `44,72 44,66 36,66 44,48 52,66 44,66 44,72`,
					fill: `#214a34`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-brick`,
			width: `90`,
			height: `70`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `90`,
					height: `70`,
					fill: Br.brick
				}),
				(0, import_jsx_runtime.jsx)(`ellipse`, {
					cx: `28`,
					cy: `58`,
					rx: `34`,
					ry: `16`,
					fill: `#8c3828`
				}),
				(0, import_jsx_runtime.jsx)(`ellipse`, {
					cx: `70`,
					cy: `50`,
					rx: `30`,
					ry: `14`,
					fill: `#9a4030`
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M0 28 Q22 16 44 28 T90 24`,
					fill: `none`,
					stroke: `#d47858`,
					strokeWidth: `3`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-wool`,
			width: `80`,
			height: `70`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `80`,
					height: `70`,
					fill: Br.wool
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M0 18 h80 M0 38 h80 M0 58 h80`,
					stroke: `#8bc46a`,
					strokeWidth: `3`,
					opacity: `0.45`
				}),
				(0, import_jsx_runtime.jsx)(`ellipse`, {
					cx: `24`,
					cy: `32`,
					rx: `9`,
					ry: `7`,
					fill: `#f3efe6`
				}),
				(0, import_jsx_runtime.jsx)(`ellipse`, {
					cx: `58`,
					cy: `50`,
					rx: `8`,
					ry: `6`,
					fill: `#efe6d2`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-grain`,
			width: `56`,
			height: `56`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `56`,
					height: `56`,
					fill: Br.grain
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M0 10 L56 0 M0 24 L56 14 M0 38 L56 28 M0 52 L56 42`,
					stroke: `#b88614`,
					strokeWidth: `4`
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M8 56 L20 8`,
					stroke: `#f0d078`,
					strokeWidth: `2`,
					opacity: `0.7`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-ore`,
			width: `90`,
			height: `80`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `90`,
					height: `80`,
					fill: Br.ore
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `28,70 8,70 28,22 48,70`,
					fill: `#4e555e`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `28,22 38,70 48,70`,
					fill: `#636b75`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `62,70 44,70 62,18 80,70`,
					fill: `#545b64`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `28,22 34,40 22,40`,
					fill: `#e8ecef`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: `62,18 68,34 56,34`,
					fill: `#e8ecef`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-desert`,
			width: `90`,
			height: `60`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `90`,
					height: `60`,
					fill: Br.desert
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M-4 24 Q20 8 44 24 T92 18`,
					fill: `none`,
					stroke: `#c4b078`,
					strokeWidth: `6`
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M-8 44 Q18 32 46 46 T96 40`,
					fill: `none`,
					stroke: `#e0d0a4`,
					strokeWidth: `5`
				})
			]
		}),
		(0, import_jsx_runtime.jsxs)(`pattern`, {
			id: `terrain-water`,
			width: `48`,
			height: `24`,
			patternUnits: `userSpaceOnUse`,
			children: [
				(0, import_jsx_runtime.jsx)(`rect`, {
					width: `48`,
					height: `24`,
					fill: Br.water
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M0 8 Q12 2 24 8 T48 8`,
					fill: `none`,
					stroke: `#2a5a68`,
					strokeWidth: `2`
				}),
				(0, import_jsx_runtime.jsx)(`path`, {
					d: `M0 18 Q12 12 24 18 T48 18`,
					fill: `none`,
					stroke: `#163848`,
					strokeWidth: `2`
				})
			]
		})
	] });
}
function Zr({ resource: e, size: t = `md` }) {
	return (0, import_jsx_runtime.jsx)(`span`, {
		className: R(t === `sm` ? `size-7` : t === `lg` ? `size-12` : `size-9`, `inline-flex`),
		title: Y[e],
		children: (0, import_jsx_runtime.jsx)(Jr, {
			resource: e,
			className: `size-full rounded-[var(--radius-xs)] ring-1 ring-border`
		})
	});
}
function Qr({ state: e, player: t, human: n, buildMode: r, onBuildMode: i, onRoll: a, onEnd: o, onBuyDev: s, onPlayDev: c, onTrade: l, onSkipRoad: d }) {
	let f = useT(), p = e.phase === `main` && n, m = p && t.roadsLeft > 0 && On(e, t.id).length > 0, b = p && t.settlementsLeft > 0 && Dn(e, t.id).length > 0, ee = p && t.citiesLeft > 0 && kn(e, t.id).length > 0;
	return (0, import_jsx_runtime.jsxs)(`aside`, {
		className: `flex shrink-0 flex-col gap-2 border-t border-border bg-surface/95 px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] lg:h-full lg:w-80 lg:gap-3 lg:border-t-0 lg:border-l lg:p-3`,
		children: [
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `text-xs leading-snug text-muted lg:text-sm`,
				children: Bn(e, r, t.id)
			}),
			e.lastRoll && (0, import_jsx_runtime.jsxs)(`div`, {
				className: `hidden items-center justify-between rounded-[var(--radius-md)] bg-surface-2 px-3 py-2 lg:flex`,
				children: [(0, import_jsx_runtime.jsx)(zr, {
					d1: e.lastRoll.d1,
					d2: e.lastRoll.d2
				}), (0, import_jsx_runtime.jsx)(`span`, {
					className: `font-display text-2xl tabular-nums`,
					children: e.lastRoll.total
				})]
			}),
			(0, import_jsx_runtime.jsx)(`div`, {
				className: `grid grid-cols-5 gap-1`,
				children: V.map((e) => (0, import_jsx_runtime.jsxs)(`div`, {
					className: `flex flex-col items-center gap-0.5 rounded-[var(--radius-sm)] bg-surface-2 py-1.5 lg:gap-1 lg:py-2`,
					title: Y[e],
					children: [(0, import_jsx_runtime.jsx)(Zr, {
						resource: e,
						size: `sm`
					}), (0, import_jsx_runtime.jsx)(`span`, {
						className: `text-sm font-medium tabular-nums`,
						children: t.isAi ? `·` : t.resources[e]
					})]
				}, e))
			}),
			!t.isAi && (t.hand.length > 0 || t.newHand.length > 0) && (0, import_jsx_runtime.jsxs)(`div`, {
				className: `flex flex-wrap gap-1`,
				children: [t.hand.map((t, r) => (0, import_jsx_runtime.jsx)(`button`, {
					type: `button`,
					className: `h-9 rounded-[var(--radius-sm)] border border-border px-2 text-xs hover:border-border-strong disabled:opacity-40`,
					disabled: !n || e.playedDevThisTurn || e.phase !== `main` && (e.phase !== `roll` || t !== `knight`),
					onClick: () => c(t),
					children: zn[t]
				}, `h-${t}-${r}`)), t.newHand.map((e, t) => (0, import_jsx_runtime.jsx)(`span`, {
					className: `inline-flex h-9 items-center rounded-[var(--radius-sm)] border border-dashed border-border px-2 text-xs text-muted`,
					children: zn[e]
				}, `n-${e}-${t}`))]
			}),
			(0, import_jsx_runtime.jsxs)(`div`, {
				className: `grid grid-cols-3 gap-1.5 lg:grid-cols-2 lg:gap-2`,
				children: [
					e.phase === `roll` && n && (0, import_jsx_runtime.jsxs)(B, {
						type: `button`,
						className: `col-span-3 lg:col-span-2`,
						onClick: a,
						children: [(0, import_jsx_runtime.jsx)(g, { className: `size-4` }), f(`ui.roll`)]
					}),
					e.phase === `roadBuilding` && n && (0, import_jsx_runtime.jsx)(B, {
						type: `button`,
						variant: `secondary`,
						className: `col-span-3 lg:col-span-2`,
						onClick: d,
						children: f(`ui.skipRoads`)
					}),
					p && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							variant: r === `road` ? `default` : `secondary`,
							disabled: !m || !K(t.resources, J(`road`)),
							onClick: () => i(r === `road` ? null : `road`),
							children: [(0, import_jsx_runtime.jsx)(ne, { className: `size-4` }), f(`ui.road`)]
						}),
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							variant: r === `settlement` ? `default` : `secondary`,
							disabled: !b || !K(t.resources, J(`settlement`)),
							onClick: () => i(r === `settlement` ? null : `settlement`),
							children: [(0, import_jsx_runtime.jsx)(y, { className: `size-4` }), f(`ui.settle`)]
						}),
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							variant: r === `city` ? `default` : `secondary`,
							disabled: !ee || !K(t.resources, J(`city`)),
							onClick: () => i(r === `city` ? null : `city`),
							children: [(0, import_jsx_runtime.jsx)(h, { className: `size-4` }), f(`ui.city`)]
						}),
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							variant: `secondary`,
							disabled: !K(t.resources, J(`dev`)) || e.deck.length === 0,
							onClick: s,
							children: [(0, import_jsx_runtime.jsx)(_, { className: `size-4` }), f(`ui.card`)]
						}),
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							variant: `secondary`,
							onClick: l,
							children: [(0, import_jsx_runtime.jsx)(v, { className: `size-4` }), f(`ui.trade`)]
						}),
						(0, import_jsx_runtime.jsxs)(B, {
							type: `button`,
							size: `sm`,
							className: `lg:h-11 lg:px-4 lg:text-sm`,
							onClick: o,
							children: [(0, import_jsx_runtime.jsx)(x, { className: `size-4` }), f(`ui.endTurn`)]
						})
					] })
				]
			}),
			(0, import_jsx_runtime.jsx)(`div`, {
				className: `hidden max-h-32 space-y-1 overflow-auto text-xs text-muted lg:block`,
				children: e.log.slice(-8).reverse().map((e) => (0, import_jsx_runtime.jsx)(`p`, { children: e.text }, e.id))
			})
		]
	});
}
function $r({ state: e, viewer: t }) {
	let n = useT();
	return (0, import_jsx_runtime.jsx)(`ul`, {
		className: `flex gap-1.5 overflow-x-auto px-3 py-1.5 lg:gap-2 lg:py-2`,
		children: e.players.map((r) => {
			let i = r.id === e.currentPlayer;
			return (0, import_jsx_runtime.jsxs)(`li`, {
				className: R(`flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] border px-2 py-1.5 lg:min-w-[140px] lg:px-3 lg:py-2`, i ? `border-accent bg-surface` : `border-border bg-surface/70`),
				children: [
					(0, import_jsx_runtime.jsx)(`span`, {
						className: `size-3 shrink-0 rounded-full`,
						style: { background: (H[r.colorIndex] ?? H[0]).fill }
					}),
					(0, import_jsx_runtime.jsxs)(`div`, {
						className: `min-w-0 flex-1`,
						children: [(0, import_jsx_runtime.jsx)(`p`, {
							className: `truncate text-sm font-medium`,
							children: r.name
						}), (0, import_jsx_runtime.jsx)(`p`, {
							className: `text-xs tabular-nums text-muted`,
							children: r.id === t ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								Mn(e, r.id),
								` `,
								n(`ui.vp`),
								r.vpCards > 0 ? ` · ${n(`ui.hidden`, { n: r.vpCards })}` : ``
							] }) : (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								jn(e, r.id),
								` `,
								n(`ui.vp`),
								` · `,
								n(`ui.cards`, { n: G(r.resources) })
							] })
						})]
					}),
					(0, import_jsx_runtime.jsxs)(`div`, {
						className: `flex flex-col items-end text-xs uppercase tracking-wide text-subtle`,
						children: [
							r.hasLongestRoad && (0, import_jsx_runtime.jsx)(`span`, { children: n(`ui.longest`) }),
							r.hasLargestArmy && (0, import_jsx_runtime.jsx)(`span`, { children: n(`ui.army`) }),
							i && (0, import_jsx_runtime.jsx)(`span`, {
								className: `text-accent`,
								children: n(`ui.turn`)
							})
						]
					})
				]
			}, r.id);
		})
	});
}
function ei(e) {
	return [
		0,
		1,
		2,
		3,
		4,
		5
	].map((t) => {
		let n = Math.PI / 180 * (60 * t - 30);
		return `${(e * Math.cos(n)).toFixed(1)},${(e * Math.sin(n)).toFixed(1)}`;
	}).join(` `);
}
function ti(e) {
	let t = e === 6 || e === 8 ? 5 : e === 5 || e === 9 ? 4 : e === 4 || e === 10 ? 3 : e === 3 || e === 11 ? 2 : 1, n = -((t - 1) * 5) / 2;
	return Array.from({ length: t }, (e, t) => ({
		x: n + t * 5,
		y: 16
	}));
}
function ni({ x: e, y: t, fill: n, stroke: r, city: i }) {
	let a = i ? 18 : 14;
	return (0, import_jsx_runtime.jsxs)(`g`, {
		transform: `translate(${e} ${t})`,
		children: [(0, import_jsx_runtime.jsx)(`ellipse`, {
			cx: 0,
			cy: a - 1,
			rx: a + 2,
			ry: 3.5,
			fill: `#0b0907`,
			opacity: .35
		}), i ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			(0, import_jsx_runtime.jsx)(`rect`, {
				x: -a,
				y: -4,
				width: a * 2,
				height: a + 4,
				fill: n,
				stroke: r,
				strokeWidth: 2.5
			}),
			(0, import_jsx_runtime.jsx)(`rect`, {
				x: -a - 2,
				y: -a - 4,
				width: 12,
				height: a + 6,
				fill: n,
				stroke: r,
				strokeWidth: 2.5
			}),
			(0, import_jsx_runtime.jsx)(`polygon`, {
				points: `${-a - 2},${-a - 4} ${-a + 4},${-a - 14} ${-a + 10},${-a - 4}`,
				fill: n,
				stroke: r,
				strokeWidth: 2.5,
				strokeLinejoin: `round`
			}),
			(0, import_jsx_runtime.jsx)(`polygon`, {
				points: `${-a},-4 0,${-a - 2} ${a},-4`,
				fill: n,
				stroke: r,
				strokeWidth: 2.5,
				strokeLinejoin: `round`
			})
		] }) : (0, import_jsx_runtime.jsx)(`polygon`, {
			points: `0,${-a - 2} ${a},-2 ${a},${a} ${-a},${a} ${-a},-2`,
			fill: n,
			stroke: r,
			strokeWidth: 2.6,
			strokeLinejoin: `round`
		})]
	});
}
function ri({ x: e, y: t }) {
	return (0, import_jsx_runtime.jsxs)(`g`, {
		transform: `translate(${e} ${t + 4})`,
		children: [
			(0, import_jsx_runtime.jsx)(`ellipse`, {
				cx: 0,
				cy: 16,
				rx: 10,
				ry: 4,
				fill: `#0b0907`,
				opacity: .4
			}),
			(0, import_jsx_runtime.jsx)(`path`, {
				d: `M0,-16 C8,-16 12,-8 11,-2 C14,4 10,14 6,16 L-6,16 C-10,14 -14,4 -11,-2 C-12,-8 -8,-16 0,-16 Z`,
				fill: `#1a1512`,
				stroke: `#0b0907`,
				strokeWidth: `2`
			}),
			(0, import_jsx_runtime.jsx)(`path`, {
				d: `M-5,-4 C-2,0 2,0 5,-4`,
				fill: `none`,
				stroke: `#c8c2b6`,
				strokeWidth: `1.4`,
				opacity: .7
			})
		]
	});
}
function ii({ state: e, buildMode: t, disabled: n, onVertex: r, onEdge: i, onHex: a }) {
	let o = (0, import_react.useMemo)(() => {
		let n = e.currentPlayer;
		return e.phase === `setup` && e.setupNeed === `settlement` || e.phase === `main` && t === `settlement` ? new Set(Dn(e, n)) : e.phase === `main` && t === `city` ? new Set(kn(e, n)) : /* @__PURE__ */ new Set();
	}, [e, t]), s = (0, import_react.useMemo)(() => {
		let n = e.currentPlayer;
		return e.phase === `setup` && e.setupNeed === `road` || e.phase === `roadBuilding` || e.phase === `main` && t === `road` ? new Set(On(e, n)) : /* @__PURE__ */ new Set();
	}, [e, t]), c = e.phase === `robber` && !n, l = e.lastRoll && e.lastRoll.total !== 7 ? e.lastRoll.total : null, u = (0, import_react.useMemo)(() => new Map(e.board.vertices.map((e) => [e.id, e])), [e.board.vertices]);
	return (0, import_jsx_runtime.jsx)(`div`, {
		className: `h-full w-full p-1`,
		children: (0, import_jsx_runtime.jsxs)(`svg`, {
			viewBox: `-490 -450 980 900`,
			preserveAspectRatio: `xMidYMid meet`,
			width: `100%`,
			height: `100%`,
			className: `block h-full w-full select-none`,
			role: `img`,
			"aria-label": `Spelbräde`,
			children: [
				(0, import_jsx_runtime.jsxs)(`defs`, { children: [(0, import_jsx_runtime.jsx)(`filter`, {
					id: `hex-shadow`,
					x: `-20%`,
					y: `-20%`,
					width: `140%`,
					height: `140%`,
					children: (0, import_jsx_runtime.jsx)(`feDropShadow`, {
						dx: `0`,
						dy: `2`,
						stdDeviation: `3`,
						floodColor: `#000`,
						floodOpacity: `0.45`
					})
				}), (0, import_jsx_runtime.jsx)(Xr, {})] }),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: ei(440),
					fill: `url(#terrain-water)`
				}),
				(0, import_jsx_runtime.jsx)(`polygon`, {
					points: ei(440),
					fill: `none`,
					stroke: `#0c1c24`,
					strokeWidth: `18`,
					opacity: .35
				}),
				e.board.hexes.map((t) => {
					let n = en(t.q, t.r), r = l != null && t.number === l && t.id !== e.robberHexId, i = c && t.id !== e.robberHexId;
					return (0, import_jsx_runtime.jsxs)(`g`, { children: [
						(0, import_jsx_runtime.jsx)(`polygon`, {
							points: an(t.q, t.r),
							fill: `url(#terrain-${t.terrain})`,
							stroke: r ? `#f3efe6` : `#1a1510`,
							strokeWidth: r ? 5 : 3,
							filter: `url(#hex-shadow)`,
							className: i ? `cursor-pointer` : void 0,
							onClick: i ? () => a(t.id) : void 0
						}),
						i && (0, import_jsx_runtime.jsx)(`polygon`, {
							points: an(t.q, t.r),
							fill: `rgba(243,239,230,0.08)`,
							stroke: `#c8c2b6`,
							strokeWidth: `2`,
							strokeDasharray: `6 5`,
							className: `cursor-pointer`,
							onClick: () => a(t.id)
						}),
						t.number != null && t.id !== e.robberHexId && (0, import_jsx_runtime.jsxs)(`g`, {
							transform: `translate(${n.x} ${n.y})`,
							pointerEvents: `none`,
							children: [
								(0, import_jsx_runtime.jsx)(`circle`, {
									r: `27`,
									fill: `#efe6d2`,
									stroke: `#4a3f32`,
									strokeWidth: `2.2`
								}),
								(0, import_jsx_runtime.jsx)(`text`, {
									textAnchor: `middle`,
									y: `7`,
									fontFamily: `Fraunces, Georgia, serif`,
									fontSize: `22`,
									fontWeight: `650`,
									fill: t.number === 6 || t.number === 8 ? `#c4544a` : `#2a2218`,
									children: t.number
								}),
								ti(t.number).map((e, n) => (0, import_jsx_runtime.jsx)(`circle`, {
									cx: e.x,
									cy: e.y,
									r: `1.6`,
									fill: t.number === 6 || t.number === 8 ? `#c4544a` : `#2a2218`
								}, n))
							]
						}),
						(0, import_jsx_runtime.jsxs)(`title`, { children: [Rn[t.terrain], t.number ? ` · ${t.number}` : ``] })
					] }, t.id);
				}),
				e.board.edges.filter((e) => e.port).map((e) => {
					let t = e.midX + e.ox * 38, n = e.midY + e.oy * 38, r = e.port;
					return (0, import_jsx_runtime.jsxs)(`g`, { children: [
						(0, import_jsx_runtime.jsx)(`line`, {
							x1: e.midX,
							y1: e.midY,
							x2: t,
							y2: n,
							stroke: `#c8c2b6`,
							strokeWidth: `6`,
							strokeLinecap: `round`,
							opacity: .85
						}),
						(0, import_jsx_runtime.jsx)(`circle`, {
							cx: t,
							cy: n,
							r: `16`,
							fill: `#efe6d2`,
							stroke: `#3d3428`,
							strokeWidth: `2`
						}),
						r.kind === `generic` ? (0, import_jsx_runtime.jsx)(`text`, {
							x: t,
							y: n + 5,
							textAnchor: `middle`,
							fontSize: `11`,
							fontWeight: `700`,
							fill: `#2a2218`,
							fontFamily: `Figtree, sans-serif`,
							children: `3:1`
						}) : (0, import_jsx_runtime.jsx)(Yr, {
							resource: r.kind,
							x: t,
							y: n,
							size: 22
						})
					] }, `port-${e.id}`);
				}),
				e.board.edges.filter((e) => e.road).map((t) => {
					let n = u.get(t.a), r = u.get(t.b);
					if (!n || !r) return null;
					let i = H[e.players[t.road.player]?.colorIndex ?? 0] ?? H[0];
					return (0, import_jsx_runtime.jsxs)(`g`, { children: [(0, import_jsx_runtime.jsx)(`line`, {
						x1: n.x,
						y1: n.y,
						x2: r.x,
						y2: r.y,
						stroke: i.stroke,
						strokeWidth: `16`,
						strokeLinecap: `round`
					}), (0, import_jsx_runtime.jsx)(`line`, {
						x1: n.x,
						y1: n.y,
						x2: r.x,
						y2: r.y,
						stroke: i.fill,
						strokeWidth: `10`,
						strokeLinecap: `round`
					})] }, `road-${t.id}`);
				}),
				!n && [...s].map((t) => {
					let n = e.board.edges.find((e) => e.id === t);
					if (!n) return null;
					let r = u.get(n.a), a = u.get(n.b);
					return !r || !a ? null : (0, import_jsx_runtime.jsx)(`line`, {
						x1: r.x,
						y1: r.y,
						x2: a.x,
						y2: a.y,
						stroke: `#f3efe6`,
						strokeWidth: `12`,
						strokeLinecap: `round`,
						opacity: .42,
						className: `cursor-pointer`,
						onClick: () => i(t)
					}, `legal-${t}`);
				}),
				e.board.hexes.filter((t) => t.id === e.robberHexId).map((e) => {
					let t = en(e.q, e.r);
					return (0, import_jsx_runtime.jsx)(ri, {
						x: t.x,
						y: t.y
					}, `robber`);
				}),
				e.board.vertices.map((t) => {
					let i = o.has(t.id);
					if (t.building) {
						let a = H[e.players[t.building.player]?.colorIndex ?? 0] ?? H[0];
						return (0, import_jsx_runtime.jsx)(`g`, {
							className: i ? `cursor-pointer` : void 0,
							onClick: () => i && !n && r(t.id),
							children: (0, import_jsx_runtime.jsx)(ni, {
								x: t.x,
								y: t.y,
								fill: a.fill,
								stroke: a.stroke,
								city: t.building.type === `city`
							})
						}, t.id);
					}
					return !i || n ? null : (0, import_jsx_runtime.jsxs)(`g`, {
						className: `cursor-pointer`,
						onClick: () => r(t.id),
						children: [(0, import_jsx_runtime.jsx)(`circle`, {
							cx: t.x,
							cy: t.y,
							r: `16`,
							fill: `#f3efe6`,
							opacity: .2
						}), (0, import_jsx_runtime.jsx)(`circle`, {
							cx: t.x,
							cy: t.y,
							r: `9`,
							fill: `#f3efe6`,
							stroke: `#14110e`,
							strokeWidth: `2.5`,
							className: `origin-center`,
							children: (0, import_jsx_runtime.jsx)(`animate`, {
								attributeName: `opacity`,
								values: `0.7;1;0.7`,
								dur: `1.6s`,
								repeatCount: `indefinite`
							})
						})]
					}, t.id);
				})
			]
		})
	});
}
function ai({ compact: e = !1 }) {
	return (0, import_jsx_runtime.jsx)(LocaleSwitch, { compact: e });
}
function oi({ title: e, children: t, onClose: n }) {
	let r = useT();
	return (0, import_jsx_runtime.jsxs)(`div`, {
		className: `fixed inset-0 z-50 flex items-end justify-center sm:items-center`,
		children: [(0, import_jsx_runtime.jsx)(`button`, {
			type: `button`,
			className: `absolute inset-0 bg-bg/70`,
			"aria-label": r(`ui.close`),
			onClick: n
		}), (0, import_jsx_runtime.jsxs)(`div`, {
			className: `relative w-full max-w-md rounded-t-[var(--radius-xl)] border border-border bg-surface p-5 shadow-panel sm:rounded-[var(--radius-xl)]`,
			children: [(0, import_jsx_runtime.jsxs)(`div`, {
				className: `mb-4 flex items-start justify-between gap-3`,
				children: [(0, import_jsx_runtime.jsx)(`h2`, {
					className: `font-display text-xl font-semibold tracking-tight`,
					children: e
				}), n && (0, import_jsx_runtime.jsx)(`button`, {
					type: `button`,
					className: `grid size-10 place-items-center rounded-[var(--radius-sm)] text-muted hover:text-fg`,
					onClick: n,
					"aria-label": r(`ui.close`),
					children: (0, import_jsx_runtime.jsx)(ae, { className: `size-5` })
				})]
			}), t]
		})]
	});
}
function si({ onClose: e }) {
	let t = useT();
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: t(`rules.title`),
		onClose: e,
		children: [(0, import_jsx_runtime.jsxs)(`div`, {
			className: `max-h-[60dvh] space-y-3 overflow-auto text-sm leading-relaxed text-muted`,
			children: [
				(0, import_jsx_runtime.jsx)(`p`, { children: t(`rules.p1`) }),
				(0, import_jsx_runtime.jsx)(`p`, { children: t(`rules.p2`) }),
				(0, import_jsx_runtime.jsx)(`p`, { children: t(`rules.p3`) }),
				(0, import_jsx_runtime.jsx)(`p`, { children: t(`rules.p4`) }),
				(0, import_jsx_runtime.jsx)(`p`, { children: t(`rules.p5`) })
			]
		}), (0, import_jsx_runtime.jsxs)(`div`, {
			className: `mt-4 flex items-center justify-between gap-3 border-t border-border pt-3`,
			children: [(0, import_jsx_runtime.jsx)(`span`, {
				className: `text-xs text-muted`,
				children: t(`start.language`)
			}), (0, import_jsx_runtime.jsx)(ai, { compact: !0 })]
		})]
	});
}
function ci({ state: e, playerId: t, onConfirm: n }) {
	let r = useT(), i = e.players[t], a = Math.floor(G(i.resources) / 2), [o, s] = (0, import_react.useState)(W), c = G(o);
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: r(`ui.discardTitle`, {
			name: i.name,
			n: a
		}),
		children: [
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mb-4 text-sm text-muted`,
				children: r(`ui.discardHint`, { n: a })
			}),
			(0, import_jsx_runtime.jsx)(`div`, {
				className: `space-y-2`,
				children: V.map((e) => (0, import_jsx_runtime.jsxs)(`div`, {
					className: `flex items-center gap-3`,
					children: [
						(0, import_jsx_runtime.jsx)(Zr, { resource: e }),
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `flex-1 text-sm`,
							children: Y[e]
						}),
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `w-8 text-right text-sm tabular-nums text-muted`,
							children: i.resources[e]
						}),
						(0, import_jsx_runtime.jsxs)(`div`, {
							className: `flex items-center gap-1`,
							children: [
								(0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `secondary`,
									className: `size-10`,
									disabled: o[e] <= 0,
									onClick: () => s((t) => ({
										...t,
										[e]: t[e] - 1
									})),
									children: `−`
								}),
								(0, import_jsx_runtime.jsx)(`span`, {
									className: `w-6 text-center text-sm tabular-nums`,
									children: o[e]
								}),
								(0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `secondary`,
									className: `size-10`,
									disabled: o[e] >= i.resources[e] || c >= a,
									onClick: () => s((t) => ({
										...t,
										[e]: t[e] + 1
									})),
									children: `+`
								})
							]
						})
					]
				}, e))
			}),
			(0, import_jsx_runtime.jsx)(B, {
				type: `button`,
				className: `mt-5 w-full`,
				disabled: c !== a,
				onClick: () => n(o),
				children: r(`ui.discardBtn`, {
					chosen: c,
					need: a
				})
			})
		]
	});
}
function li({ state: e, playerId: t, onBank: n, onOffer: r, onClose: i }) {
	let a = useT(), o = e.players[t], [s, c] = (0, import_react.useState)(`bank`), [l, d] = (0, import_react.useState)(`wood`), [f, p] = (0, import_react.useState)(`brick`), [m, h] = (0, import_react.useState)(e.players.find((e) => e.id !== t)?.id ?? 0), [g, _] = (0, import_react.useState)(W), [v, y] = (0, import_react.useState)(W), b = An(e, t, l);
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: a(`ui.tradeTitle`),
		onClose: i,
		children: [(0, import_jsx_runtime.jsx)(`div`, {
			className: `mb-4 grid grid-cols-2 gap-1 rounded-[var(--radius-md)] bg-surface-2 p-1`,
			children: [`bank`, `player`].map((e) => (0, import_jsx_runtime.jsx)(`button`, {
				type: `button`,
				className: R(`h-10 rounded-[var(--radius-sm)] text-sm font-medium`, s === e ? `bg-surface text-fg` : `text-muted`),
				onClick: () => c(e),
				children: a(e === `bank` ? `ui.bank` : `ui.players`)
			}, e))
		}), s === `bank` ? (0, import_jsx_runtime.jsxs)(`div`, {
			className: `space-y-4`,
			children: [
				(0, import_jsx_runtime.jsx)(`p`, {
					className: `text-sm text-muted`,
					children: a(`ui.rate`, {
						resource: Y[l].toLowerCase(),
						rate: b
					})
				}),
				(0, import_jsx_runtime.jsx)(ui, {
					label: a(`ui.give`),
					value: l,
					onChange: d
				}),
				(0, import_jsx_runtime.jsx)(ui, {
					label: a(`ui.get`),
					value: f,
					onChange: p
				}),
				(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					className: `w-full`,
					disabled: l === f || o.resources[l] < b,
					onClick: () => n(l, f),
					children: a(`ui.swap`, {
						rate: b,
						give: Y[l].toLowerCase(),
						get: Y[f].toLowerCase()
					})
				})
			]
		}) : (0, import_jsx_runtime.jsxs)(`div`, {
			className: `space-y-3`,
			children: [
				(0, import_jsx_runtime.jsxs)(`label`, {
					className: `block text-sm text-muted`,
					children: [a(`ui.to`), (0, import_jsx_runtime.jsx)(`select`, {
						className: `mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 text-fg`,
						value: m,
						onChange: (e) => h(Number(e.target.value)),
						children: e.players.filter((e) => e.id !== t).map((e) => (0, import_jsx_runtime.jsx)(`option`, {
							value: e.id,
							children: e.name
						}, e.id))
					})]
				}),
				(0, import_jsx_runtime.jsx)(`p`, {
					className: `text-xs text-muted`,
					children: a(`ui.youGive`)
				}),
				(0, import_jsx_runtime.jsx)(di, {
					bank: g,
					max: o.resources,
					onChange: _
				}),
				(0, import_jsx_runtime.jsx)(`p`, {
					className: `text-xs text-muted`,
					children: a(`ui.youWant`)
				}),
				(0, import_jsx_runtime.jsx)(di, {
					bank: v,
					onChange: y
				}),
				(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					className: `w-full`,
					disabled: G(g) === 0 || G(v) === 0,
					onClick: () => r(m, g, v),
					children: a(`ui.send`)
				})
			]
		})]
	});
}
function ui({ label: e, value: t, onChange: n }) {
	return (0, import_jsx_runtime.jsxs)(`div`, { children: [(0, import_jsx_runtime.jsx)(`p`, {
		className: `mb-2 text-xs text-muted`,
		children: e
	}), (0, import_jsx_runtime.jsx)(`div`, {
		className: `grid grid-cols-5 gap-1`,
		children: V.map((e) => (0, import_jsx_runtime.jsx)(`button`, {
			type: `button`,
			onClick: () => n(e),
			className: R(`grid place-items-center rounded-[var(--radius-sm)] p-1 ring-1`, t === e ? `ring-accent` : `ring-border`),
			"aria-label": Y[e],
			children: (0, import_jsx_runtime.jsx)(Zr, {
				resource: e,
				size: `sm`
			})
		}, e))
	})] });
}
function di({ bank: e, max: t, onChange: n }) {
	return (0, import_jsx_runtime.jsx)(`div`, {
		className: `space-y-1`,
		children: V.map((r) => (0, import_jsx_runtime.jsxs)(`div`, {
			className: `flex items-center gap-2`,
			children: [
				(0, import_jsx_runtime.jsx)(Zr, {
					resource: r,
					size: `sm`
				}),
				(0, import_jsx_runtime.jsx)(`span`, {
					className: `flex-1 text-xs`,
					children: Y[r]
				}),
				(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					size: `icon`,
					variant: `secondary`,
					className: `size-9`,
					disabled: e[r] <= 0,
					onClick: () => n({
						...e,
						[r]: e[r] - 1
					}),
					children: `−`
				}),
				(0, import_jsx_runtime.jsx)(`span`, {
					className: `w-5 text-center text-sm tabular-nums`,
					children: e[r]
				}),
				(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					size: `icon`,
					variant: `secondary`,
					className: `size-9`,
					disabled: t ? e[r] >= t[r] : !1,
					onClick: () => n({
						...e,
						[r]: e[r] + 1
					}),
					children: `+`
				})
			]
		}, r))
	});
}
function fi({ state: e, onRespond: t }) {
	let n = useT(), r = e.tradeOffer, i = e.players[r.from], a = e.players[r.to], o = a ? K(a.resources, r.want) : !1;
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: n(`ui.wantsTrade`, { name: i.name }),
		children: [
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
				children: n(`ui.youGet`)
			}),
			(0, import_jsx_runtime.jsx)(pi, { bank: r.give }),
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mt-3 mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
				children: n(`ui.youGive`)
			}),
			(0, import_jsx_runtime.jsx)(pi, { bank: r.want }),
			!o && (0, import_jsx_runtime.jsx)(`p`, {
				className: `mt-3 text-sm text-muted`,
				children: n(`ui.cantAfford`)
			}),
			(0, import_jsx_runtime.jsxs)(`div`, {
				className: `mt-5 grid grid-cols-2 gap-2`,
				children: [(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					variant: `secondary`,
					onClick: () => t(!1),
					children: n(`ui.decline`)
				}), (0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					disabled: !o,
					onClick: () => t(!0),
					children: n(`ui.accept`)
				})]
			})
		]
	});
}
function pi({ bank: e }) {
	let t = useT(), n = V.filter((t) => e[t] > 0);
	return n.length === 0 ? (0, import_jsx_runtime.jsx)(`p`, {
		className: `text-sm text-muted`,
		children: t(`ui.nothing`)
	}) : (0, import_jsx_runtime.jsx)(`ul`, {
		className: `flex flex-wrap gap-2`,
		children: n.map((t) => (0, import_jsx_runtime.jsxs)(`li`, {
			className: `inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-surface-2 px-2 py-1.5`,
			children: [(0, import_jsx_runtime.jsx)(Zr, {
				resource: t,
				size: `sm`
			}), (0, import_jsx_runtime.jsxs)(`span`, {
				className: `text-sm`,
				children: [
					e[t],
					` `,
					Y[t].toLowerCase()
				]
			})]
		}, t))
	});
}
function mi({ state: e, onCancel: t }) {
	let n = useT(), r = e.tradeOffer, i = e.players[r.to];
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: n(`ui.tradeTo`, { name: i.name }),
		children: [
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
				children: n(`ui.youGive`)
			}),
			(0, import_jsx_runtime.jsx)(pi, { bank: r.give }),
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mt-3 mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
				children: n(`ui.youWant`)
			}),
			(0, import_jsx_runtime.jsx)(pi, { bank: r.want }),
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mt-4 mb-5 text-sm text-muted`,
				children: n(`ui.thinking`, { name: i.name })
			}),
			(0, import_jsx_runtime.jsx)(B, {
				type: `button`,
				variant: `secondary`,
				className: `w-full`,
				onClick: t,
				children: n(`ui.retract`)
			})
		]
	});
}
function hi({ title: e, count: t, onPick: n, onClose: r }) {
	let i = useT(), [a, o] = (0, import_react.useState)([]);
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: e,
		onClose: r,
		children: [(0, import_jsx_runtime.jsx)(`p`, {
			className: `mb-3 text-sm text-muted`,
			children: t === 2 ? i(`ui.pickTwo`, { n: a.length }) : i(`ui.pickOne`)
		}), (0, import_jsx_runtime.jsx)(`div`, {
			className: `grid grid-cols-5 gap-2`,
			children: V.map((e) => (0, import_jsx_runtime.jsxs)(`button`, {
				type: `button`,
				className: R(`grid place-items-center rounded-[var(--radius-md)] p-2 ring-1 ring-border hover:ring-accent`),
				onClick: () => {
					let r = [...a, e];
					r.length >= t ? n(r[0], r[t - 1] ?? r[0]) : o(r);
				},
				children: [(0, import_jsx_runtime.jsx)(Zr, { resource: e }), (0, import_jsx_runtime.jsx)(`span`, {
					className: `mt-1 text-xs text-muted`,
					children: Y[e]
				})]
			}, e))
		})]
	});
}
function gi({ state: e, victims: t, onPick: n }) {
	let r = useT();
	return (0, import_jsx_runtime.jsx)(oi, {
		title: r(`ui.stealTitle`),
		children: (0, import_jsx_runtime.jsx)(`div`, {
			className: `space-y-2`,
			children: t.map((t) => {
				let i = e.players[t];
				return i ? (0, import_jsx_runtime.jsxs)(B, {
					type: `button`,
					variant: `secondary`,
					className: `w-full justify-start`,
					onClick: () => n(t),
					children: [
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `size-3 rounded-full`,
							style: { background: (H[i.colorIndex] ?? H[0]).fill }
						}),
						i.name,
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `ml-auto text-muted`,
							children: r(`ui.stealCards`, { n: G(i.resources) })
						})
					]
				}, t) : null;
			})
		})
	});
}
function _i({ state: e, onMenu: t }) {
	let n = useT(), r = e.players[e.winnerId ?? 0] ?? e.players[0], i = (0, import_react.useMemo)(() => e.players.slice().sort((t, n) => Mn(e, n.id) - Mn(e, t.id)), [e]);
	return r ? (0, import_jsx_runtime.jsxs)(oi, {
		title: n(`ui.winTitle`, { name: r.name }),
		children: [
			(0, import_jsx_runtime.jsx)(`p`, {
				className: `mb-4 text-sm text-muted`,
				children: n(`ui.winBody`, {
					name: r.name,
					n: Mn(e, r.id)
				})
			}),
			(0, import_jsx_runtime.jsx)(`ol`, {
				className: `mb-5 space-y-2`,
				children: i.map((t) => (0, import_jsx_runtime.jsxs)(`li`, {
					className: `flex items-center gap-3 text-sm`,
					children: [
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `size-3 rounded-full`,
							style: { background: (H[t.colorIndex] ?? H[0]).fill }
						}),
						(0, import_jsx_runtime.jsx)(`span`, {
							className: `flex-1`,
							children: t.name
						}),
						(0, import_jsx_runtime.jsxs)(`span`, {
							className: `tabular-nums text-muted`,
							children: [
								Mn(e, t.id),
								` `,
								n(`ui.vp`)
							]
						})
					]
				}, t.id))
			}),
			(0, import_jsx_runtime.jsx)(B, {
				type: `button`,
				className: `w-full`,
				onClick: t,
				children: n(`ui.backMenu`)
			})
		]
	}) : null;
}
function vi({ onCancel: e, onConfirm: t }) {
	let n = useT();
	return (0, import_jsx_runtime.jsxs)(oi, {
		title: n(`exit.title`),
		onClose: e,
		children: [(0, import_jsx_runtime.jsx)(`p`, {
			className: `mb-5 text-sm text-muted`,
			children: n(`exit.body`)
		}), (0, import_jsx_runtime.jsxs)(`div`, {
			className: `grid grid-cols-2 gap-2`,
			children: [(0, import_jsx_runtime.jsx)(B, {
				type: `button`,
				variant: `secondary`,
				onClick: e,
				children: n(`exit.cancel`)
			}), (0, import_jsx_runtime.jsx)(B, {
				type: `button`,
				onClick: t,
				children: n(`exit.confirm`)
			})]
		})]
	});
}
function yi({ onStart: t, onContinue: n, onRules: r, onInvite }) {
	let i = useT(), a = useLocaleStore((e) => e.locale), [s, c] = (0, import_react.useState)(() => {
		let e = aiNames();
		return [
			{
				name: ``,
				isAi: !1,
				colorIndex: 0
			},
			{
				name: e[0],
				isAi: !0,
				colorIndex: 1
			},
			{
				name: e[1],
				isAi: !0,
				colorIndex: 2
			}
		];
	}), [f, p] = (0, import_react.useState)(!1);
	(0, import_react.useEffect)(() => {
		p(Ir());
	}, []), (0, import_react.useEffect)(() => {
		let e = i(`start.you`), t = aiNames(a), n = youNames(), r = allAiNames();
		c((a) => {
			let o = 0;
			return a.map((a) => {
				if (!a.isAi && (a.name === `` || n.has(a.name))) return {
					...a,
					name: e
				};
				if (a.isAi && (r.has(a.name) || a.name === ``)) {
					let e = t[o] ?? i(`start.computer`);
					return o += 1, {
						...a,
						name: e
					};
				}
				return a.isAi && (o += 1), a;
			});
		});
	}, [a, i]);
	let h = new Set(s.map((e) => e.colorIndex));
	function g(e, t) {
		c((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	return (0, import_jsx_runtime.jsxs)(`div`, {
		className: `relative flex min-h-dvh flex-col overflow-hidden bg-bg text-fg`,
		children: [
			(0, import_jsx_runtime.jsx)(`img`, {
				src: `/assets/hero-island.jpg`,
				alt: ``,
				className: `absolute inset-0 h-full w-full object-cover`
			}),
			(0, import_jsx_runtime.jsx)(`div`, { className: `absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg` }),
			(0, import_jsx_runtime.jsxs)(`div`, {
				className: `relative mx-auto flex w-full max-w-lg flex-1 flex-col justify-end gap-6 px-5 py-8 sm:justify-center`,
				children: [
					(0, import_jsx_runtime.jsxs)(`header`, {
						className: `space-y-2`,
						children: [
							(0, import_jsx_runtime.jsxs)(`div`, {
								className: `flex items-center justify-between gap-3`,
								children: [(0, import_jsx_runtime.jsx)(`p`, {
									className: `text-xs font-medium tracking-[0.22em] text-accent uppercase`,
									children: i(`start.kicker`)
								}), (0, import_jsx_runtime.jsx)(ai, { compact: !0 })]
							}),
							(0, import_jsx_runtime.jsx)(`h1`, {
								className: `font-display text-5xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl`,
								children: `Havn`
							}),
							(0, import_jsx_runtime.jsx)(`p`, {
								className: `max-w-sm text-base leading-relaxed text-muted`,
								children: i(`start.blurb`)
							})
						]
					}),
					(0, import_jsx_runtime.jsxs)(`section`, {
						className: `rounded-[var(--radius-xl)] border border-border bg-surface/90 p-4 shadow-panel`,
						children: [(0, import_jsx_runtime.jsxs)(`div`, {
							className: `mb-3 flex items-center justify-between`,
							children: [(0, import_jsx_runtime.jsx)(`h2`, {
								className: `text-sm font-medium text-muted`,
								children: i(`start.players`)
							}), (0, import_jsx_runtime.jsx)(`div`, {
								className: `flex gap-2`,
								children: (0, import_jsx_runtime.jsxs)(B, {
									type: `button`,
									size: `sm`,
									variant: `secondary`,
									disabled: s.length >= 4,
									onClick: () => {
										let e = H.findIndex((e, t) => !h.has(t)), t = aiNames(a);
										c((n) => [...n, {
											name: t[n.filter((e) => e.isAi).length] ?? i(`start.playerN`, { n: n.length + 1 }),
											isAi: !0,
											colorIndex: e < 0 ? n.length : e
										}]);
									},
									children: [(0, import_jsx_runtime.jsx)(te, { className: `size-3.5` }), i(`start.add`)]
								})
							})]
						}), (0, import_jsx_runtime.jsx)(`ul`, {
							className: `space-y-2`,
							children: s.map((e, t) => (0, import_jsx_runtime.jsxs)(`li`, {
								className: `flex items-center gap-2 rounded-[var(--radius-md)] bg-surface-2 p-2`,
								children: [
									(0, import_jsx_runtime.jsx)(`span`, {
										className: `size-7 shrink-0 rounded-full ring-2 ring-bg`,
										style: { background: H[e.colorIndex].fill },
										"aria-hidden": !0
									}),
									(0, import_jsx_runtime.jsx)(`input`, {
										value: e.name,
										onChange: (e) => g(t, { name: e.target.value }),
										className: `h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/40`,
										"aria-label": i(`start.nameAria`, { n: t + 1 })
									}),
									(0, import_jsx_runtime.jsxs)(`button`, {
										type: `button`,
										className: R(`inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 text-xs font-medium`, e.isAi ? `border-border text-muted` : `border-border-strong bg-surface text-fg`),
										onClick: () => {
											let n = !e.isAi, r = aiNames(a), o = s.filter((e) => e.isAi).length;
											g(t, {
												isAi: n,
												name: n ? r[o] ?? i(`start.computer`) : t === 0 ? i(`start.you`) : i(`mp.friend`)
											});
										},
										children: [e.isAi ? (0, import_jsx_runtime.jsx)(m, { className: `size-3.5` }) : (0, import_jsx_runtime.jsx)(C, { className: `size-3.5` }), e.isAi ? i(`start.computer`) : t === 0 ? i(`start.you`) : i(`mp.friend`)]
									}),
									s.length > 2 && (0, import_jsx_runtime.jsx)(`button`, {
										type: `button`,
										className: `grid size-10 place-items-center text-muted hover:text-fg`,
										onClick: () => c((e) => e.filter((e, n) => n !== t)),
										"aria-label": i(`start.removeAria`),
										children: (0, import_jsx_runtime.jsx)(S, { className: `size-4` })
									})
								]
							}, t))
						})]
					}),
					(0, import_jsx_runtime.jsxs)(`div`, {
						className: `flex flex-col gap-2`,
						children: [
							(0, import_jsx_runtime.jsx)(B, {
								type: `button`,
								size: `lg`,
								className: `w-full`,
								"data-testid": `start-game`,
								onClick: () => t(s),
								children: i(`start.startGame`)
							}),
							onInvite && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(B, {
								type: `button`,
								size: `lg`,
								variant: `secondary`,
								className: `w-full`,
								"data-testid": `invite-friend`,
								onClick: () => onInvite(s),
								children: i(`mp.invite`)
							}), (0, import_jsx_runtime.jsx)(`p`, {
								className: `px-1 text-center text-xs leading-relaxed text-muted`,
								children: i(`mp.inviteHint`)
							})] }),
							f && (0, import_jsx_runtime.jsx)(B, {
								type: `button`,
								size: `lg`,
								variant: `secondary`,
								className: `w-full`,
								onClick: n,
								children: i(`start.continueGame`)
							}),
							(0, import_jsx_runtime.jsxs)(B, {
								type: `button`,
								variant: `ghost`,
								className: `w-full`,
								onClick: r,
								children: [(0, import_jsx_runtime.jsx)(ee, { className: `size-4` }), i(`start.how`)]
							})
						]
					})
				]
			})
		]
	});
}
var bi = class extends import_react.Component {
	state = { err: null };
	static getDerivedStateFromError(e) {
		return { err: e };
	}
	render() {
		return this.state.err ? (0, import_jsx_runtime.jsxs)(`div`, {
			className: `flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg`,
			children: [
				(0, import_jsx_runtime.jsx)(`h1`, {
					className: `font-display text-2xl font-semibold`,
					children: t(`ui.crashedTitle`)
				}),
				(0, import_jsx_runtime.jsx)(`p`, {
					className: `max-w-sm text-sm text-muted`,
					children: t(`ui.crashedBody`)
				}),
				(0, import_jsx_runtime.jsx)(B, {
					type: `button`,
					onClick: () => {
						this.setState({ err: null }), this.props.onReset();
					},
					children: t(`ui.continueBtn`)
				})
			]
		}) : this.props.children;
	}
};
function xi({ onLeaveMatch } = {}) {
	let e = useGame$1((e) => e.state), t = useGame$1((e) => e.hydrate), n = useGame$1((e) => e.start), r = useGame$1((e) => e.continueSave), i = useGame$1((e) => e.toMenu), a = useGame$1((e) => e.dispatch), o = useGame$1((e) => e.buildMode), c = useGame$1((e) => e.setBuildMode), l = useGame$1((e) => e.muted), d = useGame$1((e) => e.toggleMute), f = useGame$1((e) => e.tickAi), m = useGame$1((e) => e.error), matchRole = useGame$1((e) => e.matchRole), viewerId = useGame$1((e) => e.viewerId), startInvite = useGame$1((e) => e.startInvite), setMatch = useGame$1((e) => e.setMatch), resetMatch = useGame$1((e) => e.resetMatch), nav = useNavigate({ from: `/` }), h = useLocaleStore((e) => e.hydrateLocale), g = useLocaleStore((e) => e.ready), _ = useT(), [v, y] = (0, import_react.useState)(null), [ee, te] = (0, import_react.useState)(!1);
	if ((0, import_react.useEffect)(() => {
		h(), t();
	}, [t, h]), (0, import_react.useEffect)(() => {
		if (!e || e.phase === `gameOver` || !e.players[yn(e)]?.isAi) return;
		let t = e.tradeOffer ? 420 : e.phase === `setup` ? 320 : e.phase === `roll` ? 520 : 640, n = window.setTimeout(() => f(), t);
		return () => window.clearTimeout(n);
	}, [
		e?.revision,
		e?.phase,
		e?.currentPlayer,
		e?.discardQueue?.join(`,`),
		e?.tradeOffer?.to,
		f,
		e
	]), (0, import_react.useEffect)(() => {
		if (!m) return;
		let e = window.setTimeout(() => useGame$1.setState({ error: null }), 2400);
		return () => window.clearTimeout(e);
	}, [m]), (0, import_react.useEffect)(() => {
		function e(e) {
			if (e.key !== `Escape`) return;
			c(null), y(null);
			let t = useGame$1.getState().state;
			t?.tradeOffer && t.tradeOffer.from === t.currentPlayer && !t.players[t.currentPlayer]?.isAi && a({ type: `cancelTrade` });
		}
		return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e);
	}, [c, a]), !g) return (0, import_jsx_runtime.jsx)(`div`, { className: `min-h-dvh bg-bg` });
	let leave = () => {
		if (onLeaveMatch) onLeaveMatch();
		else {
			i();
			nav({ search: {} });
		}
	};
	if (!e) {
		if (matchRole === `guest`) return (0, import_jsx_runtime.jsx)(`div`, { className: `relative min-h-dvh bg-bg` });
		return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			(0, import_jsx_runtime.jsx)(yi, {
				onStart: (seats) => {
					resetMatch(), n({ seats }), nav({ search: {} });
				},
				onContinue: () => {
					resetMatch(), r(), nav({ search: {} });
				},
				onRules: () => te(!0),
				onInvite: (seats) => {
					let room = startInvite(seats);
					if (room) nav({ search: { match: room } });
				}
			}),
			m && (0, import_jsx_runtime.jsx)(`div`, {
				className: `pointer-events-none absolute top-16 left-1/2 z-40 -translate-x-1/2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm shadow-panel`,
				children: m
			}),
			ee && (0, import_jsx_runtime.jsx)(si, { onClose: () => te(!1) })
		] });
	}
	let ne = yn(e), x = e.players[ne] ?? e.players[e.currentPlayer];
	if (!x) return (0, import_jsx_runtime.jsx)(yi, {
		onStart: (seats) => {
			resetMatch(), n({ seats }), nav({ search: {} });
		},
		onContinue: () => {
			resetMatch(), r(), nav({ search: {} });
		},
		onRules: () => te(!0),
		onInvite: (seats) => {
			let room = startInvite(seats);
			if (room) nav({ search: { match: room } });
		}
	});
	let S, C, hudPlayer, T;
	if (matchRole === `solo`) {
		S = x.isAi ? e.players.find((p) => !p.isAi)?.id ?? x.id : ne;
		C = !x.isAi;
	} else {
		S = viewerId;
		C = ne === viewerId && !x.isAi;
	}
	hudPlayer = e.players[S] ?? x;
	T = e;
	function E(e) {
		if (C) {
			if (T.phase === `setup` && T.setupNeed === `settlement`) {
				a({
					type: `placeSettlement`,
					vertexId: e
				});
				return;
			}
			T.phase === `main` && o === `settlement` && a({
				type: `placeSettlement`,
				vertexId: e
			}), T.phase === `main` && o === `city` && a({
				type: `placeCity`,
				vertexId: e
			});
		}
	}
	function D(e) {
		C && (T.phase === `setup` && T.setupNeed === `road` || T.phase === `roadBuilding` || T.phase === `main` && o === `road`) && a({
			type: `placeRoad`,
			edgeId: e
		});
	}
	function oe(e) {
		if (!C || T.phase !== `robber`) return;
		let t = In(T, e, T.currentPlayer);
		if (t.length > 1) {
			y({
				kind: `steal`,
				hexId: e,
				victims: t
			});
			return;
		}
		a({
			type: `moveRobber`,
			hexId: e,
			stealFrom: t[0] ?? null
		});
	}
	function se(e) {
		e === `knight` ? a({ type: `playKnight` }) : e === `roads` ? a({ type: `playRoads` }) : e === `plenty` ? y({ kind: `plenty` }) : e === `monopoly` && y({ kind: `monopoly` });
	}
	return (0, import_jsx_runtime.jsx)(bi, {
		onReset: r,
		children: (0, import_jsx_runtime.jsxs)(`div`, {
			className: `relative flex h-dvh flex-col overflow-hidden bg-bg text-fg`,
			children: [
				(0, import_jsx_runtime.jsx)(`div`, { className: `pointer-events-none absolute inset-0 havn-felt` }),
				(0, import_jsx_runtime.jsxs)(`div`, {
					className: `relative flex min-h-0 flex-1 flex-col`,
					children: [
						(0, import_jsx_runtime.jsxs)(`header`, {
							className: `flex items-center gap-1 px-3 pt-[max(8px,env(safe-area-inset-top))] lg:gap-2 lg:pt-3`,
							children: [
								(0, import_jsx_runtime.jsxs)(`div`, {
									className: `min-w-0 flex-1`,
									children: [(0, import_jsx_runtime.jsx)(`p`, {
										className: `font-display text-base font-semibold leading-none lg:text-lg`,
										children: `Havn`
									}), (0, import_jsx_runtime.jsx)(`p`, {
										className: `text-[11px] text-muted lg:text-xs`,
										children: e.turnNumber > 0 ? _(`ui.round`, { n: e.turnNumber }) : _(`ui.setup`)
									})]
								}),
								(0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `ghost`,
									onClick: d,
									"aria-label": _(`ui.sound`),
									children: l ? (0, import_jsx_runtime.jsx)(ie, {}) : (0, import_jsx_runtime.jsx)(re, {})
								}),
								(0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `ghost`,
									onClick: () => y({ kind: `rules` }),
									"aria-label": _(`ui.rules`),
									children: (0, import_jsx_runtime.jsx)(p, {})
								}),
								(0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `ghost`,
									onClick: () => y({ kind: `exit` }),
									"aria-label": _(`ui.quit`),
									children: (0, import_jsx_runtime.jsx)(b, {})
								}),
								matchRole === `host` && (0, import_jsx_runtime.jsx)(B, {
									type: `button`,
									size: `icon`,
									variant: `ghost`,
									onClick: () => setMatch({ inviteOpen: !0 }),
									"aria-label": _(`mp.invite`),
									children: (0, import_jsx_runtime.jsx)(Link2, {})
								})
							]
						}),
						(0, import_jsx_runtime.jsx)($r, {
							state: e,
							viewer: S
						}),
						(0, import_jsx_runtime.jsxs)(`div`, {
							className: `flex min-h-0 flex-1 flex-col lg:flex-row`,
							children: [(0, import_jsx_runtime.jsxs)(`div`, {
								className: `relative min-h-0 min-w-0 flex-1`,
								children: [(0, import_jsx_runtime.jsx)(ii, {
									state: e,
									buildMode: o,
									disabled: !C,
									onVertex: E,
									onEdge: D,
									onHex: oe
								}), e.lastRoll && (0, import_jsx_runtime.jsxs)(`div`, {
									className: `pointer-events-none absolute top-1 right-2 z-10 flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface/90 px-2 py-1 shadow-panel lg:hidden`,
									children: [(0, import_jsx_runtime.jsx)(zr, {
										d1: e.lastRoll.d1,
										d2: e.lastRoll.d2,
										compact: !0
									}), (0, import_jsx_runtime.jsx)(`span`, {
										className: `font-display text-xl tabular-nums`,
										children: e.lastRoll.total
									})]
								})]
							}), (0, import_jsx_runtime.jsx)(Qr, {
								state: e,
								player: hudPlayer,
								human: C,
								buildMode: o,
								onBuildMode: c,
								onRoll: () => a({ type: `roll` }),
								onEnd: () => a({ type: `endTurn` }),
								onBuyDev: () => a({ type: `buyDev` }),
								onPlayDev: se,
								onTrade: () => y({ kind: `trade` }),
								onSkipRoad: () => a({ type: `skipFreeRoad` })
							})]
						})
					]
				}),
				m && (0, import_jsx_runtime.jsx)(`div`, {
					className: `pointer-events-none absolute top-16 left-1/2 z-40 -translate-x-1/2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm shadow-panel`,
					children: m
				}),
				e.phase === `discard` && C && (0, import_jsx_runtime.jsx)(ci, {
					state: e,
					playerId: ne,
					onConfirm: (e) => a({
						type: `discard`,
						resources: e
					})
				}, ne),
				e.tradeOffer && (matchRole === `solo` ? !e.players[e.tradeOffer.to]?.isAi : e.tradeOffer.to === viewerId) && (0, import_jsx_runtime.jsx)(fi, {
					state: e,
					onRespond: (e) => a({
						type: `respondTrade`,
						accept: e
					})
				}),
				e.tradeOffer && (e.players[e.tradeOffer.to]?.isAi || matchRole !== `solo` && e.tradeOffer.to !== viewerId && e.tradeOffer.from === viewerId) && (0, import_jsx_runtime.jsx)(mi, {
					state: e,
					onCancel: () => a({ type: `cancelTrade` })
				}),
				e.phase === `gameOver` && (0, import_jsx_runtime.jsx)(_i, {
					state: e,
					onMenu: leave
				}),
				v?.kind === `rules` && (0, import_jsx_runtime.jsx)(si, { onClose: () => y(null) }),
				v?.kind === `exit` && (0, import_jsx_runtime.jsx)(vi, {
					onCancel: () => y(null),
					onConfirm: () => {
						y(null), leave();
					}
				}),
				v?.kind === `trade` && C && (0, import_jsx_runtime.jsx)(li, {
					state: e,
					playerId: ne,
					onBank: (e, t) => {
						a({
							type: `bankTrade`,
							give: e,
							get: t
						}), y(null);
					},
					onOffer: (e, t, n) => {
						a({
							type: `offerTrade`,
							to: e,
							give: t,
							want: n
						}), y(null);
					},
					onClose: () => y(null)
				}),
				v?.kind === `plenty` && (0, import_jsx_runtime.jsx)(hi, {
					title: _(`ui.plentyTitle`),
					count: 2,
					onPick: (e, t) => {
						a({
							type: `playPlenty`,
							a: e,
							b: t
						}), y(null);
					},
					onClose: () => y(null)
				}),
				v?.kind === `monopoly` && (0, import_jsx_runtime.jsx)(hi, {
					title: _(`ui.monopolyTitle`),
					count: 1,
					onPick: (e) => {
						a({
							type: `playMonopoly`,
							resource: e
						}), y(null);
					},
					onClose: () => y(null)
				}),
				v?.kind === `steal` && (0, import_jsx_runtime.jsx)(gi, {
					state: e,
					victims: v.victims,
					onPick: (e) => {
						a({
							type: `moveRobber`,
							hexId: v.hexId,
							stealFrom: e
						}), y(null);
					}
				})
			]
		})
	});
}
function HavnTable$1({ onLeaveMatch } = {}) {
	return (0, import_jsx_runtime.jsx)(xi, { onLeaveMatch });
}
var useGame = useGame$1;
var onPublish = onPublish$1;
var onGuestAction = onGuestAction$1;
var HavnTable = HavnTable$1;
var FAST_POLL_MS = 400;
var IDLE_POLL_MS = 2e3;
var PING_INTERVAL_MS = 2e3;
var STALL_MS = 1e4;
var MAX_RECOVERY_ATTEMPTS = 3;
var SIGNAL_RETRY_DELAYS_MS = [250, 750];
function defaultIceServers() {
	return [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];
}
var P2PRoom = class {
	opts;
	peers = /* @__PURE__ */ new Map();
	/** Per-remote-peer signal delivery chains (order-preserving). */
	signalQueues = /* @__PURE__ */ new Map();
	cursor = 0;
	pollTimer = null;
	pingTimer = null;
	closed = false;
	everPolled = false;
	lastPeersFingerprint = "";
	constructor(opts) {
		this.opts = opts;
	}
	/**
	* The first poll IS the join: it registers this peer and returns the
	* roster. A failed first poll (cold DB, offline tab) must not strand the
	* room: the loop and timers start regardless and the next poll retries.
	*/
	async join() {
		try {
			await this.pollOnce();
		} catch {}
		if (this.closed) return;
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
		this.pingTimer = setInterval(() => {
			this.pingAll();
			this.watchdog();
		}, PING_INTERVAL_MS);
	}
	close() {
		this.closed = true;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		if (this.pingTimer) clearInterval(this.pingTimer);
		for (const slot of this.peers.values()) slot.pc.close();
		this.peers.clear();
		fetch("/api/rtc", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				op: "leave",
				room: this.opts.room,
				peer: this.opts.selfId
			}),
			keepalive: true
		}).catch(() => {});
	}
	/** Send on the unreliable game-state channel (drops stale packets). */
	broadcast(data) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		let sent = false;
		for (const slot of this.peers.values()) if (slot.state?.readyState === "open") {
			slot.state.send(wire);
			sent = true;
		}
		return sent;
	}
	/** Send reliably (ordered) to one peer, or to all when peerId is omitted. */
	send(data, peerId) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		const targets = peerId ? [this.peers.get(peerId)] : [...this.peers.values()];
		let sent = false;
		for (const slot of targets) if (slot?.reliable?.readyState === "open") {
			slot.reliable.send(wire);
			sent = true;
		}
		return sent;
	}
	peerList() {
		return [...this.peers.values()].map((s) => ({ ...s.info }));
	}
	schedulePoll(delay) {
		if (this.closed) return;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		this.pollTimer = setTimeout(() => void this.poll(), delay);
	}
	anyPairConnecting() {
		for (const s of this.peers.values()) {
			if (s.terminal) continue;
			if (s.info.connectionState !== "connected") return true;
		}
		return false;
	}
	async pollOnce() {
		const params = new URLSearchParams({
			room: this.opts.room,
			peer: this.opts.selfId,
			name: this.opts.name ?? "",
			since: String(this.cursor)
		});
		const res = await fetch(`/api/rtc?${params}`);
		if (this.closed) return;
		if (!res.ok) throw new Error(`signaling poll failed: ${res.status}`);
		const body = await res.json();
		if (this.closed) return;
		if (!this.everPolled) {
			this.everPolled = true;
			this.opts.onConnected?.();
		}
		this.reconcileRoster(body.peers);
		const roster = new Set(body.peers.map((p) => p.id));
		for (const sig of body.signals) {
			this.cursor = Math.max(this.cursor, sig.id);
			await this.onSignal(sig.from, sig.kind, sig.payload, roster);
			if (this.closed) return;
		}
	}
	async poll() {
		if (this.closed) return;
		try {
			await this.pollOnce();
		} catch {}
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
	}
	reconcileRoster(peers) {
		const alive = new Set(peers.map((p) => p.id));
		for (const p of peers) {
			if (p.id === this.opts.selfId) continue;
			const existing = this.peers.get(p.id);
			if (existing) existing.info.name = p.name;
			else this.connectTo(p.id, p.name, this.opts.selfId > p.id);
		}
		for (const [id, slot] of this.peers) if (!alive.has(id)) {
			slot.pc.close();
			this.peers.delete(id);
		}
		this.emitPeers();
	}
	connectTo(peerId, name, initiator) {
		if (this.closed) return null;
		const pc = new RTCPeerConnection({ iceServers: this.opts.iceServers ?? defaultIceServers() });
		const slot = {
			pc,
			makingOffer: false,
			ignoreOffer: false,
			pendingCandidates: [],
			lastProgressAt: Date.now(),
			recoveryAttempts: 0,
			info: {
				id: peerId,
				name,
				connectionState: pc.connectionState,
				candidateType: null,
				rttMs: null
			}
		};
		this.peers.set(peerId, slot);
		pc.onicecandidate = (e) => {
			if (e.candidate) this.sendSignal(peerId, "ice", e.candidate.toJSON());
		};
		pc.onconnectionstatechange = () => {
			slot.info.connectionState = pc.connectionState;
			if (pc.connectionState === "connecting" || pc.connectionState === "connected") slot.lastProgressAt = Date.now();
			if (pc.connectionState === "connected") {
				slot.recoveryAttempts = 0;
				slot.terminal = false;
				this.readCandidateType(slot);
			}
			this.emitPeers();
			if (pc.connectionState === "failed") pc.restartIce();
			if (pc.connectionState === "failed" || pc.connectionState === "disconnected") this.schedulePoll(FAST_POLL_MS);
		};
		pc.onnegotiationneeded = async () => {
			try {
				slot.makingOffer = true;
				await pc.setLocalDescription();
				await this.sendSignal(peerId, "offer", pc.localDescription.toJSON());
			} catch {} finally {
				slot.makingOffer = false;
			}
		};
		pc.ondatachannel = (e) => this.attachChannel(slot, e.channel);
		if (initiator) {
			this.attachChannel(slot, pc.createDataChannel("state", {
				ordered: false,
				maxRetransmits: 0
			}));
			this.attachChannel(slot, pc.createDataChannel("reliable", { ordered: true }));
		}
		return slot;
	}
	attachChannel(slot, channel) {
		if (channel.label === "state") slot.state = channel;
		else slot.reliable = channel;
		channel.onopen = () => {
			slot.lastProgressAt = Date.now();
		};
		channel.onmessage = (e) => {
			let msg;
			try {
				msg = JSON.parse(e.data);
			} catch {
				return;
			}
			if (msg.t === "ping") {
				if (slot.state?.readyState === "open") slot.state.send(JSON.stringify({ t: "pong" }));
			} else if (msg.t === "pong") {
				if (slot.pingSentAt) {
					slot.info.rttMs = Math.round(performance.now() - slot.pingSentAt);
					slot.pingSentAt = void 0;
					this.emitPeers();
				}
			} else this.opts.onMessage?.(slot.info.id, msg.d, channel.label === "state" ? "state" : "reliable");
		};
	}
	/** Apply buffered ICE candidates once a remote description is in place. */
	async flushPendingCandidates(slot) {
		while (slot.pendingCandidates.length > 0) {
			const candidate = slot.pendingCandidates.shift();
			try {
				await slot.pc.addIceCandidate(candidate);
			} catch (err) {
				if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
			}
			if (this.closed) return;
		}
	}
	async onSignal(from, kind, payload, roster) {
		if (this.closed) return;
		let slot = this.peers.get(from);
		if (!slot) {
			if (!roster.has(from)) return;
			const created = this.connectTo(from, "", false);
			if (!created) return;
			slot = created;
		}
		const polite = this.opts.selfId < from;
		try {
			if (kind === "offer" || kind === "answer") {
				const description = payload;
				const collision = kind === "offer" && (slot.makingOffer || slot.pc.signalingState !== "stable");
				slot.ignoreOffer = !polite && collision;
				if (slot.ignoreOffer) return;
				try {
					await slot.pc.setRemoteDescription(description);
				} catch (err) {
					if (kind !== "offer" || slot.recreatedForOffer) throw err;
					const attempts = slot.recoveryAttempts;
					const name = slot.info.name;
					slot.pc.close();
					this.peers.delete(from);
					const fresh = this.connectTo(from, name, false);
					if (!fresh) return;
					fresh.recoveryAttempts = attempts;
					fresh.recreatedForOffer = true;
					slot = fresh;
					await slot.pc.setRemoteDescription(description);
				}
				if (this.closed) return;
				await this.flushPendingCandidates(slot);
				if (this.closed) return;
				if (kind === "offer") {
					await slot.pc.setLocalDescription();
					if (this.closed) return;
					await this.sendSignal(from, "answer", slot.pc.localDescription.toJSON());
				}
			} else if (kind === "ice") {
				const candidate = payload;
				if (!slot.pc.remoteDescription) {
					slot.pendingCandidates.push(candidate);
					return;
				}
				try {
					await slot.pc.addIceCandidate(candidate);
				} catch (err) {
					if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
				}
			}
		} catch {}
	}
	/**
	* Signals are serialized per remote peer (a candidate must never overtake
	* its SDP into the DB) and retried on failure with short backoff.
	*/
	sendSignal(to, kind, payload) {
		const next = (this.signalQueues.get(to) ?? Promise.resolve()).then(() => this.postSignal(to, kind, payload));
		this.signalQueues.set(to, next.catch(() => {}));
		return next;
	}
	async postSignal(to, kind, payload) {
		for (let attempt = 0;; attempt++) {
			if (this.closed) return;
			try {
				const res = await fetch("/api/rtc", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						op: "signal",
						room: this.opts.room,
						from: this.opts.selfId,
						to,
						kind,
						payload
					})
				});
				if (res.ok) return;
				throw new Error(`signal POST failed: ${res.status}`);
			} catch (err) {
				if (attempt >= SIGNAL_RETRY_DELAYS_MS.length) {
					console.warn(`[p2p] signal ${kind} to ${to} failed after retries`, err);
					return;
				}
				await new Promise((r) => setTimeout(r, SIGNAL_RETRY_DELAYS_MS[attempt]));
			}
		}
	}
	pingAll() {
		const wire = JSON.stringify({ t: "ping" });
		for (const slot of this.peers.values()) {
			if (slot.state?.readyState !== "open") continue;
			const stale = slot.pingSentAt !== void 0 && performance.now() - slot.pingSentAt > 2 * PING_INTERVAL_MS;
			if (slot.pingSentAt === void 0 || stale) {
				slot.pingSentAt = performance.now();
				slot.state.send(wire);
			}
		}
	}
	/**
	* Stuck-pair recovery, piggybacked on the ping interval. A pair that has
	* made no progress for STALL_MS gets rebuilt by the dialer with a FRESH
	* RTCPeerConnection (new DTLS identity — fixes the suspend/resume
	* fingerprint wedge). After MAX_RECOVERY_ATTEMPTS the pair is terminal:
	* visible to the app as its last connectionState, ignored by fast-poll.
	*/
	watchdog() {
		if (this.closed) return;
		const now = Date.now();
		for (const [peerId, slot] of this.peers) {
			const live = slot.pc.connectionState;
			if (live !== slot.info.connectionState) {
				slot.info.connectionState = live;
				if (live === "connecting" || live === "connected") slot.lastProgressAt = now;
				this.emitPeers();
			}
			if (slot.terminal || live === "connected") continue;
			if (now - slot.lastProgressAt <= STALL_MS) continue;
			if (slot.recoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
				slot.terminal = true;
				this.emitPeers();
				continue;
			}
			slot.recoveryAttempts += 1;
			slot.lastProgressAt = now;
			if (this.opts.selfId > peerId) {
				const { name } = slot.info;
				const attempts = slot.recoveryAttempts;
				slot.pc.close();
				this.peers.delete(peerId);
				const fresh = this.connectTo(peerId, name, true);
				if (fresh) fresh.recoveryAttempts = attempts;
				this.schedulePoll(FAST_POLL_MS);
			}
		}
	}
	async readCandidateType(slot) {
		try {
			const stats = await slot.pc.getStats();
			let selected;
			stats.forEach((s) => {
				if (s.type === "candidate-pair" && s.nominated) selected = s;
			});
			const localId = selected?.localCandidateId;
			if (localId) {
				const local = stats.get(localId);
				slot.info.candidateType = local?.candidateType ?? null;
				this.emitPeers();
			}
		} catch {}
	}
	emitPeers() {
		const list = this.peerList();
		const fingerprint = JSON.stringify(list.map((p) => [
			p.id,
			p.name,
			p.connectionState,
			p.candidateType,
			p.rttMs
		]));
		if (fingerprint === this.lastPeersFingerprint) return;
		this.lastPeersFingerprint = fingerprint;
		this.opts.onPeersChanged?.(list);
	}
};
/**
* React binding for P2PRoom. Identity and room id are captured once on mount
* (useState initializers) so re-renders never tear down the mesh: the P2PRoom
* instance lives exactly as long as the component that mounted it, and
* changing `room`/`name` requires a remount (key the component on them).
*/
function defaultRoom() {
	if (typeof window === "undefined") return "room-ssr";
	return `room-${window.location.hostname.split(".")[0]}`.slice(0, 64);
}
function useP2PRoom(options = {}) {
	const [selfId] = (0, import_react.useState)(() => `p-${Math.random().toString(36).slice(2, 10)}`);
	const [room] = (0, import_react.useState)(() => options.room ?? defaultRoom());
	const [name] = (0, import_react.useState)(() => options.name ?? selfId);
	const [peers, setPeers] = (0, import_react.useState)([]);
	const [joined, setJoined] = (0, import_react.useState)(false);
	const roomRef = (0, import_react.useRef)(null);
	const listeners = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		const p2p = new P2PRoom({
			room,
			selfId,
			name,
			onPeersChanged: setPeers,
			onMessage: (from, data, channel) => {
				for (const fn of listeners.current) fn(from, data, channel);
			},
			onConnected: () => setJoined(true)
		});
		roomRef.current = p2p;
		p2p.join();
		return () => {
			roomRef.current = null;
			p2p.close();
		};
	}, [
		room,
		selfId,
		name
	]);
	return {
		selfId,
		room,
		peers,
		joined,
		broadcast: (0, import_react.useCallback)((data) => roomRef.current?.broadcast(data) ?? false, []),
		send: (0, import_react.useCallback)((data, peerId) => roomRef.current?.send(data, peerId) ?? false, []),
		onMessage: (0, import_react.useCallback)((fn) => {
			listeners.current.add(fn);
			return () => {
				listeners.current.delete(fn);
			};
		}, [])
	};
}
function MatchBridge({ room, name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBridgeInner, {
		room,
		name
	}, room);
}
function MatchBridgeInner({ room, name }) {
	const p2p = useP2PRoom({
		room,
		name
	});
	const i = useT();
	const role = useGame((s) => s.matchRole);
	const inviteOpen = useGame((s) => s.inviteOpen);
	const matchStatus = useGame((s) => s.matchStatus);
	const viewerId = useGame((s) => s.viewerId);
	const setMatch = useGame((s) => s.setMatch);
	const adoptRemote = useGame((s) => s.adoptRemote);
	const dispatch = useGame((s) => s.dispatch);
	const claimSeat = useGame((s) => s.claimSeat);
	const releaseSeat = useGame((s) => s.releaseSeat);
	const fillEmptySeats = useGame((s) => s.fillEmptySeats);
	const board = useGame((s) => asBoard(s.state));
	const seatMap = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [claimedTick, bump] = (0, import_react.useState)(0);
	const lastSent = (0, import_react.useRef)(-1);
	const link = (0, import_react.useMemo)(() => inviteUrl(room), [room]);
	const live = (0, import_react.useMemo)(() => p2p.peers.filter((p) => p.connectionState === "connected"), [p2p.peers]);
	const claimed = (0, import_react.useMemo)(() => new Set(seatMap.current.values()), [claimedTick]);
	(0, import_react.useEffect)(() => {
		setMatch({ matchStatus: "connecting" });
	}, [setMatch]);
	(0, import_react.useEffect)(() => {
		const liveNow = p2p.peers.filter((p) => p.connectionState === "connected");
		const failed = p2p.peers.some((p) => p.connectionState === "failed") && liveNow.length === 0;
		const cur = useGame.getState();
		if (failed) {
			if (cur.matchStatus !== "failed") setMatch({ matchStatus: "failed" });
			return;
		}
		if (role === "host") {
			const names = liveNow.map((p) => p.name).filter(Boolean);
			const status = liveNow.length > 0 ? "live" : p2p.joined ? "waiting" : "connecting";
			const peerName = names[0] ?? null;
			const openHuman = board ? friendSeatIds(board.players).filter((id) => !claimed.has(id)) : [];
			const hideInvite = liveNow.length > 0 && cur.inviteOpen && openHuman.length === 0 && claimed.size > 0;
			if (cur.matchStatus === status && cur.matchPeerName === peerName && !hideInvite) return;
			setMatch({
				matchStatus: status,
				matchPeerName: peerName,
				...hideInvite ? { inviteOpen: false } : {}
			});
		} else if (liveNow.length > 0) {
			const peerName = liveNow[0]?.name ?? "Host";
			if (cur.matchPeerName === peerName && cur.matchStatus === "live") return;
			setMatch({ matchPeerName: peerName });
		}
	}, [
		p2p.joined,
		p2p.peers,
		role,
		setMatch,
		board,
		claimed
	]);
	(0, import_react.useEffect)(() => {
		return p2p.onMessage((from, data, channel) => {
			if (channel !== "reliable") return;
			if (!isNetMsg(data)) return;
			handleMsg(from, data);
		});
		function handleMsg(from, msg) {
			if (msg.t === "full") {
				setMatch({ matchStatus: "full" });
				return;
			}
			if (msg.t === "seat") {
				setMatch({
					viewerId: msg.seat,
					matchStatus: "live",
					inviteOpen: false
				});
				return;
			}
			if (msg.t === "hello") {
				if (role === "host") {
					const seat = seatMap.current.get(from);
					if (seat != null && msg.name) claimSeat(seat, msg.name);
				} else setMatch({ matchPeerName: msg.name });
				return;
			}
			if (msg.t === "action") {
				if (role === "host") dispatch(msg.action);
				return;
			}
			if (msg.t === "error") {
				useGame.setState({ error: msg.message });
				return;
			}
			if (msg.t === "sync") {
				if (adoptRemote(msg.state) && role === "guest") {
					const seated = useGame.getState().viewerId >= 0;
					setMatch({
						matchStatus: seated ? "live" : "connecting",
						inviteOpen: false
					});
				}
			}
		}
	}, [
		p2p,
		role,
		setMatch,
		adoptRemote,
		dispatch,
		claimSeat
	]);
	(0, import_react.useEffect)(() => {
		return onPublish((state) => {
			const revision = state.revision ?? 0;
			if (revision === lastSent.current) return;
			lastSent.current = revision;
			const payload = {
				t: "sync",
				revision,
				state
			};
			if (role === "host") p2p.send(payload);
		});
	}, [p2p, role]);
	(0, import_react.useEffect)(() => {
		if (role !== "guest") return;
		return onGuestAction((action) => {
			p2p.send({
				t: "action",
				action
			});
		});
	}, [p2p, role]);
	const greeted = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (role !== "host" || !board) return;
		const liveIds = new Set(live.map((p) => p.id));
		let changed = false;
		let pending = false;
		for (const [id, seat] of [...seatMap.current]) {
			if (liveIds.has(id)) continue;
			seatMap.current.delete(id);
			greeted.current.delete(id);
			releaseSeat(seat);
			changed = true;
		}
		const taken = new Set(seatMap.current.values());
		const open = friendSeatIds(board.players).filter((id) => !taken.has(id));
		for (const peer of live) {
			if (!seatMap.current.has(peer.id)) {
				const seat = open.shift();
				if (seat == null) {
					if (!p2p.send({ t: "full" }, peer.id)) pending = true;
					else greeted.current.add(peer.id);
					continue;
				}
				seatMap.current.set(peer.id, seat);
				taken.add(seat);
				claimSeat(seat, peer.name || i("mp.friend"));
				changed = true;
			}
			if (greeted.current.has(peer.id)) continue;
			const seat = seatMap.current.get(peer.id);
			const g = useGame.getState().state;
			const revision = g ? g.revision ?? 0 : 0;
			const helloOk = p2p.send({
				t: "hello",
				name
			}, peer.id);
			const seatOk = p2p.send({
				t: "seat",
				seat
			}, peer.id);
			const syncOk = g ? p2p.send({
				t: "sync",
				revision,
				state: g
			}, peer.id) : true;
			if (helloOk && seatOk && syncOk) {
				greeted.current.add(peer.id);
				lastSent.current = revision;
			} else pending = true;
		}
		if (changed) bump((n) => n + 1);
		if (!pending) return;
		const timer = window.setTimeout(() => bump((n) => n + 1), 250);
		return () => window.clearTimeout(timer);
	}, [
		p2p,
		live,
		board,
		role,
		name,
		claimSeat,
		releaseSeat,
		i,
		claimedTick
	]);
	(0, import_react.useEffect)(() => {
		if (role !== "guest") return;
		let pending = false;
		for (const peer of live) {
			if (greeted.current.has(peer.id)) continue;
			if (p2p.send({
				t: "hello",
				name
			}, peer.id)) greeted.current.add(peer.id);
			else pending = true;
		}
		if (!pending) return;
		const timer = window.setTimeout(() => bump((n) => n + 1), 250);
		return () => window.clearTimeout(timer);
	}, [
		p2p,
		live,
		role,
		name,
		claimedTick
	]);
	const acting = board ? actingPlayerId(board) : 0;
	const waitingSeat = role === "host" && board && acting !== 0 && board.players[acting] && !board.players[acting].isAi && !claimed.has(acting) ? acting : null;
	if (matchStatus === "full") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		testId: "havn-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: i("mp.full")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: i("mp.fullBody")
		})]
	});
	if (role === "guest" && (matchStatus !== "live" || viewerId < 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		testId: "havn-joining",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: i("mp.joining")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: matchStatus === "failed" ? i("mp.failed") : i("mp.waitingHost")
		})]
	});
	if (role === "host" && inviteOpen) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteCard, {
		link,
		room,
		connecting: matchStatus === "connecting",
		failed: matchStatus === "failed",
		peers: p2p.peers,
		board,
		claimed,
		onDismiss: () => setMatch({ inviteOpen: false }),
		onFillEmpty: () => {
			const open = board ? friendSeatIds(board.players).filter((id) => !claimed.has(id)) : [];
			if (open.length) fillEmptySeats(open);
			setMatch({ inviteOpen: false });
		}
	});
	if (matchStatus === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		testId: "havn-dropped",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: i("mp.dropped")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: i("mp.droppedBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5",
				onClick: () => setMatch({ inviteOpen: true }),
				children: i("mp.showInvite")
			})
		]
	});
	if (waitingSeat != null && board) {
		const waiter = board.players[waitingSeat];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-testid": "havn-waiting-seat",
				className: "pointer-events-auto w-full max-w-md rounded-[24px] border border-border bg-surface p-5 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.28em] text-muted",
						children: i("mp.inviteKicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl",
						children: i("mp.waitingSeat", { name: waiter.name })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setMatch({ inviteOpen: true }),
							children: i("mp.showInvite")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => fillEmptySeats([waitingSeat]),
							children: i("mp.computerEmpty")
						})]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "havn-match-live",
		hidden: true
	});
}
function Overlay({ children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": testId,
		className: "absolute inset-0 z-20 flex items-end justify-center bg-bg/70 p-4 md:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-panel",
			children
		})
	});
}
function InviteCard({ link, room, connecting, failed, peers, board, claimed, onDismiss, onFillEmpty }) {
	const i = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			document.getElementById("havn-invite")?.select();
		}
	};
	const share = async () => {
		if (navigator.share) try {
			await navigator.share({
				title: i("mp.shareTitle"),
				text: i("mp.shareText"),
				url: link
			});
			return;
		} catch {}
		await copy();
	};
	const seats = board?.players ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		testId: "havn-invite-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.28em] text-muted",
					children: i("mp.inviteKicker")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl",
					children: i("mp.inviteTitle")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-5 text-muted" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: failed ? i("mp.droppedBody") : connecting ? i("mp.connecting") : i("mp.waitingGuest")
			}),
			seats.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				"data-testid": "havn-invite-roster",
				children: seats.map((p) => {
					const filled = p.id === 0 || claimed.has(p.id) || p.isAi;
					const status = p.id === 0 ? i("mp.hostSeat") : p.isAi ? i("start.computer") : filled ? i("mp.connectedAs") : i("mp.openSeat");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-seat": p.id,
						"data-status": p.id === 0 ? "host" : p.isAi ? "ai" : filled ? "seated" : "open",
						className: "flex items-center justify-between rounded-[12px] bg-surface-2 px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: status
						})]
					}, p.id);
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wide text-muted",
					children: i("mp.linkLabel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "havn-invite",
					"data-testid": "havn-invite",
					readOnly: true,
					value: link,
					className: "mt-2 h-11 w-full rounded-[12px] border border-border bg-bg px-3 text-sm text-fg",
					onFocus: (e) => e.currentTarget.select()
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-subtle",
				children: i("mp.code", { code: room.toUpperCase() })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void share(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? i("mp.copied") : i("mp.copyInvite")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: onDismiss,
						children: i("mp.keepPlaying")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: onFillEmpty,
						children: i("mp.computerEmpty")
					})
				]
			}),
			peers.some((p) => p.connectionState === "connecting") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: i("mp.peerConnecting")
			}) : null
		]
	});
}
function GameApp({ join, match }) {
	const navigate = useNavigate({ from: "/" });
	const matchRoom = useGame((s) => s.matchRoom);
	const matchRole = useGame((s) => s.matchRole);
	const setMatch = useGame((s) => s.setMatch);
	const continueSave = useGame((s) => s.continueSave);
	const state = useGame((s) => s.state);
	const toMenu = useGame((s) => s.toMenu);
	(0, import_react.useLayoutEffect)(() => {
		const cur = useGame.getState();
		if (isRoomCode(join)) {
			if (cur.matchRole === "guest" && cur.matchRoom === join) return;
			setMatch({
				matchRole: "guest",
				matchRoom: join,
				matchStatus: "connecting",
				inviteOpen: false,
				viewerId: -1
			});
			return;
		}
		if (isRoomCode(match)) {
			if (cur.matchRole === "host" && cur.matchRoom === match && cur.state) {
				if (!cur.inviteOpen && cur.matchStatus !== "live") setMatch({ inviteOpen: true });
				return;
			}
			setMatch({
				matchRole: "host",
				matchRoom: match,
				matchStatus: "waiting",
				viewerId: 0
			});
			if (!useGame.getState().state) continueSave();
			const running = useGame.getState().state;
			setMatch({ inviteOpen: !!running });
		}
	}, [
		join,
		match,
		setMatch,
		continueSave
	]);
	const leaveToTitle = () => {
		toMenu();
		navigate({ search: {} });
	};
	const hostName = (state?.players)?.[0]?.name || t("start.you");
	const guestName = t("mp.friend");
	if (isRoomCode(join) && matchRole !== "guest") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-dvh bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-testid": "havn-joining",
			className: "absolute inset-0 z-20 flex items-end justify-center bg-bg/70 p-4 md:items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: t("mp.joining")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: t("mp.waitingHost")
				})]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HavnTable, { onLeaveMatch: leaveToTitle }), matchRoom && matchRole !== "solo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBridge, {
			room: matchRoom,
			name: matchRole === "host" ? hostName : guestName
		}) : null]
	});
}
function Home() {
	const { join, match } = Route$2.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {
		join,
		match
	});
}
//#endregion
export { Home as component };
