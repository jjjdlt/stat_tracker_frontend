import React, { useEffect, useState } from 'react';
import { YStack, Text } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getHostIP } from '../utils/ipv4detector';
import Avatar from '../components/Avatar';
import SummonerInfo from '../components/SummonerInfo';
import MatchHistory from '../components/MatchHistory';
import BackButton from '../components/BackButton';
import { useGlobalState } from '../context/GlobalState';

interface SummonerInfo {
    summonerLevel: number;
    accountId: string;
    profileIconId: number;
}

const SummonerScreen = () => {
    const { puuid } = useGlobalState();  // Use global state for puuid
    const [summonerInfo, setSummonerInfo] = useState<SummonerInfo | null>(null);
    const [matchHistory, setMatchHistory] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const savedPuuid = await AsyncStorage.getItem('puuid');
                if (savedPuuid) {
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
        const ipAddress = await getHostIP();
        if (!ipAddress) return;

        try {
            const response = await fetch(`http://${ipAddress}:8000/summoner-info`);
            const data = await response.json();
            setSummonerInfo(data);
        } catch (error) {
            console.error('Error fetching summoner info:', error);
        }
    };

    const fetchMatchHistory = async (puuid: string) => {
        const ipAddress = await getHostIP();
        if (!ipAddress) return;

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
                    <Avatar profileIconId={summonerInfo.profileIconId} />
                    <SummonerInfo />
                </>
            ) : (
                <Text>Loading Summoner Info...</Text>
            )}

            <Text fontSize={20} fontWeight="bold" marginTop={20}>Match History</Text>
            <MatchHistory matchHistory={matchHistory} />

            <BackButton />
        </YStack>
    );
};

export default SummonerScreen;
