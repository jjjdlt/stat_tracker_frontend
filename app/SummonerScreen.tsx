import React, { useEffect, useState } from 'react';
import { Avatar, YStack, Text, ListItem, Separator, YGroup, Group, SizableText, Button } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';  // Import the useRouter hook for navigation

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
    const router = useRouter();  // Use router for navigation

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

    const fetchSummonerInfo = async (puuid: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/summoner-info`);
            const data = await response.json();
            setSummonerInfo(data);
        } catch (error) {
            console.error('Error fetching summoner info:', error);
        }
    };

    const fetchMatchHistory = async (puuid: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/summoner-matches`);
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
        <YStack space alignItems="center" padding={20}>
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

                    {/* Grouping Summoner Info */}
                    <Group space="$3" bordered width={300}>
                        <Group.Item>
                            <SizableText size="$4" fontWeight="bold">{gameName}</SizableText>
                        </Group.Item>
                        <Group.Item>
                            <SizableText size="$4" color="$gray9">#{tagLine}</SizableText>
                        </Group.Item>
                        <Group.Item>
                            <SizableText size="$4">Level {summonerInfo.summonerLevel}</SizableText>
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
            <Button marginTop="$4" onPress={() => router.push('/')}>
                Back to Home
            </Button>
        </YStack>
    );
};

export default SummonerScreen;
