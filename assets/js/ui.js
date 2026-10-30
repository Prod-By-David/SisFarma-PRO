// ==========================
// UI RENDERING & MODALS
// ==========================

function renderAllViews() {
    renderDashboard();
    renderInventoryTable();
    renderPOSItems();
    renderInvoicesTable();
    updateLowStockBadge();
}

function renderDashboard() {
    const todaySales = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const lowStockItems = inventory.filter(i => i.stock <= 10);

    document.getElementById('stat-sales-today').innerText = `€${todaySales.toFixed(2)}`;
    document.getElementById('stat-sales-count').innerText = invoices.length;
    document.getElementById('stat-low-stock').innerText = lowStockItems.length;
    document.getElementById('stat-total-items').innerText = inventory.length;
    document.getElementById('stat-invoices-count').innerText = invoices.length;

    // Dashboard Recent Sales Table
    const recentSalesTbody = document.getElementById('dashboard-recent-sales');
    if (invoices.length === 0) {
        recentSalesTbody.innerHTML = `
            <tr><td colspan="5" class="p-6 text-center text-slate-500 font-sans text-xs">${i18n[currentLang].emptyInvoices}</td></tr>
        `;
    } else {
        recentSalesTbody.innerHTML = invoices.slice(0, 5).map(inv => `
            <tr class="hover:bg-slate-800/40">
                <td class="p-2.5 font-bold text-teal-400">${inv.id}</td>
                <td class="p-2.5 font-sans">${inv.customer}</td>
                <td class="p-2.5">€${inv.total.toFixed(2)}</td>
                <td class="p-2.5"><span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-sans">${inv.payment}</span></td>
                <td class="p-2.5 text-right text-slate-400">${inv.date.split(' ')[1]}</td>
            </tr>
        `).join('');
    }

    // Dashboard Low Stock Watchlist
    const lowStockContainer = document.getElementById('dashboard-low-stock-list');
    if (lowStockItems.length === 0) {
        lowStockContainer.innerHTML = `
            <div class="p-4 text-center text-slate-500 text-xs">${i18n[currentLang].emptyInventory}</div>
        `;
    } else {
        lowStockContainer.innerHTML = lowStockItems.map(item => `
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div>
                    <h4 class="font-medium text-slate-200 text-xs">${item.name}</h4>
                    <p class="text-[10px] text-slate-400 font-mono">CNAV: ${item.cnav} | Lote: ${item.batch}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-xs font-bold font-mono ${item.stock === 0 ? 'text-rose-400' : 'text-amber-400'}">${item.stock} uds</span>
                    <button onclick="quickRestock(${item.id})" class="bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 border border-teal-500/30 px-2 py-1 rounded text-[10px] font-medium transition-all">Restock</button>
                </div>
            </div>
        `).join('');
    }
}

