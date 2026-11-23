const main_window = document.querySelector(".main_window");
const window_header = document.querySelector(".window_header");
const visible_width = 120;
let window_x = 0;
let window_y = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function move_window(x, y, scroll) {
  const { offsetLeft, offsetTop, offsetWidth } = main_window;
  const min_x = visible_width - offsetWidth - offsetLeft;
  const max_x =
    document.documentElement.clientWidth - visible_width - offsetLeft;
  const min_y = scroll - offsetTop;
  const max_y = min_y + window.innerHeight - window_header.offsetHeight;

  window_x = clamp(x, min_x, max_x);
  window_y = clamp(y, min_y, max_y);
  main_window.style.transform = `translate(${window_x}px, ${window_y}px)`;
}

function save_window() {
  try {
    const pos = [
      main_window.offsetLeft + window_x,
      main_window.offsetTop + window_y,
    ];
    sessionStorage.setItem("window_pos", JSON.stringify(pos));
  } catch {}
}

function restore_window() {
  try {
    const pos = JSON.parse(sessionStorage.getItem("window_pos"));
    if (!pos) return;
    main_window.classList.add("moved");
    move_window(
      pos[0] - main_window.offsetLeft,
      pos[1] - main_window.offsetTop,
      0,
    );
  } catch {}
}

window_header.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || !event.isPrimary) return;
  event.preventDefault();

  const start_x = event.pageX - window_x;
  const start_y = event.pageY - window_y;
  const drag = new AbortController();
  const { signal } = drag;

  window_header.setPointerCapture(event.pointerId);
  main_window.classList.add("moved");

  window_header.addEventListener(
    "pointermove",
    (move) => {
      move_window(move.pageX - start_x, move.pageY - start_y, window.scrollY);
    },
    { signal },
  );
  window_header.addEventListener(
    "lostpointercapture",
    () => {
      drag.abort();
      save_window();
    },
    { signal },
  );
});

window.addEventListener("resize", () => {
  if (main_window.classList.contains("moved")) {
    move_window(window_x, window_y, window.scrollY);
  }
});

restore_window();
