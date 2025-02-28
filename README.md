# Simple PDF Converter

Простий React додаток для перетворення введеного тексту у PDF документ.

### Основний стек технологій

- [TypeScript](https://github.com/microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Vite](https://github.com/vitejs/vite)
- [Vitest](https://github.com/vitest-dev/vitest)
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- [pnpm](https://github.com/pnpm/pnpm)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [PostCSS](https://github.com/postcss/postcss)
- [RadixUI](https://github.com/radix-ui/primitives)
- [Shadcn](https://github.com/shadcn-ui/ui)
- [React-pdf](https://github.com/wojtekmaj/react-pdf)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)

### Додаткові інструменти

- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Dexie](https://github.com/dfahlgren/Dexie.js)

### Структура проєкту

- **src**
  - **api**: модуль для API-запитів
  - **components**: React компоненти
    - **common**: загальні компоненти
    - **SavedPDF**: компоненти для відображення збережених PDF
  - **hooks**: кастомні хуки
  - **lib**: утилітні функції
  - **test**: тести для API та основних хуків
  - **types**: типи для проекту

### Вимоги до runtime

Потребує Node.js версії 22 або вище.

## Особливості проєкту

- Використання IndexedDB для збереження PDF файлів
- Наявність елементів SEO оптимізації
- Адаптивний дизайн
- Наявність елементів доступності (ARIA-атрибути)
- Темна та світла теми

### Локальний запуск

**Встановлення залежностей**

```sh
pnpm install
```

**Запуск додатку (dev режим)**

```sh
pnpm dev
```

**Запуск тестів**

```sh
pnpm test:watch
```
