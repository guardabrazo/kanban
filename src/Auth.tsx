import React, { useState } from 'react';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from './firebase';
import {
    Button,
    Input,
    Panel,
    Heading,
    Text,
    Stack,
    Box
} from 'grdbrz-ui';

export const Auth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Box
            data-theme="light"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-base)',
                color: 'var(--text-primary)'
            }}
        >
            <Panel style={{ width: '400px', padding: '2rem' }}>
                <Stack gap="lg">
                    <Heading as="h2" style={{ textAlign: 'center' }}>
                        {isLogin ? 'KANBAN' : 'Create Account'}
                    </Heading>

                    {error && (
                        <Text variant="accent" style={{ color: 'var(--color-error, red)' }}>
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            autoComplete="email"
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                        />
                        <Button type="submit" variant="primary">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </form>

                    <Stack direction="row" gap="md" align="center" justify="center">
                        <Text size="xs" variant="muted">OR</Text>
                    </Stack>

                    <Button onClick={handleGoogleLogin} variant="subtle">
                        Continue with Google
                    </Button>

                    <Button
                        variant="subtle"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Button>
                </Stack>
            </Panel>
        </Box>
    );
};