function renderInventoryTable(itemsToRender = inventory) {
    const tbody = document.getElementById('inventory-table-body');
    if (itemsToRender.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="8" class="p-8 text-center text-slate-500 text-xs">${i18n[currentLang].emptyInventory}</td></tr>
        `;
        return;
    }

    tbody.innerHTML = itemsToRender.map(item => `
        <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-3.5 font-mono text-teal-400 font-semibold">${item.cnav}</td>
            <td class="p-3.5">
                <div class="font-semibold text-slate-100">${item.name}</div>
                <div class="text-[10px] text-slate-400">${item.active}</div>
            </td>
            <td class="p-3.5 text-slate-400">${item.category}</td>
            <td class="p-3.5 font-mono text-slate-400">${item.batch} <span class="block text-[10px] text-slate-500">${item.expiry}</span></td>
            <td class="p-3.5 font-mono">
                <span class="${item.stock <= 10 ? 'text-amber-400 font-bold' : 'text-slate-200'}">${item.stock} uds</span>
            </td>
            <td class="p-3.5 font-mono font-bold text-slate-100">€${item.price.toFixed(2)}</td>
            <td class="p-3.5">
                ${item.prescription ? '<span class="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Si (Rx)</span>' : '<span class="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">No</span>'}
            </td>
            <td class="p-3.5 text-right space-x-2">
                <button onclick="editMedicine(${item.id})" class="text-slate-400 hover:text-teal-400 p-1"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
                <button onclick="deleteMedicine(${item.id})" class="text-slate-400 hover:text-rose-400 p-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </td>
        </tr>
    `).join('');
    lucide.createIcons();
}

function filterInventory() {
    const query = document.getElementById('inventory-search').value.toLowerCase();
    const category = document.getElementById('inventory-cat-filter').value;
    const status = document.getElementById('inventory-status-filter').value;

    const filtered = inventory.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query) || item.cnav.includes(query) || item.active.toLowerCase().includes(query);
        const matchesCat = category === 'ALL' || item.category === category;
        let matchesStatus = true;

        if (status === 'IN_STOCK') matchesStatus = item.stock > 10;
        if (status === 'LOW_STOCK') matchesStatus = item.stock > 0 && item.stock <= 10;
        if (status === 'OUT_OF_STOCK') matchesStatus = item.stock === 0;

        return matchesQuery && matchesCat && matchesStatus;
    });

    renderInventoryTable(filtered);
}

function handleSaveMedicine(e) {
    e.preventDefault();
    const id = document.getElementById('med-id').value;
    const cnav = document.getElementById('med-cnav').value;
    const category = document.getElementById('med-category').value;
    const name = document.getElementById('med-name').value;
    const active = document.getElementById('med-active').value;
    const batch = document.getElementById('med-batch').value;
    const stock = parseInt(document.getElementById('med-stock').value);
    const price = parseFloat(document.getElementById('med-price').value);
    const expiry = document.getElementById('med-expiry').value;
    const prescription = document.getElementById('med-prescription').checked;

    if (id) {
        const index = inventory.findIndex(item => item.id == id);
        if (index !== -1) {
            inventory[index] = { id: parseInt(id), cnav, category, name, active, batch, stock, price, expiry, prescription };
            showToast('Medicamento actualizado correctamente', 'success');
        }
    } else {
        const newMed = { id: Date.now(), cnav, category, name, active, batch, stock, price, expiry, prescription };
        inventory.push(newMed);
        showToast('Nuevo medicamento registrado en catálogo', 'success');
    }

    closeModal('add-stock-modal');
    renderAllViews();
}

function editMedicine(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modal-title').innerText = 'Editar Medicamento';
    document.getElementById('med-id').value = item.id;
    document.getElementById('med-cnav').value = item.cnav;
    document.getElementById('med-category').value = item.category;
    document.getElementById('med-name').value = item.name;
    document.getElementById('med-active').value = item.active;
    document.getElementById('med-batch').value = item.batch;
    document.getElementById('med-stock').value = item.stock;
    document.getElementById('med-price').value = item.price;
    document.getElementById('med-expiry').value = item.expiry;
    document.getElementById('med-prescription').checked = item.prescription;

    openModal('add-stock-modal');
}

function deleteMedicine(id) {
    if (confirm('¿Confirmar la eliminación permanente de este medicamento?')) {
        inventory = inventory.filter(i => i.id !== id);
        renderAllViews();
        showToast('Medicamento eliminado del registro', 'info');
    }
}

function quickRestock(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.stock += 30;
        renderAllViews();
        showToast(`Stock de ${item.name} incrementado (+30)`, 'success');
    }
}

function updateLowStockBadge() {
    const count = inventory.filter(i => i.stock <= 10).length;
    const badge = document.getElementById('low-stock-badge');
    if (count > 0) {
        badge.innerText = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function renderInvoicesTable(itemsToRender = invoices) {
    const tbody = document.getElementById('invoices-table-body');
    if (itemsToRender.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="7" class="p-8 text-center text-slate-500 font-sans text-xs">${i18n[currentLang].emptyInvoices}</td></tr>
        `;
        return;
    }

    tbody.innerHTML = itemsToRender.map(inv => `
        <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-3.5 font-bold text-teal-400">${inv.id}</td>
            <td class="p-3.5 font-sans font-medium text-slate-200">${inv.customer}</td>
            <td class="p-3.5 text-slate-400">${inv.date}</td>
            <td class="p-3.5"><span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-sans">${inv.payment}</span></td>
            <td class="p-3.5 font-bold text-white">€${inv.total.toFixed(2)}</td>
            <td class="p-3.5 font-sans">
                <span class="${inv.status === 'Pagada' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} px-2 py-0.5 rounded text-[10px] font-semibold">
                    ${inv.status}
                </span>
            </td>
            <td class="p-3.5 text-right font-sans">
                <button onclick="viewInvoiceReceipt('${inv.id}')" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 flex items-center space-x-1 inline-flex">
                    <i data-lucide="eye" class="w-3 h-3"></i>
                    <span>Ver Factura</span>
                </button>
            </td>
        </tr>
    `).join('');
    lucide.createIcons();
}

