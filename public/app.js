const STORAGE_KEY = "girofood-demo-v1";
const DEMO_ACCOUNT = { email: "contademo@gmail.com", password: "Demo05@" };
const MAX_LOGO_SIZE = 1024 * 1024;
const CUSTOMER_PHOTOS = [
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=44",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=5",
];
const GALLERY = [
  "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=700",
  "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=700",
  "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=700",
  "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=700",
  "https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg?auto=compress&cs=tinysrgb&w=700",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=700",
];
const SYSTEM_BANNERS = [
  {
    eyebrow: "SEU NEGÓCIO EM UM SÓ LUGAR",
    title: "Acompanhe o ritmo do seu restaurante.",
    description: "Veja pedidos, entregas e resultados do período em um painel feito para você.",
    action: "Ver pedidos",
    view: "orders",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "banner-citrus",
  },
  {
    eyebrow: "ORGANIZAÇÃO QUE DÁ RESULTADO",
    title: "Cada pedido conta uma história.",
    description: "Acompanhe o fluxo da cozinha e mantenha sua operação sempre em movimento.",
    action: "Abrir financeiro",
    view: "finance",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "banner-tomato",
  },
  {
    eyebrow: "SEUS RESULTADOS, SEM COMPLICAÇÃO",
    title: "Decisões melhores começam com dados.",
    description: "Consulte o faturamento demonstrativo e descubra os produtos que mais saem.",
    action: "Ver financeiro",
    view: "finance",
    image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "banner-pepper",
  },
];
const LEGACY_DEMO_ORDER_IDS = new Set([
  "demo-order-001",
  "demo-order-002",
  "demo-order-003",
  "demo-order-004",
  "demo-order-005",
]);
const DEMO_PRODUCTS = [
  { id: "p1", price: 48.9 },
  { id: "p2", price: 34.5 },
  { id: "p3", price: 22 },
  { id: "p4", price: 6.5 },
  { id: "p5", price: 18 },
];

function createDemoOrders() {
  const dailyCounts = [7, 5, 6, 4, 5, 3, 6, 4, 5, 7, 3, 4, 6, 5, 4, 3, 6, 4, 5, 6, 3, 4, 5, 6, 4, 3, 5, 4, 6, 5];
  const statusCycle = ["delivered", "accepted", "delivered", "received", "delivered", "cancelled", "delivered", "shipped", "ready", "delivered"];
  const orders = [];
  let sequence = 0;

  dailyCounts.forEach((count, daysAgo) => {
    for (let index = 0; index < count; index += 1) {
      const createdAt = new Date();
      if (daysAgo === 0) {
        const minuteOfDay = Math.max(0, createdAt.getHours() * 60 + createdAt.getMinutes() - index * 25);
        createdAt.setHours(Math.floor(minuteOfDay / 60), minuteOfDay % 60, 0, 0);
      } else {
        createdAt.setDate(createdAt.getDate() - daysAgo);
        createdAt.setHours(11 + ((sequence * 7) % 10), (sequence * 13) % 60, 0, 0);
      }

      const primaryProduct = DEMO_PRODUCTS[sequence % DEMO_PRODUCTS.length];
      const items = [{
        productId: primaryProduct.id,
        quantity: sequence % 6 === 0 ? 2 : 1,
        price: primaryProduct.price,
      }];
      if (sequence % 3 === 0) {
        const extraProduct = DEMO_PRODUCTS[(sequence + 2) % DEMO_PRODUCTS.length];
        items.push({ productId: extraProduct.id, quantity: 1, price: extraProduct.price });
      }

      orders.push({
        id: `demo-order-sample-${String(sequence + 1).padStart(3, "0")}`,
        number: String(sequence + 101).padStart(3, "0"),
        customerId: `c${(sequence % 5) + 1}`,
        status: statusCycle[sequence % statusCycle.length],
        items,
        notes: "",
        createdAt: createdAt.getTime(),
      });
      sequence += 1;
    }
  });

  return orders;
}

const initialState = {
  customers: [
    { id: "c1", name: "Carlos Eduardo Silva", phone: "(11) 98765-4321", email: "carlos.silva@gmail.com", address: "Av. Paulista, 1000 - Bela Vista", photo: CUSTOMER_PHOTOS[0] },
    { id: "c2", name: "Mariana Costa Santos", phone: "(11) 99123-5566", email: "mari.costa@hotmail.com", address: "Rua Augusta, 450 - Consolação", photo: CUSTOMER_PHOTOS[1] },
    { id: "c3", name: "Thiago Henrique Souza", phone: "(21) 98111-2233", email: "thiago.souza@outlook.com", address: "Av. Atlântica, 200 - Copacabana", photo: CUSTOMER_PHOTOS[2] },
    { id: "c4", name: "Ana Beatriz Oliveira", phone: "(31) 97333-8899", email: "ana.bea@gmail.com", address: "Rua Bahia, 89 - Lourdes", photo: CUSTOMER_PHOTOS[3] },
    { id: "c5", name: "Rodrigo Almeida Lima", phone: "(11) 96544-0011", email: "rodrigo.lima@yahoo.com.br", address: "Alameda Lorena, 1200 - Jardins", photo: CUSTOMER_PHOTOS[4] },
  ],
  products: [
    { id: "p1", name: "Pizza Calabresa Suprema", category: "Pizzas", description: "Molho artesanal, mozzarella, calabresa defumada fatiada, cebola roxa e azeitonas.", price: 48.9, image: GALLERY[0], active: true },
    { id: "p2", name: "Giro Burger Duplo", category: "Burgers", description: "Dois smash burgers de 120g, cheddar derretido, bacon crocante, maionese da casa no pão brioche.", price: 34.5, image: GALLERY[1], active: true },
    { id: "p3", name: "Açaí na Tigela 500ml", category: "Sobremesas", description: "Açaí premium com morango fatiado, banana e leite em pó.", price: 22, image: GALLERY[2], active: true },
    { id: "p4", name: "Refrigerante Guaraná 350ml", category: "Bebidas", description: "Lata trincando de gelada para acompanhar seu pedido.", price: 6.5, image: GALLERY[3], active: true },
    { id: "p5", name: "Batata Frita Rústica", category: "Acompanhamentos", description: "Batatas rústicas fritas na hora com sal de páprica e alecrim fresco.", price: 18, image: GALLERY[4], active: false },
  ],
  orders: createDemoOrders(),
  demoDataVersion: 2,
  categories: [],
  restaurant: { name: "GiroFood Pro", email: DEMO_ACCOUNT.email, photo: "", logo: "" },
};

