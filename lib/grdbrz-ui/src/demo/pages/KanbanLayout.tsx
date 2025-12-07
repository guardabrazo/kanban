import React from 'react';
import {
    Box,
    Stack,
    Heading,
    Text,
    Pill,
    Button
} from '../../lib';
import styles from './KanbanLayout.module.scss';

interface Task {
    id: string;
    title: string;
    tag: string;
    tagVariant: 'primary' | 'muted' | 'default';
    description?: string;
}

const COLUMNS: { id: string; title: string; tasks: Task[] }[] = [
    {
        id: 'backlog',
        title: 'Backlog',
        tasks: [
            { id: '1', title: 'Research competitors', tag: 'Research', tagVariant: 'muted', description: 'Analyze market trends and competitor features.' },
            { id: '2', title: 'Draft user stories', tag: 'Design', tagVariant: 'primary' },
            { id: '3', title: 'Update documentation', tag: 'Docs', tagVariant: 'muted' },
        ]
    },
    {
        id: 'todo',
        title: 'To Do',
        tasks: [
            { id: '4', title: 'Setup project repo', tag: 'DevOps', tagVariant: 'default' },
            { id: '5', title: 'Design system tokens', tag: 'Design', tagVariant: 'primary', description: 'Define colors, typography, and spacing.' },
        ]
    },
    {
        id: 'inprogress',
        title: 'In Progress',
        tasks: [
            { id: '6', title: 'Implement Button component', tag: 'Dev', tagVariant: 'primary' },
            { id: '7', title: 'Fix navigation bug', tag: 'Bug', tagVariant: 'default' },
        ]
    },
    {
        id: 'await',
        title: 'Await',
        tasks: [
            { id: '10', title: 'Feedback from design', tag: 'Design', tagVariant: 'muted' },
        ]
    },
    {
        id: 'done',
        title: 'Done',
        tasks: [
            { id: '8', title: 'Initial commit', tag: 'DevOps', tagVariant: 'muted' },
            { id: '9', title: 'Project kickoff', tag: 'Meeting', tagVariant: 'muted' },
        ]
    }
];

export const KanbanLayout: React.FC = () => {
    return (
        <Box
            background="app"
            className={styles.board}
        >
            <Stack
                direction="row"
                gap="lg"
                align="stretch"
                grow
                className={styles.columnsContainer}
            >
                {COLUMNS.map((column) => (
                    <Box
                        key={column.id}
                        background="panel"
                        className={styles.column}
                    >
                        {/* Column Header */}
                        <Box
                            p="md"
                            borderSide="bottom"
                            className={styles.columnHeader}
                        >
                            <Heading as="h3" size="sm">{column.title}</Heading>
                            <Pill label={column.tasks.length.toString()} variant="muted" />
                        </Box>

                        {/* Column Content */}
                        <Stack gap="md" className={styles.columnContent}>
                            {column.tasks.map((task) => (
                                <Box
                                    key={task.id}
                                    background="surface"
                                    border="subtle"
                                    p="md"
                                    className={styles.taskCard}
                                >
                                    <Stack gap="sm">
                                        <Stack direction="row" justify="between" align="start">
                                            <Pill label={task.tag} variant={task.tagVariant} />
                                            <Button variant="subtle" className={styles.moreButton}>
                                                ...
                                            </Button>
                                        </Stack>

                                        <Text size="sm" style={{ fontWeight: 500 }}>{task.title}</Text>

                                        {task.description && (
                                            <Text size="xs" variant="secondary" style={{ lineHeight: '1.4' }}>
                                                {task.description}
                                            </Text>
                                        )}

                                        <Stack direction="row" justify="between" align="center" style={{ marginTop: '4px' }}>
                                            <Text size="xs" variant="muted">#{task.id}</Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}

                            <Button variant="subtle" className={styles.addTaskButton}>
                                + Add Task
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};
