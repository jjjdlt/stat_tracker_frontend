import React, { useState, useEffect } from 'react';
import { Button, YStack, Input, Text } from 'tamagui';
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import { getHostIP } from '../utils/ipv4detector';  // Import the getHostIP function


const IndexScreen = () => {
    const { setPuuid, setGameName, setTagLine } = useGlobalState();
    const [gameName, setGameNameInput] = useState('');
    const [tagLine, setTagLineInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [hasCookies, setHasCookies] = useState<boolean>(false);
    const [hostIP, setHostIP] = useState<string | null>(null);  // To store the dynamic IP// Track if cookies are found
    const router = useRouter();

    // Check AsyncStorage on initial load
    useEffect(() => {
        const loadHostIP = async () => {
            const ipAddress = await getHostIP();  // Get the IP of the device running Expo Go
            setHostIP(ipAddress);  // Save the IP address to be used in the fetch requests
        };

        loadHostIP();

        const loadStoredData = async () => {
            const savedGameName = await AsyncStorage.getItem('gameName');
            const savedTagLine = await AsyncStorage.getItem('tagLine');
            const savedPuuid = await AsyncStorage.getItem('puuid');

            if (savedGameName && savedTagLine && savedPuuid) {
                setHasCookies(true);  // Show "Skip to SummonerScreen" button if cookies exist
            }
        };

        loadStoredData();
    }, []);

    const handleSubmit = async () => {
        if (!hostIP) {
            setError('Unable to detect host IP.');
            return;
        }

        try {
            const response = await fetch(`http://${hostIP}:8000/puuid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameName: gameName.trim(),
                    tagLine: tagLine.trim(),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch PUUID');
            }

            const data = await response.json();

            // Set PUUID, gameName, and tagLine in global state
            setPuuid(data.puuid);
            setGameName(gameName);
            setTagLine(tagLine);

            // Store PUUID, gameName, and tagLine in AsyncStorage
            await AsyncStorage.setItem('puuid', data.puuid);
            await AsyncStorage.setItem('gameName', gameName);
            await AsyncStorage.setItem('tagLine', tagLine);

            // Navigate to summoner screen
            router.push('/SummonerScreen');
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching PUUID');
        }
    };

    // Handle skipping to SummonerScreen using stored cookies
    const handleSkip = async () => {
        const savedPuuid = await AsyncStorage.getItem('puuid');
        const savedGameName = await AsyncStorage.getItem('gameName');
        const savedTagLine = await AsyncStorage.getItem('tagLine');

        if (savedPuuid && savedGameName && savedTagLine) {
            setPuuid(savedPuuid);
            setGameName(savedGameName);
            setTagLine(savedTagLine);

            router.push('/SummonerScreen');
        }
    };

    return (
        <YStack space alignItems="center" padding={20} marginTop="10%">
            <Text fontSize={20} fontWeight="bold">
                Enter your gameName and tagLine
            </Text>

            {/* Input fields for gameName and tagLine */}
            <Input
                placeholder="gameName"
                value={gameName}
                onChangeText={setGameNameInput}
                width={250}
            />
            <Input
                placeholder="tagLine"
                value={tagLine}
                onChangeText={setTagLineInput}
                width={250}
            />

            {/* Submit button */}
            <Button onPress={handleSubmit}>Submit</Button>

            {/* Show error if any */}
            {error && <Text color="red">{error}</Text>}

            {/* Show Skip button if cookies are available */}
            {hasCookies && (
                <Button marginTop="$4" onPress={handleSkip}>
                    Skip to SummonerScreen
                </Button>
            )}
        </YStack>
    );
};

export default IndexScreen;
