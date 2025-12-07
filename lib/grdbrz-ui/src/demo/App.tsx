
import { useState } from 'react';
import {
  GrdbrzLayout,
  Box,
  Panel,
  Stack,
  Heading,
  Text,
  Button,
  Slider,
  Toggle,
  Select,
  useTheme,
  Pill,
  XYPad,
  Knob,
  ToggleButton,
  ButtonGroup,
  Input
} from '../lib';
import { StudioLayout } from './pages/StudioLayout';
import { DashboardLayout } from './pages/DashboardLayout';

import { KanbanLayout } from './pages/KanbanLayout';

function App() {
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState<'showcase' | 'studio' | 'dashboard' | 'kanban'>('showcase');
  const [sliderValue, setSliderValue] = useState(50);
  const [discreteSliderValue, setDiscreteSliderValue] = useState(50);
  const [toggleValue, setToggleValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [toggleButtonValue, setToggleButtonValue] = useState(false);
  const [radioValue, setRadioValue] = useState('A');
  const [selectValue, setSelectValue] = useState('option1');
  const [xyValue, setXyValue] = useState({ x: 0.5, y: 0.5 });
  const [knobValue, setKnobValue] = useState(50);
  const [inputValue, setInputValue] = useState('');
  const [sensitiveInputValue, setSensitiveInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [layoutMode, setLayoutMode] = useState<'stacked' | 'distributed' | 'centered'>('stacked');


  const headerContent = (
    <div style={{
      padding: '0 24px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Stack direction="row" gap="md" align="center">
        <Heading as="h1" size="xl">grdbrz-ui</Heading>
      </Stack>
      <Stack direction="row" gap="lg" align="center">
        <Text size="sm" variant="muted">v1.0.0</Text>
      </Stack>
    </div>
  );

  const footerContent = (
    <div style={{
      padding: '0 24px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Text size="xs" variant="muted">© 2025 GUARDABRAZO</Text>
      <Stack direction="row" gap="md">
        <Text size="xs" variant="muted" style={{ fontWeight: 400 }}>
          <a href="https://instagram.com/guardabrazo" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>INSTAGRAM</a>
          {' | '}
          <a href="https://linkedin.com/in/guardabrazo" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
          {' | '}
          <a href="https://guardabrazo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>WEBSITE</a>
        </Text>
      </Stack>
    </div>
  );

  const rightSidebarContent = (
    <Stack gap="lg" style={{ padding: '24px' }}>
      <Panel header="Description">
        <Stack gap="sm">
          <Text size="sm" variant="secondary">
            grdbrz-ui is a comprehensive React UI component library designed for building professional web applications with a minimal and stylish interface.
          </Text>
          <Text size="sm" variant="secondary">
            It features a robust theming system, atomic design tokens, and a suite of specialized controls like XY pads and rotary knobs.
          </Text>
        </Stack>
      </Panel>
    </Stack>
  );

  const leftSidebarContent = (
    <Stack gap="lg" style={{ padding: '24px' }}>
      <Panel header="Navigation">
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => setCurrentView('showcase')}
            active={currentView === 'showcase'}
          >
            Component Showcase
          </Button>
          <Button
            onClick={() => setCurrentView('studio')}
            active={currentView === 'studio'}
          >
            Studio Layout
          </Button>
          <Button
            onClick={() => setCurrentView('dashboard')}
            active={currentView === 'dashboard'}
          >
            Dashboard Layout
          </Button>
          <Button
            onClick={() => setCurrentView('kanban')}
            active={currentView === 'kanban'}
          >
            Kanban Layout
          </Button>
        </ButtonGroup>
      </Panel>

      <Panel header="Theme">
        <Select
          label="Select Theme"
          value={theme}
          options={[
            { value: 'darkDefault', label: 'Dark Default' },
            { value: 'darkMuted', label: 'Dark Muted' },
            { value: 'highContrast', label: 'High Contrast' },
            { value: 'light', label: 'Light Theme' },
          ]}
          onChange={(val) => setTheme(val as any)}
        />
      </Panel>

      <Panel header="Layout">
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => setLayoutMode('stacked')}
            active={layoutMode === 'stacked'}
          >
            STACKED
          </Button>
          <Button
            onClick={() => setLayoutMode('distributed')}
            active={layoutMode === 'distributed'}
          >
            DISTRIBUTED
          </Button>
          <Button
            onClick={() => setLayoutMode('centered')}
            active={layoutMode === 'centered'}
          >
            CENTERED
          </Button>
        </ButtonGroup>
      </Panel>
    </Stack>
  );

  return (
    <GrdbrzLayout
      sidebar={leftSidebarContent}
      sidebarPosition="left"
      rightSidebar={rightSidebarContent}
      header={headerContent}
      footer={footerContent}
      fullScreen={true}
    >
      {currentView === 'showcase' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            p="xl"
            background="panel"
            borderSide="bottom"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Heading as="h1" size="lg">COMPONENT SHOWCASE</Heading>
              <Text variant="secondary" size="sm" style={{ marginTop: '4px' }}>A COLLECTION OF REUSABLE UI COMPONENTS</Text>
            </div>
          </Box>

          <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
              height: '100%',
            }}>
              {/* Column 1 */}
              <Stack
                gap="lg"
                justify={
                  layoutMode === 'distributed' ? 'between' :
                    layoutMode === 'centered' ? 'center' : 'start'
                }
                style={{ height: '100%' }}
              >
                <Panel header="Typography">
                  <Stack gap="lg">
                    <div>
                      <Heading as="h1" size="xl">Heading XL</Heading>
                      <Text variant="muted" size="xl">Muted Heading XL</Text>
                    </div>

                    <div>
                      <Heading as="h2" size="lg">Heading LG</Heading>
                      <Text variant="muted" size="lg">Muted Heading LG</Text>
                    </div>

                    <div>
                      <Heading as="h3" size="md">Heading MD</Heading>
                      <Text variant="muted" size="md">Muted Heading MD</Text>
                    </div>

                    <div>
                      <Text size="sm">Small text.</Text>
                      <Text variant="muted" size="sm">Muted Small Text</Text>
                    </div>

                    <div>
                      <Text size="xs">Extra small text.</Text>
                      <Text variant="muted" size="xs">Muted Extra Small Text</Text>
                    </div>
                  </Stack>
                </Panel>

                <Panel header="Pills">
                  <Stack gap="md">
                    <Stack direction="row" gap="sm">
                      <Pill label="Primary" variant="primary" />
                      <Pill label="Muted" variant="muted" />
                    </Stack>
                  </Stack>
                </Panel>

                <Panel header="Inputs">
                  <Stack gap="md" direction="row">
                    <Input
                      placeholder="DEFAULT"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                      variant="sensitive"
                      placeholder="SENSITIVE"
                      value={sensitiveInputValue}
                      onChange={(e) => setSensitiveInputValue(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="PASSWORD"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <Input
                      placeholder="DISABLED"
                      disabled
                    />
                  </Stack>
                </Panel>
              </Stack>

              {/* Column 2 */}
              <Stack
                gap="lg"
                justify={
                  layoutMode === 'distributed' ? 'between' :
                    layoutMode === 'centered' ? 'center' : 'start'
                }
                style={{ height: '100%' }}
              >
                <Panel header="Controls">
                  <Stack gap="md">
                    <Stack direction="row" gap="xl" align="center" justify="between">
                      <Slider
                        label="FADER"
                        value={sliderValue}
                        onChange={setSliderValue}
                        unit="%"
                      />
                      <Slider
                        variant="discrete"
                        label="DISCRETE FADER"
                        min={0}
                        max={100}
                        step={25} // Will show ticks at 0, 25, 50, 75, 100
                        value={discreteSliderValue}
                        onChange={setDiscreteSliderValue}
                      />
                    </Stack>
                    <Stack direction="row" gap="xl" align="center" justify="start">
                      <Toggle
                        label="TOGGLE SWITCH"
                        checked={toggleValue}
                        onChange={setToggleValue}
                      />
                      <Toggle variant="checkbox"
                        label="CHECKBOX"
                        checked={checkboxValue}
                        onChange={setCheckboxValue}
                      />
                    </Stack>
                    <Select
                      label="DROPDOWN"
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { value: 'option1', label: 'Sine' },
                        { value: 'option2', label: 'Square' },
                        { value: 'option3', label: 'Sawtooth' },
                      ]}
                    />
                    <Stack direction="row" gap="xl" align="center" justify="between">
                      <XYPad
                        label="2D SLIDER"
                        x={xyValue.x}
                        y={xyValue.y}
                        onChange={(x, y) => setXyValue({ x, y })}
                        className="w-32"
                      />
                      <Knob
                        label="ROTARY KNOB"
                        value={knobValue}
                        onChange={setKnobValue}
                      />
                    </Stack>
                    <Stack direction="row" gap="xl" align="center" justify="between">
                      <Slider
                        label="DISABLED FADER"
                        value={50}
                        onChange={() => { }}
                        unit="%"
                        disabled
                      />
                      <Slider
                        variant="discrete"
                        label="DISABLED FADER"
                        value={50}
                        onChange={() => { }}
                        unit="%"
                        disabled
                      />
                      <Knob
                        label="DISABLED KNOB"
                        value={50}
                        onChange={() => { }}
                        disabled
                      />
                    </Stack>
                  </Stack>
                </Panel>

                <Panel header="Button Family">
                  <Stack gap="lg">
                    {/* Row 1: Momentary, Toggle, Disabled */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <Stack gap="sm">
                        <Text variant="secondary" size="xs">MOMENTARY</Text>
                        <Stack direction="row" gap="sm">
                          <Button>Primary</Button>
                        </Stack>
                      </Stack>

                      <Stack gap="sm">
                        <Text variant="secondary" size="xs">TOGGLE</Text>
                        <Stack direction="row" gap="sm">
                          <ToggleButton toggled={toggleButtonValue} onToggle={setToggleButtonValue}>
                            {toggleButtonValue ? 'ON' : 'OFF'}
                          </ToggleButton>
                          <Button active>Forced</Button>
                        </Stack>
                      </Stack>

                      <Stack gap="sm">
                        <Text variant="secondary" size="xs">DISABLED</Text>
                        <Stack direction="row" gap="sm">
                          <Button disabled>Primary</Button>
                        </Stack>
                      </Stack>
                    </div>

                    {/* Row 2: Radio Group */}
                    <Stack gap="sm">
                      <Text variant="secondary" size="xs">NAVIGATION / RADIO GROUP</Text>
                      <ButtonGroup>
                        <Button
                          active={radioValue === 'A'}
                          onClick={() => setRadioValue('A')}
                        >
                          Option A
                        </Button>
                        <Button
                          active={radioValue === 'B'}
                          onClick={() => setRadioValue('B')}
                        >
                          Option B
                        </Button>
                        <Button
                          active={radioValue === 'C'}
                          onClick={() => setRadioValue('C')}
                        >
                          Option C
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Stack>
                </Panel>
              </Stack>
            </div>
          </div>
        </div>
      )}

      {currentView === 'studio' && <div style={{ width: '100%', height: '100%' }}><StudioLayout layoutMode={layoutMode} /></div>}
      {currentView === 'dashboard' && <div style={{ width: '100%', height: '100%' }}><DashboardLayout layoutMode={layoutMode} /></div>}
      {currentView === 'kanban' && <div style={{ width: '100%', height: '100%' }}><KanbanLayout /></div>}
    </GrdbrzLayout>
  );
}

export default App;
