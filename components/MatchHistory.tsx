// components/MatchHistory.tsx
import React from 'react';
import { YGroup, ListItem, Separator, Text } from 'tamagui';

interface MatchHistoryProps {
    matchHistory: string[] | null;
}

const MatchHistory = ({ matchHistory }: MatchHistoryProps) => {
    if (!matchHistory) return <Text>Loading Match History...</Text>;

    return (
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
    );
};

export default MatchHistory;
