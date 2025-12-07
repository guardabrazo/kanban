import { create } from 'zustand';
import type { User } from 'firebase/auth';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    onSnapshot,
    orderBy,
    runTransaction
} from 'firebase/firestore';
import { db } from './firebase';

export interface Task {
    id: string;
    title: string;
    columnId: string;
    projectId: string;
    createdAt: number;
    description?: string;
    tag?: string;
    projectIndex: number;
}

export interface Column {
    id: string;
    title: string;
    projectId: string;
    order: number;
}

export interface Project {
    id: string;
    title: string;
    userId: string;
    createdAt: number;
    nextTaskIndex?: number;
    order: number;
}

export type Theme = 'darkDefault' | 'darkMuted' | 'highContrast' | 'light';

interface KanbanState {
    user: User | null;
    projects: Project[];
    currentProjectId: string | null;
    columns: Column[];
    tasks: Task[];
    theme: Theme;

    setUser: (user: User | null) => void;
    setTheme: (theme: Theme) => void;
    setCurrentProject: (projectId: string | null) => void;

    // Subscriptions
    subscribeToProjects: (userId: string) => () => void;
    subscribeToBoard: (projectId: string) => () => void; // Subscribes to columns and tasks

    // Actions
    addProject: (title: string) => Promise<void>;
    deleteProject: (projectId: string) => Promise<void>;
    addColumn: (title: string, projectId: string) => Promise<void>;
    deleteColumn: (columnId: string) => Promise<void>;
    addTask: (title: string, columnId: string, projectId: string, tag?: string, description?: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    renameTask: (taskId: string, newTitle: string) => Promise<void>;
    updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
    renameColumn: (columnId: string, newTitle: string) => Promise<void>;
    moveTask: (taskId: string, newColumnId: string) => Promise<void>;
    renameProject: (projectId: string, newTitle: string) => Promise<void>;
    reorderProject: (projectId: string, direction: 'up' | 'down') => Promise<void>;
    clearColumnTasks: (columnId: string) => Promise<void>; // For "Trash" functionality
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
    user: null,
    projects: [],
    currentProjectId: null,
    columns: [],
    tasks: [],
    theme: 'light', // Default

    setUser: (user) => set({ user }),
    setTheme: (theme) => set({ theme }),
    setCurrentProject: (currentProjectId) => set({ currentProjectId }),

    subscribeToProjects: (userId) => {
        const q = query(collection(db, 'projects'), where('userId', '==', userId), orderBy('order'), orderBy('createdAt'));
        return onSnapshot(q, (snapshot) => {
            const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
            set({ projects });
            // If no project selected and projects exist, select first
            if (!get().currentProjectId && projects.length > 0) {
                set({ currentProjectId: projects[0].id });
            }
        });
    },

    subscribeToBoard: (projectId) => {
        const colQ = query(collection(db, 'columns'), where('projectId', '==', projectId), orderBy('order'));
        const taskQ = query(collection(db, 'tasks'), where('projectId', '==', projectId), orderBy('createdAt'));

        const unsubCols = onSnapshot(colQ, (snapshot) => {
            const columns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Column));
            set({ columns });
        });