let state = loadState();
let demoSessionPassword = DEMO_ACCOUNT.password;
let activeView = "orders";
let customerQuery = "";
let productQuery = "";
let orderQuery = "";
let categoryFilter = "Todas as categorias";
let orderFilter = "Todos";
let reportPeriod = "day";
let activeBanner = 0;
let bannerTimer;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(initialState);
    const parsed = JSON.parse(saved);
    const restaurant = { ...initialState.restaurant, ...(parsed.restaurant || {}) };
    if (restaurant.email === "demo@girofood.com.br") restaurant.email = DEMO_ACCOUNT.email;
    const savedOrders = Array.isArray(parsed.orders) ? parsed.orders : [];
    const migrateDemoOrders = restaurant.email === DEMO_ACCOUNT.email
      && savedOrders.some((order) => LEGACY_DEMO_ORDER_IDS.has(order.id));
    const orders = migrateDemoOrders
      ? [...initialState.orders, ...savedOrders.filter((order) => !LEGACY_DEMO_ORDER_IDS.has(order.id))]
      : savedOrders;
    const loadedState = {
      ...structuredClone(initialState),
      ...parsed,
      customers: Array.isArray(parsed.customers) ? parsed.customers : structuredClone(initialState.customers),
      products: Array.isArray(parsed.products) ? parsed.products : structuredClone(initialState.products),
      orders,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      restaurant,
      demoDataVersion: 2,
    };
    if (migrateDemoOrders) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
      } catch (error) {
        console.error("Não foi possível atualizar os dados demonstrativos dos pedidos.", error);
      }
    }
    return loadedState;
  } catch (error) {
    console.error("Não foi possível carregar os dados locais do GiroFood.", error);
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function currency(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "GF";
}

function photoAvatar(customer, className = "avatar") {
  const image = customer.photo
    ? `<img src="${escapeHtml(customer.photo)}" alt="" data-remove-on-error>`
    : "";
  return `<span class="${className}">${image}${escapeHtml(initials(customer.name))}</span>`;
}

function toast(message, error = false) {
  let region = document.querySelector(".toast-region");
  if (!region) {
    region = document.createElement("div");
    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    document.body.append(region);
  }
  const item = document.createElement("div");
  item.className = `toast${error ? " error" : ""}`;
  item.textContent = message;
  region.append(item);
  setTimeout(() => item.remove(), 3200);
}

function appLogo() {
  const logo = state.restaurant.logo || "/logo.png";
  const name = state.restaurant.name || "GiroFood";
  return `<div class="brand"><img class="brand-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(name)}"></div>`;
}

function renderLogin() {
  document.querySelector("#app").innerHTML = `
    <main class="login-page">
      <section class="login-hero">
        ${appLogo()}
        <div class="hero-copy">
          <h1>Seu negócio mais simples, organizado e conectado.</h1>
          <p>Organize vendas, clientes, produtos e finanças em um único sistema, simples, ágil e intuitivo.</p>
        </div>
        <div class="quote">“O GiroFood organizou nossa lanchonete de um jeito que nunca achamos possível.”<br><b>— Carlos A., Lanchonete Padrão</b></div>
      </section>
      <section class="login-main">
        <form class="login-card" id="login-form">
          <div class="login-brand">${appLogo()}</div>
          <h2>Acesse sua conta</h2>
          <p>Gerencie seus pedidos de forma simples e rápida</p>
          <div class="field"><label for="login-email">E-mail ou Usuário</label><input id="login-email" name="email" type="email" autocomplete="username" placeholder="exemplo@girofood.com.br" required value="${escapeHtml(state.restaurant.email)}"></div>
          <div class="field"><label for="login-password">Senha</label><div class="password-wrap"><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha de acesso" required value="${state.restaurant.email.toLowerCase() === DEMO_ACCOUNT.email ? escapeHtml(DEMO_ACCOUNT.password) : ""}"><button class="password-toggle" type="button" aria-label="Mostrar senha" data-action="toggle-password">◉</button></div></div>
          <div class="forgot-row"><button type="button" class="text-button" data-action="forgot-password">Esqueceu sua senha?</button></div>
          <button class="primary-button wide" type="submit">Entrar no GiroFood</button>
          <div class="divider">ou</div>
          <div class="signup-note">Não tem conta? <button type="button" class="text-button" data-action="signup">Cadastre seu restaurante</button></div>
          <div class="demo-note">Ambiente demonstrativo: os dados ficam salvos somente neste navegador.</div>
        </form>
      </section>
    </main>`;
}

const navigation = [
  ["dashboard", "▦", "Dashboard"],
  ["orders", "▧", "Pedidos (Vendas)"],
  ["finance", "R$", "Financeiro"],
  ["menu", "◫", "Cardápio"],
  ["customers", "♙", "Cadastro de Clientes"],
  ["settings", "⚙", "Configurações"],
];

function navButton(view, icon, label) {
  return `<button class="nav-item${activeView === view ? " active" : ""}" type="button" data-view="${view}"><span class="nav-icon">${icon}</span>${label}</button>`;
}

function profileButton() {
  const photo = state.restaurant.photo || "https://i.pravatar.cc/80?img=47";
  return `<button class="profile-button" type="button" data-view="settings"><img src="${escapeHtml(photo)}" alt=""><span class="profile-meta"><b>${escapeHtml(state.restaurant.name || "Meu restaurante")}</b><span>Administrador</span></span></button>`;
}

function heading(title, description, action = "") {
  return `<div class="page-heading"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
}

function customerOrders(customerId) {
  return state.orders.filter((order) => order.customerId === customerId);
}

function customerLastOrder(customerId) {
  const orders = customerOrders(customerId).sort((a, b) => b.createdAt - a.createdAt);
  if (!orders.length) return "—";
  return new Date(orders[0].createdAt).toLocaleDateString("pt-BR");
}

function renderCustomerRows(customers) {
  if (!customers.length) return `<tr><td colspan="6"><div class="empty-state">Nenhum cliente encontrado. Cadastre seu primeiro cliente.</div></td></tr>`;
  return customers.map((customer) => {
    const orders = customerOrders(customer.id);
    return `<tr>
      <td><span class="customer-name">${photoAvatar(customer)}${escapeHtml(customer.name)}</span></td>
      <td>${escapeHtml(customer.phone)}</td><td>${escapeHtml(customer.email)}</td><td>${escapeHtml(customer.address || "—")}</td>
      <td><span class="count-badge">${orders.length}</span></td><td>${customerLastOrder(customer.id)}</td>
      <td><div class="row-actions"><button class="icon-button delete" type="button" title="Excluir cliente" aria-label="Excluir cliente" data-action="delete-customer" data-id="${customer.id}">▣</button><button class="icon-button" type="button" title="Editar cliente" aria-label="Editar cliente" data-action="edit-customer" data-id="${customer.id}">✎</button></div></td>
    </tr>`;
  }).join("");
}

function renderCustomerCards(customers) {
  if (!customers.length) return `<div class="empty-state">Nenhum cliente encontrado. Cadastre seu primeiro cliente.</div>`;
  return customers.map((customer) => `<article class="customer-card">
    <div class="customer-card-top">${photoAvatar(customer)}<span class="customer-name">${escapeHtml(customer.name)}</span>
      <button class="icon-button delete" type="button" title="Excluir cliente" aria-label="Excluir cliente" data-action="delete-customer" data-id="${customer.id}">▣</button>
      <button class="icon-button" type="button" title="Editar cliente" aria-label="Editar cliente" data-action="edit-customer" data-id="${customer.id}">✎</button>
    </div>
    <div class="customer-detail"><span>Fone: ${escapeHtml(customer.phone)}</span><span class="count-badge">${customerOrders(customer.id).length} pedidos</span><span>Último: ${customerLastOrder(customer.id)}</span><span class="customer-address">${escapeHtml(customer.address || "Endereço não informado")}</span></div>
  </article>`).join("");
}

function renderCustomers() {
  const customers = state.customers.filter((customer) => `${customer.name} ${customer.phone} ${customer.email}`.toLowerCase().includes(customerQuery.toLowerCase()));
  return `${heading("Cadastro de Clientes", "Gerencie seus clientes cadastrados", `<button class="primary-button" type="button" data-action="new-customer">＋ Cadastrar cliente</button>`)}
    <div class="toolbar">
      <div class="search-wrap"><input class="search-input" id="customer-search" type="search" placeholder="Buscar cliente por nome ou telefone..." value="${escapeHtml(customerQuery)}"></div>
      <select class="select-control" id="customer-sort" aria-label="Ordenar clientes"><option value="recent">◌ Ordenar por mais pedidos</option><option value="name">Ordenar por nome</option><option value="newest">Mais recentes primeiro</option></select>
    </div>
    <div class="table-wrap"><table class="customer-table"><thead><tr><th>Nome</th><th>Telefone</th><th>E-mail</th><th>Endereço</th><th>Pedidos</th><th>Último pedido</th><th>Ações</th></tr></thead><tbody>${renderCustomerRows(customers)}</tbody></table></div>
    <div class="mobile-list">${renderCustomerCards(customers)}</div>`;
}

function categories() {
  const names = [...(state.categories || []), ...state.products.map((product) => product.category)]
    .filter((name) => typeof name === "string" && name.trim())
    .filter((name, index, list) => list.findIndex((item) => item.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR")) === index);
  return ["Todas as categorias", ...names];
}

function renderProducts() {
  const products = state.products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(productQuery.toLowerCase())
    && (categoryFilter === "Todas as categorias" || product.category === categoryFilter));
  const cards = products.length ? products.map((product) => `<article class="product-card">
    <div class="product-photo"><img src="${escapeHtml(product.image || GALLERY[0])}" alt="${escapeHtml(product.name)}" loading="lazy" data-product-image><span class="category-tag">${escapeHtml(product.category)}</span><span class="status-tag${product.active ? "" : " inactive"}">${product.active ? "ATIVO" : "INATIVO"}</span></div>
    <div class="product-info"><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p></div>
    <div class="product-footer"><span class="product-price">${currency(product.price)}</span><div class="product-actions">
      <button class="icon-button" type="button" title="Editar produto" aria-label="Editar produto" data-action="edit-product" data-id="${product.id}">✎</button>
      <button class="icon-button delete" type="button" title="Excluir produto" aria-label="Excluir produto" data-action="delete-product" data-id="${product.id}">▣</button>
    </div></div></article>`).join("") : `<div class="empty-state">Nenhum produto encontrado.</div>`;
  return `${heading("Cardápio", "Gerencie os produtos do seu negócio", `<div class="heading-actions"><button class="secondary-button" type="button" data-action="new-category">＋ Criar categoria</button><button class="primary-button" type="button" data-action="new-product">＋ Adicionar produto</button></div>`)}
    <div class="toolbar">
      <div class="search-wrap"><input class="search-input" id="product-search" type="search" placeholder="Buscar produto..." value="${escapeHtml(productQuery)}"></div>
      <select class="select-control" id="category-filter" aria-label="Filtrar por categoria">${categories().map((category) => `<option${category === categoryFilter ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select>
    </div><div class="product-grid">${cards}</div>`;
}

const orderStages = [
  ["received", "RECEBIDOS"],
  ["accepted", "ACEITOS"],
  ["ready", "PRONTOS"],
];
const stageLabel = { received: "Recebido", accepted: "Aceito", ready: "Pronto", shipped: "Saiu para entrega", delivered: "Entregue", cancelled: "Cancelado" };

function customerName(order) {
  return state.customers.find((customer) => customer.id === order.customerId)?.name || order.customerName || "Cliente removido";
}

function orderTotal(order) {
  return order.items.reduce((sum, item) => {
    const product = state.products.find((candidate) => candidate.id === item.productId);
    return sum + (Number(item.price ?? product?.price ?? 0) * Number(item.quantity || 0));
  }, 0);
}

const reportPeriods = {
  day: "Hoje",
  week: "Últimos 7 dias",
  month: "Este mês",
};
const reportStatuses = [
  ["received", "Recebidos"],
  ["accepted", "Aceitos"],
  ["ready", "Prontos"],
  ["shipped", "Em entrega"],
  ["delivered", "Entregues"],
  ["cancelled", "Cancelados"],
];

function ordersInReportPeriod() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (reportPeriod === "week") start.setDate(start.getDate() - 6);
  if (reportPeriod === "month") start.setDate(1);
  return state.orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return !Number.isNaN(createdAt.getTime()) && createdAt >= start && createdAt <= now;
  });
}

