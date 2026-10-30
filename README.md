# 🏥 SisFarma PRO — Sistema Integral de Gestión Farmacéutica

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Stack: HTML5/Tailwind/ES6](https://img.shields.io/badge/Tech%20Stack-HTML5%20%7C%20Tailwind%20%7C%20JS%20ES6--teal)](https://developer.mozilla.org/es/)
[![Deployment: GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)

**SisFarma PRO** es una solución web integral, ligera y reactiva diseñada para la administración y gestión operativa de oficinas de farmacia. Ofrece un módulo de Punto de Venta (POS) en tiempo real, gestión de inventario y stock crítico, seguimiento de facturación simplificada e informes analíticos financieros.

Su arquitectura está completamente modularizada en JavaScript Vanilla (ES6+), CSS3 y HTML5, lo que permite un despliegue inmediato sin necesidad de entornos de compilación complejos (Node.js/NPM) ni servidores backend dedicados.

---

## 📸 Vista Previa e Interfaz

| Módulo | Descripción |
| :--- | :--- |
| **Panel Principal (Dashboard)** | KPIs de ventas, alertas de stock bajo y gráficos de rendimiento consolidado. |
| **Punto de Venta (POS)** | Búsqueda rápida por CNAV, gestión de recetas (`Rx`), carrito dinámico y facturación. |
| **Inventario y Stock** | Control de lotes, fechas de caducidad, categorización y restock en un clic. |
| **Informes Financieros** | Análisis visual con Chart.js de márgenes por familia e indicadores de afluencia. |

---

## 🌟 Características Destacadas

* 🛒 **Punto de Venta (POS) de Alta Velocidad:**
  * Búsqueda instantánea por Código Nacional / CNAV, principio activo o nombre comercial.
  * Soporte para vinculación de Receta Electrónica (`Rx`).
  * Cálculo automático de desglose fiscal (IVA Superreducido Sanitario del 4%).
  * Modalidades de pago flexibles: *Efectivo*, *Tarjeta* y *Seguro / Mutua*.
  * Impresión de tickets y facturas simplificadas ajustadas a formato térmico/A4.

* 📦 **Gestión de Stock y Trazabilidad:**
  * Alertas automáticas para medicamentos con stock crítico ($\le 10$ unidades) o agotados.
  * Control de número de lote y fechas de caducidad por referencia.
  * Botón de *Restock* rápido desde el cuadro de mando.

* 📊 **Cuadro de Mando y Analítica Integrada:**
  * Gráficos interactivos alimentados por **Chart.js** (Evolución diaria, margen por familia farmacológica y picos de afluencia).
  * Histórico auditable de transacciones y facturas emitidas.

* 🌍 **Motor Multilingüe Nativo (i18n):**
  * Soporte dinámico sin recargar la página para 5 idiomas: **Español (ES), English (EN), Français (FR), Deutsch (DE) y Português (PT)**.

---

## 📁 Arquitectura del Proyecto

El repositorio sigue una estructura modular limpia y desacoplada para facilitar el mantenimiento y la escalabilidad:

```text
sisfarma/
├── index.html                  # Estructura principal y maquetación HTML5
├── README.md                   # Documentación general del repositorio
├── assets/
│   ├── css/
│   │   └── styles.css          # Personalización, Webkit scrollbars y estilos de impresión
│   ├── img/
│   │   └── logo.svg            # Identidad corporativa vectorial e isotipo (favicon)
│   └── js/
│       ├── state.js            # Estado global de la aplicación (Store)
│       ├── i18n.js             # Diccionarios de internacionalización
│       ├── chart.js            # Configuración de instancias de Chart.js
│       ├── ui.js               # Renderizado del DOM, modales, tablas y sistema Toast
│       ├── pos.js              # Lógica del Punto de Venta, carrito y checkout
│       └── app.js              # Punto de entrada, manejador de vistas e inicialización
└── docs/
    ├── ARCHITECTURE.md         # Especificaciones técnicas de la arquitectura
    └── MANUAL_USUARIO.md       # Manual operativo para el personal de la farmacia
```

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
No se requiere Node.js, gestores de paquetes (NPM/Yarn) ni compiladores. Solo un navegador web moderno (Chrome, Edge, Firefox, Safari).

### Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/sisfarma.git
   cd sisfarma
   ```

2. **Abrir la aplicación:**
   Abre el archivo `index.html` directamente en tu navegador o ejecútalo mediante una extensión de servidor local como *Live Server* en VS Code.

### Despliegue en GitHub Pages

1. Ve a la pestaña **Settings** de tu repositorio en GitHub.
2. Navega a la sección **Pages** (en el menú lateral izquierdo).
3. En **Source**, selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guarda los cambios. Tu sitio estará disponible en minutos en `https://tu-usuario.github.io/sisfarma/`.

---

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** JavaScript Vanilla (ES6+)
* **Maquetación y Estilos:** HTML5, CSS3, [Tailwind CSS](https://tailwindcss.com/) (vía CDN)
* **Visualización de Datos:** [Chart.js](https://www.chartjs.org/)
* **Iconografía:** [Lucide Icons](https://lucide.dev/)
* **Tipografía:** Inter & JetBrains Mono (Google Fonts)

---

## 📚 Documentación Adicional

Para más información técnica u operativa, consulta los documentos ubicados en la carpeta `/docs`:

* [📐 Arquitectura Técnica del Sistema](docs/ARCHITECTURE.md)
* [📘 Manual de Usuario para Farmacéuticos](docs/MANUAL_USUARIO.md)

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.