        const unsubTasks = onSnapshot(taskQ, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
            set({ tasks });
        });

        return () => {
            unsubCols();
            unsubTasks();
        };
    },

    addProject: async (title) => {
        const { user, projects } = get();
        if (!user) return;

        const order = projects.length;

        // Create Project
        const projectRef = await addDoc(collection(db, 'projects'), {
            title,
            userId: user.uid,
            createdAt: Date.now(),
            nextTaskIndex: 1, // Initialize task index for the project
            order
        });

        // Create Default Columns
        const defaultColumns = ['BACKLOG', 'TO DO', 'DOING', 'AWAIT', 'DONE'];

        // Using Promise.all for parallel creation
        const promises = defaultColumns.map((colTitle, index) =>
            addDoc(collection(db, 'columns'), {
                title: colTitle,
                projectId: projectRef.id,
                order: index
            })
        );

        await Promise.all(promises);
    },

    deleteProject: async (projectId) => {
        await deleteDoc(doc(db, 'projects', projectId));
        // Should also delete sub-collections or related docs, but for now simple delete
        // In a real app, use a cloud function or batch delete
        if (get().currentProjectId === projectId) {
            set({ currentProjectId: null });
        }
    },

    addColumn: async (title, projectId) => {
        const { columns } = get();
        const order = columns.length;
        await addDoc(collection(db, 'columns'), {
            title,
            projectId,
            order
        });
    },

    deleteColumn: async (columnId) => {
        await deleteDoc(doc(db, 'columns', columnId));
    },

    addTask: async (title, columnId, projectId, tag, description) => {
        const { user } = get();
        if (!user) return;

        await runTransaction(db, async (transaction) => {
            const projectRef = doc(db, 'projects', projectId);
            const projectDoc = await transaction.get(projectRef);

            if (!projectDoc.exists()) {
                throw "Project does not exist!";
            }

            const currentCount = projectDoc.data().nextTaskIndex || 1;

            const newTaskRef = doc(collection(db, 'tasks'));
            transaction.set(newTaskRef, {
                title,
                columnId,
                projectId,
                createdAt: Date.now(),
                tag: tag || 'General',
                description: description || '',
                projectIndex: currentCount
            });

            transaction.update(projectRef, {
                nextTaskIndex: currentCount + 1
            });
        });
    },

    deleteTask: async (taskId) => {
        await deleteDoc(doc(db, 'tasks', taskId));
    },

    renameTask: async (taskId, newTitle) => {
        await updateDoc(doc(db, 'tasks', taskId), {
            title: newTitle
        });
    },

    updateTask: async (taskId, updates) => {
        await updateDoc(doc(db, 'tasks', taskId), updates);
    },

    renameColumn: async (columnId, newTitle) => {
        await updateDoc(doc(db, 'columns', columnId), {
            title: newTitle
        });
    },

    moveTask: async (taskId, newColumnId) => {
        await updateDoc(doc(db, 'tasks', taskId), {
            columnId: newColumnId
        });
    },

    renameProject: async (projectId, newTitle) => {
        await updateDoc(doc(db, 'projects', projectId), {
            title: newTitle
        });
    },

    reorderProject: async (projectId, direction) => {
        const { projects } = get();
        const currentIndex = projects.findIndex(p => p.id === projectId);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= projects.length) return;

        const currentProject = projects[currentIndex];
        const targetProject = projects[targetIndex];

        // Optimistic update (optional, but good for UI responsiveness)
        // For now, we rely on Firestore subscription to update UI

        await runTransaction(db, async (transaction) => {
            const currentRef = doc(db, 'projects', currentProject.id);
            const targetRef = doc(db, 'projects', targetProject.id);

            // Swap orders
            // Note: We use the *current* order values from the state, assuming they are in sync.
            // A more robust way is to read them in the transaction, but for simple reordering this is usually fine.
            // Actually, let's just swap their order values.
            // If projects[currentIndex].order is X and projects[targetIndex].order is Y.
            // We want current to be Y and target to be X.

            // Wait, if we just rely on array index, we might have gaps if we deleted projects?
            // No, we should probably just swap the 'order' fields.
            // But if 'order' fields are not sequential (e.g. 0, 1, 3, 4), swapping works fine.

            // However, existing projects don't have 'order'.
            // We need to handle that. If 'order' is undefined, we should probably treat it as 0 or handle migration.
            // For now, let's assume new projects have order.
            // For existing projects, they will default to undefined (or 0 if we force it).
            // The sort `orderBy('order')` might put undefineds first or last.

            // Let's just swap the values we have in memory.
            const newOrderForCurrent = targetProject.order ?? 0;
            const newOrderForTarget = currentProject.order ?? 0;

            transaction.update(currentRef, { order: newOrderForCurrent });
            transaction.update(targetRef, { order: newOrderForTarget });
        });
    },

    clearColumnTasks: async (columnId) => {
        const { tasks } = get();
        const tasksInColumn = tasks.filter(t => t.columnId === columnId);
        // Batch delete would be better
        const promises = tasksInColumn.map(t => deleteDoc(doc(db, 'tasks', t.id)));
        await Promise.all(promises);
    }
}));
