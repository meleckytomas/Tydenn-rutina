const routine = [
  {
    title: "Komunikace",
    tasks: [
      {
        text: "Vyčistit Outlook a Mail",
        note: "Inbox Zero. Odpovědět, delegovat, naplánovat nebo smazat. Nenechávat otevřené e-maily jako připomínky."
      },
      {
        text: "Zpracovat LinkedIn zprávy",
        note: "Odpovědět na zprávy, projít nové kontakty, označit zajímavé firmy a domluvit případné schůzky."
      },
      {
        text: "Zpracovat Teams, WhatsApp a SMS zprávy",
        note: "Dohledat otevřené konverzace, odpovědět na nevyřízené požadavky a vytvořit úkoly z důležitých zpráv."
      },
      {
        text: "Projít poznámky z iPadu",
        note: "Převést nápady, úkoly a poznámky do CRM, Asany, kalendáře nebo seznamu úkolů."
      }
    ]
  },
  {
    title: "Obchod",
    tasks: [
      {
        text: "Zkontrolovat příležitosti bez aktivity déle než 14 dní",
        note: "Každá aktivní příležitost musí mít další krok, termín nebo plán."
      },
      {
        text: "Vybrat 3 firmy k oslovení na příští týden",
        note: "Ideálně firmy s potenciálem pro Team assistant, digitalizaci dokumentů, vytěžování dat nebo formuláře ve výrobě."
      }
    ]
  },
  {
    title: "Znalostní báze a AI",
    tasks: [
      {
        text: "Doplnit nové reference, argumenty a poznatky",
        note: "Nové reference, námitky zákazníků, argumenty proti konkurenci, zajímavé integrace, DORA, NIS2 a úspěšné obchodní postupy."
      },
      {
        text: "Zapsat nové nápady pro Codex a AI asistenty",
        note: "Nápady na automatizaci, nové asistenty, zlepšení obchodu, marketingu nebo interních procesů."
      }
    ]
  },
  {
    title: "Marketing a osobní značka",
    tasks: [
      {
        text: "Naplánovat LinkedIn příspěvky na další týden",
        note: "Minimálně 1 až 2 témata z praxe, zákaznických projektů nebo aktuálních trendů."
      },
      {
        text: "Připravit témata a náměty pro budoucí obsah",
        note: "Uložit si nápady na příspěvky, články, webináře nebo případové studie."
      }
    ]
  },
  {
    title: "Kalendář a plánování",
    tasks: [
      {
        text: "Projít následující 4 týdny v kalendáři",
        note: "Zkontrolovat důležité schůzky, dovolené, konference, prezentace a termíny nabídek."
      },
      {
        text: "Vyblokovat čas na hlubokou práci",
        note: "Rezervovat si souvislé bloky bez schůzek na důležité projekty a strategickou práci."
      },
      {
        text: "Nechat alespoň 40 % kapacity volné",
        note: "Nevytvářet kalendář na 100 %. Ponechat prostor pro obchod, zákazníky a nečekané úkoly."
      }
    ]
  },
  {
    title: "Zdraví a energie",
    tasks: [
      {
        text: "Zkontrolovat rehabilitaci Achillovky",
        note: "Průběh léčby, cvičení, fyzioterapie a plán na další týden."
      },
      {
        text: "Naplánovat pohyb na další týden",
        note: "Rehabilitace, chůze, posilování horní části těla, případně další povolené aktivity."
      },
      {
        text: "Zkontrolovat spánek a regeneraci",
        note: "Garmin, pocitová energie, únava, regenerace a stres."
      }
    ]
  },
  {
    title: "Rodina",
    tasks: [
      {
        text: "Projít rodinný kalendář",
        note: "Škola, školka, kroužky, návštěvy, oslavy a rodinné akce."
      },
      {
        text: "Naplánovat společný čas s rodinou",
        note: "Vyhradit konkrétní aktivitu s Miškou, Vojtou a Ninou."
      },
      {
        text: "Zkontrolovat víkendové aktivity",
        note: "Mít jasno, co budete dělat a co je potřeba zařídit."
      }
    ]
  },
  {
    title: "Reflexe",
    tasks: [
      {
        text: "Co se tento týden povedlo?",
        note: "3 konkrétní úspěchy."
      },
      {
        text: "Co mě tento týden brzdilo?",
        note: "Najít hlavní překážky nebo ztráty času."
      },
      {
        text: "Co příští týden přestanu dělat?",
        note: "Alespoň jedna věc, kterou eliminovat nebo delegovat."
      },
      {
        text: "Jaká je jedna hlavní priorita příštího týdne?",
        note: "Pokud se podaří jen jedna věc, která to bude?"
      }
    ]
  }
];

const grid = document.querySelector("#routine-grid");
const sectionTemplate = document.querySelector("#section-template");
const taskTemplate = document.querySelector("#task-template");
const weekLabel = document.querySelector("#week-label");
const doneCount = document.querySelector("#done-count");
const remainingCount = document.querySelector("#remaining-count");
const progressPercent = document.querySelector("#progress-percent");
const ringProgress = document.querySelector("#ring-progress");
const resetButton = document.querySelector("#reset-week");
const themeToggle = document.querySelector("#theme-toggle");
const weekSelect = document.querySelector("#week-select");
const currentWeekButton = document.querySelector("#current-week");

const currentWeekKey = getIsoWeekKey(new Date());
const weekIndexKey = "weekly-routine:weeks";
const themeKey = "weekly-routine:theme";
const ringLength = 314;

let selectedWeekKey = currentWeekKey;
let state = loadState();

