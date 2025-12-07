import React, { useState, useRef, useEffect } from 'react';
import { Box, Stack, Heading, Button, Input, Pill, ButtonGroup } from 'grdbrz-ui';
import { useKanbanStore, type Column as ColumnType, type Task as TaskType } from './store';
import { TaskCard } from './TaskCard';
import styles from './KanbanBoard.module.scss';

interface ColumnProps {
    column: ColumnType;
    tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
    const { deleteColumn, clearColumnTasks, moveTask, renameColumn } = useKanbanStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameTitle, setRenameTitle] = useState(column.title);
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

    const handleRename = async (e: React.FormEvent) => {
        e.preventDefault();
        if (renameTitle.trim()) {
            await renameColumn(column.id, renameTitle);
            setIsRenaming(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

        if (taskId && sourceColumnId !== column.id) {
            await moveTask(taskId, column.id);
        }
    };

    return (
        <Box
            className={styles.column}
            style={{ background: 'var(--bg-panel)' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Column Header */}
            <Box className={styles.columnHeader} style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
                    {isRenaming ? (
                        <form onSubmit={handleRename} style={{ flex: 1, marginRight: '8px' }}>
                            <Stack gap="xs">
                                <Input
                                    value={renameTitle}
                                    onChange={(e) => setRenameTitle(e.target.value)}
                                    autoFocus
                                    onBlur={() => setIsRenaming(false)}
                                />
                            </Stack>
                        </form>
                    ) : (
                        <Heading size="sm">{column.title}</Heading>
                    )}

                    <Stack direction="row" gap="xs" align="center">
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
                                            onClick={() => { setIsRenaming(true); setIsMenuOpen(false); }}
                                            style={{ width: '100%', justifyContent: 'flex-start', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }}
                                        >
                                            Rename
                                        </Button>
                                        <Button
                                            variant="subtle"
                                            onClick={() => { clearColumnTasks(column.id); setIsMenuOpen(false); }}
                                            style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-error)', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderTop: 'none' }}
                                        >
                                            Flush
                                        </Button>
                                        <Button
                                            variant="subtle"
                                            onClick={() => deleteColumn(column.id)}
                                            style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-error)', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderTop: 'none' }}
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            )}
                        </div>
                        <Pill label={tasks.length.toString()} variant="muted" />
                    </Stack>
                </Stack>
            </Box>

            {/* Column Content */}
            <Stack gap="md" className={styles.columnContent}>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}

                <AddTask columnId={column.id} projectId={column.projectId} />
            </Stack>
        </Box>
    );
};

const AddTask: React.FC<{ columnId: string, projectId: string }> = ({ columnId, projectId }) => {
    const [title, setTitle] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isAdding, setIsAdding] = React.useState(false);
    const { addTask } = useKanbanStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addTask(title, columnId, projectId, tag.trim() || undefined, description.trim() || undefined);
        setTitle('');
        setTag('');
        setDescription('');
        setIsAdding(false);
    };

    if (isAdding) {
        return (
            <form onSubmit={handleSubmit}>
                <Stack gap="xs">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        autoFocus
                    />
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                    />
                    <Input
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Tag (optional)"
                    />
                    <Stack direction="row" gap="xs">
                        <Button type="submit" variant="primary">Add</Button>
                        <Button variant="subtle" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </Stack>
                </Stack>
            </form>
        );
    }

    return (
        <Button variant="subtle" className={styles.addTaskButton} onClick={() => setIsAdding(true)}>
            + Add Task
        </Button>
    );
};