function filterInvoices() {
    const query = document.getElementById('invoice-search').value.toLowerCase();
    const status = document.getElementById('invoice-status-filter').value;

    const filtered = invoices.filter(inv => {
        const matchesQuery = inv.id.toLowerCase().includes(query) || inv.customer.toLowerCase().includes(query);
        const matchesStatus = status === 'ALL' || inv.status === status;
        return matchesQuery && matchesStatus;
    });

    renderInvoicesTable(filtered);
}

function viewInvoiceReceipt(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    const subtotal = inv.items.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const tax = subtotal * 0.04;
    openReceiptModal(inv, { subtotal, tax, discount: 0, total: inv.total });
}

function exportInvoicesSimulated() {
    showToast('Generando archivo estructurado de facturas (Simulación Excel/PDF)', 'info');
}

function handleGlobalSearch(query) {
    const resultsBox = document.getElementById('global-search-results');
    if (!query.trim()) {
        resultsBox.classList.add('hidden');
        return;
    }

    const matchedMeds = inventory.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.cnav.includes(query));
    const matchedInvoices = invoices.filter(i => i.id.toLowerCase().includes(query.toLowerCase()) || i.customer.toLowerCase().includes(query.toLowerCase()));

    if (matchedMeds.length === 0 && matchedInvoices.length === 0) {
        resultsBox.innerHTML = '<div class="p-3 text-xs text-slate-500 text-center">Sin coincidencias encontradas</div>';
    } else {
        resultsBox.innerHTML = `
            <div class="p-2 space-y-1 text-xs">
                ${matchedMeds.map(m => `
                    <div onclick="switchTab('inventory'); closeModal('global-search-results')" class="p-2 hover:bg-slate-800 rounded cursor-pointer flex justify-between">
                        <span class="text-slate-200 font-medium">${m.name}</span>
                        <span class="text-teal-400 font-mono font-bold">€${m.price.toFixed(2)}</span>
                    </div>
                `).join('')}
                ${matchedInvoices.map(inv => `
                    <div onclick="switchTab('invoices'); closeModal('global-search-results')" class="p-2 hover:bg-slate-800 rounded cursor-pointer flex justify-between">
                        <span class="text-teal-400 font-mono font-bold">${inv.id} - ${inv.customer}</span>
                        <span class="text-slate-400 font-mono">€${inv.total.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    resultsBox.classList.remove('hidden');
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('flex');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const typeStyles = {
        success: 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200',
        error: 'bg-rose-950/90 border-rose-500/80 text-rose-200',
        warning: 'bg-amber-950/90 border-amber-500/80 text-amber-200',
        info: 'bg-slate-900/90 border-teal-500/80 text-slate-200'
    };

    toast.className = `pointer-events-auto flex items-center space-x-2 px-3.5 py-2.5 rounded-lg border shadow-xl text-xs backdrop-blur-md transition-all duration-300 transform translate-y-2 opacity-0 ${typeStyles[type]}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}