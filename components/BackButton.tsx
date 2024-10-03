// components/BackButton.tsx
import React from 'react';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';

const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            position="absolute"
            top={10}
            left={10}
            onPress={() => router.push('/')}
        >
            Back to Home
        </Button>
    );
};

export default BackButton;
