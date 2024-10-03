import React from 'react';
import { Button } from '~/components/Button';  // Adjusted path
import { Container } from '~/components/Container';  // Adjusted path
import { Text } from 'tamagui';  // Using Tamagui Text component

const IndexScreen = () => {
    return (
        <Container>
            <Text fontSize={24} fontWeight="bold">
                Welcome to the App
            </Text>
            <Text fontSize={16} marginBottom={20}>
                This is your first screen!
            </Text>
            <Button onPress={() => alert('Button Pressed!')}>
            </Button>
        </Container>
    );
};

export default IndexScreen;
