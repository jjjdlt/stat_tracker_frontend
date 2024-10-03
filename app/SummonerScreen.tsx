import React, { useEffect, useState } from 'react';
import { YStack, Text } from 'tamagui'; // Import Text from Tamagui
import Avatar from '../components/Avatar';
import SummonerInfo from '../components/SummonerInfo';
import MatchHistory from '../components/MatchHistory';
import BackButton from '../components/BackButton';
import { useGlobalState } from '../context/GlobalState';
import { useSummonerSetup } from '../hooks/useSummonerSetup';

const SummonerScreen = () => {
    const { puuid } = useGlobalState();
    const { fetchSummonerInfo, fetchMatchHistory, summonerInfo = {}, matchHistory = [] } = useSummonerSetup();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                if (!puuid) {
                    setError('PUUID not found.');
                    return;
                }

                await Promise.all([fetchSummonerInfo(puuid), fetchMatchHistory(puuid)]);
            } catch (error) {
                setError('Error loading stored data');
                console.error('Error loading stored data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredData();
    }, [puuid]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <YStack space alignItems="center" padding={20} marginTop="10%">
            <Text fontSize={20} fontWeight="bold">Summoner Info</Text>
            {error && <Text color="red">{error}</Text>}
            {summonerInfo && summonerInfo.profileIconId ? (
                <>
                    <Avatar profileIconId={summonerInfo.profileIconId} />
                    <SummonerInfo summonerLevel={summonerInfo.summonerLevel} />
                </>
            ) : (
                <Text>No Summoner Info Available</Text>
            )}

            <Text fontSize={20} fontWeight="bold" marginTop={20}>Match History</Text>
            <MatchHistory matchHistory={matchHistory} />

            <BackButton />
        </YStack>
    );
};

export default SummonerScreen;
