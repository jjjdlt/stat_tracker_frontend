import React from 'react';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';

const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            position="absolute"
            top="$2"
            left="$2"
            onPress={() => router.push('/')}
        >
            Back
        </Button>
    );
};

export default BackButton;
