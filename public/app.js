const STORAGE_KEY = "girofood-demo-v1";
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
  orders: [
    { id: "demo-order-001", number: "001", customerId: "c1", status: "delivered", items: [{ productId: "p1", quantity: 1 }], notes: "", createdAt: Date.now() - 3_600_000 },
    { id: "demo-order-002", number: "002", customerId: "c2", status: "received", items: [{ productId: "p2", quantity: 1 }, { productId: "p4", quantity: 1 }], notes: "Sem cebola, por favor.", createdAt: Date.now() - 1_200_000 },
    { id: "demo-order-003", number: "003", customerId: "c3", status: "accepted", items: [{ productId: "p3", quantity: 2 }], notes: "Adicionar colher e guardanapos.", createdAt: Date.now() - 900_000 },
    { id: "demo-order-004", number: "004", customerId: "c4", status: "ready", items: [{ productId: "p5", quantity: 1 }, { productId: "p4", quantity: 1 }], notes: "", createdAt: Date.now() - 600_000 },
    { id: "demo-order-005", number: "005", customerId: "c5", status: "shipped", items: [{ productId: "p1", quantity: 1 }], notes: "Entregar na portaria.", createdAt: Date.now() - 300_000 },
  ],
  restaurant: { name: "GiroFood Pro", email: "demo@girofood.com.br", photo: "" },
};

let state = loadState();
let demoSessionPassword = "girofood123";
let activeView = "orders";
let customerQuery = "";
let productQuery = "";
let orderQuery = "";
let categoryFilter = "Todas as categorias";
let orderFilter = "Todos";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(initialState);
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(initialState),
      ...parsed,
      customers: Array.isArray(parsed.customers) ? parsed.customers : structuredClone(initialState.customers),
      products: Array.isArray(parsed.products) ? parsed.products : structuredClone(initialState.products),
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    };
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
  return `<div class="brand"><span class="brand-mark">♧</span><span>GiroFood</span></div>`;
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
          <div class="field"><label for="login-password">Senha</label><div class="password-wrap"><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha de acesso" required><button class="password-toggle" type="button" aria-label="Mostrar senha" data-action="toggle-password">◉</button></div></div>
          <div class="forgot-row"><button type="button" class="text-button" data-action="forgot-password">Esqueceu sua senha?</button></div>
          <button class="primary-button wide" type="submit">Entrar no GiroFood</button>
          <div class="divider">ou</div>
          <div class="signup-note">Não tem conta? <button type="button" class="text-button" data-action="signup">Cadastre seu restaurante</button></div>
          <div class="demo-note">Ambiente demonstrativo: os dados ficam salvos somente neste navegador.<br>Conta de demonstração: demo@girofood.com.br / girofood123</div>
        </form>
      </section>
    </main>`;
}

const navigation = [
  ["orders", "▧", "Pedidos (Vendas)"],
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
  return ["Todas as categorias", ...new Set(state.products.map((product) => product.category).filter(Boolean))];
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
  return `${heading("Cardápio", "Gerencie os produtos do seu negócio", `<button class="primary-button" type="button" data-action="new-product">＋ Adicionar produto</button>`)}
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
    <section class="login-card" style="margin:0;box-shadow:none">
      <h2 style="text-align:left;margin-bottom:20px">Perfil do restaurante</h2>
      <form id="settings-form">
        <div class="field"><label for="restaurant-name">Nome do restaurante</label><input id="restaurant-name" name="name" required value="${escapeHtml(state.restaurant.name)}"></div>
        <div class="field"><label for="restaurant-email">E-mail</label><input id="restaurant-email" name="email" type="email" required value="${escapeHtml(state.restaurant.email)}"></div>
        <div class="field"><label for="restaurant-photo">Foto de perfil (URL)</label><input id="restaurant-photo" name="photo" type="url" placeholder="https://..." value="${escapeHtml(state.restaurant.photo)}"></div>
        <button class="primary-button" type="submit">Salvar alterações</button>
        <button class="secondary-button" type="button" style="margin-left:7px" data-action="logout">Sair da conta</button>
      </form>
      <div class="demo-note">Esta demonstração salva as informações no armazenamento local deste navegador. Não use dados reais ou senhas pessoais.</div>
    </section>`;
}

function render() {
  if (sessionStorage.getItem("girofood-auth") !== "true") {
    renderLogin();
    return;
  }
  const view = activeView === "menu" ? renderProducts()
    : activeView === "customers" ? renderCustomers()
      : activeView === "settings" ? renderSettings()
        : renderOrders();
  document.querySelector("#app").innerHTML = `<div class="app-shell">
    <aside class="sidebar">${appLogo()}<nav class="nav-list" aria-label="Navegação principal">${navigation.map(([key, icon, label]) => navButton(key, icon, label)).join("")}</nav>
      <div class="sidebar-promo"><b>GiroFood Pro</b><p>Desbloqueie integrações diretas com iFood, WhatsApp e outros.</p></div>
    </aside>
    <main class="main-area">
      <header class="mobile-header">${appLogo()}<div style="display:flex;align-items:center;gap:12px"><button class="top-icon" type="button" aria-label="Notificações">♧</button>${profileButton()}</div></header>
      <div class="topbar"><button class="top-icon" type="button" aria-label="Notificações">♧<span class="notification-dot">${state.orders.filter((order) => order.status === "received").length}</span></button>${profileButton()}</div>
      ${view}
    </main>
    <nav class="mobile-nav" aria-label="Navegação móvel">${[["orders", "▧", "Pedidos"], ["menu", "◫", "Cardápio"], ["customers", "♙", "Clientes"], ["settings", "⚙", "Config."]].map(([key, icon, label]) => `<button type="button" class="${activeView === key ? "active" : ""}" data-view="${key}"><span>${icon}</span>${label}</button>`).join("")}</nav>
  </div>`;
  attachViewListeners();
}

function attachViewListeners() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    activeView = button.dataset.view;
    render();
  }));
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
    const values = new FormData(event.currentTarget);
    state.restaurant.name = values.get("name").trim();
    state.restaurant.email = values.get("email").trim();
    state.restaurant.photo = values.get("photo").trim();
    saveState();
    toast("Configurações salvas!");
    render();
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
    const items = fields.map((row) => ({
      productId: row.querySelector("[name=productId]").value,
      quantity: Math.max(1, Number(row.querySelector("[name=quantity]").value)),
    }));
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
    state.restaurant = { name: String(values.name).trim(), email: String(values.email).trim(), photo: "" };
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