function reportPeriodFilter() {
  return `<label class="report-filter">Período<select class="select-control" id="report-period" aria-label="Filtrar por período">${Object.entries(reportPeriods).map(([value, label]) => `<option value="${value}"${reportPeriod === value ? " selected" : ""}>${label}</option>`).join("")}</select></label>`;
}

function reportBuckets() {
  const now = new Date();
  const orders = ordersInReportPeriod();
  let starts;
  let labelForDate;
  if (reportPeriod === "day") {
    starts = Array.from({ length: 8 }, (_, index) => {
      const start = new Date(now);
      start.setMinutes(0, 0, 0);
      start.setHours(start.getHours() - (7 - index));
      return start;
    });
    labelForDate = (date) => `${String(date.getHours()).padStart(2, "0")}h`;
  } else if (reportPeriod === "week") {
    const firstDay = new Date(now);
    firstDay.setHours(0, 0, 0, 0);
    firstDay.setDate(firstDay.getDate() - 6);
    starts = Array.from({ length: 7 }, (_, index) => {
      const start = new Date(firstDay);
      start.setDate(start.getDate() + index);
      return start;
    });
    labelForDate = (date) => date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  } else {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    starts = Array.from({ length: now.getDate() }, (_, index) => new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1));
    labelForDate = (date) => String(date.getDate());
  }
  return starts.map((start, index) => {
    const end = new Date(start);
    if (reportPeriod === "day") end.setHours(end.getHours() + 1);
    else end.setDate(end.getDate() + 1);
    return {
      label: labelForDate(start),
      orders: orders.filter((order) => {
        const createdAt = new Date(order.createdAt);
        return createdAt >= start && createdAt < end;
      }),
      showLabel: reportPeriod !== "month" || index % 5 === 0 || index === starts.length - 1,
    };
  });
}

function compactCurrency(value) {
  if (value >= 1000) return `R$ ${(value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;
  return `R$ ${Math.round(value)}`;
}

function renderTrendChart(title, description, buckets, values, formatValue) {
  const width = 760;
  const height = 235;
  const left = 78;
  const right = 18;
  const top = 14;
  const bottom = 35;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(1, ...values);
  const ceiling = maxValue * 1.15;
  const points = values.map((value, index) => ({
    x: left + (values.length > 1 ? (index / (values.length - 1)) * plotWidth : plotWidth / 2),
    y: top + plotHeight - (value / ceiling) * plotHeight,
    value,
  }));
  const line = points.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${top + plotHeight} L ${points[0].x} ${top + plotHeight} Z`;
  const grid = Array.from({ length: 5 }, (_, index) => {
    const y = top + (plotHeight / 4) * index;
    const value = ceiling * (1 - index / 4);
    return `<g class="chart-grid"><line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"></line><text x="${left - 9}" y="${y + 3}" text-anchor="end">${escapeHtml(formatValue(value))}</text></g>`;
  }).join("");
  const marks = points.map((point, index) => `<g class="chart-point"><circle cx="${point.x}" cy="${point.y}" r="4"><title>${escapeHtml(buckets[index].label)}: ${escapeHtml(formatValue(point.value))}</title></circle></g>`).join("");
  const labels = buckets.map((bucket, index) => bucket.showLabel
    ? `<text class="chart-label" x="${points[index].x}" y="${height - 8}" text-anchor="middle">${escapeHtml(bucket.label)}</text>`
    : "").join("");
  return `<section class="report-panel report-chart-panel">
    <div class="report-panel-heading"><div><h2>${title}</h2><p>${description}</p></div></div>
    <div class="chart-scroll"><svg class="report-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
      <title>${title}</title>${grid}
      <path class="chart-area" d="${area}"></path><path class="chart-line" d="${line}"></path>${marks}${labels}
    </svg></div>
  </section>`;
}

