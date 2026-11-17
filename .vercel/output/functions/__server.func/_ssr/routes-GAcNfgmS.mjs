import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, i as Trash2, n as Volume2, o as LogOut, s as BookOpen, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-GAcNfgmS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var en = {
	ai: [
		"Clara",
		"Owen",
		"Helen",
		"Marco"
	],
	start: {
		kicker: "The island waits",
		blurb: "Settle the island, gather resources and reach ten victory points.",
		players: "Players",
		add: "Add",
		you: "You",
		computer: "Computer",
		playerN: "Player {n}",
		startGame: "Start game",
		continueGame: "Continue saved island",
		how: "How to play",
		nameAria: "Name of player {n}",
		removeAria: "Remove player",
		language: "Language"
	},
	resource: {
		wood: "Lumber",
		brick: "Brick",
		wool: "Wool",
		grain: "Grain",
		ore: "Ore"
	},
	terrain: {
		wood: "Forest",
		brick: "Hills",
		wool: "Pasture",
		grain: "Fields",
		ore: "Mountains",
		desert: "Desert"
	},
	dev: {
		knight: "Knight",
		vp: "Victory point",
		roads: "Road building",
		plenty: "Year of plenty",
		monopoly: "Monopoly"
	},
	devHint: {
		knight: "Move the robber and steal a card.",
		vp: "Hidden point. Counts at ten.",
		roads: "Build two roads for free.",
		plenty: "Take two resources from the bank.",
		monopoly: "Take one resource from everyone."
	},
	phase: {
		setup: "Setup",
		roll: "Dice",
		discard: "Robber",
		robber: "Robber",
		main: "Actions",
		roadBuilding: "Roads",
		gameOver: "Game over"
	},
	hint: {
		waitFor: "Waiting for {name}…",
		wantsTrade: "{name} wants to trade.",
		setupSettle: "{you}: place a village on a crossing.",
		setupRoad: "{you}: build a road from the village.",
		roll: "{you}: roll the dice. A knight may be played first.",
		discard: "{you} must discard {n} cards.",
		robber: "{you}: move the robber to another hex.",
		freeRoad: "{you}: build {n} free road.",
		freeRoads: "{you}: build {n} free roads.",
		pickSettle: "Choose a crossing for a new village.",
		pickCity: "Choose a village to upgrade.",
		pickRoad: "Choose an edge for a new road.",
		main: "{you}: build, trade or end the turn.",
		win: "{name} wins with {n} points."
	},
	ui: {
		round: "Round {n}",
		setup: "Setup",
		sound: "Sound",
		rules: "Rules",
		quit: "Quit",
		road: "Road",
		settle: "Village",
		city: "Town",
		card: "Card",
		trade: "Trade",
		endTurn: "End turn",
		roll: "Roll",
		skipRoads: "Skip remaining roads",
		turn: "Turn",
		vp: "VP",
		hidden: "{n} hidden",
		cards: "{n} cards",
		longest: "Road",
		army: "Army",
		close: "Close",
		nothing: "Nothing",
		youGet: "You get",
		youGive: "You give",
		youWant: "You want",
		decline: "Decline",
		accept: "Accept",
		cantAfford: "You don't have those cards.",
		thinking: "{name} is thinking…",
		retract: "Take back",
		tradeTitle: "Trade",
		bank: "Bank",
		players: "Players",
		rate: "Your rate for {resource} is {rate}:1.",
		give: "Give",
		get: "Get",
		swap: "Trade {rate} {give} for {get}",
		to: "To",
		send: "Send offer",
		wantsTrade: "{name} wants to trade",
		tradeTo: "Offer to {name}",
		discardTitle: "{name}: discard {n}",
		discardHint: "A seven. Choose {n} cards to return.",
		discardBtn: "Discard {chosen}/{need}",
		stealTitle: "Steal a card",
		stealCards: "{n} cards",
		plentyTitle: "Year of plenty",
		monopolyTitle: "Monopoly",
		pickTwo: "Picked {n}/2. The same resource twice is fine.",
		pickOne: "Pick a resource.",
		winTitle: "{name} wins",
		winBody: "{name} reaches {n} points and takes the island.",
		backMenu: "Back to menu",
		crashedTitle: "The game stumbled",
		crashedBody: "The match is saved. You can continue.",
		continueBtn: "Continue",
		youPronoun: "You"
	},
	rules: {
		title: "How to play",
		p1: "Turns go around the table. Each turn: roll, trade and build, then end.",
		p2: "The dice pay villages (1) and towns (2) on that hex. A seven wakes the robber — anyone over seven cards discards half, then you move the robber.",
		p3: "Village: lumber, brick, wool, grain. Road: lumber and brick. Town: two grain and three ore. Card: wool, grain and ore.",
		p4: "Villages are 1 point, towns 2. Longest road (5+) and largest army (3 knights) are worth 2 each. First to 10 wins.",
		p5: "Villages cannot touch. Harbors improve bank trades to 3:1 or 2:1."
	},
	exit: {
		title: "Leave the island?",
		body: "The match is saved. You can continue from the menu.",
		cancel: "Stay",
		confirm: "To menu"
	},
	engine: {
		badPlayer: "Invalid player.",
		noCard: "You don't have that card.",
		longest: "{name} takes the longest road.",
		army: "{name} takes the largest army.",
		wins: "{name} wins the island with {n} points!",
		bankShort: "The bank is short of {resource}.",
		gains: "{name} receives {list}.",
		harvest: "{name} harvests {list} from the second village.",
		settled: "The island is settled. The first turn begins.",
		mustDiscard: "{name} must discard.",
		pickSeats: "Choose 2–4 players.",
		playerN: "Player {n}",
		setupLog: "Setup: a village and a road each, then back in reverse.",
		notRunning: "The game is over.",
		waitTrade: "Waiting on a trade reply.",
		noSettleNow: "You can't build a village now.",
		notYourTurn: "Not your turn.",
		placeRoadFirst: "Place a road first.",
		badVertex: "That crossing is taken.",
		noSettlements: "No villages left.",
		cantAffordSettle: "Can't afford a village.",
		foundsSettle: "{name} founds a village.",
		buildsSettle: "{name} builds a village.",
		noRoadNow: "You can't build a road now.",
		placeSettleFirst: "Place a village first.",
		noRoads: "No roads left.",
		badRoad: "That road is illegal.",
		cantAffordRoad: "Can't afford a road.",
		drawsRoad: "{name} builds a road.",
		freeRoad: "{name} builds a free road.",
		buildsRoad: "{name} builds a road.",
		noCityNow: "You can't build a town now.",
		badCity: "That town is illegal.",
		noCities: "No towns left.",
		cantAffordCity: "Can't afford a town.",
		buildsCity: "{name} builds a town.",
		alreadyRolled: "Already rolled.",
		rolled: "{name} rolls {d1} and {d2} — {total}.",
		noDiscard: "Nobody discards.",
		emptyQueue: "The queue is empty.",
		badDiscard: "Invalid discard.",
		mustDiscardN: "Discard {n} cards.",
		discarded: "{name} discards {n} cards.",
		noRobberNow: "The robber stays put.",
		badHex: "Invalid hex.",
		moveRobberElse: "Move the robber somewhere else.",
		cantSteal: "You can't steal from them.",
		pickVictim: "Choose who you steal from.",
		stole: "{name} steals {resource} from {other}.",
		movedRobber: "{name} moves the robber.",
		noBuyNow: "You can't buy a card now.",
		noDevLeft: "No cards left.",
		cantAffordDev: "Can't afford a card.",
		boughtDev: "{name} buys a card.",
		notNow: "Not now.",
		oneDev: "Only one card per turn.",
		playsKnight: "{name} plays a knight.",
		roadsNoBuild: "{name} plays road building but cannot build.",
		playsRoads: "{name} plays road building.",
		noFreeRoads: "No free roads.",
		plenty: "{name} takes {a} and {b} from the bank.",
		monopoly: "{name} monopolises {resource} ({n}).",
		differentRes: "Pick two different resources.",
		needRate: "You need {n} {resource}.",
		bankEmpty: "The bank is empty.",
		bankSwap: "{name} trades {n} {give} for {get}.",
		selfTrade: "You can't trade with yourself.",
		bothWays: "A trade must go both ways.",
		noThoseCards: "You don't have those cards.",
		offers: "{name} offers {other} a trade.",
		noOffer: "No offer.",
		declines: "{name} declines.",
		accepts: "{name} accepts the trade with {other}.",
		onlyOfferer: "Only the offerer can take it back.",
		retracts: "{name} takes the offer back.",
		dontEnd: "Don't end the turn yet.",
		endsTurn: "{name} ends the turn.",
		unknown: "Unknown action."
	}
};
function merge(base, patch) {
	if (patch === void 0) return base;
	if (typeof base !== "object" || base === null || Array.isArray(base)) return patch;
	const b = base;
	const p = patch;
	const out = {};
	for (const k of /* @__PURE__ */ new Set([...Object.keys(b), ...Object.keys(p)])) out[k] = merge(b[k], p[k]);
	return out;
}
var MESSAGES = {
	sv: merge(en, {
		ai: [
			"Sigrid",
			"Björn",
			"Astrid",
			"Einar"
		],
		start: {
			kicker: "Ön väntar",
			blurb: "Kolonisera ön, samla råvaror och nå tio segerpoäng.",
			players: "Spelare",
			add: "Lägg till",
			you: "Du",
			computer: "Dator",
			playerN: "Spelare {n}",
			startGame: "Starta spel",
			continueGame: "Fortsätt sparad ö",
			how: "Hur man spelar",
			nameAria: "Namn spelare {n}",
			removeAria: "Ta bort spelare",
			language: "Språk"
		},
		resource: {
			wood: "Skog",
			brick: "Lera",
			wool: "Ull",
			grain: "Säd",
			ore: "Malm"
		},
		terrain: {
			wood: "Skog",
			brick: "Backar",
			wool: "Betesmark",
			grain: "Åker",
			ore: "Berg",
			desert: "Öken"
		},
		dev: {
			knight: "Riddare",
			vp: "Segerpoäng",
			roads: "Vägbygge",
			plenty: "Överflöd",
			monopoly: "Monopol"
		},
		devHint: {
			knight: "Flytta rövaren och stjäl ett kort.",
			vp: "Dolt poäng. Räknas vid tio.",
			roads: "Bygg två vägar gratis.",
			plenty: "Ta två råvaror från banken.",
			monopoly: "Ta en råvara från alla."
		},
		phase: {
			setup: "Grundläggning",
			roll: "Tärning",
			discard: "Rövaren",
			robber: "Rövaren",
			main: "Handling",
			roadBuilding: "Vägbygge",
			gameOver: "Spelet slut"
		},
		hint: {
			waitFor: "Väntar på {name}…",
			wantsTrade: "{name} vill byta.",
			setupSettle: "{you}: placera en by på en korsning.",
			setupRoad: "{you}: dra en väg från byn.",
			roll: "{you}: kasta tärningen. En riddare kan spelas före.",
			discard: "{you} måste slänga {n} kort.",
			robber: "{you}: flytta rövaren till en annan hex.",
			freeRoad: "{you}: bygg {n} fri väg.",
			freeRoads: "{you}: bygg {n} fria vägar.",
			pickSettle: "Välj en korsning för en ny by.",
			pickCity: "Välj en by att bygga ut till stad.",
			pickRoad: "Välj en kant för en ny väg.",
			main: "{you}: bygg, handla eller avsluta turen.",
			win: "{name} vinner med {n} poäng."
		},
		ui: {
			round: "Runda {n}",
			setup: "Grundläggning",
			sound: "Ljud",
			rules: "Regler",
			quit: "Avsluta",
			road: "Väg",
			settle: "By",
			city: "Stad",
			card: "Kort",
			trade: "Handla",
			endTurn: "Avsluta tur",
			roll: "Kasta",
			skipRoads: "Hoppa över resterande vägar",
			turn: "Tur",
			vp: "SP",
			hidden: "{n} dolda",
			cards: "{n} kort",
			longest: "Väg",
			army: "Här",
			close: "Stäng",
			nothing: "Inget",
			youGet: "Du får",
			youGive: "Du ger",
			youWant: "Du vill ha",
			decline: "Avböj",
			accept: "Acceptera",
			cantAfford: "Du har inte de korten.",
			thinking: "{name} tänker…",
			retract: "Ta tillbaka",
			tradeTitle: "Handel",
			bank: "Banken",
			players: "Spelare",
			rate: "Din kurs för {resource} är {rate}:1.",
			give: "Ge",
			get: "Få",
			swap: "Byt {rate} {give} mot {get}",
			to: "Till",
			send: "Skicka erbjudande",
			wantsTrade: "{name} vill byta",
			tradeTo: "Byte till {name}",
			discardTitle: "{name}: släng {n}",
			discardHint: "En sjua. Välj {n} kort att lägga tillbaka.",
			discardBtn: "Släng {chosen}/{need}",
			stealTitle: "Stjäl ett kort",
			stealCards: "{n} kort",
			plentyTitle: "Överflöd",
			monopolyTitle: "Monopol",
			pickTwo: "Valda {n}/2. Samma råvara två gånger går bra.",
			pickOne: "Välj en råvara.",
			winTitle: "{name} vinner",
			winBody: "{name} når {n} poäng och tar hem ön.",
			backMenu: "Tillbaka till menyn",
			crashedTitle: "Spelet snubblade",
			crashedBody: "Partiet är sparat. Du kan fortsätta.",
			continueBtn: "Fortsätt",
			youPronoun: "Du"
		},
		rules: {
			title: "Hur man spelar",
			p1: "Turordning runt bordet. Varje tur: kasta, handla och bygg, avsluta.",
			p2: "Tärningen ger råvaror till byar (1) och städer (2). En sjua väcker rövaren — den med fler än sju kort slänger hälften, sedan flyttar du rövaren.",
			p3: "By: skog, lera, ull, säd. Väg: skog och lera. Stad: två säd och tre malm. Kort: ull, säd och malm.",
			p4: "Byar ger 1 poäng, städer 2. Längsta vägen (minst fem) och största hären (tre riddare) ger 2 var. Först till 10 vinner.",
			p5: "Byar får inte ligga intill varandra. Hamnar sänker bytet med banken till 3:1 eller 2:1."
		},
		exit: {
			title: "Lämna ön?",
			body: "Partiet sparas. Du kan fortsätta från menyn.",
			cancel: "Stanna",
			confirm: "Till menyn"
		},
		engine: {
			badPlayer: "Ogiltig spelare.",
			noCard: "Du har inte det kortet.",
			longest: "{name} tar längsta vägen.",
			army: "{name} tar största hären.",
			wins: "{name} vinner ön med {n} poäng!",
			bankShort: "Banken har för lite {resource}.",
			gains: "{name} får {list}.",
			harvest: "{name} skördar {list} från andra byn.",
			settled: "Ön är befolkad. Första turen börjar.",
			mustDiscard: "{name} måste slänga kort.",
			pickSeats: "Välj 2–4 spelare.",
			playerN: "Spelare {n}",
			setupLog: "Grundläggning: varsin by och väg, sedan tillbaka.",
			notRunning: "Spelet är slut.",
			waitTrade: "Inväntar svar på bytet.",
			noSettleNow: "Du kan inte bygga en by nu.",
			notYourTurn: "Inte din tur.",
			placeRoadFirst: "Placera en väg först.",
			badVertex: "Ogiltig korsning.",
			noSettlements: "Inga byar kvar.",
			cantAffordSettle: "Inte råd med en by.",
			foundsSettle: "{name} grundar en by.",
			buildsSettle: "{name} bygger en by.",
			noRoadNow: "Du kan inte bygga en väg nu.",
			placeSettleFirst: "Placera en by först.",
			noRoads: "Inga vägar kvar.",
			badRoad: "Ogiltig väg.",
			cantAffordRoad: "Inte råd med en väg.",
			drawsRoad: "{name} drar en väg.",
			freeRoad: "{name} bygger en fri väg.",
			buildsRoad: "{name} bygger en väg.",
			noCityNow: "Du kan inte bygga en stad nu.",
			badCity: "Ogiltig stad.",
			noCities: "Inga städer kvar.",
			cantAffordCity: "Inte råd med en stad.",
			buildsCity: "{name} bygger en stad.",
			alreadyRolled: "Tärningen är redan kastad.",
			rolled: "{name} slår {d1} och {d2} — {total}.",
			noDiscard: "Ingen behöver slänga.",
			emptyQueue: "Kön är tom.",
			badDiscard: "Ogiltigt släng.",
			mustDiscardN: "Släng {n} kort.",
			discarded: "{name} slänger {n} kort.",
			noRobberNow: "Rövaren ska inte flyttas nu.",
			badHex: "Ogiltig hex.",
			moveRobberElse: "Flytta rövaren någon annanstans.",
			cantSteal: "Du kan inte stjäla från den spelaren.",
			pickVictim: "Välj vem du stjäl från.",
			stole: "{name} stjäl {resource} från {other}.",
			movedRobber: "{name} flyttar rövaren.",
			noBuyNow: "Du kan inte köpa kort nu.",
			noDevLeft: "Inga kort kvar.",
			cantAffordDev: "Inte råd med ett kort.",
			boughtDev: "{name} köper ett kort.",
			notNow: "Inte nu.",
			oneDev: "Bara ett kort per tur.",
			playsKnight: "{name} spelar en riddare.",
			roadsNoBuild: "{name} spelar vägbygge men kan inte bygga.",
			playsRoads: "{name} spelar vägbygge.",
			noFreeRoads: "Inga fria vägar.",
			plenty: "{name} tar {a} och {b} från banken.",
			monopoly: "{name} monopoliserar {resource} ({n}).",
			differentRes: "Välj två olika råvaror.",
			needRate: "Du behöver {n} {resource}.",
			bankEmpty: "Banken är tom.",
			bankSwap: "{name} byter {n} {give} mot {get}.",
			selfTrade: "Du kan inte byta med dig själv.",
			bothWays: "Ett byte måste gå åt båda håll.",
			noThoseCards: "Du har inte de korten.",
			offers: "{name} erbjuder {other} ett byte.",
			noOffer: "Inget erbjudande.",
			declines: "{name} avböjer.",
			accepts: "{name} accepterar bytet med {other}.",
			onlyOfferer: "Bara den som erbjuder kan ta tillbaka.",
			retracts: "{name} tar tillbaka bytet.",
			dontEnd: "Avsluta inte turen än.",
			endsTurn: "{name} avslutar turen.",
			unknown: "Okänd handling."
		}
	}),
	en,
	de: merge(en, {
		ai: [
			"Lena",
			"Otto",
			"Greta",
			"Hans"
		],
		start: {
			kicker: "Die Insel wartet",
			blurb: "Besiedle die Insel, sammle Rohstoffe und erreiche zehn Siegpunkte.",
			players: "Spieler",
			add: "Hinzufügen",
			you: "Du",
			computer: "Computer",
			playerN: "Spieler {n}",
			startGame: "Spiel starten",
			continueGame: "Gespeicherte Insel fortsetzen",
			how: "Spielregeln",
			nameAria: "Name von Spieler {n}",
			removeAria: "Spieler entfernen",
			language: "Sprache"
		},
		resource: {
			wood: "Holz",
			brick: "Lehm",
			wool: "Wolle",
			grain: "Getreide",
			ore: "Erz"
		},
		dev: {
			knight: "Ritter",
			vp: "Siegpunkt",
			roads: "Straßenbau",
			plenty: "Erfindung",
			monopoly: "Monopol"
		},
		phase: {
			setup: "Gründung",
			roll: "Würfel",
			main: "Aktionen",
			roadBuilding: "Straßen",
			gameOver: "Spielende"
		},
		hint: {
			waitFor: "Warte auf {name}…",
			setupSettle: "{you}: setze eine Siedlung.",
			setupRoad: "{you}: baue eine Straße von der Siedlung.",
			roll: "{you}: würfle.",
			discard: "{you} muss {n} Karten abwerfen.",
			robber: "{you}: versetze den Räuber.",
			main: "{you}: baue, handle oder beende den Zug.",
			win: "{name} gewinnt mit {n} Punkten."
		},
		ui: {
			round: "Runde {n}",
			setup: "Gründung",
			sound: "Ton",
			rules: "Regeln",
			quit: "Beenden",
			road: "Straße",
			settle: "Siedlung",
			city: "Stadt",
			card: "Karte",
			trade: "Handeln",
			endTurn: "Zug beenden",
			roll: "Würfeln",
			skipRoads: "Restliche Straßen überspringen",
			turn: "Zug",
			vp: "SP",
			close: "Schließen",
			decline: "Ablehnen",
			accept: "Annehmen",
			retract: "Zurücknehmen",
			tradeTitle: "Handel",
			bank: "Bank",
			players: "Spieler",
			give: "Geben",
			get: "Nehmen",
			send: "Angebot senden",
			stealTitle: "Karte stehlen",
			plentyTitle: "Erfindung",
			monopolyTitle: "Monopol",
			pickOne: "Wähle einen Rohstoff.",
			winTitle: "{name} gewinnt",
			backMenu: "Zum Menü",
			crashedTitle: "Das Spiel ist gestolpert",
			crashedBody: "Die Partie ist gespeichert.",
			continueBtn: "Weiter",
			youPronoun: "Du",
			youGet: "Du erhältst",
			youGive: "Du gibst",
			youWant: "Du willst",
			thinking: "{name} überlegt…"
		},
		rules: {
			title: "Spielregeln",
			p1: "Die Züge gehen reihum. Würfeln, handeln, bauen, beenden.",
			p2: "Die Würfelsumme liefert Rohstoffe an Siedlungen (1) und Städte (2). Eine Sieben weckt den Räuber.",
			p3: "Siedlung: Holz, Lehm, Wolle, Getreide. Straße: Holz und Lehm. Stadt: zwei Getreide und drei Erz.",
			p4: "Siedlungen 1 Punkt, Städte 2. Längste Straße und größte Rittermacht je 2. Zuerst 10 gewinnt.",
			p5: "Siedlungen dürfen nicht benachbart sein. Häfen verbessern den Banktausch."
		},
		exit: {
			title: "Insel verlassen?",
			body: "Die Partie wird gespeichert.",
			cancel: "Bleiben",
			confirm: "Zum Menü"
		},
		engine: {
			notYourTurn: "Nicht dein Zug.",
			rolled: "{name} würfelt {d1} und {d2} — {total}.",
			wins: "{name} gewinnt die Insel mit {n} Punkten!",
			declines: "{name} lehnt ab.",
			endsTurn: "{name} beendet den Zug.",
			gains: "{name} erhält {list}.",
			settled: "Die Insel ist besiedelt. Der erste Zug beginnt."
		}
	}),
	es: merge(en, {
		ai: [
			"Clara",
			"Diego",
			"Elena",
			"Marco"
		],
		start: {
			kicker: "La isla espera",
			blurb: "Coloniza la isla, reúne recursos y llega a diez puntos.",
			players: "Jugadores",
			add: "Añadir",
			you: "Tú",
			computer: "Ordenador",
			playerN: "Jugador {n}",
			startGame: "Empezar",
			continueGame: "Continuar isla guardada",
			how: "Cómo se juega",
			nameAria: "Nombre del jugador {n}",
			removeAria: "Quitar jugador",
			language: "Idioma"
		},
		resource: {
			wood: "Madera",
			brick: "Ladrillo",
			wool: "Lana",
			grain: "Trigo",
			ore: "Mineral"
		},
		dev: {
			knight: "Caballero",
			vp: "Punto",
			roads: "Carreteras",
			plenty: "Invento",
			monopoly: "Monopolio"
		},
		phase: {
			setup: "Fundación",
			roll: "Dados",
			main: "Acciones",
			gameOver: "Fin"
		},
		hint: {
			waitFor: "Esperando a {name}…",
			setupSettle: "{you}: coloca un poblado.",
			setupRoad: "{you}: construye una carretera.",
			roll: "{you}: lanza los dados.",
			main: "{you}: construye, comercia o termina.",
			win: "{name} gana con {n} puntos."
		},
		ui: {
			round: "Ronda {n}",
			setup: "Fundación",
			sound: "Sonido",
			rules: "Reglas",
			quit: "Salir",
			road: "Camino",
			settle: "Poblado",
			city: "Ciudad",
			card: "Carta",
			trade: "Comerciar",
			endTurn: "Terminar",
			roll: "Tirar",
			turn: "Turno",
			vp: "PV",
			close: "Cerrar",
			decline: "Rechazar",
			accept: "Aceptar",
			retract: "Retirar",
			tradeTitle: "Comercio",
			bank: "Banco",
			send: "Enviar oferta",
			stealTitle: "Robar una carta",
			backMenu: "Al menú",
			crashedTitle: "El juego tropezó",
			crashedBody: "La partida está guardada.",
			continueBtn: "Continuar",
			youPronoun: "Tú",
			youGet: "Recibes",
			youGive: "Das",
			youWant: "Quieres",
			thinking: "{name} piensa…",
			winTitle: "{name} gana"
		},
		rules: {
			title: "Cómo se juega",
			p1: "Los turnos giran. Tira, comercia, construye y termina.",
			p2: "Los dados dan recursos a poblados (1) y ciudades (2). El siete despierta al ladrón.",
			p3: "Poblado: madera, ladrillo, lana, trigo. Camino: madera y ladrillo. Ciudad: dos trigo y tres mineral.",
			p4: "Poblados 1 punto, ciudades 2. La ruta más larga y el ejército más grande valen 2. Primero a 10 gana.",
			p5: "Los poblados no pueden tocarse. Los puertos mejoran el cambio con el banco."
		},
		exit: {
			title: "¿Dejar la isla?",
			body: "La partida se guarda.",
			cancel: "Quedarme",
			confirm: "Al menú"
		},
		engine: {
			notYourTurn: "No es tu turno.",
			rolled: "{name} saca {d1} y {d2} — {total}.",
			wins: "¡{name} gana la isla con {n} puntos!",
			declines: "{name} rechaza.",
			endsTurn: "{name} termina el turno.",
			gains: "{name} recibe {list}.",
			settled: "La isla está poblada. Empieza el primer turno."
		}
	}),
	fr: merge(en, {
		ai: [
			"Claire",
			"Louis",
			"Hélène",
			"Marc"
		],
		start: {
			kicker: "L'île attend",
			blurb: "Colonisez l'île, rassemblez des ressources et atteignez dix points.",
			players: "Joueurs",
			add: "Ajouter",
			you: "Vous",
			computer: "Ordinateur",
			playerN: "Joueur {n}",
			startGame: "Commencer",
			continueGame: "Reprendre l'île sauvegardée",
			how: "Comment jouer",
			nameAria: "Nom du joueur {n}",
			removeAria: "Retirer",
			language: "Langue"
		},
		resource: {
			wood: "Bois",
			brick: "Brique",
			wool: "Laine",
			grain: "Blé",
			ore: "Minerai"
		},
		dev: {
			knight: "Chevalier",
			vp: "Point",
			roads: "Routes",
			plenty: "Invention",
			monopoly: "Monopole"
		},
		phase: {
			setup: "Fondation",
			roll: "Dés",
			main: "Actions",
			gameOver: "Fin"
		},
		hint: {
			waitFor: "En attente de {name}…",
			setupSettle: "{you} : placez une colonie.",
			setupRoad: "{you} : construisez une route.",
			roll: "{you} : lancez les dés.",
			main: "{you} : construisez, échangez ou terminez.",
			win: "{name} gagne avec {n} points."
		},
		ui: {
			round: "Manche {n}",
			setup: "Fondation",
			sound: "Son",
			rules: "Règles",
			quit: "Quitter",
			road: "Route",
			settle: "Colonie",
			city: "Ville",
			card: "Carte",
			trade: "Échanger",
			endTurn: "Fin du tour",
			roll: "Lancer",
			turn: "Tour",
			vp: "PV",
			close: "Fermer",
			decline: "Refuser",
			accept: "Accepter",
			retract: "Retirer",
			tradeTitle: "Échange",
			bank: "Banque",
			send: "Envoyer",
			stealTitle: "Voler une carte",
			backMenu: "Au menu",
			crashedTitle: "Le jeu a trébuché",
			crashedBody: "La partie est sauvegardée.",
			continueBtn: "Continuer",
			youPronoun: "Vous",
			youGet: "Vous recevez",
			youGive: "Vous donnez",
			youWant: "Vous voulez",
			thinking: "{name} réfléchit…",
			winTitle: "{name} gagne"
		},
		rules: {
			title: "Comment jouer",
			p1: "Les tours font le tour de la table. Lancez, échangez, construisez, terminez.",
			p2: "Les dés paient les colonies (1) et les villes (2). Le sept réveille le voleur.",
			p3: "Colonie : bois, brique, laine, blé. Route : bois et brique. Ville : deux blé et trois minerai.",
			p4: "Colonies 1 point, villes 2. Plus longue route et plus grande armée valent 2. Premier à 10 gagne.",
			p5: "Les colonies ne peuvent pas se toucher. Les ports améliorent l'échange avec la banque."
		},
		exit: {
			title: "Quitter l'île ?",
			body: "La partie est sauvegardée.",
			cancel: "Rester",
			confirm: "Au menu"
		},
		engine: {
			notYourTurn: "Ce n'est pas votre tour.",
			rolled: "{name} fait {d1} et {d2} — {total}.",
			wins: "{name} gagne l'île avec {n} points !",
			declines: "{name} refuse.",
			endsTurn: "{name} termine le tour.",
			gains: "{name} reçoit {list}.",
			settled: "L'île est peuplée. Le premier tour commence."
		}
	})
};
var LOCALES = [
	"sv",
	"en",
	"de",
	"es",
	"fr"
];
var LOCALE_META = [
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
var KEY$1 = "havn-locale";
function isLocale(v) {
	return LOCALES.includes(v);
}
function detectLocale() {
	if (typeof navigator === "undefined") return "en";
	const list = navigator.languages?.length ? navigator.languages : [navigator.language];
	for (const raw of list) {
		const code = raw.toLowerCase().split("-")[0];
		if (isLocale(code)) return code;
	}
	return "en";
}
function loadLocale() {
	try {
		const raw = localStorage.getItem(KEY$1);
		if (raw && isLocale(raw)) return raw;
	} catch {}
	return null;
}
function lookup(locale, path) {
	const parts = path.split(".");
	let cur = MESSAGES[locale];
	for (const p of parts) {
		if (!cur || typeof cur !== "object") return void 0;
		cur = cur[p];
	}
	return typeof cur === "string" ? cur : void 0;
}
function fill(template, vars) {
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] != null ? String(vars[k]) : `{${k}}`);
}
var useLocaleStore = create((set) => ({
	locale: "en",
	ready: false,
	setLocale: (locale) => {
		try {
			localStorage.setItem(KEY$1, locale);
		} catch {}
		if (typeof document !== "undefined") document.documentElement.lang = locale;
		set({
			locale,
			ready: true
		});
	},
	hydrateLocale: () => {
		const locale = loadLocale() ?? detectLocale();
		if (typeof document !== "undefined") document.documentElement.lang = locale;
		set({
			locale,
			ready: true
		});
	}
}));
function t(path, vars) {
	const locale = useLocaleStore.getState().locale;
	return fill(lookup(locale, path) ?? lookup("en", path) ?? path, vars);
}
function aiNames(locale) {
	return MESSAGES[locale ?? useLocaleStore.getState().locale].ai;
}
function allDefaultYou() {
	return new Set(LOCALES.map((l) => MESSAGES[l].start.you));
}
function allDefaultAi() {
	return new Set(LOCALES.flatMap((l) => MESSAGES[l].ai));
}
function useT() {
	const locale = useLocaleStore((s) => s.locale);
	return (0, import_react.useCallback)((path, vars) => fill(lookup(locale, path) ?? lookup("en", path) ?? path, vars), [locale]);
}
function useLocale() {
	return useLocaleStore((s) => s.locale);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LanguageSelect() {
	const locale = useLocaleStore((s) => s.locale);
	const setLocale = useLocaleStore((s) => s.setLocale);
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1",
		role: "group",
		"aria-label": t("start.language"),
		children: LOCALE_META.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": locale === l.id,
			"aria-label": l.native,
			onClick: () => setLocale(l.id),
			className: cn("h-9 min-w-9 rounded-md px-2 text-xs font-semibold uppercase tracking-wide", locale === l.id ? "bg-accent text-accent-fg" : "border border-border bg-surface-2 text-muted"),
			children: l.id
		}, l.id))
	});
}
var RESOURCES = [
	"wood",
	"brick",
	"wool",
	"grain",
	"ore"
];
var GameError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "GameError";
	}
};
var PLAYER_COLORS = [
	{
		fill: "#c4493a",
		ink: "#2a120e",
		name: "crimson"
	},
	{
		fill: "#3d6ea8",
		ink: "#0e1824",
		name: "azure"
	},
	{
		fill: "#e4d2a4",
		ink: "#2a2416",
		name: "cream"
	},
	{
		fill: "#2f7a6d",
		ink: "#071614",
		name: "teal"
	}
];
var COSTS = {
	road: {
		wood: 1,
		brick: 1,
		wool: 0,
		grain: 0,
		ore: 0
	},
	settlement: {
		wood: 1,
		brick: 1,
		wool: 1,
		grain: 1,
		ore: 0
	},
	city: {
		wood: 0,
		brick: 0,
		wool: 0,
		grain: 2,
		ore: 3
	},
	dev: {
		wood: 0,
		brick: 0,
		wool: 1,
		grain: 1,
		ore: 1
	}
};
function emptyBank() {
	return {
		wood: 0,
		brick: 0,
		wool: 0,
		grain: 0,
		ore: 0
	};
}
function fullBank() {
	return {
		wood: 19,
		brick: 19,
		wool: 19,
		grain: 19,
		ore: 19
	};
}
function resourceCount(bank) {
	return RESOURCES.reduce((n, r) => n + (bank[r] ?? 0), 0);
}
function canAfford(have, cost) {
	return RESOURCES.every((r) => have[r] >= cost[r]);
}
function pay(have, bank, cost) {
	for (const r of RESOURCES) {
		have[r] -= cost[r];
		bank[r] += cost[r];
	}
}
function costOf(kind) {
	return COSTS[kind];
}
function hexById(state, id) {
	return state.board.hexes.find((h) => h.id === id) ?? null;
}
function vertexById(state, id) {
	return state.board.vertices.find((v) => v.id === id) ?? null;
}
function edgeById(state, id) {
	return state.board.edges.find((e) => e.id === id) ?? null;
}
function incidentEdges(state, vertexId) {
	return state.board.edges.filter((e) => e.a === vertexId || e.b === vertexId);
}
function neighborVertices(state, vertexId) {
	const ids = /* @__PURE__ */ new Set();
	for (const e of incidentEdges(state, vertexId)) ids.add(e.a === vertexId ? e.b : e.a);
	return [...ids];
}
function distanceOk(state, vertexId) {
	const v = vertexById(state, vertexId);
	if (!v || v.building) return false;
	return neighborVertices(state, vertexId).every((id) => !vertexById(state, id)?.building);
}
function touchesOwnRoad(state, vertexId, player) {
	return incidentEdges(state, vertexId).some((e) => e.road?.player === player);
}
function legalSettlementIds(state, player) {
	return state.board.vertices.filter((v) => {
		if (!distanceOk(state, v.id)) return false;
		if (state.phase === "setup") return true;
		return touchesOwnRoad(state, v.id, player);
	}).map((v) => v.id);
}
function otherEnd(e, id) {
	return e.a === id ? e.b : e.a;
}
function roadConnects(state, edgeId, player) {
	const e = edgeById(state, edgeId);
	if (!e || e.road) return false;
	for (const end of [e.a, e.b]) {
		const v = vertexById(state, end);
		if (!v) continue;
		if (v.building && v.building.player !== player) continue;
		if (v.building?.player === player) return true;
		if (incidentEdges(state, end).some((o) => o.id !== edgeId && o.road?.player === player)) return true;
	}
	return false;
}
function legalRoadIds(state, player) {
	return state.board.edges.filter((e) => {
		if (e.road) return false;
		if (state.phase === "setup" && state.lastSettlementId) return e.a === state.lastSettlementId || e.b === state.lastSettlementId;
		return roadConnects(state, e.id, player);
	}).map((e) => e.id);
}
function legalCityIds(state, player) {
	return state.board.vertices.filter((v) => v.building?.player === player && v.building.type === "settlement").map((v) => v.id);
}
function tradeRate(state, player, resource) {
	let rate = 4;
	for (const v of state.board.vertices) {
		if (v.building?.player !== player || !v.port) continue;
		if (v.port.resource === resource && v.port.rate === 2) return 2;
		if (v.port.resource === "any" && v.port.rate === 3) rate = 3;
	}
	return rate;
}
function adjacentPlayersToHex(state, hexId, except) {
	const ids = /* @__PURE__ */ new Set();
	for (const v of state.board.vertices) {
		if (!v.hexIds.includes(hexId) || !v.building) continue;
		if (v.building.player !== except) ids.add(v.building.player);
	}
	return [...ids];
}
function getActor(state) {
	if (state.phase === "discard" && state.discardQueue.length) return state.discardQueue[0];
	if (state.tradeOffer && !state.players[state.tradeOffer.to]?.isAi) return state.tradeOffer.to;
	return state.currentPlayer;
}
function publicVp(state, id) {
	const p = state.players[id];
	if (!p) return 0;
	let n = 0;
	for (const v of state.board.vertices) {
		if (v.building?.player !== id) continue;
		n += v.building.type === "city" ? 2 : 1;
	}
	if (p.hasLongestRoad) n += 2;
	if (p.hasLargestArmy) n += 2;
	return n;
}
function totalVp(state, id) {
	return publicVp(state, id) + (state.players[id]?.vpCards ?? 0);
}
function setupOrder(n) {
	const fwd = Array.from({ length: n }, (_, i) => i);
	return [...fwd, ...fwd.slice().reverse()];
}
function randomResourceFrom(bank, roll) {
	const bag = [];
	for (const r of RESOURCES) for (let i = 0; i < bank[r]; i++) bag.push(r);
	if (!bag.length) return null;
	return bag[roll(bag.length)] ?? null;
}
function longestRoadLength(state, player) {
	const roads = state.board.edges.filter((e) => e.road?.player === player);
	if (!roads.length) return 0;
	const byV = /* @__PURE__ */ new Map();
	for (const e of roads) {
		byV.set(e.a, [...byV.get(e.a) ?? [], e.id]);
		byV.set(e.b, [...byV.get(e.b) ?? [], e.id]);
	}
	const blocked = (vertexId) => {
		const b = vertexById(state, vertexId)?.building;
		return Boolean(b && b.player !== player);
	};
	let best = 0;
	function walk(vertex, used) {
		let m = 0;
		if (blocked(vertex)) return 0;
		for (const eid of byV.get(vertex) ?? []) {
			if (used.has(eid)) continue;
			const e = edgeById(state, eid);
			used.add(eid);
			m = Math.max(m, 1 + walk(otherEnd(e, vertex), used));
			used.delete(eid);
		}
		return m;
	}
	for (const e of roads) best = Math.max(best, walk(e.a, /* @__PURE__ */ new Set()), walk(e.b, /* @__PURE__ */ new Set()));
	return best;
}
function pipValue(n) {
	if (!n) return 0;
	return [
		0,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		5,
		4,
		3,
		2,
		1
	][n] ?? 0;
}
function rngOf(state) {
	let a = state.seed + state.revision * 17 >>> 0;
	return () => {
		a = Math.imul(a, 1664525) + 1013904223 >>> 0;
		return a / 4294967296;
	};
}
function scoreVertex(state, id) {
	const v = state.board.vertices.find((x) => x.id === id);
	if (!v) return 0;
	let s = 0;
	for (const hid of v.hexIds) {
		const h = state.board.hexes.find((x) => x.id === hid);
		if (!h || h.id === state.robberHexId) continue;
		s += pipValue(h.number) * (h.terrain === "ore" || h.terrain === "grain" ? 1.15 : 1);
		if (v.port && (v.port.resource === "any" || v.port.resource === h.terrain)) s += 1.2;
	}
	return s;
}
function bestOf(ids, state, rand) {
	if (!ids.length) return null;
	const scored = ids.map((id) => ({
		id,
		s: scoreVertex(state, id) + rand() * .15
	}));
	scored.sort((a, b) => b.s - a.s);
	return scored[0].id;
}
function dump(bank, need) {
	const out = emptyBank();
	const order = RESOURCES.slice().sort((a, b) => bank[b] - bank[a]);
	let left = need;
	for (const r of order) {
		const n = Math.min(bank[r], left);
		out[r] = n;
		left -= n;
		if (left <= 0) break;
	}
	return out;
}
function chooseAiAction(state) {
	const rand = rngOf(state);
	if (state.tradeOffer) {
		const offer = state.tradeOffer;
		const to = state.players[offer.to];
		if (!to?.isAi) return null;
		if (!canAfford(to.resources, offer.want) || !canAfford(state.players[offer.from].resources, offer.give)) return {
			type: "respondTrade",
			accept: false
		};
		const gain = RESOURCES.some((r) => offer.give[r] > 0 && to.resources[r] < 2);
		const pain = RESOURCES.some((r) => offer.want[r] > 0 && to.resources[r] - offer.want[r] <= 0 && offer.give[r] === 0);
		return {
			type: "respondTrade",
			accept: gain && !pain && rand() > .25
		};
	}
	const id = state.phase === "discard" ? state.discardQueue[0] : state.currentPlayer;
	const p = state.players[id];
	if (!p?.isAi) return null;
	if (state.phase === "discard") return {
		type: "discard",
		resources: dump(p.resources, Math.floor(resourceCount(p.resources) / 2))
	};
	if (state.phase === "setup") {
		if (state.setupNeed === "settlement") {
			const v = bestOf(legalSettlementIds(state, p.id), state, rand);
			return v ? {
				type: "placeSettlement",
				vertexId: v
			} : null;
		}
		const roads = legalRoadIds(state, p.id);
		return roads[0] ? {
			type: "placeRoad",
			edgeId: roads[Math.floor(rand() * roads.length)]
		} : null;
	}
	if (state.phase === "roll") {
		if (p.hand.includes("knight") && !state.playedDevThisTurn && rand() > .55) return { type: "playKnight" };
		return { type: "roll" };
	}
	if (state.phase === "robber") {
		let best = null;
		for (const h of state.board.hexes) {
			if (h.id === state.robberHexId) continue;
			let s = 0;
			for (const v of state.board.vertices) {
				if (!v.hexIds.includes(h.id) || !v.building || v.building.player === p.id) continue;
				s += pipValue(h.number) * (v.building.type === "city" ? 2 : 1);
			}
			s += rand();
			if (!best || s > best.s) best = {
				id: h.id,
				s
			};
		}
		if (!best) return null;
		const victims = state.board.vertices.filter((v) => v.hexIds.includes(best.id) && v.building && v.building.player !== p.id).map((v) => v.building.player);
		const uniq = [...new Set(victims)];
		uniq.sort((a, b) => resourceCount(state.players[b].resources) - resourceCount(state.players[a].resources));
		return {
			type: "moveRobber",
			hexId: best.id,
			stealFrom: uniq[0] ?? null
		};
	}
	if (state.phase === "roadBuilding") {
		const roads = legalRoadIds(state, p.id);
		if (!roads.length || p.roadsLeft <= 0) return { type: "skipFreeRoad" };
		return {
			type: "placeRoad",
			edgeId: roads[0]
		};
	}
	if (state.phase !== "main") return null;
	if (p.hand.includes("knight") && !state.playedDevThisTurn && rand() > .7) return { type: "playKnight" };
	const cities = legalCityIds(state, p.id);
	if (cities.length && canAfford(p.resources, costOf("city"))) return {
		type: "placeCity",
		vertexId: bestOf(cities, state, rand)
	};
	const settles = legalSettlementIds(state, p.id);
	if (p.settlementsLeft > 0 && settles.length && canAfford(p.resources, costOf("settlement"))) return {
		type: "placeSettlement",
		vertexId: bestOf(settles, state, rand)
	};
	const roads = legalRoadIds(state, p.id);
	if (p.roadsLeft > 2 && roads.length && canAfford(p.resources, costOf("road")) && rand() > .35) return {
		type: "placeRoad",
		edgeId: roads[Math.floor(rand() * Math.min(3, roads.length))]
	};
	if (state.deck.length && canAfford(p.resources, costOf("dev")) && p.hand.length + p.newHand.length < 4 && rand() > .4) return { type: "buyDev" };
	const rich = RESOURCES.filter((r) => p.resources[r] >= tradeRate(state, p.id, r));
	const poor = RESOURCES.filter((r) => p.resources[r] === 0);
	if (rich.length && poor.length && rand() > .5) return {
		type: "bankTrade",
		give: rich[0],
		get: poor[0]
	};
	return { type: "endTurn" };
}
var ctx = null;
function ac() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function unlockAudio() {
	try {
		ac();
	} catch {}
}
function tone(freq, dur, type = "sine", gain = .05) {
	try {
		const c = ac();
		const o = c.createOscillator();
		const g = c.createGain();
		o.type = type;
		o.frequency.value = freq;
		g.gain.setValueAtTime(gain, c.currentTime);
		g.gain.exponentialRampToValueAtTime(.001, c.currentTime + dur);
		o.connect(g);
		g.connect(c.destination);
		o.start();
		o.stop(c.currentTime + dur);
	} catch {}
}
function playDice() {
	tone(220, .08, "triangle");
	setTimeout(() => tone(330, .1, "triangle"), 90);
}
function playPlace() {
	tone(520, .07, "square", .03);
}
function playSteal() {
	tone(140, .18, "sawtooth", .04);
}
function playWin() {
	[
		523,
		659,
		784
	].forEach((f, i) => setTimeout(() => tone(f, .18, "triangle", .06), i * 120));
}
function hexToPixel(q, r, size = 48) {
	return {
		x: size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r),
		y: size * (1.5 * r)
	};
}
function hexCorners(q, r, size = 48) {
	const c = hexToPixel(q, r, size);
	return [
		0,
		1,
		2,
		3,
		4,
		5
	].map((i) => {
		const a = (60 * i - 30) * Math.PI / 180;
		return {
			x: c.x + size * Math.cos(a),
			y: c.y + size * Math.sin(a)
		};
	});
}
function hexPolygon(q, r, size = 48) {
	return hexCorners(q, r, size).map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}
