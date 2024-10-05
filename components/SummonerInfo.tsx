import React, {useEffect} from 'react';
import { XStack, SizableText, Group, Text } from 'tamagui'; // Import Text from Tamagui
import { useGlobalState } from '../context/GlobalState';

const SummonerInfo = ({ summonerLevel }: { summonerLevel: number }) => {
    const { gameName, tagLine } = useGlobalState();
    useEffect(() => {
        console.log({ gameName, tagLine, summonerLevel });
    }, [gameName, tagLine, summonerLevel]);  // Logs when any of these values change

    return (
        <Group space="$3" bordered width={300}>
            <Group.Item>
                <XStack justifyContent="center" alignItems="center" space="$4">
                    <SizableText marginRight="1%" size="$4" fontWeight="bold">
                        {gameName ?? 'N/A'}
                    </SizableText>
                    <SizableText size="$4" color="$gray9" marginLeft="$1">
                        #{tagLine ?? 'N/A'}
                    </SizableText>
                </XStack>
                <XStack justifyContent="space-evenly" alignItems="center" space="$2">
                    <SizableText size="$4">
                        {`Level ${summonerLevel ?? 'N/A'}`}  {/* Ensure level is properly wrapped */}
                    </SizableText>
                </XStack>
            </Group.Item>
        </Group>
    );
};


export default SummonerInfo;
