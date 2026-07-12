# 🎨 DESIGN.md — PADRÃO VISUAL START DIGITAL
> Este arquivo define a identidade visual padrão.
> Cada projeto pode sobrescrever esses valores no seu próprio DESIGN.md.
> Mas NUNCA pode deixar de ter um DESIGN.md.

---

## 🎨 PALETA DE CORES PADRÃO (Start Digital)

```
PRIMÁRIA:        #0A0A0A  (preto profundo — autoridade)
SECUNDÁRIA:      #FF6B00  (laranja vibrante — energia, performance)
FUNDO:           #F5F5F5  (cinza claro — limpeza)
FUNDO ESCURO:    #111111  (quase preto — seções de destaque)
TEXTO PRINCIPAL: #1A1A1A  (preto suave — leitura)
TEXTO SUAVE:     #666666  (cinza médio — subtítulos)
BRANCO:          #FFFFFF  (branco puro)
SUCESSO:         #22C55E  (verde — confirmações)
ERRO:            #EF4444  (vermelho — alertas)
AVISO:           #F59E0B  (amarelo — atenção)
```

### Como usar no código:
```css
:root {
  --cor-primaria: #0A0A0A;
  --cor-secundaria: #FF6B00;
  --cor-fundo: #F5F5F5;
  --cor-fundo-escuro: #111111;
  --cor-texto: #1A1A1A;
  --cor-texto-suave: #666666;
  --cor-branco: #FFFFFF;
  --cor-sucesso: #22C55E;
  --cor-erro: #EF4444;
  --cor-aviso: #F59E0B;
}
```

---

## ✍️ TIPOGRAFIA

### Fontes obrigatórias:
```
TÍTULO PRINCIPAL:  Inter Bold (700) — tamanho 32-48px
TÍTULO SEÇÃO:      Inter SemiBold (600) — tamanho 24-28px
SUBTÍTULO:         Inter Medium (500) — tamanho 18-20px
CORPO DE TEXTO:    Inter Regular (400) — tamanho 14-16px
LABEL/LEGENDA:     Inter Regular (400) — tamanho 12px
CÓDIGO/DADOS:      JetBrains Mono — tamanho 13-14px
```

### Import no HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

---

## 📐 ESPAÇAMENTOS

Sistema de espaçamento baseado em múltiplos de 4px:

```
XS:   4px   (espaço mínimo entre elementos)
SM:   8px   (espaço interno de botões pequenos)
MD:   16px  (espaço padrão entre elementos)
LG:   24px  (espaço entre seções menores)
XL:   32px  (espaço entre seções)
2XL:  48px  (espaço entre blocos grandes)
3XL:  64px  (espaço entre seções da página)
```

---

## 🔘 BOTÕES

### Botão Primário:
```css
background: #FF6B00;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
border: none;
cursor: pointer;
transition: all 0.2s ease;

/* Hover */
background: #E55A00;
transform: translateY(-1px);
```

### Botão Secundário:
```css
background: transparent;
color: #0A0A0A;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
border: 2px solid #0A0A0A;
```

### Botão Perigo:
```css
background: #EF4444;
color: #FFFFFF;
/* mesmas medidas do primário */
```

---

## 🃏 CARDS

```css
background: #FFFFFF;
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
border: 1px solid rgba(0,0,0,0.06);
```

---

## 📋 FORMULÁRIOS

```css
/* Input padrão */
input, select, textarea {
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #1A1A1A;
  background: #FFFFFF;
  width: 100%;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #FF6B00;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}
```

---

## 📱 RESPONSIVIDADE (OBRIGATÓRIO)

Todo layout deve funcionar nestes tamanhos:

```
MOBILE:   320px - 767px    (1 coluna)
TABLET:   768px - 1023px   (2 colunas)
DESKTOP:  1024px - 1279px  (layout completo)
WIDE:     1280px+           (máximo 1440px de largura)
```

### Breakpoints no CSS:
```css
/* Mobile first — comece pelo mobile */
.container { padding: 16px; }

@media (min-width: 768px) {
  .container { padding: 24px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1280px; margin: 0 auto; padding: 32px; }
}
```

---

## 🔄 ANIMAÇÕES

```css
/* Padrão para todas as transições */
transition: all 0.2s ease;

/* Entrada de elementos */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Loading */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 🧩 ÍCONES

Use a biblioteca **Lucide Icons** em todos os projetos:
```html
<!-- CDN -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- No React -->
import { User, Settings, ChevronRight } from 'lucide-react'
```

---

## ✅ CHECKLIST DE DESIGN

Antes de entregar qualquer tela, confirme:
- [ ] Usa as cores do config.js do cliente (não fixas no código)?
- [ ] Funciona no mobile (320px)?
- [ ] Todos os textos têm contraste suficiente?
- [ ] Botões têm estado hover e active?
- [ ] Formulários têm estado de erro e sucesso?
- [ ] Fontes carregando corretamente?
- [ ] Ícones consistentes (todos Lucide)?

---

*Este arquivo é mantido pela Start Digital. Versão 1.0*
