// ==========================
// POS & CART MANAGEMENT
// ==========================

function renderPOSItems(itemsToRender = inventory) {
    const grid = document.getElementById('pos-grid');
    
    const categories = ['ALL', ...new Set(inventory.map(i => i.category))];
    const pillsContainer = document.getElementById('pos-category-pills');
    pillsContainer.innerHTML = categories.map(cat => `
        <button onclick="setPOSCategory('${cat}')" class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${selectedPOSCategory === cat ? 'bg-corp-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}">${cat}</button>
    `).join('');

    let filtered = itemsToRender;
    if (selectedPOSCategory !== 'ALL') {
        filtered = filtered.filter(i => i.category === selectedPOSCategory);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500 text-xs">${i18n[currentLang].emptyInventory}</div>`;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div onclick="addToCart(${item.id})" class="corp-card p-3 rounded-xl border border-slate-800 hover:border-corp-500/50 transition-all cursor-pointer group flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-1.5">
                    <span class="text-[9px] font-mono text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded font-semibold">${item.cnav}</span>
                    <span class="text-[10px] font-mono ${item.stock > 0 ? 'text-slate-400' : 'text-rose-400'}">${item.stock} uds</span>
                </div>
                <h4 class="font-semibold text-slate-100 text-xs group-hover:text-teal-400 transition-colors line-clamp-2">${item.name}</h4>
                <p class="text-[10px] text-slate-400 mt-0.5">${item.active}</p>
            </div>
            <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span class="text-xs font-bold font-mono text-white">€${item.price.toFixed(2)}</span>
                <div class="w-6 h-6 rounded bg-corp-600/20 group-hover:bg-corp-600 text-teal-400 group-hover:text-white flex items-center justify-center transition-all">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function setPOSCategory(cat) {
    selectedPOSCategory = cat;
    renderPOSItems();
}

function filterPOSItems() {
    const query = document.getElementById('pos-search').value.toLowerCase();
    const filtered = inventory.filter(i => i.name.toLowerCase().includes(query) || i.cnav.includes(query) || i.active.toLowerCase().includes(query));
    renderPOSItems(filtered);
}

function addToCart(medId) {
    const med = inventory.find(i => i.id === medId);
    if (!med) return;
    if (med.stock <= 0) {
        showToast('Medicamento sin stock disponible', 'error');
        return;
    }

    const existing = cart.find(c => c.id === medId);
    if (existing) {
        if (existing.qty >= med.stock) {
            showToast('Alcanzado el límite máximo de stock disponible', 'warning');
            return;
        }
        existing.qty++;
    } else {
        cart.push({ id: med.id, name: med.name, price: med.price, qty: 1 });
    }

    renderCart();
}

function updateCartQty(medId, delta) {
    const item = cart.find(c => c.id === medId);
    const med = inventory.find(i => i.id === medId);
    if (!item) return;

    item.qty += delta;
    if (med && item.qty > med.stock) {
        item.qty = med.stock;
        showToast('Límite de stock máximo alcanzado', 'warning');
    }

    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== medId);
    }

    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 text-slate-500 text-xs">
                <i data-lucide="shopping-cart" class="w-8 h-8 mx-auto mb-2 opacity-30"></i>
                <p>${i18n[currentLang].emptyCart}</p>
            </div>
        `;
        calculateCartTotals();
        lucide.createIcons();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <div class="flex-1 pr-2">
                <h4 class="font-medium text-slate-200 truncate">${item.name}</h4>
                <p class="text-[10px] text-slate-400 font-mono">€${item.price.toFixed(2)} / ud</p>
            </div>
            <div class="flex items-center space-x-2">
                <div class="flex items-center border border-slate-700 rounded bg-slate-800">
                    <button onclick="updateCartQty(${item.id}, -1)" class="px-2 py-0.5 text-slate-400 hover:text-white">-</button>
                    <span class="px-2 font-mono font-semibold text-slate-200">${item.qty}</span>
                    <button onclick="updateCartQty(${item.id}, 1)" class="px-2 py-0.5 text-slate-400 hover:text-white">+</button>
                </div>
                <span class="font-mono font-bold text-slate-100 w-12 text-right">€${(item.price * item.qty).toFixed(2)}</span>
            </div>
        </div>
    `).join('');
    calculateCartTotals();
    lucide.createIcons();
}

function calculateCartTotals() {
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const discountPercent = parseFloat(document.getElementById('cart-discount-input').value) || 0;
    const tax = subtotal * 0.04; // 4% IVA Sanitario
    const discount = subtotal * (discountPercent / 100);
    const total = Math.max(0, subtotal + tax - discount);

    document.getElementById('cart-subtotal').innerText = `€${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').innerText = `€${tax.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `€${total.toFixed(2)}`;

    return { subtotal, tax, discount, total };
}

function setPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.classList.remove('bg-corp-600/20', 'border-corp-500', 'text-corp-400');
        btn.classList.add('bg-slate-900', 'border-slate-700', 'text-slate-400');
    });
    const activeBtn = document.getElementById(`pay-method-${method}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-900', 'border-slate-700', 'text-slate-400');
        activeBtn.classList.add('bg-corp-600/20', 'border-corp-500', 'text-corp-400');
    }
}

function processCheckout() {
    if (cart.length === 0) {
        showToast('Seleccione al menos un medicamento para procesar la venta', 'error');
        return;
    }

    const totals = calculateCartTotals();
    const customerName = document.getElementById('cart-customer-name').value || 'Venta Contado';
    const invoiceId = `FAC-${Math.floor(10000 + Math.random() * 90000)}`;

    // Deduct inventory
    cart.forEach(cartItem => {
        const med = inventory.find(i => i.id === cartItem.id);
        if (med) med.stock -= cartItem.qty;
    });

    const newInvoice = {
        id: invoiceId,
        customer: customerName,
        date: new Date().toLocaleString('es-ES'),
        payment: selectedPaymentMethod,
        total: totals.total,
        status: 'Pagada',
        items: [...cart]
    };

    invoices.unshift(newInvoice);

    openReceiptModal(newInvoice, totals);

    cart = [];
    document.getElementById('cart-customer-name').value = '';
    document.getElementById('cart-prescription-id').value = '';
    renderCart();
    renderAllViews();

    showToast('Transacción completada y factura generada', 'success');
}

function openReceiptModal(invoice, totals) {
    document.getElementById('rec-id').innerText = invoice.id;
    document.getElementById('rec-date').innerText = invoice.date;
    document.getElementById('rec-customer').innerText = invoice.customer;
    document.getElementById('rec-payment').innerText = invoice.payment;

    const itemsTbody = document.getElementById('rec-items-list');
    itemsTbody.innerHTML = invoice.items.map(i => `
        <tr>
            <td class="py-1">${i.name}</td>
            <td class="py-1 text-center">${i.qty}</td>
            <td class="py-1 text-right">€${i.price.toFixed(2)}</td>
            <td class="py-1 text-right font-bold">€${(i.price * i.qty).toFixed(2)}</td>
        </tr>
    `).join('');

    document.getElementById('rec-subtotal').innerText = `€${totals.subtotal.toFixed(2)}`;
    document.getElementById('rec-tax').innerText = `€${totals.tax.toFixed(2)}`;
    document.getElementById('rec-discount').innerText = `-€${totals.discount.toFixed(2)}`;
    document.getElementById('rec-total').innerText = `€${totals.total.toFixed(2)}`;

    openModal('receipt-modal');
}