import { Button, YStack, Input, Text } from 'tamagui';
import { useSummonerSetup } from '../hooks/useSummonerSetup';

const IndexScreen = () => {
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
        <YStack space alignItems="center" padding={20} marginTop="10%">
            <Text fontSize={20} fontWeight="bold">
                Summon your stats
            </Text>

            {/* Input fields for gameName and tagLine */}
            <Input
                placeholder="gameName"
                value={gameName}
                onChangeText={setGameNameInput}
                onKeyPress={handleKeyPress}
                width={250}
                accessibilityLabel="Game Name Input"
            />
            <Input
                placeholder="tagLine"
                value={tagLine}
                onChangeText={setTagLineInput}
                onKeyPress={handleKeyPress}
                width={250}
                accessibilityLabel="Tag Line Input"
            />

            {/* Submit button using Tamagui's Button */}
            <Button onPress={handleSubmit} accessibilityLabel="Submit Button">
                Submit
            </Button>

            {/* Show error if any */}
            {error && <Text color="red">{error}</Text>}

            {/* Show Skip button if cookies are available */}
            {hasCookies && (
                <Button marginTop="$4" onPress={handleSkip} accessibilityLabel="Skip Button">
                    Skip to Summoner Screen
                </Button>
            )}
        </YStack>
    );
};

export default IndexScreen;
