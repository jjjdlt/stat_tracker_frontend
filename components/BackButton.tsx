import React from 'react';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';
import { Text } from 'tamagui';  // Ensure text is wrapped in <Text>

const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            position="absolute"
            top={10}
            left={10}
            onPress={() => router.push('/')}
        >
            <Text>Back to Home</Text>
        </Button>
    );
};

export default BackButton;
