import React, { useEffect, useState } from 'react';
import { Stack, Button, Input, Box } from 'grdbrz-ui';
import { useKanbanStore } from './store';
import { Column } from './Column';
import styles from './KanbanBoard.module.scss';

export const ProjectBoard: React.FC = () => {
    const {
        currentProjectId,
        columns,
        tasks,
        subscribeToBoard,
        addColumn
    } = useKanbanStore();

    const [newColumnTitle, setNewColumnTitle] = useState('');
    const [isAddingColumn, setIsAddingColumn] = useState(false);

    useEffect(() => {
        if (!currentProjectId) return;
        const unsubscribe = subscribeToBoard(currentProjectId);
        return () => unsubscribe();
    }, [currentProjectId, subscribeToBoard]);

    const handleAddColumn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newColumnTitle.trim() || !currentProjectId) return;
        await addColumn(newColumnTitle, currentProjectId);
        setNewColumnTitle('');
        setIsAddingColumn(false);
    };

    if (!currentProjectId) return null;

    return (
        <Box className={styles.board}>
            <Stack direction="row" gap="lg" align="stretch" className={styles.columnsContainer}>
                {columns.map(col => (
                    <Column
                        key={col.id}
                        column={col}
                        tasks={tasks.filter(t => t.columnId === col.id)}
                    />
                ))}


                <Box className={isAddingColumn ? styles.addColumn : styles.minimalAddColumn}>
                    {isAddingColumn ? (
                        <form onSubmit={handleAddColumn} style={{ width: '100%' }}>
                            <Stack gap="sm">
                                <Input
                                    value={newColumnTitle}
                                    onChange={(e) => setNewColumnTitle(e.target.value)}
                                    placeholder="Column Title"
                                    autoFocus
                                />
                                <Stack direction="row" gap="sm">
                                    <Button type="submit" variant="primary">Add</Button>
                                    <Button variant="subtle" onClick={() => setIsAddingColumn(false)}>Cancel</Button>
                                </Stack>
                            </Stack>
                        </form>
                    ) : (
                        <button onClick={() => setIsAddingColumn(true)} title="Add Column">
                            +
                        </button>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};
