# 🚀 Projeto Cypress - Jornada QA na Prática

Este projeto foi desenvolvido com o objetivo de **aprender, na prática, o papel de um QA (Quality Assurance)** utilizando o Cypress como ferramenta de automação de testes.

Mais do que apenas escrever testes, a proposta foi entender **boas práticas, organização de código, legibilidade e estratégia de validação** — mesmo sem seguir rigidamente um padrão único (como POM puro).

---

## 🎯 Objetivo

* Aprender conceitos fundamentais de QA
* Desenvolver testes automatizados com Cypress
* Entender boas práticas de escrita de testes
* Trabalhar com cenários reais de automação (E2E)
* Evoluir de testes simples para fluxos completos

---

## 🧠 Conceitos abordados

### 🔍 Assertions e validações

* Diferença entre:

  * `.should('exist')` → verifica se o elemento está no DOM
  * `.should('be.visible')` → verifica se está visível para o usuário

* Validação de listas:

  ```js
  cy.get('.item').should('have.length.greaterThan', 0)
  ```

* Uso de comandos importantes:

  * `.first()`
  * `.not.be.empty()`
  * `.contain()` (texto parcial)
  * `.have.text()` (texto exato)

* Boas práticas com texto:

  * Evitar textos frágeis
  * Preferir validações mais resilientes

---

### 💰 Validação de dados

* Validação de preço com Regex:

  ```js
  cy.get('.price').invoke('text')
    .should('match', /^\$\d+\.\d{2}$/)
  ```

---

### 🧪 Atributos e seletores

* Uso de:

  ```js
  .should('have.attr', 'data-test')
  ```

* 💡 Por que usar `data-test`?

  * Evita quebra de testes por mudanças visuais
  * Torna o teste mais estável
  * Boa prática amplamente usada no mercado

---

### 📦 Interações comuns

* Trabalhar com dropdown:

  ```js
  cy.get('select').select('Option')
  ```

* Validação de URL:

  ```js
  cy.url().should('eq', 'https://exemplo.com')
  ```

---

### ⚖️ Diferença importante

| Método         | Tipo    | Uso                      |
| -------------- | ------- | ------------------------ |
| `.contain()`   | Parcial | Verifica se contém texto |
| `.have.text()` | Exato   | Verifica texto completo  |

---

## 🏗️ Estrutura do projeto

```
cypress/
│
├── e2e/
│   ├── login.cy.js
│   ├── inventory.cy.js
│   └── checkout.cy.js
│
├── support/
│   ├── commands.js
│   └── e2e.js
│
├── pages/
│   ├── LoginPage.js
│   └── InventoryPage.js
```

---

## 🧩 Padrões utilizados

### ✅ Page Objects (parcialmente aplicado)

* `LoginPage`
* `InventoryPage`

👉 Não foi seguido 100% à risca, mas ajudou a:

* Organizar o código
* Reutilizar ações
* Melhorar legibilidade

---

### 🔁 Custom Commands

Criação de comando customizado:

```js
cy.login(username, password)
```

Uso com:

```js
beforeEach(() => {
  cy.login('standard_user', 'secret_sauce')
})
```

---

### 🎯 Boas práticas adotadas

* Uso de seletores `[data-test]`
* Testes legíveis e organizados
* Evitar duplicação de código
* Separação de responsabilidades

---

## 🧪 Cenários implementados

### 🛒 Inventário

* Validar mudança de botão:

  * `Add to cart` → `Remove`

* Validar badge do carrinho:

  * Incremento correto de itens

* Testar ordenação:

  * Por preço
  * Por nome

* Validar contagem após filtros

* Estratégia de **ponto âncora**:

  * Validar primeiro item da lista como referência

---

### 🧾 Checkout

* Validar navegação por URL

* Validar campos:

  * Visibilidade
  * Habilitação
  * Atributos

* Fluxo completo E2E:

  * Login
  * Adicionar item
  * Checkout
  * Finalização

* Validação final:

  * Mensagem de sucesso
