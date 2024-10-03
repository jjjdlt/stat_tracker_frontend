// components/SummonerInfo.tsx
import React from 'react';
import { XStack, SizableText, Group } from 'tamagui';
import { useGlobalState } from '../context/GlobalState';

const SummonerInfo = () => {
    const { gameName, tagLine } = useGlobalState();  // Fetch from global state

    return (
        <Group space="$3" bordered width={300}>
            <Group.Item>
                <XStack justifyContent="center" alignItems="center" space="$4">
                    <SizableText marginRight="1%" size="$4" fontWeight="bold">{gameName}</SizableText>
                    <SizableText size="$4" color="$gray9" marginLeft="$1">#{tagLine}</SizableText>
                </XStack>
                <XStack justifyContent="space-evenly" alignItems="center" space="$2">
                    {/* Summoner level could still come from props or global state if you add it */}
                </XStack>
            </Group.Item>
        </Group>
    );
};

export default SummonerInfo;