function getIsoWeekKey(date) {
  const normalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = normalized.getUTCDay() || 7;
  normalized.setUTCDate(normalized.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(normalized.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((normalized - yearStart) / 86400000 + 1) / 7);
  return `${normalized.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function getReadableWeek(date) {
  const formatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const monday = new Date(date);
  const dayNumber = monday.getDay() || 7;
  monday.setDate(monday.getDate() - dayNumber + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${formatter.format(monday)} - ${formatter.format(sunday)}`;
}

function getDateFromIsoWeekKey(weekKey) {
  const [yearText, weekText] = weekKey.split("-W");
  const year = Number(yearText);
  const week = Number(weekText);
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dayNumber = simple.getUTCDay() || 7;

  if (dayNumber <= 4) {
    simple.setUTCDate(simple.getUTCDate() - dayNumber + 1);
  } else {
    simple.setUTCDate(simple.getUTCDate() + 8 - dayNumber);
  }

  return new Date(simple.getUTCFullYear(), simple.getUTCMonth(), simple.getUTCDate());
}

function getStateKey(weekKey) {
  return `weekly-routine:${weekKey}`;
}

function loadState(weekKey = selectedWeekKey) {
  try {
    return JSON.parse(localStorage.getItem(getStateKey(weekKey))) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(getStateKey(selectedWeekKey), JSON.stringify(state));
  saveWeekToIndex(selectedWeekKey);
  renderWeekOptions();
}

function getWeekIndex() {
  try {
    return JSON.parse(localStorage.getItem(weekIndexKey)) || [];
  } catch {
    return [];
  }
}

function saveWeekToIndex(weekKey) {
  const weeks = new Set(getWeekIndex());
  weeks.add(weekKey);
  localStorage.setItem(weekIndexKey, JSON.stringify([...weeks].sort().reverse()));
}

function taskId(sectionIndex, taskIndex) {
  return `s${sectionIndex + 1}-t${taskIndex + 1}`;
}

function renderRoutine() {
  grid.innerHTML = "";

  routine.forEach((section, sectionIndex) => {
    const sectionNode = sectionTemplate.content.firstElementChild.cloneNode(true);
    sectionNode.querySelector(".section-number").textContent = sectionIndex + 1;
    sectionNode.querySelector("h3").textContent = section.title;

    const taskList = sectionNode.querySelector(".task-list");

    section.tasks.forEach((task, taskIndex) => {
      const id = taskId(sectionIndex, taskIndex);
      const taskState = state[id] || {};
      const taskNode = taskTemplate.content.firstElementChild.cloneNode(true);
      const checkbox = taskNode.querySelector("input");
      const reflectionField = taskNode.querySelector(".reflection-field");
      const textarea = taskNode.querySelector("textarea");
      const isReflectionTask = section.title === "Reflexe";

      checkbox.id = `${id}-done`;
      checkbox.checked = Boolean(taskState.done);
      taskNode.querySelector(".task-check").setAttribute("for", checkbox.id);
      taskNode.querySelector(".task-text").textContent = task.text;
      taskNode.querySelector(".task-note").textContent = task.note;

      if (isReflectionTask) {
        textarea.value = taskState.reflection || "";
        textarea.addEventListener("input", () => {
          state[id] = { ...state[id], reflection: textarea.value };
          saveState();
        });
      } else {
        reflectionField.remove();
      }

      checkbox.addEventListener("change", () => {
        state[id] = { ...state[id], done: checkbox.checked };
        saveState();
        updateProgress();
      });

      taskList.append(taskNode);
    });

    grid.append(sectionNode);
  });
}

function renderWeekOptions() {
  const weeks = new Set(getWeekIndex());
  weeks.add(currentWeekKey);
  weeks.add(selectedWeekKey);

  weekSelect.innerHTML = "";

  [...weeks].sort().reverse().forEach((weekKey) => {
    const option = document.createElement("option");
    option.value = weekKey;
    option.textContent = `${weekKey} · ${getReadableWeek(getDateFromIsoWeekKey(weekKey))}`;
    weekSelect.append(option);
  });

  weekSelect.value = selectedWeekKey;
}

function switchWeek(weekKey) {
  selectedWeekKey = weekKey;
  state = loadState(selectedWeekKey);
  weekLabel.textContent = getReadableWeek(getDateFromIsoWeekKey(selectedWeekKey));
  renderWeekOptions();
  renderRoutine();
  updateProgress();
}

function updateProgress() {
  const checkboxes = [...document.querySelectorAll(".task-check input")];
  const done = checkboxes.filter((checkbox) => checkbox.checked).length;
  const total = checkboxes.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  doneCount.textContent = done;
  remainingCount.textContent = total - done;
  progressPercent.textContent = `${percent} %`;
  ringProgress.style.strokeDashoffset = String(ringLength - (ringLength * percent) / 100);
}

function resetCurrentWeek() {
  if (!confirm("Vyčistit checklist a reflexní zápisy pro vybraný týden?")) {
    return;
  }

  state = {};
  localStorage.removeItem(getStateKey(selectedWeekKey));
  renderRoutine();
  updateProgress();
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(themeKey);
  if (storedTheme) {
    applyTheme(storedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

saveWeekToIndex(currentWeekKey);
weekLabel.textContent = getReadableWeek(new Date());
initializeTheme();
renderWeekOptions();
renderRoutine();
updateProgress();

resetButton.addEventListener("click", resetCurrentWeek);
weekSelect.addEventListener("change", () => switchWeek(weekSelect.value));
currentWeekButton.addEventListener("click", () => switchWeek(currentWeekKey));
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});
