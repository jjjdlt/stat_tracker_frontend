import React from 'react';
import { YGroup, ListItem, Separator, Text } from 'tamagui'; // Use Tamagui Text

interface MatchHistoryProps {
    matchHistory: string[] | null;
}

const MatchHistory = ({ matchHistory }: MatchHistoryProps) => {
    if (!matchHistory || matchHistory.length === 0) return <Text>No Match History Available</Text>;

    return (
        <YGroup alignSelf="center" bordered width={300} size="$4" separator={<Separator />}>
            {matchHistory.map((matchId, index) => (
                <YGroup.Item key={index}>
                    <ListItem
                        hoverTheme
                        pressTheme
                        title={<Text>Match ID: {matchId}</Text>}  // Ensure strings are inside Tamagui Text
                        subTitle={<Text>Match {index + 1}</Text>}  // Ensure strings are inside Tamagui Text
                    />
                </YGroup.Item>
            ))}
        </YGroup>
    );
};

export default MatchHistory;
