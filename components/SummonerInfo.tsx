import React from 'react';
import { XStack, SizableText, Group, Text } from 'tamagui'; // Import Text from Tamagui
import { useGlobalState } from '../context/GlobalState';

const SummonerInfo = ({ summonerLevel }: { summonerLevel: number }) => {
    const { gameName, tagLine } = useGlobalState();

    return (
        <Group space="$3" bordered width={300}>
            <Group.Item>
                <XStack justifyContent="center" alignItems="center" space="$4">
                    <SizableText marginRight="1%" size="$4" fontWeight="bold">
                        {gameName ? <Text>{gameName}</Text> : <Text>N/A</Text>}
                    </SizableText>
                    <SizableText size="$4" color="$gray9" marginLeft="$1">
                        {tagLine ? <Text>#{tagLine}</Text> : <Text></Text>}
                    </SizableText>
                </XStack>
                <XStack justifyContent="space-evenly" alignItems="center" space="$2">
                    <SizableText size="$4"><Text>Level {summonerLevel ?? 'N/A'}</Text></SizableText>
                </XStack>
            </Group.Item>
        </Group>
    );
};

export default SummonerInfo;