function renderDashboard() {
  const orders = ordersInReportPeriod();
  const delivered = orders.filter((order) => order.status === "delivered").length;
  const cancelled = orders.filter((order) => order.status === "cancelled").length;
  const inProgress = orders.filter((order) => !["delivered", "cancelled"].includes(order.status)).length;
  const total = orders.length;
  const buckets = reportBuckets();
  const statuses = reportStatuses.map(([status, label]) => ({
    label,
    count: orders.filter((order) => order.status === status).length,
  }));
  return `${heading("Dashboard", "Acompanhe o movimento do seu restaurante") }
    ${renderBannerCarousel()}
    <div class="report-toolbar">${reportPeriodFilter()}<span class="report-period-note">${reportPeriods[reportPeriod]}</span></div>
    <section class="report-cards" aria-label="Indicadores de pedidos">
      <article class="report-card"><span class="report-card-icon orange">▦</span><div><p>Pedidos feitos</p><strong>${total}</strong><small>${reportPeriods[reportPeriod]}</small></div></article>
      <article class="report-card"><span class="report-card-icon green">✓</span><div><p>Entregues</p><strong>${delivered}</strong><small>${total ? `${Math.round((delivered / total) * 100)}% dos pedidos` : "Sem pedidos no período"}</small></div></article>
      <article class="report-card"><span class="report-card-icon red">×</span><div><p>Cancelados</p><strong>${cancelled}</strong><small>${total ? `${Math.round((cancelled / total) * 100)}% dos pedidos` : "Sem pedidos no período"}</small></div></article>
      <article class="report-card"><span class="report-card-icon amber">↗</span><div><p>Em andamento</p><strong>${inProgress}</strong><small>Inclui pedidos em entrega</small></div></article>
    </section>
    ${renderTrendChart("Pedidos ao longo do período", reportPeriods[reportPeriod], buckets, buckets.map((bucket) => bucket.orders.length), (value) => String(Math.round(value)))}
    <section class="report-panel">
      <div class="report-panel-heading"><div><h2>Pedidos por etapa</h2><p>Distribuição dos pedidos no período selecionado</p></div><span class="report-total">${total} ${total === 1 ? "pedido" : "pedidos"}</span></div>
      ${total ? `<div class="status-breakdown">${statuses.map(({ label, count }) => `<div class="status-row"><span>${label}</span><div class="status-track"><span class="status-fill" style="width:${Math.round((count / total) * 100)}%"></span></div><b>${count}</b></div>`).join("")}</div>` : `<div class="empty-state">Nenhum pedido encontrado neste período.</div>`}
    </section>`;
}

function renderFinance() {
  const orders = ordersInReportPeriod();
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  const openOrders = orders.filter((order) => !["delivered", "cancelled"].includes(order.status));
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");
  const revenue = deliveredOrders.reduce((sum, order) => sum + orderTotal(order), 0);
  const pending = openOrders.reduce((sum, order) => sum + orderTotal(order), 0);
  const cancelledValue = cancelledOrders.reduce((sum, order) => sum + orderTotal(order), 0);
  const averageTicket = deliveredOrders.length ? revenue / deliveredOrders.length : 0;
  const buckets = reportBuckets();
  const revenueByBucket = buckets.map((bucket) => bucket.orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + orderTotal(order), 0));
  const soldProducts = new Map();
  deliveredOrders.forEach((order) => order.items.forEach((item) => {
    const product = state.products.find((candidate) => candidate.id === item.productId);
    const name = product?.name || "Produto removido";
    const current = soldProducts.get(item.productId) || { name, quantity: 0 };
    current.quantity += Number(item.quantity) || 0;
    soldProducts.set(item.productId, current);
  }));
  const topProducts = [...soldProducts.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 3);
  return `${heading("Financeiro", "Resumo de faturamento e valores dos pedidos") }
    <div class="report-toolbar">${reportPeriodFilter()}<span class="report-period-note">${reportPeriods[reportPeriod]}</span></div>
    <section class="report-cards finance-cards" aria-label="Indicadores financeiros">
      <article class="report-card"><span class="report-card-icon green">R$</span><div><p>Faturamento bruto</p><strong>${currency(revenue)}</strong><small>Pedidos entregues</small></div></article>
      <article class="report-card"><span class="report-card-icon amber">◷</span><div><p>Em andamento</p><strong>${currency(pending)}</strong><small>${openOrders.length} ${openOrders.length === 1 ? "pedido" : "pedidos"} ainda não entregues</small></div></article>
      <article class="report-card"><span class="report-card-icon red">×</span><div><p>Cancelamentos</p><strong>${currency(cancelledValue)}</strong><small>${cancelledOrders.length} ${cancelledOrders.length === 1 ? "pedido cancelado" : "pedidos cancelados"}</small></div></article>
      <article class="report-card"><span class="report-card-icon orange">↗</span><div><p>Ticket médio</p><strong>${currency(averageTicket)}</strong><small>Por pedido entregue</small></div></article>
    </section>
    ${renderTrendChart("Faturamento bruto", `Pedidos entregues · ${reportPeriods[reportPeriod]}`, buckets, revenueByBucket, compactCurrency)}
    <section class="report-panel finance-panel">
      <div class="report-panel-heading"><div><h2>Produtos mais vendidos</h2><p>Quantidade em pedidos entregues no período</p></div></div>
      ${topProducts.length ? `<div class="top-products">${topProducts.map((product, index) => `<div class="top-product"><span class="top-product-rank">${index + 1}</span><b>${escapeHtml(product.name)}</b><span>${product.quantity} ${product.quantity === 1 ? "unidade" : "unidades"}</span></div>`).join("")}</div>` : `<div class="empty-state">Ainda não há vendas entregues neste período.</div>`}
    </section>
    <p class="finance-disclaimer">Visão demonstrativa: considera o valor dos itens dos pedidos entregues. Pedidos antigos sem preço salvo usam o preço atual do cardápio. Custos, taxas, descontos e formas de pagamento não são registrados; este valor não representa lucro líquido.</p>`;
}