function pointKey(x, y) {
	return `${x.toFixed(1)},${y.toFixed(1)}`;
}
function axialRing() {
	const out = [];
	for (let q = -2; q <= 2; q++) {
		const r1 = Math.max(-2, -q - 2);
		const r2 = Math.min(2, -q + 2);
		for (let r = r1; r <= r2; r++) out.push([q, r]);
	}
	return out;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return function rand() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pickInt(rng, min, max) {
	return min + Math.floor(rng() * (max - min + 1));
}
function shuffle(list, rng) {
	const a = list.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
var TERRAIN_BAG = [
	...Array(4).fill("wood"),
	...Array(4).fill("wool"),
	...Array(4).fill("grain"),
	...Array(3).fill("brick"),
	...Array(3).fill("ore"),
	"desert"
];
var NUMBER_BAG = [
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
var PORTS = [
	{
		rate: 2,
		resource: "wood"
	},
	{
		rate: 2,
		resource: "brick"
	},
	{
		rate: 2,
		resource: "wool"
	},
	{
		rate: 2,
		resource: "grain"
	},
	{
		rate: 2,
		resource: "ore"
	},
	{
		rate: 3,
		resource: "any"
	},
	{
		rate: 3,
		resource: "any"
	},
	{
		rate: 3,
		resource: "any"
	},
	{
		rate: 3,
		resource: "any"
	}
];
function neighbors(q, r) {
	return [
		[q + 1, r],
		[q - 1, r],
		[q, r + 1],
		[q, r - 1],
		[q + 1, r - 1],
		[q - 1, r + 1]
	];
}
function redAdjacent(hexes) {
	const byId = new Map(hexes.map((h) => [`${h.q},${h.r}`, h]));
	for (const h of hexes) {
		if (h.number !== 6 && h.number !== 8) continue;
		for (const [nq, nr] of neighbors(h.q, h.r)) {
			const o = byId.get(`${nq},${nr}`);
			if (o && (o.number === 6 || o.number === 8)) return true;
		}
	}
	return false;
}
function isResource(t) {
	return t !== "desert";
}
function generateBoard(rng) {
	const coords = axialRing();
	let terrains = shuffle(TERRAIN_BAG, rng);
	let numbers = shuffle(NUMBER_BAG, rng);
	let hexes = [];
	for (let attempt = 0; attempt < 40; attempt++) {
		terrains = shuffle(TERRAIN_BAG, rng);
		numbers = shuffle(NUMBER_BAG, rng);
		let ni = 0;
		hexes = coords.map(([q, r], i) => {
			const terrain = terrains[i];
			const number = terrain === "desert" ? null : numbers[ni++];
			return {
				id: `h${q},${r}`,
				q,
				r,
				terrain,
				number
			};
		});
		if (!redAdjacent(hexes)) break;
	}
	const vmap = /* @__PURE__ */ new Map();
	const emap = /* @__PURE__ */ new Map();
	const edgeHex = /* @__PURE__ */ new Map();
	for (const h of hexes) {
		const ids = hexCorners(h.q, h.r).map((p) => {
			const id = pointKey(p.x, p.y);
			let v = vmap.get(id);
			if (!v) {
				v = {
					id,
					x: p.x,
					y: p.y,
					hexIds: [],
					building: null,
					port: null
				};
				vmap.set(id, v);
			}
			if (!v.hexIds.includes(h.id)) v.hexIds.push(h.id);
			return id;
		});
		for (let i = 0; i < 6; i++) {
			const a = ids[i];
			const b = ids[(i + 1) % 6];
			const [lo, hi] = a < b ? [a, b] : [b, a];
			const id = `${lo}|${hi}`;
			if (!emap.has(id)) emap.set(id, {
				id,
				a: lo,
				b: hi,
				road: null
			});
			edgeHex.set(id, (edgeHex.get(id) ?? 0) + 1);
		}
	}
	const coastal = [...emap.values()].filter((e) => (edgeHex.get(e.id) ?? 0) === 1);
	coastal.sort((a, b) => {
		const va = vmap.get(a.a);
		const vb = vmap.get(b.a);
		return Math.atan2(va.y, va.x) - Math.atan2(vb.y, vb.x);
	});
	const ports = shuffle(PORTS, rng);
	const step = Math.max(1, Math.floor(coastal.length / ports.length));
	const used = /* @__PURE__ */ new Set();
	let pi = 0;
	for (let i = 0; i < coastal.length && pi < ports.length; i += step) {
		const e = coastal[i];
		if (used.has(e.a) || used.has(e.b)) continue;
		const port = ports[pi++];
		vmap.get(e.a).port = port;
		vmap.get(e.b).port = port;
		used.add(e.a);
		used.add(e.b);
	}
	const desert = hexes.find((h) => h.terrain === "desert") ?? hexes[0];
	return {
		board: {
			hexes,
			vertices: [...vmap.values()],
			edges: [...emap.values()]
		},
		robberHexId: desert.id
	};
}
var WIN = 10;
function log(state, text) {
	state.logSeq += 1;
	state.log.push({
		id: state.logSeq,
		text
	});
	if (state.log.length > 80) state.log.splice(0, state.log.length - 80);
}
function assert(cond, message) {
	if (!cond) throw new GameError(message);
}
function player(state, id) {
	const p = state.players[id];
	assert(p, t("engine.badPlayer"));
	return p;
}
function takeFromHand(p, kind) {
	const i = p.hand.indexOf(kind);
	if (i >= 0) {
		p.hand.splice(i, 1);
		return;
	}
	throw new GameError(t("engine.noCard"));
}
function updateLongest(state) {
	const lengths = state.players.map((p) => longestRoadLength(state, p.id));
	const best = Math.max(0, ...lengths);
	const current = state.players.find((p) => p.hasLongestRoad) ?? null;
	if (best < 5) {
		for (const p of state.players) p.hasLongestRoad = false;
		return;
	}
	const leaders = state.players.filter((p) => lengths[p.id] === best);
	if (current && lengths[current.id] === best) return;
	if (leaders.length === 1) {
		for (const p of state.players) p.hasLongestRoad = p.id === leaders[0].id;
		log(state, t("engine.longest", { name: leaders[0].name }));
	} else for (const p of state.players) p.hasLongestRoad = false;
}
function updateArmy(state) {
	const current = state.players.find((p) => p.hasLargestArmy) ?? null;
	const best = Math.max(0, ...state.players.map((p) => p.knightsPlayed));
	if (best < 3) return;
	const leaders = state.players.filter((p) => p.knightsPlayed === best);
	if (current && current.knightsPlayed === best) return;
	if (leaders.length === 1) {
		for (const p of state.players) p.hasLargestArmy = p.id === leaders[0].id;
		log(state, t("engine.army", { name: leaders[0].name }));
	}
}
function checkWin(state, id) {
	if (totalVp(state, id) >= WIN) {
		state.phase = "gameOver";
		state.winnerId = id;
		state.tradeOffer = null;
		log(state, t("engine.wins", {
			name: player(state, id).name,
			n: totalVp(state, id)
		}));
	}
}
function listResources(res) {
	return RESOURCES.filter((r) => res[r] > 0).map((r) => `${res[r]} ${t(`resource.${r}`).toLowerCase()}`).join(", ");
}
function giveIncome(state, total) {
	const request = state.players.map(() => emptyBank());
	for (const h of state.board.hexes) {
		if (h.number !== total || h.id === state.robberHexId || !isResource(h.terrain)) continue;
		for (const v of state.board.vertices) {
			if (!v.hexIds.includes(h.id) || !v.building) continue;
			request[v.building.player][h.terrain] += v.building.type === "city" ? 2 : 1;
		}
	}
	for (const r of RESOURCES) {
		const need = request.reduce((n, bank) => n + bank[r], 0);
		if (need === 0) continue;
		if (need > state.bank[r]) {
			log(state, t("engine.bankShort", { resource: t(`resource.${r}`).toLowerCase() }));
			continue;
		}
		for (const p of state.players) {
			const n = request[p.id][r];
			if (n <= 0) continue;
			p.resources[r] += n;
			state.bank[r] -= n;
		}
	}
	for (const p of state.players) if (resourceCount(request[p.id]) > 0) log(state, t("engine.gains", {
		name: p.name,
		list: listResources(request[p.id])
	}));
}
function setupIncome(state, vertexId, pid) {
	const v = vertexById(state, vertexId);
	if (!v) return;
	const got = emptyBank();
	for (const hid of v.hexIds) {
		const h = hexById(state, hid);
		if (!h || !isResource(h.terrain) || state.bank[h.terrain] <= 0) continue;
		state.players[pid].resources[h.terrain] += 1;
		state.bank[h.terrain] -= 1;
		got[h.terrain] += 1;
	}
	if (resourceCount(got) > 0) log(state, t("engine.harvest", {
		name: player(state, pid).name,
		list: listResources(got)
	}));
}
function beginTurn(state, id) {
	state.currentPlayer = id;
	state.phase = "roll";
	state.rolledThisTurn = false;
	state.playedDevThisTurn = false;
	state.pendingFreeRoads = 0;
	state.tradeOffer = null;
	state.offeredTradeThisTurn = false;
	state.lastSettlementId = null;
}
function afterSetupRoad(state) {
	const order = setupOrder(state.players.length);
	state.setupIndex += 1;
	state.setupNeed = "settlement";
	state.lastSettlementId = null;
	if (state.setupIndex >= order.length) {
		log(state, t("engine.settled"));
		state.turnNumber = 1;
		beginTurn(state, 0);
		return;
	}
	state.currentPlayer = order[state.setupIndex];
}
function startDiscardOrRobber(state) {
	const n = state.players.length;
	const queue = [];
	for (let i = 0; i < n; i++) {
		const id = (state.currentPlayer + i) % n;
		if (resourceCount(state.players[id].resources) > 7) queue.push(id);
	}
	if (queue.length > 0) {
		state.phase = "discard";
		state.discardQueue = queue;
		log(state, t("engine.mustDiscard", { name: player(state, queue[0]).name }));
	} else state.phase = "robber";
}
function makeDeck(rng) {
	return shuffle([
		...Array(14).fill("knight"),
		...Array(5).fill("vp"),
		...Array(2).fill("roads"),
		...Array(2).fill("plenty"),
		...Array(2).fill("monopoly")
	], rng);
}
function createGame(config) {
	const seed = config.seed ?? Math.floor(Math.random() * 1e9);
	const rng = mulberry32(seed);
	const { board, robberHexId } = generateBoard(rng);
	const seats = config.seats.slice(0, 4);
	assert(seats.length >= 2 && seats.length <= 4, t("engine.pickSeats"));
	const state = {
		revision: 1,
		phase: "setup",
		board,
		players: seats.map((seat, id) => ({
			id,
			name: seat.name.trim() || t("engine.playerN", { n: id + 1 }),
			colorIndex: seat.colorIndex % 4,
			isAi: seat.isAi,
			resources: emptyBank(),
			hand: [],
			newHand: [],
			vpCards: 0,
			settlementsLeft: 5,
			citiesLeft: 4,
			roadsLeft: 15,
			knightsPlayed: 0,
			hasLongestRoad: false,
			hasLargestArmy: false
		})),
		currentPlayer: 0,
		robberHexId,
		bank: fullBank(),
		deck: makeDeck(rng),
		discardQueue: [],
		setupIndex: 0,
		setupNeed: "settlement",
		lastSettlementId: null,
		rolledThisTurn: false,
		playedDevThisTurn: false,
		pendingFreeRoads: 0,
		tradeOffer: null,
		offeredTradeThisTurn: false,
		lastRoll: null,
		winnerId: null,
		turnNumber: 0,
		log: [],
		logSeq: 0,
		seed
	};
	log(state, t("engine.setupLog"));
	return state;
}
function handle(state, action) {
	if (state.phase === "gameOver") throw new GameError(t("engine.notRunning"));
	if (state.tradeOffer && action.type !== "respondTrade" && action.type !== "cancelTrade") throw new GameError(t("engine.waitTrade"));
	const actor = getActor(state);
	switch (action.type) {
		case "placeSettlement": {
			assert(state.phase === "setup" || state.phase === "main", t("engine.noSettleNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(state.phase !== "setup" || state.setupNeed === "settlement", t("engine.placeRoadFirst"));
			assert(legalSettlementIds(state, p.id).includes(action.vertexId), t("engine.badVertex"));
			const v = vertexById(state, action.vertexId);
			assert(p.settlementsLeft > 0, t("engine.noSettlements"));
			if (state.phase === "main") {
				assert(canAfford(p.resources, costOf("settlement")), t("engine.cantAffordSettle"));
				pay(p.resources, state.bank, costOf("settlement"));
			}
			v.building = {
				player: p.id,
				type: "settlement"
			};
			p.settlementsLeft -= 1;
			if (state.phase === "setup") {
				state.lastSettlementId = v.id;
				state.setupNeed = "road";
				if (state.setupIndex >= state.players.length) setupIncome(state, v.id, p.id);
				log(state, t("engine.foundsSettle", { name: p.name }));
			} else {
				log(state, t("engine.buildsSettle", { name: p.name }));
				updateLongest(state);
				checkWin(state, p.id);
			}
			return;
		}
		case "placeRoad": {
			const free = state.phase === "setup" || state.phase === "roadBuilding";
			assert(state.phase === "setup" || state.phase === "main" || state.phase === "roadBuilding", t("engine.noRoadNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			if (state.phase === "setup") assert(state.setupNeed === "road", t("engine.placeSettleFirst"));
			assert(p.roadsLeft > 0, t("engine.noRoads"));
			assert(legalRoadIds(state, p.id).includes(action.edgeId), t("engine.badRoad"));
			if (!free) {
				assert(canAfford(p.resources, costOf("road")), t("engine.cantAffordRoad"));
				pay(p.resources, state.bank, costOf("road"));
			}
			const e = state.board.edges.find((x) => x.id === action.edgeId);
			e.road = { player: p.id };
			p.roadsLeft -= 1;
			if (state.phase === "setup") {
				log(state, t("engine.drawsRoad", { name: p.name }));
				afterSetupRoad(state);
			} else if (state.phase === "roadBuilding") {
				state.pendingFreeRoads -= 1;
				log(state, t("engine.freeRoad", { name: p.name }));
				updateLongest(state);
				checkWin(state, p.id);
				if (state.pendingFreeRoads <= 0 || legalRoadIds(state, p.id).length === 0) {
					state.pendingFreeRoads = 0;
					state.phase = "main";
				}
			} else {
				log(state, t("engine.buildsRoad", { name: p.name }));
				updateLongest(state);
				checkWin(state, p.id);
			}
			return;
		}
		case "placeCity": {
			assert(state.phase === "main", t("engine.noCityNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(legalCityIds(state, p.id).includes(action.vertexId), t("engine.badCity"));
			assert(p.citiesLeft > 0, t("engine.noCities"));
			assert(canAfford(p.resources, costOf("city")), t("engine.cantAffordCity"));
			pay(p.resources, state.bank, costOf("city"));
			const v = vertexById(state, action.vertexId);
			v.building = {
				player: p.id,
				type: "city"
			};
			p.citiesLeft -= 1;
			p.settlementsLeft += 1;
			log(state, t("engine.buildsCity", { name: p.name }));
			checkWin(state, p.id);
			return;
		}
		case "roll": {
			assert(state.phase === "roll", t("engine.alreadyRolled"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			const rng = mulberry32(state.seed + state.revision * 9973 + state.turnNumber * 13);
			const d1 = pickInt(rng, 1, 6);
			const d2 = pickInt(rng, 1, 6);
			const total = d1 + d2;
			state.lastRoll = {
				d1,
				d2,
				total,
				revision: state.revision
			};
			state.rolledThisTurn = true;
			log(state, t("engine.rolled", {
				name: p.name,
				d1,
				d2,
				total
			}));
			if (total === 7) startDiscardOrRobber(state);
			else {
				giveIncome(state, total);
				state.phase = "main";
			}
			return;
		}
		case "discard": {
			assert(state.phase === "discard", t("engine.noDiscard"));
			const pid = state.discardQueue[0];
			assert(pid !== void 0, t("engine.emptyQueue"));
			const p = player(state, pid);
			const need = Math.floor(resourceCount(p.resources) / 2);
			let dropped = 0;
			for (const r of RESOURCES) {
				const n = action.resources[r] ?? 0;
				assert(n >= 0 && n <= p.resources[r], t("engine.badDiscard"));
				dropped += n;
			}
			assert(dropped === need, t("engine.mustDiscardN", { n: need }));
			for (const r of RESOURCES) {
				p.resources[r] -= action.resources[r] ?? 0;
				state.bank[r] += action.resources[r] ?? 0;
			}
			log(state, t("engine.discarded", {
				name: p.name,
				n: need
			}));
			state.discardQueue.shift();
			if (state.discardQueue.length === 0) state.phase = "robber";
			return;
		}
		case "moveRobber": {
			assert(state.phase === "robber", t("engine.noRobberNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			const hex = hexById(state, action.hexId);
			assert(hex, t("engine.badHex"));
			assert(hex.id !== state.robberHexId, t("engine.moveRobberElse"));
			const victims = adjacentPlayersToHex(state, hex.id, p.id);
			if (action.stealFrom != null) assert(victims.includes(action.stealFrom), t("engine.cantSteal"));
			else assert(victims.length === 0, t("engine.pickVictim"));
			state.robberHexId = hex.id;
			if (action.stealFrom != null) {
				const vic = player(state, action.stealFrom);
				const rng = mulberry32(state.seed + state.revision * 17 + 3);
				const stolen = randomResourceFrom(vic.resources, (max) => Math.floor(rng() * max));
				if (stolen) {
					vic.resources[stolen] -= 1;
					p.resources[stolen] += 1;
					log(state, t("engine.stole", {
						name: p.name,
						resource: t(`resource.${stolen}`).toLowerCase(),
						other: vic.name
					}));
				}
			} else log(state, t("engine.movedRobber", { name: p.name }));
			state.phase = state.rolledThisTurn ? "main" : "roll";
			return;
		}
		case "buyDev": {
			assert(state.phase === "main", t("engine.noBuyNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(state.deck.length > 0, t("engine.noDevLeft"));
			assert(canAfford(p.resources, costOf("dev")), t("engine.cantAffordDev"));
			pay(p.resources, state.bank, costOf("dev"));
			const card = state.deck.shift();
			if (card === "vp") {
				p.vpCards += 1;
				checkWin(state, p.id);
			} else p.newHand.push(card);
			log(state, t("engine.boughtDev", { name: p.name }));
			return;
		}
		case "playKnight": {
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(state.phase === "roll" || state.phase === "main", t("engine.notNow"));
			assert(!state.playedDevThisTurn, t("engine.oneDev"));
			takeFromHand(p, "knight");
			p.knightsPlayed += 1;
			state.playedDevThisTurn = true;
			state.phase = "robber";
			log(state, t("engine.playsKnight", { name: p.name }));
			updateArmy(state);
			checkWin(state, p.id);
			return;
		}
		case "playRoads": {
			assert(state.phase === "main", t("engine.notNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(!state.playedDevThisTurn, t("engine.oneDev"));
			takeFromHand(p, "roads");
			state.playedDevThisTurn = true;
			if (legalRoadIds(state, p.id).length === 0 || p.roadsLeft <= 0) {
				log(state, t("engine.roadsNoBuild", { name: p.name }));
				return;
			}
			state.phase = "roadBuilding";
			state.pendingFreeRoads = Math.min(2, p.roadsLeft);
			log(state, t("engine.playsRoads", { name: p.name }));
			return;
		}
		case "skipFreeRoad":
			assert(state.phase === "roadBuilding", t("engine.noFreeRoads"));
			state.pendingFreeRoads = 0;
			state.phase = "main";
			return;
		case "playPlenty": {
			assert(state.phase === "main", t("engine.notNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(!state.playedDevThisTurn, t("engine.oneDev"));
			takeFromHand(p, "plenty");
			state.playedDevThisTurn = true;
			for (const r of [action.a, action.b]) if (state.bank[r] > 0) {
				state.bank[r] -= 1;
				p.resources[r] += 1;
			}
			log(state, t("engine.plenty", {
				name: p.name,
				a: t(`resource.${action.a}`).toLowerCase(),
				b: t(`resource.${action.b}`).toLowerCase()
			}));
			return;
		}
		case "playMonopoly": {
			assert(state.phase === "main", t("engine.notNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(!state.playedDevThisTurn, t("engine.oneDev"));
			takeFromHand(p, "monopoly");
			state.playedDevThisTurn = true;
			let taken = 0;
			for (const o of state.players) {
				if (o.id === p.id) continue;
				taken += o.resources[action.resource];
				o.resources[action.resource] = 0;
			}
			p.resources[action.resource] += taken;
			log(state, t("engine.monopoly", {
				name: p.name,
				resource: t(`resource.${action.resource}`).toLowerCase(),
				n: taken
			}));
			return;
		}
		case "bankTrade": {
			assert(state.phase === "main", t("engine.notNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			assert(action.give !== action.get, t("engine.differentRes"));
			const rate = tradeRate(state, p.id, action.give);
			assert(p.resources[action.give] >= rate, t("engine.needRate", {
				n: rate,
				resource: t(`resource.${action.give}`).toLowerCase()
			}));
			assert(state.bank[action.get] > 0, t("engine.bankEmpty"));
			p.resources[action.give] -= rate;
			state.bank[action.give] += rate;
			state.bank[action.get] -= 1;
			p.resources[action.get] += 1;
			log(state, t("engine.bankSwap", {
				name: p.name,
				n: rate,
				give: t(`resource.${action.give}`).toLowerCase(),
				get: t(`resource.${action.get}`).toLowerCase()
			}));
			return;
		}
		case "offerTrade": {
			assert(state.phase === "main", t("engine.notNow"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			const to = player(state, action.to);
			assert(to.id !== p.id, t("engine.selfTrade"));
			assert(resourceCount(action.give) > 0 && resourceCount(action.want) > 0, t("engine.bothWays"));
			for (const r of RESOURCES) assert(p.resources[r] >= action.give[r], t("engine.noThoseCards"));
			state.tradeOffer = {
				from: p.id,
				to: to.id,
				give: { ...action.give },
				want: { ...action.want }
			};
			log(state, t("engine.offers", {
				name: p.name,
				other: to.name
			}));
			return;
		}
		case "respondTrade": {
			const offer = state.tradeOffer;
			assert(offer, t("engine.noOffer"));
			const from = player(state, offer.from);
			const to = player(state, offer.to);
			if (!(action.accept && canAfford(from.resources, offer.give) && canAfford(to.resources, offer.want))) {
				log(state, t("engine.declines", { name: to.name }));
				state.tradeOffer = null;
				return;
			}
			for (const r of RESOURCES) {
				from.resources[r] -= offer.give[r];
				to.resources[r] += offer.give[r];
				to.resources[r] -= offer.want[r];
				from.resources[r] += offer.want[r];
			}
			log(state, t("engine.accepts", {
				name: to.name,
				other: from.name
			}));
			state.tradeOffer = null;
			return;
		}
		case "cancelTrade": {
			const offer = state.tradeOffer;
			assert(offer, t("engine.noOffer"));
			assert(offer.from === state.currentPlayer, t("engine.onlyOfferer"));
			state.tradeOffer = null;
			log(state, t("engine.retracts", { name: player(state, offer.from).name }));
			return;
		}
		case "endTurn": {
			assert(state.phase === "main", t("engine.dontEnd"));
			const p = player(state, state.currentPlayer);
			assert(actor === p.id, t("engine.notYourTurn"));
			p.hand.push(...p.newHand);
			p.newHand = [];
			const next = (state.currentPlayer + 1) % state.players.length;
			if (next === 0) state.turnNumber += 1;
			log(state, t("engine.endsTurn", { name: p.name }));
			beginTurn(state, next);
			return;
		}
		default: throw new GameError(t("engine.unknown"));
	}
}
function applyAction(state, action) {
	try {
		const next = structuredClone(state);
		handle(next, action);
		next.revision += 1;
		return {
			ok: true,
			state: next
		};
	} catch (err) {
		if (err instanceof GameError) return {
			ok: false,
			error: err.message
		};
		throw err;
	}
}
var KEY = "havn-save-v1";
var MUTE_KEY = "havn-mute";
function saveGame(state) {
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
}
function loadGame() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.board?.hexes || !Array.isArray(parsed.players) || parsed.players.length < 2) return null;
		if (!parsed.phase) return null;
		if (!Array.isArray(parsed.discardQueue)) parsed.discardQueue = [];
		if (!Array.isArray(parsed.log)) parsed.log = [];
		if (parsed.tradeOffer === void 0) parsed.tradeOffer = null;
		return parsed;
	} catch {
		return null;
	}
}
function loadMuted() {
	try {
		return localStorage.getItem(MUTE_KEY) === "1";
	} catch {
		return false;
	}
}
function saveMuted(muted) {
	try {
		localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
	} catch {}
}
var useGameStore = create((set, get) => ({
	state: null,
	buildMode: null,
	muted: false,
	error: null,
	hydrate: () => {
		const saved = loadGame();
		const playable = saved && saved.phase !== "gameOver" ? saved : null;
		set({
			muted: loadMuted(),
			...get().state ? {} : { state: playable }
		});
	},
	start: (config) => {
		unlockAudio();
		const state = createGame(config);
		saveGame(state);
		set({
			state,
			buildMode: null,
			error: null
		});
	},
	continueSave: () => {
		const state = loadGame();
		if (state && state.phase !== "gameOver") set({
			state,
			buildMode: null,
			error: null
		});
	},
	toMenu: () => set({
		state: null,
		buildMode: null,
		error: null
	}),
	dispatch: (action) => {
		const { state, muted } = get();
		if (!state) return;
		const result = applyAction(state, action);
		if (!result.ok) {
			set({ error: result.error });
			return;
		}
		if (!muted) try {
			if (action.type === "roll") playDice();
			else if (action.type === "placeRoad" || action.type === "placeSettlement" || action.type === "placeCity") playPlace();
			else if (action.type === "moveRobber") playSteal();
			if (result.state.phase === "gameOver") playWin();
		} catch {}
		saveGame(result.state);
		set({
			state: result.state,
			error: null,
			buildMode: action.type === "placeRoad" || action.type === "placeSettlement" || action.type === "placeCity" ? null : get().buildMode
		});
	},
	setBuildMode: (mode) => set({ buildMode: mode }),
	toggleMute: () => {
		const muted = !get().muted;
		saveMuted(muted);
		if (!muted) unlockAudio();
		set({ muted });
	},
	tickAi: () => {
		const { state } = get();
		if (!state) return;
		try {
			const action = chooseAiAction(state);
			if (action) {
				get().dispatch(action);
				const next = get().state;
				if (next && next.revision === state.revision) recover(next);
				return;
			}
			recover(state);
		} catch {
			recover(get().state ?? state);
		}
	}
}));
function recover(state) {
	const actorId = getActor(state);
	const actor = state.players[actorId];
	if (!actor?.isAi) return;
	const dispatch = (action) => useGameStore.getState().dispatch(action);
	if (state.tradeOffer) {
		dispatch({
			type: "respondTrade",
			accept: false
		});
		return;
	}
	if (state.phase === "discard") {
		const need = Math.floor(resourceCount(actor.resources) / 2);
		const dump = emptyBank();
		let left = need;
		for (const r of RESOURCES) {
			const n = Math.min(actor.resources[r], left);
			dump[r] = n;
			left -= n;
		}
		dispatch({
			type: "discard",
			resources: dump
		});
		return;
	}
	if (state.phase === "robber") {
		const hex = state.board.hexes.find((h) => h.id !== state.robberHexId);
		if (!hex) return;
		const victims = adjacentPlayersToHex(state, hex.id, state.currentPlayer);
		dispatch({
			type: "moveRobber",
			hexId: hex.id,
			stealFrom: victims[0] ?? null
		});
		return;
	}
	if (state.phase === "roll") dispatch({ type: "roll" });
	else if (state.phase === "main") dispatch({ type: "endTurn" });
	else if (state.phase === "roadBuilding") dispatch({ type: "skipFreeRoad" });
}
function hasSave() {
	const s = loadGame();
	return Boolean(s && s.phase !== "gameOver");
}
var FILL = {
	wood: "#2a6a42",
	brick: "#b5653a",
	wool: "#7faf5a",
	grain: "#e0b84a",
	ore: "#7d8796",
	desert: "#c4a574"
};
function motif(terrain) {
	if (terrain === "wood") return "M0 8 L4 1 L8 8 Z M2 8 L6 2 L10 8 Z";
	if (terrain === "wool") return "M2 6 Q4 2 6 6 Q8 2 10 6";
	if (terrain === "grain") return "M3 8 L4 2 M6 8 L6 1 M9 8 L8 3";
	if (terrain === "ore") return "M2 8 L4 4 L6 8 L8 3 L10 8";
	if (terrain === "brick") return "M1 3 H11 M1 6 H11 M1 9 H11";
	return "M2 6 Q6 2 10 6 Q6 9 2 6";
}
function Board({ state, buildMode, disabled, onVertex, onEdge, onHex }) {
	const pad = 78;
	const xs = state.board.vertices.map((v) => v.x);
	const ys = state.board.vertices.map((v) => v.y);
	const minX = Math.min(...xs) - pad;
	const minY = Math.min(...ys) - pad;
	const maxX = Math.max(...xs) + pad;
	const maxY = Math.max(...ys) + pad;
	const human = !disabled;
	const settlements = human && (state.phase === "setup" && state.setupNeed === "settlement" || state.phase === "main" && buildMode === "settlement") ? new Set(legalSettlementIds(state, state.currentPlayer)) : /* @__PURE__ */ new Set();
	const cities = human && state.phase === "main" && buildMode === "city" ? new Set(legalCityIds(state, state.currentPlayer)) : /* @__PURE__ */ new Set();
	const roads = human && (state.phase === "setup" && state.setupNeed === "road" || state.phase === "roadBuilding" || state.phase === "main" && buildMode === "road") ? new Set(legalRoadIds(state, state.currentPlayer)) : /* @__PURE__ */ new Set();
	const robber = state.phase === "robber" && human;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
		className: "h-full w-full select-none",
		role: "img",
		"aria-label": "Havn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY,
				fill: "#1a2428"
			}),
			state.board.hexes.map((h) => {
				const c = hexToPixel(h.q, h.r);
				const red = h.number === 6 || h.number === 8;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					onClick: () => robber && h.id !== state.robberHexId && onHex(h.id),
					style: { cursor: robber && h.id !== state.robberHexId ? "pointer" : "default" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
							points: hexPolygon(h.q, h.r),
							fill: FILL[h.terrain],
							stroke: "#14110e",
							strokeWidth: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: motif(h.terrain),
							transform: `translate(${c.x - 6} ${c.y - 18})`,
							fill: "#14110e",
							opacity: .28
						}),
						h.number != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: c.x,
							cy: c.y + 8,
							r: 13,
							fill: "#f6f1e6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: c.x,
							y: c.y + 13,
							textAnchor: "middle",
							fontSize: 13,
							fontWeight: 700,
							fill: red ? "#b4332a" : "#1c1814",
							children: h.number
						})] }),
						state.robberHexId === h.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${c.x - 8} ${c.y - 28})`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: 8,
								cy: 6,
								r: 5,
								fill: "#1a120e"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M3 12 Q8 9 13 12 L12 20 L4 20 Z",
								fill: "#1a120e"
							})]
						})
					]
				}, h.id);
			}),
			state.board.edges.map((e) => {
				const a = state.board.vertices.find((v) => v.id === e.a);
				const b = state.board.vertices.find((v) => v.id === e.b);
				const color = e.road ? PLAYER_COLORS[e.road.player % 4].fill : roads.has(e.id) ? "#f3efe6" : "transparent";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: a.x,
					y1: a.y,
					x2: b.x,
					y2: b.y,
					stroke: color,
					strokeWidth: e.road ? 7 : roads.has(e.id) ? 8 : 14,
					strokeLinecap: "round",
					opacity: e.road ? 1 : roads.has(e.id) ? .9 : 0,
					pointerEvents: roads.has(e.id) ? "stroke" : "none",
					style: { cursor: roads.has(e.id) ? "pointer" : "default" },
					onClick: () => roads.has(e.id) && onEdge(e.id)
				}, e.id);
			}),
			state.board.vertices.map((v) => {
				const hot = settlements.has(v.id) || cities.has(v.id);
				const b = v.building;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					onClick: () => hot && onVertex(v.id),
					style: { cursor: hot ? "pointer" : "default" },
					children: [
						v.port && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: v.x,
							cy: v.y,
							r: 16,
							fill: "none",
							stroke: "#e7d7a8",
							strokeWidth: 1.5,
							strokeDasharray: "2 2"
						}),
						hot && !b && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: v.x,
							cy: v.y,
							r: 11,
							fill: "#f3efe6",
							opacity: .9
						}),
						b && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${v.x} ${v.y})`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: 12,
								fill: PLAYER_COLORS[b.player % 4].fill,
								stroke: "#14110e",
								strokeWidth: 1.5
							}), b.type === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: 5,
								fill: "#f6f1e6"
							})]
						}),
						v.port && !b && (() => {
							const mate = state.board.vertices.find((o) => o !== v && o.port === v.port);
							if (mate && Math.hypot(v.x, v.y) < Math.hypot(mate.x, mate.y)) return null;
							const len = Math.hypot(v.x, v.y) || 1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
								x: v.x + v.x / len * 26,
								y: v.y + v.y / len * 26,
								textAnchor: "middle",
								fontSize: 9,
								fill: "#e7d7a8",
								children: [
									v.port.rate,
									":1 ",
									v.port.resource === "any" ? "?" : t(`resource.${v.port.resource}`).slice(0, 1)
								]
							});
						})()
					]
				}, v.id);
			})
		]
	});
}
function seatsFor(locale) {
	const names = aiNames(locale);
	return [
		{
			name: "",
			isAi: false,
			colorIndex: 0
		},
		{
			name: names[0],
			isAi: true,
			colorIndex: 1
		},
		{
			name: names[1],
			isAi: true,
			colorIndex: 2
		}
	];
}
function GameApp() {
	const state = useGameStore((s) => s.state);
	const hydrate = useGameStore((s) => s.hydrate);
	const start = useGameStore((s) => s.start);
	const continueSave = useGameStore((s) => s.continueSave);
	const toMenu = useGameStore((s) => s.toMenu);
	const dispatch = useGameStore((s) => s.dispatch);
	const buildMode = useGameStore((s) => s.buildMode);
	const setBuildMode = useGameStore((s) => s.setBuildMode);
	const muted = useGameStore((s) => s.muted);
	const toggleMute = useGameStore((s) => s.toggleMute);
	const tickAi = useGameStore((s) => s.tickAi);
	const error = useGameStore((s) => s.error);
	const hydrateLocale = useLocaleStore((s) => s.hydrateLocale);
	const localeReady = useLocaleStore((s) => s.ready);
	const t$1 = useT();
	const [rules, setRules] = (0, import_react.useState)(false);
	const [exit, setExit] = (0, import_react.useState)(false);
	const [trade, setTrade] = (0, import_react.useState)(false);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [steal, setSteal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		hydrateLocale();
		hydrate();
	}, [hydrate, hydrateLocale]);
	(0, import_react.useEffect)(() => {
		if (!state || state.phase === "gameOver") return;
		if (!state.players[getActor(state)]?.isAi) return;
		const wait = state.tradeOffer ? 380 : 520;
		const id = window.setTimeout(() => tickAi(), wait);
		return () => window.clearTimeout(id);
	}, [state, tickAi]);
	(0, import_react.useEffect)(() => {
		if (!error) return;
		const id = window.setTimeout(() => useGameStore.setState({ error: null }), 2200);
		return () => window.clearTimeout(id);
	}, [error]);
	if (!localeReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-bg" });
	if (!state) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Start, {
		onStart: (seats) => start({ seats }),
		onContinue: continueSave,
		onRules: () => setRules(true),
		rules,
		onCloseRules: () => setRules(false)
	});
	const actorId = getActor(state);
	const actor = state.players[actorId] ?? state.players[state.currentPlayer];
	const viewer = !actor?.isAi ? actorId : state.players.find((p) => !p.isAi)?.id ?? 0;
	const human = Boolean(actor && !actor.isAi);
	const hand = state.players[viewer] ?? actor;
	function onVertex(id) {
		if (!human) return;
		if (state.phase === "setup" && state.setupNeed === "settlement" || buildMode === "settlement") dispatch({
			type: "placeSettlement",
			vertexId: id
		});
		else if (buildMode === "city") dispatch({
			type: "placeCity",
			vertexId: id
		});
	}
	function onEdge(id) {
		if (!human) return;
		dispatch({
			type: "placeRoad",
			edgeId: id
		});
	}
	function onHex(id) {
		if (!human || state.phase !== "robber") return;
		const victims = adjacentPlayersToHex(state, id, state.currentPlayer);
		if (victims.length > 1) setSteal({
			hexId: id,
			victims
		});
		else dispatch({
			type: "moveRobber",
			hexId: id,
			stealFrom: victims[0] ?? null
		});
	}
	const hint = hintFor(state, buildMode, t$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-3 pt-[max(8px,env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none font-semibold",
							children: "Havn"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: state.turnNumber > 0 ? t$1("ui.round", { n: state.turnNumber }) : t$1("ui.setup")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: t$1("ui.sound"),
						onClick: toggleMute,
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: t$1("ui.rules"),
						onClick: () => setRules(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: t$1("ui.quit"),
						onClick: () => setExit(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex gap-1.5 overflow-x-auto px-3 py-2",
				children: state.players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex min-w-[7.5rem] flex-1 items-center gap-2 rounded-lg border px-2 py-1.5", p.id === state.currentPlayer ? "border-accent bg-surface" : "border-border bg-surface/70"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-3 shrink-0 rounded-full",
							style: { background: PLAYER_COLORS[p.colorIndex % 4].fill }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted tabular-nums",
								children: [
									p.id === viewer ? totalVp(state, p.id) : publicVp(state, p.id),
									" ",
									t$1("ui.vp"),
									p.id === viewer && p.vpCards > 0 ? ` · ${t$1("ui.hidden", { n: p.vpCards })}` : "",
									p.id !== viewer ? ` · ${t$1("ui.cards", { n: resourceCount(p.resources) })}` : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto text-[10px] tracking-wide text-subtle uppercase",
							children: [
								p.hasLongestRoad && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t$1("ui.longest") }),
								p.hasLargestArmy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t$1("ui.army") }),
								p.id === state.currentPlayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-accent",
									children: t$1("ui.turn")
								})
							]
						})
					]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
					state,
					buildMode,
					disabled: !human,
					onVertex,
					onEdge,
					onHex
				}), state.lastRoll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute top-2 right-2 rounded-lg border border-border bg-surface/90 px-2 py-1 font-display text-xl tabular-nums",
					children: [
						state.lastRoll.d1,
						"+",
						state.lastRoll.d2,
						"=",
						state.lastRoll.total
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-t border-border bg-surface px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-muted",
						children: hint
					}),
					hand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex gap-1.5 overflow-x-auto",
						children: [RESOURCES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { resource: r }),
								hand.resources[r],
								" ",
								t(`resource.${r}`)
							]
						}, r)), hand.hand.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !human || state.playedDevThisTurn && k !== "vp",
							className: "rounded-md border border-border px-2 py-1 text-xs",
							onClick: () => {
								if (k === "knight") dispatch({ type: "playKnight" });
								else if (k === "roads") dispatch({ type: "playRoads" });
								else if (k === "plenty") setPick("plenty");
								else if (k === "monopoly") setPick("monopoly");
							},
							children: t(`dev.${k}`)
						}, `${k}-${i}`))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-1.5",
						children: [
							state.phase === "roll" && human && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "col-span-3 h-11 rounded-lg bg-accent font-medium text-accent-fg",
								onClick: () => dispatch({ type: "roll" }),
								children: t$1("ui.roll")
							}),
							state.phase === "roadBuilding" && human && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "col-span-3 h-11 rounded-lg border border-border",
								onClick: () => dispatch({ type: "skipFreeRoad" }),
								children: t$1("ui.skipRoads")
							}),
							state.phase === "main" && human && hand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildBtn, {
									label: t$1("ui.road"),
									on: buildMode === "road",
									disabled: hand.roadsLeft <= 0 || !canAfford(hand.resources, costOf("road")) || legalRoadIds(state, hand.id).length === 0,
									onClick: () => setBuildMode(buildMode === "road" ? null : "road")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildBtn, {
									label: t$1("ui.settle"),
									on: buildMode === "settlement",
									disabled: hand.settlementsLeft <= 0 || !canAfford(hand.resources, costOf("settlement")) || legalSettlementIds(state, hand.id).length === 0,
									onClick: () => setBuildMode(buildMode === "settlement" ? null : "settlement")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildBtn, {
									label: t$1("ui.city"),
									on: buildMode === "city",
									disabled: hand.citiesLeft <= 0 || !canAfford(hand.resources, costOf("city")) || legalCityIds(state, hand.id).length === 0,
									onClick: () => setBuildMode(buildMode === "city" ? null : "city")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildBtn, {
									label: t$1("ui.card"),
									disabled: !canAfford(hand.resources, costOf("dev")) || state.deck.length === 0,
									onClick: () => dispatch({ type: "buyDev" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildBtn, {
									label: t$1("ui.trade"),
									onClick: () => setTrade(true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 rounded-lg bg-accent text-sm font-medium text-accent-fg",
									onClick: () => dispatch({ type: "endTurn" }),
									children: t$1("ui.endTurn")
								})
							] })
						]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute top-16 left-1/2 z-40 -translate-x-1/2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
				children: error
			}),
			state.phase === "discard" && human && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discard, {
				state,
				playerId: actorId,
				onConfirm: (resources) => dispatch({
					type: "discard",
					resources
				})
			}),
			state.tradeOffer && state.players[state.tradeOffer.to] && !state.players[state.tradeOffer.to].isAi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Offer, {
				state,
				onRespond: (accept) => dispatch({
					type: "respondTrade",
					accept
				})
			}),
			state.tradeOffer && state.players[state.tradeOffer.to]?.isAi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: t$1("ui.tradeTo", { name: state.players[state.tradeOffer.to].name }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: t$1("ui.thinking", { name: state.players[state.tradeOffer.to].name })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 w-full rounded-lg border border-border",
					onClick: () => dispatch({ type: "cancelTrade" }),
					children: t$1("ui.retract")
				})]
			}),
			state.phase === "gameOver" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: t$1("ui.winTitle", { name: state.players[state.winnerId ?? 0]?.name ?? "" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: t$1("ui.winBody", {
						name: state.players[state.winnerId ?? 0]?.name ?? "",
						n: totalVp(state, state.winnerId ?? 0)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 w-full rounded-lg bg-accent text-accent-fg",
					onClick: toMenu,
					children: t$1("ui.backMenu")
				})]
			}),
			rules && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { onClose: () => setRules(false) }),
			exit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: t$1("exit.title"),
				onClose: () => setExit(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: t$1("exit.body")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-lg border border-border",
						onClick: () => setExit(false),
						children: t$1("exit.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-lg bg-accent text-accent-fg",
						onClick: () => {
							setExit(false);
							toMenu();
						},
						children: t$1("exit.confirm")
					})]
				})]
			}),
			trade && human && hand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trade, {
				state,
				player: hand,
				onClose: () => setTrade(false),
				onBank: (give, get) => {
					dispatch({
						type: "bankTrade",
						give,
						get
					});
					setTrade(false);
				},
				onOffer: (to, give, want) => {
					dispatch({
						type: "offerTrade",
						to,
						give,
						want
					});
					setTrade(false);
				}
			}),
			pick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
				kind: pick,
				onClose: () => setPick(null),
				onPick: (a, b) => {
					if (pick === "plenty") dispatch({
						type: "playPlenty",
						a,
						b
					});
					else dispatch({
						type: "playMonopoly",
						resource: a
					});
					setPick(null);
				}
			}),
			steal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: t$1("ui.stealTitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: steal.victims.map((id) => {
						const p = state.players[id];
						if (!p) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-11 w-full items-center gap-2 rounded-lg border border-border px-3",
							onClick: () => {
								dispatch({
									type: "moveRobber",
									hexId: steal.hexId,
									stealFrom: id
								});
								setSteal(null);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-3 rounded-full",
									style: { background: PLAYER_COLORS[p.colorIndex % 4].fill }
								}),
								p.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-muted",
									children: t$1("ui.stealCards", { n: resourceCount(p.resources) })
								})
							]
						}, id);
					})
				})
			})
		]
	});
}
function hintFor(state, buildMode, t) {
	const actor = state.players[getActor(state)];
	const you = actor?.isAi ? actor.name : t("ui.youPronoun");
	if (state.tradeOffer) {
		const to = state.players[state.tradeOffer.to];
		if (to?.isAi) return t("hint.waitFor", { name: to.name });
		const from = state.players[state.tradeOffer.from];
		return t("hint.wantsTrade", { name: from?.name ?? "" });
	}
	if (state.phase === "setup") return state.setupNeed === "settlement" ? t("hint.setupSettle", { you }) : t("hint.setupRoad", { you });
	if (state.phase === "roll") return t("hint.roll", { you });
	if (state.phase === "discard") return t("hint.discard", {
		you,
		n: Math.floor(resourceCount(actor?.resources ?? emptyBank()) / 2)
	});
	if (state.phase === "robber") return t("hint.robber", { you });
	if (state.phase === "roadBuilding") return state.pendingFreeRoads === 1 ? t("hint.freeRoad", {
		you,
		n: 1
	}) : t("hint.freeRoads", {
		you,
		n: state.pendingFreeRoads
	});
	if (buildMode === "settlement") return t("hint.pickSettle");
	if (buildMode === "city") return t("hint.pickCity");
	if (buildMode === "road") return t("hint.pickRoad");
	if (state.phase === "gameOver") return t("hint.win", {
		name: state.players[state.winnerId ?? 0]?.name ?? "",
		n: totalVp(state, state.winnerId ?? 0)
	});
	return t("hint.main", { you });
}
function IconBtn({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: "grid size-11 place-items-center rounded-lg text-muted hover:text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-5",
			children
		})
	});
}
function BuildBtn({ label, on, disabled, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("h-11 rounded-lg text-sm font-medium disabled:opacity-40", on ? "bg-accent text-accent-fg" : "border border-border bg-surface-2"),
		children: label
	});
}
function Dot({ resource }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block size-2.5 rounded-full",
		style: { background: {
			wood: "#2a6a42",
			brick: "#b5653a",
			wool: "#7faf5a",
			grain: "#e0b84a",
			ore: "#8b93a0"
		}[resource] }
	});
}
function Sheet({ title, children, onClose }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-black/60",
			"aria-label": t("ui.close"),
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-t-2xl border border-border bg-surface p-5 sm:rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-semibold",
				children: title
			}), children]
		})]
	});
}
function Rules({ onClose }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: t("rules.title"),
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[50dvh] space-y-3 overflow-auto text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("rules.p1") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("rules.p2") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("rules.p3") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("rules.p4") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("rules.p5") })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: t("start.language")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {})]
		})]
	});
}
function Discard({ state, playerId, onConfirm }) {
	const t$2 = useT();
	const p = state.players[playerId];
	const need = Math.floor(resourceCount(p.resources) / 2);
	const [dump, setDump] = (0, import_react.useState)(emptyBank);
	const chosen = resourceCount(dump);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: t$2("ui.discardTitle", {
			name: p.name,
			n: need
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: t$2("ui.discardHint", { n: need })
			}),
			RESOURCES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { resource: r }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: t(`resource.${r}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-6 text-right text-muted",
						children: p.resources[r]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "size-10 rounded-md border border-border",
						disabled: dump[r] <= 0,
						onClick: () => setDump({
							...dump,
							[r]: dump[r] - 1
						}),
						children: "−"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-4 text-center tabular-nums",
						children: dump[r]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "size-10 rounded-md border border-border",
						disabled: dump[r] >= p.resources[r] || chosen >= need,
						onClick: () => setDump({
							...dump,
							[r]: dump[r] + 1
						}),
						children: "+"
					})
				]
			}, r)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: chosen !== need,
				className: "mt-3 h-11 w-full rounded-lg bg-accent text-accent-fg disabled:opacity-40",
				onClick: () => onConfirm(dump),
				children: t$2("ui.discardBtn", {
					chosen,
					need
				})
			})
		]
	});
}
function Offer({ state, onRespond }) {
	const t = useT();
	const offer = state.tradeOffer;
	const from = state.players[offer.from];
	const you = state.players[offer.to];
	const can = you ? RESOURCES.every((r) => you.resources[r] >= offer.want[r]) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: t("ui.wantsTrade", { name: from.name }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted uppercase",
				children: t("ui.youGet")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bits, { bank: offer.give }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs tracking-wide text-muted uppercase",
				children: t("ui.youGive")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bits, { bank: offer.want }),
			!can && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t("ui.cantAfford")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-lg border border-border",
					onClick: () => onRespond(false),
					children: t("ui.decline")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !can,
					className: "h-11 rounded-lg bg-accent text-accent-fg disabled:opacity-40",
					onClick: () => onRespond(true),
					children: t("ui.accept")
				})]
			})
		]
	});
}
function Bits({ bank }) {
	const items = RESOURCES.filter((r) => bank[r] > 0);
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: t("ui.nothing")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: items.map((r) => `${bank[r]} ${t(`resource.${r}`).toLowerCase()}`).join(", ")
	});
}
function Trade({ state, player, onClose, onBank, onOffer }) {
	const t$3 = useT();
	const [tab, setTab] = (0, import_react.useState)("bank");
	const [give, setGive] = (0, import_react.useState)("wood");
	const [get, setGet] = (0, import_react.useState)("brick");
	const [to, setTo] = (0, import_react.useState)(state.players.find((p) => p.id !== player.id)?.id ?? 0);
	const [giveMap, setGiveMap] = (0, import_react.useState)(emptyBank);
	const [wantMap, setWantMap] = (0, import_react.useState)(emptyBank);
	const rate = tradeRate(state, player.id, give);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: t$3("ui.tradeTitle"),
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("h-10 rounded-md text-sm", tab === "bank" && "bg-surface"),
				onClick: () => setTab("bank"),
				children: t$3("ui.bank")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("h-10 rounded-md text-sm", tab === "player" && "bg-surface"),
				onClick: () => setTab("player"),
				children: t$3("ui.players")
			})]
		}), tab === "bank" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t$3("ui.rate", {
						resource: t(`resource.${give}`).toLowerCase(),
						rate
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickRow, {
					label: t$3("ui.give"),
					value: give,
					onChange: setGive
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickRow, {
					label: t$3("ui.get"),
					value: get,
					onChange: setGet
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: give === get || player.resources[give] < rate,
					className: "h-11 w-full rounded-lg bg-accent text-accent-fg disabled:opacity-40",
					onClick: () => onBank(give, get),
					children: t$3("ui.swap", {
						rate,
						give: t(`resource.${give}`).toLowerCase(),
						get: t(`resource.${get}`).toLowerCase()
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 w-full rounded-md border border-border bg-surface-2 px-2",
					value: to,
					onChange: (e) => setTo(Number(e.target.value)),
					children: state.players.filter((p) => p.id !== player.id).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: p.id,
						children: p.name
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
					bank: giveMap,
					max: player.resources,
					onChange: setGiveMap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
					bank: wantMap,
					onChange: setWantMap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: resourceCount(giveMap) === 0 || resourceCount(wantMap) === 0,
					className: "h-11 w-full rounded-lg bg-accent text-accent-fg disabled:opacity-40",
					onClick: () => onOffer(to, giveMap, wantMap),
					children: t$3("ui.send")
				})
			]
		})]
	});
}
function PickRow({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-1 text-xs text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-5 gap-1",
		children: RESOURCES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(r),
			className: cn("grid h-11 place-items-center rounded-md ring-1", value === r ? "ring-accent" : "ring-border"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { resource: r })
		}, r))
	})] });
}
function Count({ bank, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1",
		children: RESOURCES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { resource: r }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: t(`resource.${r}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-9 rounded-md border border-border",
					disabled: bank[r] <= 0,
					onClick: () => onChange({
						...bank,
						[r]: bank[r] - 1
					}),
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-4 text-center",
					children: bank[r]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-9 rounded-md border border-border",
					disabled: max ? bank[r] >= max[r] : false,
					onClick: () => onChange({
						...bank,
						[r]: bank[r] + 1
					}),
					children: "+"
				})
			]
		}, r))
	});
}
function Pick({ kind, onPick, onClose }) {
	const t$4 = useT();
	const [picked, setPicked] = (0, import_react.useState)([]);
	const count = kind === "plenty" ? 2 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: kind === "plenty" ? t$4("ui.plentyTitle") : t$4("ui.monopolyTitle"),
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: count === 2 ? t$4("ui.pickTwo", { n: picked.length }) : t$4("ui.pickOne")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-5 gap-2",
			children: RESOURCES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "grid h-16 place-items-center rounded-lg ring-1 ring-border",
				onClick: () => {
					const next = [...picked, r];
					if (next.length >= count) onPick(next[0], next[count - 1] ?? next[0]);
					else setPicked(next);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { resource: r }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted",
					children: t(`resource.${r}`)
				})]
			}, r))
		})]
	});
}
function Start({ onStart, onContinue, onRules, rules, onCloseRules }) {
	const t = useT();
	const locale = useLocale();
	const [seats, setSeats] = (0, import_react.useState)(() => seatsFor(locale));
	const [canContinue, setCanContinue] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCanContinue(hasSave()), []);
	(0, import_react.useEffect)(() => {
		const you = t("start.you");
		const names = aiNames(locale);
		const youSet = allDefaultYou();
		const aiSet = allDefaultAi();
		setSeats((prev) => {
			let ai = 0;
			return prev.map((s) => {
				if (!s.isAi && (s.name === "" || youSet.has(s.name))) return {
					...s,
					name: you
				};
				if (s.isAi && (s.name === "" || aiSet.has(s.name))) {
					const name = names[ai] ?? t("start.computer");
					ai += 1;
					return {
						...s,
						name
					};
				}
				if (s.isAi) ai += 1;
				return s;
			});
		});
	}, [locale, t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col justify-end bg-bg px-5 py-8 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-accent uppercase",
						children: t("start.kicker")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-6xl font-semibold tracking-tight",
					children: "Havn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-muted",
					children: t("start.blurb")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm text-muted",
							children: t("start.players")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: seats.length >= 4,
							className: "inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-xs disabled:opacity-40",
							onClick: () => {
								const used = new Set(seats.map((s) => s.colorIndex));
								const color = PLAYER_COLORS.findIndex((_, i) => !used.has(i));
								const names = aiNames(locale);
								setSeats((s) => [...s, {
									name: names[s.filter((x) => x.isAi).length] ?? t("start.playerN", { n: s.length + 1 }),
									isAi: true,
									colorIndex: color < 0 ? s.length : color
								}]);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }),
								" ",
								t("start.add")
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: seats.map((seat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-7 rounded-full",
									style: { background: PLAYER_COLORS[seat.colorIndex % 4].fill }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: seat.name,
									"aria-label": t("start.nameAria", { n: i + 1 }),
									onChange: (e) => setSeats((prev) => prev.map((s, idx) => idx === i ? {
										...s,
										name: e.target.value
									} : s)),
									className: "h-11 min-w-0 flex-1 rounded-md border border-border bg-surface-2 px-3 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 rounded-md border border-border px-3 text-xs",
									onClick: () => {
										const nextAi = !seat.isAi;
										const names = aiNames(locale);
										setSeats((prev) => prev.map((s, idx) => idx === i ? {
											...s,
											isAi: nextAi,
											name: nextAi ? names[prev.filter((x) => x.isAi).length] ?? t("start.computer") : t("start.you")
										} : s));
									},
									children: seat.isAi ? t("start.computer") : t("start.you")
								}),
								seats.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": t("start.removeAria"),
									className: "grid size-11 place-items-center text-muted",
									onClick: () => setSeats((s) => s.filter((_, idx) => idx !== i)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 w-full rounded-xl bg-accent text-base font-semibold text-accent-fg",
					onClick: () => onStart(seats),
					children: t("start.startGame")
				}),
				canContinue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 w-full rounded-xl border border-border",
					onClick: onContinue,
					children: t("start.continueGame")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 w-full text-sm text-muted",
					onClick: onRules,
					children: t("start.how")
				})
			]
		}), rules && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { onClose: onCloseRules })]
	});
}
var SplitComponent = GameApp;
//#endregion
export { SplitComponent as component };
