# 📘 Manual de Usuario — SisFarma PRO

Bienvenido al manual operativo de **SisFarma PRO**, el sistema integral de gestión farmacéutica, control de inventario y punto de venta (POS). Este documento detalla los procedimientos paso a paso para operar eficientemente la plataforma.

---

## 📋 Índice

1. [Acceso e Interfaz General](#1-acceso-e-interfaz-general)
2. [Punto de Venta (POS) y Caja](#2-punto-de-venta-pos-y-caja)
3. [Gestión de Inventario y Stock](#3-gestión-de-inventario-y-stock)
4. [Ventas y Facturación](#4-ventas-y-facturación)
5. [Informes Financieros y Analítica](#5-informes-financieros-y-analítica)
6. [Configuración y Multilingüe](#6-configuración-y-multilingüe)

---

## 1. Acceso e Interfaz General

La interfaz de SisFarma se divide en tres secciones principales:
* **Barra Lateral (Sidebar):** Navegación directa entre los diferentes módulos del sistema (Panel Principal, POS, Inventario, Facturación, Informes y Configuración).
* **Barra Superior (Header):** Buscador global dinámico, selector de idioma (ES, EN, FR, DE, PT) y accesos directos a acciones rápidas.
* **Área de Trabajo Principal:** Panel dinámico según la sección seleccionada.

---

## 2. Punto de Venta (POS) y Caja

El módulo POS permite realizar transacciones rápidas e imprimir tickets de venta o facturas simplificadas.

### 2.1 Búsqueda y Selección de Medicamentos
1. Diríjase a la sección **Punto de Venta (POS)**.
2. Utilice el buscador superior para filtrar por **código CNAV**, **nombre comercial** o **principio activo**.
3. También puede utilizar los botones de **categoría** (Analgésicos, Antibióticos, etc.) para filtrar rápidamente el catálogo visual.
4. Haga clic sobre la tarjeta de un medicamento para añadirlo al ticket de venta.

### 2.2 Gestión del Carrito de Venta
* **Aumentar/Disminuir cantidad:** Utilice los botones `+` y `-` en cada línea de producto dentro del carrito.
* **Límite de Stock:** El sistema le impedirá añadir unidades por encima de las existencias reales en inventario.
* **Vaciar Carrito:** Presione el enlace **Vaciar Carrito** situado en la cabecera del ticket.

### 2.3 Registro de Cliente y Receta Electrónica
* **Cliente:** Ingrese el nombre o razón social del comprador (por defecto asigna *Venta Contado*).
* **Nº Receta Electrónica:** En medicamentos que requieran prescripción obligatoria (`Rx`), introduzca el código de receta correspondiente.

### 2.4 Aplicación de Descuentos y Formas de Pago
1. **Descuento:** Introduzca un porcentaje de descuento (0% a 100%) en la casilla *Descuento Especial*; los totales se recalcularán automáticamente aplicando el IVA sanitario del 4%.
2. **Método de Pago:** Seleccione entre **Efectivo**, **Tarjeta** o **Seguro / Mutua**.

### 2.5 Finalizar Transacción e Imprimir
1. Haga clic en **Completar e Imprimir Factura**.
2. Se abrirá la vista previa del ticket/factura simplificada.
3. Presione **Imprimir Documento** para enviar a su impresora térmica o de papel, o **Cerrar** para volver al POS.

---

## 3. Gestión de Inventario y Stock

El módulo de inventario le permite llevar un control estricto del catálogo, lotes y caducidades.

### 3.1 Consulta y Filtros de Stock
* **Filtro por Categoría y Estado:** Puede filtrar por estado (*Stock Normal*, *Stock Bajo* o *Agotado*).
* **Búsqueda rápida:** Encuentre medicamentos instantáneamente tecleando parte de su nombre o lote.

### 3.2 Registrar un Nuevo Medicamento
1. En la barra superior o en la vista de Inventario, presione **Nuevo Medicamento**.
2. Rellene los campos obligatorios:
   * Código CNAV / Nacional
   * Categoría y Nombre Comercial
   * Principio Activo y Lote
   * Stock Inicial, P.V.P. (€) y Fecha de Caducidad
   * Indique si requiere receta médica obligatoria (`Rx`).
3. Presione **Guardar Registro**.

### 3.3 Edición, Eliminación y Restock Rápido
* **Editar:** Haga clic en el icono de lápiz en la fila del medicamento deseado.
* **Eliminar:** Presione el icono de papelera y confirme la acción.
* **Restock Rápido (Dashboard):** En la lista de alertas de stock crítico del panel principal, haga clic en el botón **Restock** para añadir +30 unidades de forma directa.

---

## 4. Ventas y Facturación

En el módulo **Ventas y Facturación** podrá auditar el histórico completo de operaciones del establecimiento.

1. **Búsqueda de Facturas:** Filtre por número de serie (ej. `FAC-18293`) o nombre del cliente.
2. **Filtro por Estado:** Visualice facturas *Pagadas* o *Anuladas*.
3. **Ver/Reimprimir Factura:** Haga clic en el botón **Ver Factura** en cualquier fila para abrir la copia oficial en pantalla y poder reimprimirla.
4. **Exportar Registro:** Presione **Exportar Registro** para generar un informe consolidado de la actividad comercial.

---

## 5. Informes Financieros y Analítica

Acceda a la pestaña **Informes Financieros** para visualizar datos estratégicos del negocio:
* **Margen por Familia Farmacéutica:** Comparativa visual de rentabilidad por categoría.
* **Afluencia y Horarios Pico:** Gráfico de actividad para optimizar turnos del personal en las horas de mayor concentración de ventas.
* **Evolución Semanal:** Balance comparativo de ventas diarias accesible en el Dashboard principal.

---

## 6. Configuración y Multilingüe

### 6.1 Cambio de Idioma
En la barra superior, seleccione el idioma deseado del desplegable:
* 🇪🇸 Español (ES)
* 🇬🇧 English (EN)
* 🇫🇷 Français (FR)
* 🇩🇪 Deutsch (DE)
* 🇵🇹 Português (PT)

Toda la interfaz y los mensajes de estado se actualizarán instantáneamente.

### 6.2 Datos de la Farmacia
En el módulo **Configuración** puede personalizar los datos legales que aparecerán impresos en las facturas y tickets:
* Nombre Comercial
* NIF / CIF Sanitario
* Nº de Licencia Colegial
* Tipo de IVA superreducido sanitario aplicable