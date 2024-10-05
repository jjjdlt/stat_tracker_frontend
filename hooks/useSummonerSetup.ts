// hooks/useSummonerSetup.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'expo-router';
import { getHostIP } from '../utils/ipv4detector';

export const useSummonerSetup = () => {
    const { setPuuid, setGameName, setTagLine } = useGlobalState();
    const [gameName, setGameNameInput] = useState('');
    const [tagLine, setTagLineInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [hasCookies, setHasCookies] = useState<boolean>(false);
    const [hostIP, setHostIP] = useState<string | null>(null);
    const [summonerInfo, setSummonerInfo] = useState<any | null>(null);
    const [matchHistory, setMatchHistory] = useState<string[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadHostIP = async () => {
            const ipAddress = await getHostIP();
            setHostIP(ipAddress);
        };

        const loadStoredData = async () => {
            const savedGameName = await AsyncStorage.getItem('gameName');
            const savedTagLine = await AsyncStorage.getItem('tagLine');
            const savedPuuid = await AsyncStorage.getItem('puuid');

            if (savedGameName && savedTagLine && savedPuuid) {
                setHasCookies(true);  // Show "Skip" button if cookies exist
            }
        };

        loadHostIP();
        loadStoredData();
    }, []);

    // Function to fetch Summoner Info
// In useSummonerSetup.ts

// Function to fetch Summoner Info
    const fetchSummonerInfo = async (puuid: string) => {
        const ipAddress = await getHostIP();
        if (!ipAddress) {
            setError('Unable to detect host IP.');
            return;
        }

        try {
            const response = await fetch(`http://${ipAddress}:8000/summoner-info`);
            if (!response.ok) {
                throw new Error('Failed to fetch summoner info');
            }
            const data = await response.json();
            setSummonerInfo(data);
        } catch (error) {
            setError('Error fetching summoner info');
            console.error('Error fetching summoner info:', error);
        }
    };

// Similar adjustments for fetchMatchHistory and handleSubmit

    // Function to fetch Match History
    const fetchMatchHistory = async (puuid: string) => {
        const ipAddress = await getHostIP();
        if (!ipAddress) return;

        try {
            const response = await fetch(`http://${ipAddress}:8000/summoner-matches`);
            const data = await response.json();
            setMatchHistory(data.matches);
        } catch (error) {
            setError('Error fetching match history');
            console.error('Error fetching match history:', error);
        }
    };

    // Function to handle form submission
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
            setError('Error fetching summoner info.');
            console.error('Error:', error);
        }
    };


    // Function to handle skipping form and using existing data
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

    return {
        gameName,
        tagLine,
        setGameNameInput,
        setTagLineInput,
        handleSubmit,
        handleSkip,
        error,
        hasCookies,
        summonerInfo,  // Return summonerInfo from the hook
        fetchSummonerInfo,
        matchHistory,
        fetchMatchHistory,
    };
};
