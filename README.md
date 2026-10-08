# GymTrack - App de Rutinas, Repeticiones y Pesos de Gimnasio

Aplicación web moderna y responsive (diseñada para móviles y escritorio) para planificar entrenamientos organizados por días, personalizar ejercicios con imágenes/ilustraciones, registrar series con pesos y repeticiones en tiempo real, cronometrar los descansos y seguir tu progresión de fuerza (Récords Personales y 1RM).

---

## 🚀 Características Principales

### 1. 📋 Rutinas Organizadas por Días
- **Organización Flexible**: Agrupa tus entrenamientos por días (ej: *Día 1: Pecho y Tríceps*, *Día 2: Espalda y Bíceps*, *Lunes*, *Tirón*, etc.).
- **Gestión completa**: Crea nuevos días, reordena los ejercicios (arriba/abajo), duplica o elimina días.
- **Múltiples Rutinas**: Crea diferentes rutinas (ej: Frecuencia 2, Hipertrofia, Fuerza 5x5, etc.) y cambia entre ellas en cualquier momento.

### 2. 🖼️ Imágenes por Ejercicio
- **Biblioteca de Ilustraciones Integrada**: 12+ ilustraciones vectoriales con anatomía muscular destacada (Pecho, Espalda, Piernas, Hombros, Bíceps, Tríceps, Core).
- **Subida de Fotos / Cámara**: Toma una foto de la máquina/ejercicio o súbela desde tu galería (almacenadas de forma permanente y segura en **IndexedDB** sin límite de almacenamiento).
- **Enlaces Web / GIFs**: Pega URLs directas a imágenes o GIFs demostrativos de técnica.

### 3. ⚡ Modo Entrenamiento en Vivo (Live Workout)
- **Registro Serie a Serie**:
  - Peso levantado (KG o LB con selector rápido).
  - Repeticiones realizadas.
  - Tipos de serie: *Normal*, *Calentamiento*, *Al Fallo*, *Dropset*.
- **Sobrecarga Progresiva Visual**: En cada ejercicio ves automáticamente el peso y reps que hiciste en la sesión anterior (*"Último: 80 kg × 10"*).
- **Checkmark Interactivo**: Al completar una serie, emite un aviso sonoro y **activa automáticamente el cronómetro de descanso**.
- **Añadir ejercicios al vuelo**: Añade ejercicios extra en mitad del entrenamiento si decides hacer algo más.

### 4. ⏱️ Cronómetro de Descanso Inteligente
- Cuenta regresiva con presets rápidos (30s, 45s, 60s, 90s, 120s, 180s).
- Botones de ajuste instantáneo (+15s / -15s).
- Alertas sonoras con Web Audio API (pitidos de aviso a los 3s y campanada de fin).
- Modo flotante / minimizable para que puedas revisar tus siguientes ejercicios mientras descansas.

### 5. 📊 Historial & Récords Personales (PRs)
- **Historial Completo**: Guarda cada sesión con fecha, duración, volumen total levantado y desglose de series.
- **Récords Personales (PR)**: Muestra el peso máximo alcanzado en cada ejercicio.
- **Cálculo de 1RM Estimado**: Estimación de tu repetición máxima basada en la fórmula científica de Epley: `Peso × (1 + Reps / 30)`.

### 6. 💾 Almacenamiento Local & Copias de Seguridad
- Funciona 100% offline utilizando **IndexedDB**.
- Botón de **Exportar Respaldo (.json)** para descargar todos tus datos y fotos.
- Botón de **Importar Respaldo** para restaurar tu progreso o moverlo a otro dispositivo.

---

## 🛠️ Tecnologías Utilizadas

- **React 19 + TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti**
- **Web Audio API**
- **IndexedDB**

---

## 🏃‍♂️ Cómo Ejecutar la Aplicación

1. Entra a la carpeta del proyecto:
   ```bash
   cd gym-routine-app
   ```
2. Instala dependencias (si aún no lo has hecho):
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev -- --host
   ```
4. Abre en tu navegador:
   - En tu PC: `http://localhost:5173`
   - En tu celular (misma red Wi-Fi): `http://<IP-LOCAL>:5173`