function renderOrderCard(order) {
  const date = new Date(order.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const items = order.items.map((item) => `${item.quantity}× ${escapeHtml(state.products.find((p) => p.id === item.productId)?.name || "Produto removido")}`).join("<br>");
  const nextStage = order.status === "received" ? "accepted" : order.status === "accepted" ? "ready" : "shipped";
  const nextAction = order.status === "received" ? "Aceitar pedido" : order.status === "accepted" ? "Marcar como pronto" : "Saiu para entrega";
  return `<article class="order-card" draggable="true" data-order-id="${order.id}">
    <div class="order-top"><span>Pedido #${escapeHtml(order.number)}</span><time>${date}</time></div>
    <p><b>${escapeHtml(customerName(order))}</b><br>${items}${order.notes ? `<br><i>${escapeHtml(order.notes)}</i>` : ""}</p>
    <div class="order-total">${currency(orderTotal(order))}</div>
    <div class="order-actions">
      <button class="soft-button" type="button" data-action="advance-order" data-id="${order.id}" data-status="${nextStage}">${nextAction}</button>
      <button class="icon-button delete" type="button" aria-label="Cancelar pedido" title="Cancelar pedido" data-action="cancel-order" data-id="${order.id}">×</button>
    </div>
  </article>`;
}

function renderBannerCarousel() {
  return `<section class="banner-carousel" aria-label="Destaques do GiroFood">
    <div class="banner-track">
      ${SYSTEM_BANNERS.map((banner, index) => `<article class="system-banner ${banner.accent}${index === activeBanner ? " is-active" : ""}" data-banner-slide="${index}" aria-hidden="${index !== activeBanner}"${index !== activeBanner ? " inert" : ""} style="--banner-image:url('${banner.image}')">
        <div class="banner-copy">
          <span class="banner-eyebrow"><span></span>${banner.eyebrow}</span>
          <h2>${banner.title}</h2>
          <p>${banner.description}</p>
          <button class="banner-cta" type="button" data-view="${banner.view}">${banner.action}<span aria-hidden="true">↗</span></button>
        </div>
        <div class="banner-art" aria-hidden="true"><span class="banner-sun"></span><span class="banner-orbit"></span><span class="banner-stamp">FEITO<br>COM<br>SABOR</span><span class="banner-index">0${index + 1}</span></div>
      </article>`).join("")}
    </div>
    <div class="banner-controls">
      <div class="banner-dots" role="group" aria-label="Escolher destaque">
        ${SYSTEM_BANNERS.map((banner, index) => `<button class="banner-dot${index === activeBanner ? " is-active" : ""}" type="button" aria-label="Destaque ${index + 1}: ${banner.eyebrow.toLocaleLowerCase("pt-BR")}" aria-current="${index === activeBanner ? "true" : "false"}" data-banner-index="${index}"></button>`).join("")}
      </div>
      <div class="banner-counter"><span>0${activeBanner + 1}</span> / 0${SYSTEM_BANNERS.length}</div>
      <div class="banner-arrows"><button type="button" aria-label="Destaque anterior" data-banner-direction="-1">←</button><button type="button" aria-label="Próximo destaque" data-banner-direction="1">→</button></div>
    </div>
  </section>`;
}

function renderHistoryOrder(order) {
  return `<article class="order-card">
    <div class="order-top"><span>Pedido #${escapeHtml(order.number)} · ${stageLabel[order.status]}</span><time>${new Date(order.createdAt).toLocaleString("pt-BR")}</time></div>
    <p><b>${escapeHtml(customerName(order))}</b></p>
    <div class="order-total">${currency(orderTotal(order))}</div>
    ${order.status === "shipped" ? `<div class="order-actions"><button class="soft-button" type="button" data-action="finish-order" data-id="${order.id}">Marcar como entregue</button></div>` : ""}
  </article>`;
}

function renderOrders() {
  const orders = state.orders.filter((order) => `${order.number} ${customerName(order)}`.toLowerCase().includes(orderQuery.toLowerCase()));
  const historyStatus = { "Saíram": "shipped", "Entregues": "delivered", "Cancelados": "cancelled" }[orderFilter];
  const stageFilter = ["received", "accepted", "ready"].includes(orderFilter) ? orderFilter : null;
  const activeOrders = orderFilter === "Todos"
    ? orders.filter((order) => ["received", "accepted", "ready"].includes(order.status))
    : stageFilter ? orders.filter((order) => order.status === stageFilter) : [];
  const historyOrders = historyStatus ? orders.filter((order) => order.status === historyStatus) : [];
  const counts = Object.fromEntries(orderStages.map(([status]) => [status, activeOrders.filter((order) => order.status === status).length]));
  return `${heading("Pedidos (Vendas)", "Gerencie todos os pedidos do seu negócio em tempo real", `<button class="primary-button" type="button" data-action="new-order">＋ Inserir pedido manual</button>`)}
    <div class="toolbar">
      <div class="search-wrap"><input class="search-input" id="order-search" type="search" placeholder="Buscar pedido, cliente, telefone..." value="${escapeHtml(orderQuery)}"></div>
      <div class="stats-row"><span class="stat-pill">Todos <b>${state.orders.length}</b></span><span class="stat-pill orange">Saíram <b>${state.orders.filter((o) => o.status === "shipped").length}</b></span><span class="stat-pill green">Entregues <b>${state.orders.filter((o) => o.status === "delivered").length}</b></span><span class="stat-pill">Cancelados <b>${state.orders.filter((o) => o.status === "cancelled").length}</b></span></div>
      <div class="toolbar-spacer"></div><select class="select-control" id="order-filter" aria-label="Filtrar pedidos"><option value="Todos">Pedidos de hoje</option><option value="Saíram">Saíram</option><option value="Entregues">Entregues</option><option value="Cancelados">Cancelados</option><option value="received">Recebidos</option><option value="accepted">Aceitos</option><option value="ready">Prontos</option></select>
    </div>
    <div class="kanban">${orderStages.map(([status, title]) => `<section class="kanban-column" data-drop-status="${status}"><div class="column-title">${title} (${counts[status]})</div><div class="column-body">${activeOrders.filter((order) => order.status === status).map(renderOrderCard).join("")}</div></section>`).join("")}</div>
    ${historyStatus ? `<section style="margin-top:14px"><h2 style="font-size:14px">${stageLabel[historyStatus]} (${historyOrders.length})</h2><div class="product-grid">${historyOrders.length ? historyOrders.map(renderHistoryOrder).join("") : `<div class="empty-state">Nenhum pedido nesta etapa.</div>`}</div></section>` : ""}
    <div class="filter-chips" style="margin-top:11px"><button class="chip${orderFilter === "Saíram" ? " active" : ""}" data-order-chip="Saíram">Saíram (${state.orders.filter((o) => o.status === "shipped").length})</button><button class="chip${orderFilter === "Entregues" ? " active" : ""}" data-order-chip="Entregues">Entregues (${state.orders.filter((o) => o.status === "delivered").length})</button><button class="chip${orderFilter === "Cancelados" ? " active" : ""}" data-order-chip="Cancelados">Cancelados (${state.orders.filter((o) => o.status === "cancelled").length})</button><button class="chip${orderFilter === "Todos" ? " active" : ""}" data-order-chip="Todos">Todos</button></div>
    <div class="hint">💡 Dica: arraste os pedidos entre as colunas ou use os botões para atualizar o status rapidamente.</div>`;
}

function renderSettings() {
  return `${heading("Configurações", "Gerencie os dados de acesso do seu restaurante")}
    <section class="settings-card">
      <div class="settings-heading"><span class="settings-eyebrow">PERSONALIZAÇÃO</span><h2>Perfil do restaurante</h2><p>Atualize as informações e a identidade visual do seu negócio.</p></div>
      <form id="settings-form" class="settings-grid">
        <div class="field"><label for="restaurant-name">Nome do restaurante</label><input id="restaurant-name" name="name" required value="${escapeHtml(state.restaurant.name)}"></div>
        <div class="field"><label for="restaurant-email">E-mail</label><input id="restaurant-email" name="email" type="email" required value="${escapeHtml(state.restaurant.email)}"></div>
        <div class="field"><label for="restaurant-photo">Foto de perfil (URL)</label><input id="restaurant-photo" name="photo" type="url" placeholder="https://..." value="${escapeHtml(state.restaurant.photo)}"></div>
        <div class="field span-2"><label for="restaurant-logo">Logo do restaurante</label><div class="logo-editor">
          <div class="logo-preview">${state.restaurant.logo ? `<img src="${escapeHtml(state.restaurant.logo)}" alt="Prévia da logo">` : `<span>Prévia da logo</span>`}</div>
          <div class="logo-upload"><input id="restaurant-logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp"><p>Envie uma imagem PNG, JPG ou WebP de até 1 MB. Ela será exibida na navegação e nas telas do sistema.</p>${state.restaurant.logo ? `<button class="text-button" type="button" data-action="remove-logo">Remover logo personalizada</button>` : ""}</div>
        </div></div>
        <div class="settings-actions"><button class="primary-button" type="submit">Salvar alterações</button><button class="secondary-button" type="button" data-action="logout">Sair da conta</button></div>
      </form>
      <div class="demo-note">Esta demonstração salva as informações no armazenamento local deste navegador. Não use dados reais ou senhas pessoais.</div>
    </section>`;
}

function render() {
  if (bannerTimer) {
    clearInterval(bannerTimer);
    bannerTimer = undefined;
  }
  if (sessionStorage.getItem("girofood-auth") !== "true") {
    renderLogin();
    return;
  }
  const view = activeView === "dashboard" ? renderDashboard()
    : activeView === "finance" ? renderFinance()
      : activeView === "menu" ? renderProducts()
        : activeView === "customers" ? renderCustomers()
          : activeView === "settings" ? renderSettings()
            : renderOrders();
  document.querySelector("#app").innerHTML = `<div class="app-shell">
    <aside class="sidebar">${appLogo()}<nav class="nav-list" aria-label="Navegação principal">${navigation.map(([key, icon, label]) => navButton(key, icon, label)).join("")}</nav>
      <div class="sidebar-promo"><b>GiroFood Pro</b><p>Desbloqueie integrações diretas com iFood, WhatsApp e outros.</p></div>
    </aside>
    <main class="main-area">
      <header class="mobile-header">${appLogo()}<div style="display:flex;align-items:center;gap:12px"><button class="top-icon" type="button" title="Abrir alertas" aria-label="Abrir alertas" data-action="notifications">🔔${state.orders.some((order) => order.status === "received") ? `<span class="notification-dot">${state.orders.filter((order) => order.status === "received").length}</span>` : ""}</button>${profileButton()}</div></header>
      <div class="topbar"><button class="top-icon" type="button" title="Abrir alertas" aria-label="Abrir alertas" data-action="notifications">🔔${state.orders.some((order) => order.status === "received") ? `<span class="notification-dot">${state.orders.filter((order) => order.status === "received").length}</span>` : ""}</button>${profileButton()}</div>
      ${view}
    </main>
    <nav class="mobile-nav" aria-label="Navegação móvel">${[["dashboard", "▦", "Painel"], ["orders", "▧", "Pedidos"], ["finance", "R$", "Financeiro"], ["menu", "◫", "Cardápio"], ["customers", "♙", "Clientes"], ["settings", "⚙", "Config."]].map(([key, icon, label]) => `<button type="button" class="${activeView === key ? "active" : ""}" data-view="${key}"><span>${icon}</span>${label}</button>`).join("")}</nav>
  </div>`;
  attachViewListeners();
}

function attachViewListeners() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    activeView = button.dataset.view;
    render();
  }));
  const bannerSlides = [...document.querySelectorAll("[data-banner-slide]")];
  if (bannerSlides.length > 1) {
    let currentIndex = activeBanner;
    const showBanner = (index) => {
      currentIndex = (index + bannerSlides.length) % bannerSlides.length;
      activeBanner = currentIndex;
      bannerSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.inert = !isActive;
      });
      document.querySelectorAll("[data-banner-index]").forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
      const counter = document.querySelector(".banner-counter");
      if (counter) counter.innerHTML = `<span>0${currentIndex + 1}</span> / 0${bannerSlides.length}`;
    };
    document.querySelectorAll("[data-banner-direction]").forEach((button) => button.addEventListener("click", () => {
      showBanner(currentIndex + Number(button.dataset.bannerDirection));
    }));
    document.querySelectorAll("[data-banner-index]").forEach((button) => button.addEventListener("click", () => {
      showBanner(Number(button.dataset.bannerIndex));
    }));
    const carousel = document.querySelector(".banner-carousel");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      const stopBannerTimer = () => {
        clearInterval(bannerTimer);
        bannerTimer = undefined;
      };
      const startBannerTimer = () => {
        if (!bannerTimer) bannerTimer = setInterval(() => showBanner(currentIndex + 1), 6500);
      };
      carousel.addEventListener("mouseenter", stopBannerTimer);
      carousel.addEventListener("mouseleave", startBannerTimer);
      carousel.addEventListener("focusin", stopBannerTimer);
      carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) startBannerTimer();
      });
      startBannerTimer();
    }
  }
  const search = document.querySelector("#customer-search, #product-search, #order-search");
  if (search) search.addEventListener("input", () => {
    if (search.id === "customer-search") customerQuery = search.value;
    if (search.id === "product-search") productQuery = search.value;
    if (search.id === "order-search") orderQuery = search.value;
    const cursor = search.selectionStart;
    render();
    const next = document.getElementById(search.id);
    next?.focus();
    next?.setSelectionRange(cursor, cursor);
  });
  document.querySelector("#category-filter")?.addEventListener("change", (event) => {
    categoryFilter = event.target.value;
    render();
  });
  document.querySelector("#report-period")?.addEventListener("change", (event) => {
    reportPeriod = event.target.value;
    render();
  });
  document.querySelector("#order-filter")?.addEventListener("change", (event) => {
    orderFilter = event.target.value;
    render();
  });
  document.querySelectorAll("[data-order-chip]").forEach((button) => button.addEventListener("click", () => {
    orderFilter = button.dataset.orderChip;
    render();
  }));
  document.querySelector("#customer-sort")?.addEventListener("change", (event) => {
    const rows = [...state.customers];
    if (event.target.value === "name") rows.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    else if (event.target.value === "newest") rows.reverse();
    else rows.sort((a, b) => customerOrders(b.id).length - customerOrders(a.id).length);
    document.querySelector(".customer-table tbody").innerHTML = renderCustomerRows(rows.filter((customer) => `${customer.name} ${customer.phone} ${customer.email}`.toLowerCase().includes(customerQuery.toLowerCase())));
    document.querySelector(".mobile-list").innerHTML = renderCustomerCards(rows.filter((customer) => `${customer.name} ${customer.phone} ${customer.email}`.toLowerCase().includes(customerQuery.toLowerCase())));
  });
  document.querySelector("#settings-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const file = values.get("logo");
    const saveSettings = async () => {
      if (file.size > MAX_LOGO_SIZE) return toast("A logo deve ter no máximo 1 MB.", true);
      if (file.size && !["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        return toast("Use uma imagem PNG, JPG ou WebP para a logo.", true);
      }
      const previousRestaurant = state.restaurant;
      try {
        const logo = file.size ? await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error || new Error("Falha ao ler o arquivo."));
          reader.readAsDataURL(file);
        }) : state.restaurant.logo;
        state.restaurant = {
          ...state.restaurant,
          name: values.get("name").trim(),
          email: values.get("email").trim(),
          photo: values.get("photo").trim(),
          logo,
        };
        saveState();
      } catch (error) {
        state.restaurant = previousRestaurant;
        console.error("Não foi possível salvar as configurações do restaurante.", error);
        return toast("Não foi possível salvar as configurações. Verifique o espaço disponível no navegador.", true);
      }
      toast("Configurações salvas!");
      render();
    };
    void saveSettings();
  });
  document.querySelectorAll(".order-card").forEach((card) => {
    card.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", card.dataset.orderId));
  });
  document.querySelectorAll("[data-remove-on-error]").forEach((image) => image.addEventListener("error", () => image.remove(), { once: true }));
  document.querySelectorAll("[data-product-image]").forEach((image) => image.addEventListener("error", () => {
    if (image.src !== GALLERY[0]) image.src = GALLERY[0];
  }, { once: true }));
  document.querySelectorAll("[data-drop-status]").forEach((column) => {
    column.addEventListener("dragover", (event) => event.preventDefault());
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      const order = state.orders.find((item) => item.id === event.dataTransfer.getData("text/plain"));
      if (order && order.status !== column.dataset.dropStatus) {
        order.status = column.dataset.dropStatus;
        saveState();
        render();
        toast(`Pedido movido para ${stageLabel[order.status]}.`);
      }
    });
  });
}

