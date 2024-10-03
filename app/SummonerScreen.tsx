import React, { useEffect, useState } from 'react';
import { Avatar, YStack, Text, ListItem, Separator, YGroup, Group, SizableText, Button, XStack } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getHostIP } from '../utils/ipv4detector';

interface SummonerInfo {
    summonerLevel: number;
    accountId: string;
    profileIconId: number;
}

const SummonerScreen = () => {
    const [puuid, setPuuid] = useState<string | null>(null);
    const [gameName, setGameName] = useState<string | null>(null);
    const [tagLine, setTagLine] = useState<string | null>(null);
    const [summonerInfo, setSummonerInfo] = useState<SummonerInfo | null>(null);
    const [matchHistory, setMatchHistory] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const savedPuuid = await AsyncStorage.getItem('puuid');
                const savedGameName = await AsyncStorage.getItem('gameName');
                const savedTagLine = await AsyncStorage.getItem('tagLine');

                if (savedPuuid && savedGameName && savedTagLine) {
                    setPuuid(savedPuuid);
                    setGameName(savedGameName);
                    setTagLine(savedTagLine);

                    // Fetch summoner info and match history
                    await fetchSummonerInfo(savedPuuid);
                    await fetchMatchHistory(savedPuuid);
                }
            } catch (error) {
                console.error('Error loading stored data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredData();
    }, []);

// Fetch Summoner Info with dynamic IP
    const fetchSummonerInfo = async (puuid: string) => {
        const ipAddress = await getHostIP();  // Get the IP dynamically
        if (!ipAddress) {
            console.error('Error: Unable to get the host IP');
            return;
        }

        try {
            const response = await fetch(`http://${ipAddress}:8000/summoner-info`);
            const data = await response.json();
            setSummonerInfo(data);
        } catch (error) {
            console.error('Error fetching summoner info:', error);
        }
    };

// Fetch Match History with dynamic IP
    const fetchMatchHistory = async (puuid: string) => {
        const ipAddress = await getHostIP();  // Get the IP dynamically
        if (!ipAddress) {
            console.error('Error: Unable to get the host IP');
            return;
        }

        try {
            const response = await fetch(`http://${ipAddress}:8000/summoner-matches`);
            const data = await response.json();
            setMatchHistory(data.matches);
        } catch (error) {
            console.error('Error fetching match history:', error);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <YStack space alignItems="center" padding={20} marginTop="10%">
            <Text fontSize={20} fontWeight="bold">Summoner Info</Text>
            {summonerInfo ? (
                <>
                    {/* Avatar for Profile Icon */}
                    <Avatar circular size="$10">
                        <Avatar.Image
                            accessibilityLabel="Profile Icon"
                            src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summonerInfo.profileIconId}.png`}
                        />
                        <Avatar.Fallback backgroundColor="$blue10" />
                    </Avatar>

                    {/* XStack inside Group for displaying Summoner Info */}
                    <Group space="$3" bordered width={300}>
                        <Group.Item>
                            <XStack justifyContent="center" alignItems="center" space="$4">
                                <SizableText marginRight="1%" size="$4" fontWeight="bold">{gameName}</SizableText>
                                <SizableText size="$4" color="$gray9" marginLeft="$1">#{tagLine}</SizableText>
                            </XStack>
                            <XStack justifyContent="space-evenly" alignItems="center" space="$2">
                                <SizableText size="$4">Level {summonerInfo.summonerLevel}</SizableText>
                            </XStack>
                        </Group.Item>
                    </Group>
                </>
            ) : (
                <Text>Loading Summoner Info...</Text>
            )}

            <Text fontSize={20} fontWeight="bold" marginTop={20}>Match History</Text>
            {matchHistory ? (
                <YGroup alignSelf="center" bordered width={300} size="$4" separator={<Separator />}>
                    {matchHistory.map((matchId, index) => (
                        <YGroup.Item key={index}>
                            <ListItem
                                hoverTheme
                                pressTheme
                                title={`Match ID: ${matchId}`}
                                subTitle={`Match ${index + 1}`}
                            />
                        </YGroup.Item>
                    ))}
                </YGroup>
            ) : (
                <Text>Loading Match History...</Text>
            )}

            {/* Back button to navigate to the home (index) screen */}
            <Button
                position="absolute"
                top={10}
                left={10}
                onPress={() => router.push('/')}
            >
                Back to Home
            </Button>

        </YStack>
    );
};

export default SummonerScreen;
