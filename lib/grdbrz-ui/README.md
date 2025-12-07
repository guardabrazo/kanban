# grdbrz-ui

A comprehensive React UI component library designed for building professional web applications with a minimal and stylish interface.

## Installation

```bash
npm install grdbrz-ui
```

## Usage

Import components and the CSS file in your application:

```tsx
import { Button, ThemeProvider } from 'grdbrz-ui';
import 'grdbrz-ui/dist/grdbrz-ui.css';

function App() {
  return (
    <ThemeProvider theme="darkDefault">
      <Button>Click Me</Button>
    </ThemeProvider>
  );
}
```

## Features

- **Theming**: Built-in support for multiple themes (`darkDefault`, `darkMuted`, `highContrast`, `light`).
- **Templates**: `AppShell` for a ready-to-use application structure.
- **Primitives**: Buttons, Toggles, Sliders, Knobs, XYPads, and more.
- **Layouts**: Stack, GrdbrzLayout, Center, Distribute.
- **Design Tokens**: Comprehensive system for colors, typography, and spacing.

## Quick Start (AppShell)

The easiest way to get started is using the `AppShell` component:

```tsx
import { AppShell, Panel, Slider } from 'grdbrz-ui';
import 'grdbrz-ui/dist/grdbrz-ui.css';

function App() {
  return (
    <AppShell
      title="MY APP"
      sidebar={
        <Panel header="Controls">
          <Slider label="Volume" value={50} onChange={() => {}} />
        </Panel>
      }
    >
      <div style={{ padding: '24px' }}>
        <h1>Main Content</h1>
      </div>
    </AppShell>
  );
}
```

## License

MIT