function modal(title, content, onSubmit) {
  const root = document.querySelector("#modal-root");
  root.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-header"><h2>${escapeHtml(title)}</h2><button class="modal-close" type="button" aria-label="Fechar" data-action="close-modal">×</button></div>${content}</section></div>`;
  root.querySelector(".modal-backdrop").addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeModal();
  });
  root.querySelector("[data-action='close-modal']").addEventListener("click", closeModal);
  root.querySelector("form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget), event.currentTarget);
  });
  root.querySelectorAll("[data-image-choice]").forEach((button) => button.addEventListener("click", () => {
    root.querySelectorAll("[data-image-choice]").forEach((option) => option.classList.remove("selected"));
    button.classList.add("selected");
    root.querySelector("#product-image").value = button.dataset.imageChoice;
  }));
  root.querySelector("#add-order-item")?.addEventListener("click", () => {
    const container = root.querySelector("#order-items");
    const first = container.querySelector(".order-item");
    const row = first.cloneNode(true);
    row.querySelector("select").selectedIndex = 0;
    row.querySelector("input").value = "1";
    container.append(row);
  });
}

function closeModal() {
  document.querySelector("#modal-root").innerHTML = "";
}

function openAlerts() {
  const alerts = state.orders
    .filter((order) => order.status === "received")
    .sort((a, b) => b.createdAt - a.createdAt);
  const content = alerts.length ? `<div class="alert-list">${alerts.map((order) => `
    <article class="alert-item">
      <div><b>Novo pedido #${escapeHtml(order.number)}</b><p>${escapeHtml(customerName(order))} · ${new Date(order.createdAt).toLocaleString("pt-BR")}</p><strong>${currency(orderTotal(order))}</strong></div>
      <button class="soft-button" type="button" data-action="view-alert-order" data-id="${escapeHtml(order.id)}">Ver pedido</button>
    </article>`).join("")}</div>` : `<div class="empty-state">Tudo em dia! Você não tem novos pedidos.</div>`;
  modal("Central de alertas", content);
}

