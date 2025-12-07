import React, { useEffect, useState } from 'react';
import { AppShell, Stack, Text, Button, Input, Box, Panel, ButtonGroup } from 'grdbrz-ui';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useKanbanStore } from './store';
import { Auth } from './Auth';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ProjectBoard } from './ProjectBoard';
import { PomodoroTimer } from './PomodoroTimer';
import './App.css';

const KanbanApp: React.FC = () => {
  const {
    user,
    setUser,
    projects,
    currentProjectId,
    setCurrentProject,
    subscribeToProjects,
    addProject,
    deleteProject,
    renameProject
  } = useKanbanStore();

  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [menuProjectId, setMenuProjectId] = useState<string | null>(null);
  const [renamingProjectId, setRenamingProjectId] = useState<string | null>(null);
  const [renameProjectTitle, setRenameProjectTitle] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = () => setMenuProjectId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToProjects(user.uid);
    return () => unsubscribe();
  }, [user, subscribeToProjects]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    await addProject(newProjectTitle);
    setNewProjectTitle('');
    setIsAddingProject(false);
  };

  if (!user) {
    return <Auth />;
  }

  return (
    <AppShell
      title="Kanban"
      defaultTheme="light"
      headerActions={
        <Stack direction="row" gap="md" align="center">
          <ThemeSwitcher />
          <Button variant="subtle" onClick={() => auth.signOut()}>
            Logout
          </Button>
        </Stack>
      }
      sidebar={
        <Stack gap="md" className="app-sidebar" style={{ height: '100%' }}>
          <Panel header="Projects">
            <Stack gap="sm">
              <Stack gap="none">
                {projects.map((project, index) => {
                  const isLast = index === projects.length - 1;

                  const isRenaming = renamingProjectId === project.id;

                  return (
                    <div key={project.id} style={{ width: '100%' }}>
                      {isRenaming ? (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (renameProjectTitle.trim()) {
                              await renameProject(project.id, renameProjectTitle);
                              setRenamingProjectId(null);
                            }
                          }}
                          style={{ width: '100%' }}
                        >
                          <Input
                            value={renameProjectTitle}
                            onChange={(e) => setRenameProjectTitle(e.target.value)}
                            autoFocus
                            onBlur={() => setRenamingProjectId(null)}
                            style={{ height: '32px', width: '100%' }}
                          />
                        </form>
                      ) : (
                        <Stack direction="row" gap="none" style={{ width: '100%' }}>
                          <Button
                            variant={currentProjectId === project.id ? 'primary' : 'subtle'}
                            onClick={() => setCurrentProject(project.id)}
                            active={currentProjectId === project.id}
                            style={{
                              flex: 1,
                              justifyContent: 'flex-start',
                              textAlign: 'left',
                              borderRadius: '0',
                              borderBottom: !isLast ? 'none' : undefined,
                              borderRight: currentProjectId === project.id ? 'none' : undefined
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {project.title}
                            </span>
                          </Button>

                          {currentProjectId === project.id && (
                            <div style={{ position: 'relative' }}>
                              <Button
                                variant="primary"
                                active={true}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuProjectId(menuProjectId === project.id ? null : project.id);
                                }}
                                style={{
                                  padding: '0 8px',
                                  height: '100%',
                                  borderRadius: '0',
                                  borderBottom: !isLast ? 'none' : undefined,
                                  borderLeft: 'none'
                                }}
                                title="Project Options"
                              >
                                ...
                              </Button>
                              {menuProjectId === project.id && (
                                <Box style={{
                                  position: 'absolute',
                                  top: '100%',
                                  right: 0,
                                  zIndex: 100,
                                  minWidth: '120px'
                                }}>
                                  <ButtonGroup orientation="vertical" style={{ width: '100%' }}>
                                    <Button
                                      variant="subtle"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setRenamingProjectId(project.id);
                                        setRenameProjectTitle(project.title);
                                        setMenuProjectId(null);
                                      }}
                                      style={{ width: '100%', justifyContent: 'flex-start', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }}
                                    >
                                      Rename
                                    </Button>
                                    <Button
                                      variant="subtle"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProject(project.id);
                                        setMenuProjectId(null);
                                      }}
                                      style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-error)', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderTop: 'none' }}
                                    >
                                      Delete
                                    </Button>
                                  </ButtonGroup>
                                </Box>
                              )}
                            </div>
                          )}
                        </Stack>
                      )}
                    </div>
                  );
                })}
              </Stack>

              {isAddingProject ? (
                <form onSubmit={handleAddProject}>
                  <Stack gap="xs">
                    <Input
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                      placeholder="New Project"
                      autoFocus
                    />
                    <Stack direction="row" gap="xs">
                      <Button type="submit" variant="primary">Add</Button>
                      <Button variant="subtle" onClick={() => setIsAddingProject(false)}>Cancel</Button>
                    </Stack>
                  </Stack>
                </form>
              ) : (
                <Button variant="subtle" onClick={() => setIsAddingProject(true)} style={{ justifyContent: 'flex-start' }}>
                  + New Project
                </Button>
              )}
            </Stack>
          </Panel>

          <Box style={{ flex: 1 }} /> {/* Spacer */}

          <PomodoroTimer />
        </Stack>
      }
      footer={
        <Stack direction="row" justify="center" align="center" style={{ width: '100%', padding: '0 16px', height: '24px' }}>
          <Text style={{ fontSize: '10px', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} GUARDABRAZO</Text>
        </Stack>
      }
    >
      <Stack gap="md" style={{ height: '100%' }}>
        {/* Project Content */}
        {currentProjectId ? (
          <Box style={{ flex: 1, overflow: 'hidden' }}>

            <ProjectBoard />
          </Box>
        ) : (
          <Panel style={{ padding: '2rem', textAlign: 'center' }}>
            <Text variant="muted">Select or create a project to get started.</Text>
          </Panel>
        )}
      </Stack>
    </AppShell >
  );
};

function App() {
  return <KanbanApp />;
}

export default App;
