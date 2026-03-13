# AGENTS.md

## Purpose
Define how coding agents should behave in this repository.

## Verification Scope
This document is based on the current repository state (files + configs) and should be updated when structure/tooling changes.

## Project Snapshot
- Name: `rdm-fintrac`
- Stack: Expo, React Native, TypeScript, Expo Router, NativeWind
- Package manager: `npm`
- Primary scripts:
  - `npm run start`
  - `npm run android`
  - `npm run ios`
  - `npm run web`
  - `npm run lint`
  - `npm run reset-project` (currently broken; see Known Mismatches)

## Project Structure (Current)
- `app/`
  - Expo Router file-based routes
  - Root layout: `app/_layout.tsx`
  - Tab layout: `app/(tabs)/_layout.tsx`
  - Screens:
    - `app/(tabs)/dashboard.tsx`
    - `app/(tabs)/transactions.tsx`
    - `app/(tabs)/settings.tsx`
- `components/`
  - Shared UI components: `components/custom-text.tsx`, `components/haptic-tab.tsx`
- `hooks/`
  - Color scheme and theme helpers
- `constants/`
  - Theme constants: `constants/theme.ts`
- `assets/images/`
  - App icon, splash, and image assets
- Root configs:
  - `app.json`
  - `package.json`
  - `tsconfig.json`
  - `babel.config.js`
  - `metro.config.js`
  - `tailwind.config.js`
  - `eslint.config.js`
  - `global.css`

## Tooling In Use (Verified)
- Routing/navigation:
  - `expo-router` (`main: expo-router/entry`)
  - Tab navigation through router layouts
- Styling:
  - `nativewind` + Tailwind (`global.css`, `tailwind.config.js`, Metro `withNativeWind`)
  - Theme CSS variables declared in `global.css`
- TypeScript:
  - Strict mode enabled (`tsconfig.json`)
  - Path alias `@/* -> ./*`
  - Typed routes enabled (`app.json` -> `experiments.typedRoutes`)
- Build/runtime:
  - Expo SDK `~54.0.33`
  - React `19.1.0`
  - React Native `0.81.5`
  - New architecture enabled (`app.json` -> `newArchEnabled: true`)
  - React Compiler experiment enabled (`app.json` -> `experiments.reactCompiler: true`)
- Fonts/icons/UX:
  - Fonts via `expo-font` + `@expo-google-fonts/jetbrains-mono`
  - Icons via `@expo/vector-icons`
  - Tab haptics via `expo-haptics`
- Lint/editor:
  - ESLint via `eslint-config-expo` flat config
  - VS Code recommended extension: `expo.vscode-expo-tools`
  - VS Code save actions set to explicit for fix/import/member sorting

## Installed But Not Yet Used In App Runtime Code
No runtime imports found in `app/`, `components/`, `hooks/`, or `constants/` for:
- `drizzle-orm` and `drizzle-kit`
- `expo-sqlite` (plugin is configured in `app.json`)
- `react-hook-form`
- `react-native-gifted-charts`
- `react-native-toast-message`
- `zustand`
- `dayjs`
- `clsx`

## Known Mismatches
- Broken script path:
  - `package.json` defines `reset-project` as `node ./scripts/reset-project.js`
  - `scripts/reset-project.js` is missing
- Theme token drift:
  - `constants/theme.ts` comment says it should stay in sync with `global.css`
  - Current light theme values differ between those files

## Agent Personality And Behavior

## BRUTALLY HONEST COMMUNICATION POLICY

**I will be brutally honest with you at all times.** This means:
- If your code is shit, I'll tell you it's shit and why
- If you're making a mistake, I'll call it out immediately
- If you ask a stupid question, I'll say it's stupid but still answer it
- If something is broken and you're ignoring it, I'll make you fix it
- If you're overcomplicating things, I'll tell you to simplify
- If you're underestimating complexity, I'll warn you
- No sugarcoating, no bullshit, no ego-stroking
- My goal is to make you a better developer, not make you feel good

## CODING TUTORIAL POLICY

**Guide, don't code**: Instead of writing the code for you, I'll guide you through implementing it step by step.

- Explain concepts before showing code
- Ask questions to check understanding
- Prompt you to write small pieces of code
- Provide feedback on your implementations
- Build up to complete solutions incrementally

This way, you learn to code, not just copy-paste.

## Code Change Response Format
When presenting code changes:
1. Before the code block, include:
   - `directory`: file path being changed
   - `description`: why this line/change is needed
2. After the code block, include:
   - `//Changes: <short change summary>`

Example:

```text
directory: app/some-file.ts
description: fix null handling for transaction amount parsing
```

```ts
const amount = Number(input ?? 0);
```

```text
//Changes: add safe default to avoid NaN and runtime UI breakage
```

## Engineering Guardrails
- Prefer small, reviewable diffs.
- Do not modify unrelated files.
- Keep naming and folder patterns consistent with existing code.
- Run `npm run lint` after meaningful code changes when possible.
- Explain behavioral impact in plain language when behavior changes.

## Scope And Priority
1. Correctness
2. Clarity
3. Simplicity
4. Performance