function openCategoryForm() {
  modal("Criar categoria", `<form><div class="field"><label for="category-name">Nome da categoria *</label><input id="category-name" name="name" required maxlength="40" placeholder="Ex.: Pratos principais"></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancelar</button><button class="primary-button" type="submit">Criar categoria</button></div></form>`, (form) => {
    const name = String(form.get("name") || "").trim();
    if (!name) return toast("Informe o nome da categoria.", true);
    if (categories().slice(1).some((category) => category.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"))) {
      return toast("Essa categoria já existe.", true);
    }
    state.categories.push(name);
    try {
      saveState();
    } catch (error) {
      state.categories.pop();
      console.error("Não foi possível salvar a categoria.", error);
      return toast("Não foi possível salvar a categoria neste navegador.", true);
    }
    closeModal();
    render();
    toast("Categoria criada!");
  });
}

function customerForm(customer = {}) {
  const editing = Boolean(customer.id);
  return `<form><div class="form-grid">
    <div class="field span-2"><label for="customer-name">Nome completo *</label><input id="customer-name" name="name" required maxlength="100" value="${escapeHtml(customer.name || "")}" placeholder="Nome do cliente"></div>
    <div class="field"><label for="customer-phone">Telefone *</label><input id="customer-phone" name="phone" required maxlength="25" value="${escapeHtml(customer.phone || "")}" placeholder="(11) 99999-9999"></div>
    <div class="field"><label for="customer-email">E-mail</label><input id="customer-email" name="email" type="email" maxlength="120" value="${escapeHtml(customer.email || "")}" placeholder="cliente@email.com"></div>
    <div class="field span-2"><label for="customer-address">Endereço</label><input id="customer-address" name="address" maxlength="180" value="${escapeHtml(customer.address || "")}" placeholder="Rua, número, bairro"></div>
    <div class="field span-2"><label for="customer-photo">Foto do cliente (URL opcional)</label><input id="customer-photo" name="photo" type="url" value="${escapeHtml(customer.photo || "")}" placeholder="https://..."></div>
  </div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancelar</button><button class="primary-button" type="submit">${editing ? "Salvar alterações" : "Cadastrar cliente"}</button></div></form>`;
}

function openCustomerForm(customer = {}) {
  modal(customer.id ? "Editar cliente" : "Cadastrar cliente", customerForm(customer), (form) => {
    const values = Object.fromEntries(form.entries());
    if (!values.name.trim() || !values.phone.trim()) return toast("Preencha nome e telefone.", true);
    if (customer.id) Object.assign(state.customers.find((item) => item.id === customer.id), values);
    else state.customers.push({ id: crypto.randomUUID(), ...values });
    saveState();
    closeModal();
    render();
    toast(customer.id ? "Cliente atualizado!" : "Cliente cadastrado!");
  });
}

function productForm(product = {}) {
  const editing = Boolean(product.id);
  const image = product.image || GALLERY[0];
  return `<form><div class="form-grid">
    <div class="field span-2"><label for="product-name">Nome do produto *</label><input id="product-name" name="name" required maxlength="100" value="${escapeHtml(product.name || "")}" placeholder="Ex.: Pizza especial"></div>
    <div class="field"><label for="product-category">Categoria *</label><input id="product-category" name="category" required maxlength="40" list="category-options" value="${escapeHtml(product.category || "")}" placeholder="Ex.: Pizzas"><datalist id="category-options">${categories().slice(1).map((item) => `<option value="${escapeHtml(item)}">`).join("")}</datalist></div>
    <div class="field"><label for="product-price">Preço (R$) *</label><input id="product-price" name="price" type="number" min="0.01" step="0.01" required value="${product.price ?? ""}" placeholder="0,00"></div>
    <div class="field span-2"><label for="product-description">Descrição</label><textarea id="product-description" name="description" maxlength="300" placeholder="Descreva os ingredientes e detalhes">${escapeHtml(product.description || "")}</textarea></div>
    <div class="field span-2"><label for="product-image">Foto do produto (escolha uma da galeria ou cole uma URL)</label><input id="product-image" name="image" type="url" value="${escapeHtml(image)}" placeholder="https://..."><div class="image-gallery">${GALLERY.map((url) => `<button class="gallery-option${url === image ? " selected" : ""}" type="button" aria-label="Selecionar foto da galeria" data-image-choice="${url}"><img src="${url}" alt="" loading="lazy"></button>`).join("")}</div></div>
    <div class="field span-2"><label><input name="active" type="checkbox" ${product.active !== false ? "checked" : ""}> Produto ativo no cardápio</label></div>
  </div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancelar</button><button class="primary-button" type="submit">${editing ? "Salvar alterações" : "Adicionar produto"}</button></div></form>`;
}

function openProductForm(product = {}) {
  modal(product.id ? "Editar produto" : "Adicionar produto", productForm(product), (form) => {
    const values = Object.fromEntries(form.entries());
    const price = Number(values.price);
    if (!values.name.trim() || !values.category.trim() || !Number.isFinite(price) || price <= 0) return toast("Informe nome, categoria e preço válido.", true);
    const updated = { ...values, price, active: form.has("active"), image: values.image || GALLERY[0] };
    if (product.id) Object.assign(state.products.find((item) => item.id === product.id), updated);
    else state.products.push({ id: crypto.randomUUID(), ...updated });
    saveState();
    closeModal();
    render();
    toast(product.id ? "Produto atualizado!" : "Produto adicionado ao cardápio!");
  });
}

function orderForm() {
  const customers = state.customers.map((customer) => `<option value="${customer.id}">${escapeHtml(customer.name)}</option>`).join("");
  const products = state.products.filter((product) => product.active);
  if (!customers || !products.length) return `<div class="empty-state">Cadastre pelo menos um cliente e um produto ativo antes de inserir um pedido.</div><div class="modal-actions"><button class="primary-button" type="button" data-action="close-modal">Entendi</button></div>`;
  const productOptions = products.map((product) => `<option value="${product.id}">${escapeHtml(product.name)} — ${currency(product.price)}</option>`).join("");
  return `<form><div class="form-grid">
    <div class="field span-2"><label for="order-customer">Cliente *</label><select id="order-customer" name="customerId" required>${customers}</select></div>
    <div class="field span-2"><label>Produtos *</label><div id="order-items"><div class="order-item" style="display:grid;grid-template-columns:1fr 74px;gap:8px;margin-bottom:8px"><select name="productId" required>${productOptions}</select><input name="quantity" type="number" min="1" max="99" value="1" required aria-label="Quantidade"></div></div><button class="text-button" id="add-order-item" type="button">＋ Adicionar outro produto</button></div>
    <div class="field span-2"><label for="order-notes">Observações</label><textarea id="order-notes" name="notes" maxlength="250" placeholder="Observações para o preparo"></textarea></div>
  </div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancelar</button><button class="primary-button" type="submit">Criar pedido</button></div></form>`;
}

function openOrderForm() {
  modal("Inserir pedido manual", orderForm(), (values, form) => {
    const fields = [...form.querySelectorAll(".order-item")];
    const items = fields.map((row) => {
      const productId = row.querySelector("[name=productId]").value;
      const product = state.products.find((item) => item.id === productId);
      return {
        productId,
        quantity: Math.max(1, Number(row.querySelector("[name=quantity]").value)),
        price: Number(product?.price) || 0,
      };
    });
    if (!items.length || items.some((item) => !item.productId)) return toast("Adicione ao menos um produto.", true);
    const order = {
      id: crypto.randomUUID(),
      number: String(Math.max(0, ...state.orders.map((item) => Number(item.number) || 0)) + 1).padStart(3, "0"),
      customerId: values.get("customerId"),
      status: "received",
      items,
      notes: String(values.get("notes") || "").trim(),
      createdAt: Date.now(),
    };
    state.orders.unshift(order);
    saveState();
    closeModal();
    activeView = "orders";
    orderFilter = "Todos";
    render();
    toast(`Pedido #${order.number} criado!`);
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "close-modal") closeModal();
  if (action === "notifications") openAlerts();
  if (action === "new-category") openCategoryForm();
  if (action === "remove-logo") {
    const previousLogo = state.restaurant.logo;
    state.restaurant.logo = "";
    try {
      saveState();
    } catch (error) {
      state.restaurant.logo = previousLogo;
      console.error("Não foi possível remover a logo.", error);
      return toast("Não foi possível remover a logo neste navegador.", true);
    }
    render();
    toast("Logo personalizada removida.");
  }
  if (action === "view-alert-order") {
    closeModal();
    activeView = "orders";
    orderFilter = "received";
    orderQuery = "";
    render();
  }
  if (action === "new-customer") openCustomerForm();
  if (action === "edit-customer") {
    const customer = state.customers.find((item) => item.id === id);
    if (customer) openCustomerForm(customer);
  }
  if (action === "delete-customer") {
    const linked = state.orders.some((order) => order.customerId === id && !["cancelled", "delivered"].includes(order.status));
    if (linked) return toast("Não é possível excluir um cliente com pedido em andamento.", true);
    if (confirm("Excluir este cliente? O histórico dos pedidos será mantido.")) {
      state.customers = state.customers.filter((item) => item.id !== id);
      saveState(); render(); toast("Cliente excluído.");
    }
  }
  if (action === "new-product") openProductForm();
  if (action === "edit-product") {
    const product = state.products.find((item) => item.id === id);
    if (product) openProductForm(product);
  }
  if (action === "delete-product") {
    if (confirm("Excluir este produto do cardápio?")) {
      state.products = state.products.filter((item) => item.id !== id);
      saveState(); render(); toast("Produto excluído.");
    }
  }
  if (action === "new-order") openOrderForm();
  if (action === "advance-order") {
    const order = state.orders.find((item) => item.id === id);
    if (order) { order.status = button.dataset.status; saveState(); render(); toast(`Pedido atualizado: ${stageLabel[order.status]}.`); }
  }
  if (action === "finish-order" || action === "cancel-order") {
    const order = state.orders.find((item) => item.id === id);
    if (order) {
      const status = action === "finish-order" ? "delivered" : "cancelled";
      if (action === "cancel-order" && !confirm(`Cancelar o pedido #${order.number}?`)) return;
      order.status = status; saveState(); render(); toast(`Pedido #${order.number} ${status === "delivered" ? "concluído" : "cancelado"}.`);
    }
  }
  if (action === "logout") {
    sessionStorage.removeItem("girofood-auth");
    activeView = "orders";
    render();
  }
  if (action === "toggle-password") {
    const input = document.querySelector("#login-password");
    if (input) input.type = input.type === "password" ? "text" : "password";
  }
  if (action === "forgot-password") toast("No protótipo, use a senha demo ou redefina os dados do navegador.");
  if (action === "signup") openSignup();
});

function openSignup() {
  modal("Cadastrar restaurante", `<form><div class="field"><label for="signup-name">Nome do restaurante *</label><input id="signup-name" name="name" required maxlength="100"></div><div class="field"><label for="signup-email">E-mail *</label><input id="signup-email" name="email" type="email" required></div><div class="field"><label for="signup-password">Senha *</label><input id="signup-password" name="password" type="password" required minlength="8"></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancelar</button><button class="primary-button" type="submit">Criar conta</button></div></form>`, (form) => {
    const values = Object.fromEntries(form.entries());
    if (String(values.password).length < 8) return toast("A senha deve ter pelo menos 8 caracteres.", true);
    state.restaurant = { ...initialState.restaurant, name: String(values.name).trim(), email: String(values.email).trim(), photo: "" };
    demoSessionPassword = String(values.password);
    saveState();
    sessionStorage.setItem("girofood-auth", "true");
    activeView = "orders";
    closeModal();
    render();
    toast("Conta de demonstração criada neste navegador.");
  });
}

document.addEventListener("submit", (event) => {
  if (event.target.id !== "login-form") return;
  event.preventDefault();
  const values = new FormData(event.target);
  if (String(values.get("email")).trim().toLowerCase() !== state.restaurant.email.toLowerCase() || values.get("password") !== demoSessionPassword) {
    return toast("E-mail ou senha incorretos.", true);
  }
  sessionStorage.setItem("girofood-auth", "true");
  render();
});

render();
