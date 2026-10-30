window.onload = function() {
    lucide.createIcons();
    document.getElementById('current-system-date').innerText = new Date().toLocaleDateString('es-ES');
    
    initCharts();
    renderAllViews();
};

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-corp-600/20', 'text-corp-400', 'border', 'border-corp-500/30');
        btn.classList.add('text-slate-300');
    });

    const activeTab = document.getElementById(`tab-${tabId}`);
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeTab) activeTab.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-300');
        activeBtn.classList.add('bg-corp-600/20', 'text-corp-400', 'border', 'border-corp-500/30');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('-ml-64');
}

function changeLanguage(langKey) {
    if (!i18n[langKey]) return;
    currentLang = langKey;
    const dict = i18n[langKey];

    document.getElementById('i18n-subbrand').innerText = dict.subbrand;
    document.getElementById('i18n-nav-dashboard').innerText = dict.navDashboard;
    document.getElementById('i18n-nav-pos').innerText = dict.navPos;
    document.getElementById('i18n-nav-inventory').innerText = dict.navInventory;
    document.getElementById('i18n-nav-invoices').innerText = dict.navInvoices;
    document.getElementById('i18n-nav-analytics').innerText = dict.navAnalytics;
    document.getElementById('i18n-nav-settings').innerText = dict.navSettings;
    document.getElementById('i18n-user-role').innerText = dict.userRole;
    document.getElementById('i18n-btn-add-med').innerText = dict.btnAddMed;
    document.getElementById('i18n-btn-new-sale').innerText = dict.btnNewSale;
    document.getElementById('i18n-stat-sales-label').innerText = dict.statSalesLabel;
    document.getElementById('i18n-stat-operations').innerText = dict.statOperations;
    document.getElementById('i18n-stat-stock-label').innerText = dict.statStockLabel;
    document.getElementById('i18n-stat-stock-desc').innerText = dict.statStockDesc;
    document.getElementById('i18n-stat-items-label').innerText = dict.statItemsLabel;
    document.getElementById('i18n-stat-items-desc').innerText = dict.statItemsDesc;
    document.getElementById('i18n-stat-invoices-label').innerText = dict.statInvoicesLabel;
    document.getElementById('i18n-stat-invoices-desc').innerText = dict.statInvoicesDesc;
    document.getElementById('i18n-chart-sales-title').innerText = dict.chartSalesTitle;
    document.getElementById('i18n-chart-sales-sub').innerText = dict.chartSalesSub;
    document.getElementById('i18n-chart-cat-title').innerText = dict.chartCatTitle;
    document.getElementById('i18n-chart-cat-sub').innerText = dict.chartCatSub;
    document.getElementById('i18n-system-ready').innerText = dict.systemReady;
    document.getElementById('i18n-recent-sales-title').innerText = dict.recentSalesTitle;
    document.getElementById('i18n-view-all').innerText = dict.viewAll;
    document.getElementById('i18n-low-stock-title').innerText = dict.lowStockTitle;
    document.getElementById('i18n-manage-inv').innerText = dict.manageInv;
    document.getElementById('i18n-btn-demo').innerText = dict.btnDemo;
    document.getElementById('i18n-btn-new-med').innerText = dict.btnNewMed;
    document.getElementById('i18n-cart-title').innerText = dict.cartTitle;
    document.getElementById('i18n-clear-cart').innerText = dict.clearCart;
    document.getElementById('i18n-subtotal').innerText = dict.subtotal;
    document.getElementById('i18n-tax').innerText = dict.tax;
    document.getElementById('i18n-discount').innerText = dict.discount;
    document.getElementById('i18n-total-payable').innerText = dict.totalPayable;
    document.getElementById('i18n-pay-cash').innerText = dict.payCash;
    document.getElementById('i18n-pay-card').innerText = dict.payCard;
    document.getElementById('i18n-pay-insurance').innerText = dict.payInsurance;
    document.getElementById('i18n-btn-complete').innerText = dict.btnComplete;

    renderAllViews();
    showToast(`Idioma cambiado a: ${langKey.toUpperCase()}`, 'info');
}

function seedDemoData() {
    inventory = [
        { id: 101, cnav: '654120', name: 'Paracetamol Normon 1g Comp', active: 'Paracetamol', category: 'Analgesicos', stock: 120, price: 2.50, batch: 'L-2026-A', expiry: '2027-08-15', prescription: false },
        { id: 102, cnav: '712903', name: 'Amoxicilina Sandoz 500mg', active: 'Amoxicilina', category: 'Antibioticos', stock: 8, price: 4.80, batch: 'L-2026-B', expiry: '2026-11-30', prescription: true },
        { id: 103, cnav: '882104', name: 'Ibuprofeno Kern 600mg', active: 'Ibuprofeno', category: 'Antiinflamatorios', stock: 65, price: 3.10, batch: 'L-2027-C', expiry: '2028-02-10', prescription: true },
        { id: 104, cnav: '601298', name: 'Omeprazol Cinfa 20mg Cap', active: 'Omeprazol', category: 'Digestivos', stock: 4, price: 3.90, batch: 'L-2026-D', expiry: '2027-05-20', prescription: false },
        { id: 105, cnav: '900211', name: 'Ventolin Inhalador 100mcg', active: 'Salbutamol', category: 'Respiratorio', stock: 18, price: 6.20, batch: 'L-2027-E', expiry: '2027-12-01', prescription: true },
        { id: 106, cnav: '773109', name: 'Atorvastatina Teva 20mg', active: 'Atorvastatina', category: 'Cardiovascular', stock: 45, price: 8.50, batch: 'L-2028-F', expiry: '2028-04-18', prescription: true }
    ];

    showToast('Datos demo de prueba cargados correctamente', 'success');
    renderAllViews();
}