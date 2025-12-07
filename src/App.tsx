import React, { useEffect, useState } from 'react';
import { AppShell, Stack, Text, Button, Input, Box, Panel } from 'grdbrz-ui';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useKanbanStore } from './store';
import { Auth } from './Auth';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ProjectBoard } from './ProjectBoard';
import { PomodoroTimer } from './PomodoroTimer';

const KanbanApp: React.FC = () => {
  const {
    user,
    setUser,
    projects,
    currentProjectId,
    setCurrentProject,
    subscribeToProjects,
    addProject,
    deleteProject
  } = useKanbanStore();

  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [deleteMenuProjectId, setDeleteMenuProjectId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  // Click outside to close delete menu
  useEffect(() => {
    const handleClickOutside = () => setDeleteMenuProjectId(null);
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
        <Stack gap="md" style={{ height: '100%', padding: '24px' }}>
          <Panel header="Projects">
            <Stack gap="sm">
              <Stack gap="none">
                {projects.map((project, index) => {
                  const isFirst = index === 0;
                  const isLast = index === projects.length - 1;
                  const borderRadius = projects.length === 1 ? '4px' :
                    isFirst ? '4px 4px 0 0' :
                      isLast ? '0 0 4px 4px' :
                        '0';

                  return (
                    <div key={project.id} style={{ position: 'relative', width: '100%' }}>
                      <Button
                        variant={currentProjectId === project.id ? 'primary' : 'subtle'}
                        onClick={() => setCurrentProject(project.id)}
                        active={currentProjectId === project.id}
                        style={{
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          borderRadius: borderRadius,
                          borderBottom: !isLast ? 'none' : undefined // Prevent double borders if they have them
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                          {project.title}
                        </span>
                        {currentProjectId === project.id && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteMenuProjectId(deleteMenuProjectId === project.id ? null : project.id);
                            }}
                            style={{ marginLeft: '8px', opacity: 0.7, padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            title="Delete Project"
                          >
                            ×
                          </span>
                        )}
                      </Button>
                      {deleteMenuProjectId === project.id && (
                        <Box style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          zIndex: 100,
                          minWidth: '120px'
                        }}>
                          <Button
                            variant="subtle"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProject(project.id);
                              setDeleteMenuProjectId(null);
                            }}
                            style={{ width: '100%', color: 'var(--color-error)', justifyContent: 'flex-start', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }}
                          >
                            Confirm Delete
                          </Button>
                        </Box>
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
        <Stack direction="row" justify="center" align="center" style={{ width: '100%', padding: '0 24px', height: '40px' }}>
          <Text size="xs" variant="muted">© {new Date().getFullYear()} GUARDABRAZO</Text>
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
    </AppShell>
  );
};

function App() {
  return <KanbanApp />;
}

export default App;
