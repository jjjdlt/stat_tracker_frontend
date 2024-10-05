import React from 'react';
import { Button, Input, Text, YStack } from 'tamagui';
import { useSummonerSetup } from '../hooks/useSummonerSetup';

const IndexScreen: React.FC = () => {
    const {
        gameName,
        tagLine,
        setGameNameInput,
        setTagLineInput,
        handleSubmit,
        handleSkip,
        error,
        hasCookies,
    } = useSummonerSetup();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <YStack space="$6" alignItems="center" padding={20} marginTop="10%">  {/* Add layout structure */}
            <Text fontSize={20} fontWeight="bold" color="$text">
                Summon your stats
            </Text>

            <Input
                placeholder="gameName"
                value={gameName}
                onChangeText={setGameNameInput}
                onKeyPress={handleKeyPress}
                width={250}
                backgroundColor="$inputBackground"
                color="$inputText"
                borderColor="$border"
            />
            <Input
                placeholder="tagLine"
                value={tagLine}
                onChangeText={setTagLineInput}
                onKeyPress={handleKeyPress}
                width={250}
                backgroundColor="$inputBackground"
                color="$inputText"
                borderColor="$border"
            />

            <Button
                onPress={handleSubmit}
                backgroundColor="$buttonBackground"
                color="$buttonText"
                accessibilityLabel="Submit Button"
            >
                <Text>Submit</Text>
            </Button>

            {error && <Text color="$errorColor">{error}</Text>}

            {hasCookies && (
                <Button
                    marginTop="$4"
                    onPress={handleSkip}
                    backgroundColor="$buttonBackground"
                    color="$buttonText"
                    accessibilityLabel="Skip Button"
                >
                    <Text>Skip to Summoner Screen</Text>
                </Button>
            )}
        </YStack>
    );
};

export default IndexScreen;
