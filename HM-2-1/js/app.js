let items = [];

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const errorContainer = document.getElementById("errorContainer");

// טעינת הנתונים
fetch("data/items.json")
  .then((res) => res.json())
  .then((data) => {
    items = data;
    renderItems(items);
    applyStoredTheme();
  })
  .catch(() => {
    errorContainer.textContent = "Failed to load items.";
  });

// פונקציית הצגת פריטים
function renderItems(data) {
  cardsContainer.innerHTML = "";

  if (data.length === 0) {
    cardsContainer.innerHTML = `<p class="text-center w-100">No items found.</p>`;
    return;
  }

  data.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.title}" onerror="this.style.display='none'">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(col);
  })
}

// חיפוש חי
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.author.toLowerCase().includes(query)
  );
  renderItems(filtered);
});

// מיון
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  let sorted = [...items];

  if (value === "title-asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (value === "title-desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  } else if (value === "author-asc") {
    sorted.sort((a, b) => a.author.localeCompare(b.author));
  } else if (value === "author-desc") {
    sorted.sort((a, b) => b.author.localeCompare(a.author));
  }

  renderItems(sorted);
});

// מצב כהה/בהיר
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

function applyStoredTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
}
