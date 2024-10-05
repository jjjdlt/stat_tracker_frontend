import React, { useEffect, useState } from 'react';
import { YStack, Text } from 'tamagui';
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

    const profileIconId = summonerInfo?.profileIconId ?? 1;
    const summonerLevel = summonerInfo?.summonerLevel ?? 'N/A';

    return (
        <YStack flex={1} space alignItems="center" padding={20} marginTop="10%" backgroundColor="$background">
            <Text fontSize={20} fontWeight="bold" color="$text">Summoner Info</Text>

            {error && <Text color="red">{error}</Text>}

            {typeof summonerInfo === 'object' && summonerInfo !== null ? (
                <YStack>
                    <Avatar profileIconId={profileIconId} />
                    <SummonerInfo summonerLevel={summonerLevel} />
                </YStack>
            ) : (
                <Text>No Summoner Info Available</Text>
            )}

            <Text fontSize={20} fontWeight="bold" marginTop={20} color="$text">Match History</Text>

            {matchHistory && matchHistory.length > 0 ? (
                <MatchHistory matchHistory={matchHistory} />
            ) : (
                <Text>No match history available</Text>
            )}

            <BackButton />
        </YStack>
    );
};

export default SummonerScreen;
