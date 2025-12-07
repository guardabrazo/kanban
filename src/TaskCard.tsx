import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, Stack, Button, Pill, Input, ButtonGroup } from 'grdbrz-ui';
import { type Task, useKanbanStore } from './store';
import styles from './KanbanBoard.module.scss';

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { deleteTask, updateTask } = useKanbanStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editTag, setEditTag] = useState(task.tag || 'General');
    const [editDescription, setEditDescription] = useState(task.description || '');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync state with task prop
    useEffect(() => {
        setEditTitle(task.title);
        setEditTag(task.tag || 'General');
        setEditDescription(task.description || '');
    }, [task]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editTitle.trim()) {
            await updateTask(task.id, {
                title: editTitle,
                tag: editTag.trim() || 'General', // Default to General if empty
                description: editDescription.trim() // Allow empty string, do not send undefined
            });
            setIsEditing(false);
        }
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('sourceColumnId', task.columnId);
    };

    return (
        <Box
            className={styles.taskCard}
            draggable={!isEditing}
            onDragStart={handleDragStart}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '1rem', position: 'relative' }}
        >
            <Stack gap="sm">
                <Stack direction="row" justify="between" align="start">
                    <Pill label={task.tag || 'General'} variant="default" />

                    <div style={{ position: 'relative' }} ref={menuRef}>
                        <Button
                            variant="subtle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={styles.moreButton}
                            style={{ padding: '4px 8px', height: 'auto' }}
                        >
                            ...
                        </Button>
                        {isMenuOpen && (
                            <Box style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                zIndex: 10,
                                minWidth: '100px'
                            }}>
                                <ButtonGroup orientation="vertical" style={{ width: '100%' }}>
                                    <Button
                                        variant="subtle"
                                        onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
                                        style={{ width: '100%', justifyContent: 'flex-start', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="subtle"
                                        onClick={() => deleteTask(task.id)}
                                        style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-error)', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderTop: 'none' }}
                                    >
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        )}
                    </div>
                </Stack>

                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <Stack gap="xs">
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                                autoFocus
                            />
                            <Input
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <Input
                                value={editTag}
                                onChange={(e) => setEditTag(e.target.value)}
                                placeholder="Tag"
                            />
                            <ButtonGroup style={{ display: 'flex', width: '100%' }}>
                                <Button type="submit" variant="primary" style={{ flex: 1 }}>Save</Button>
                                <Button variant="subtle" onClick={() => setIsEditing(false)} style={{ flex: 1 }}>Cancel</Button>
                            </ButtonGroup>
                        </Stack>
                    </form>
                ) : (
                    <>
                        <Text size="sm" style={{ fontWeight: 500 }}>{task.title}</Text>
                        {task.description && (
                            <Text size="xs" variant="muted" style={{ lineHeight: '1.4' }}>
                                {task.description}
                            </Text>
                        )}
                    </>
                )}

                <Stack direction="row" justify="between" align="center" style={{ marginTop: '4px' }}>
                    <Text size="xs" variant="muted">#{task.projectIndex}</Text>
                </Stack>
            </Stack>
        </Box>
    );
};
