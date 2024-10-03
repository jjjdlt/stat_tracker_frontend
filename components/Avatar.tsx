import React from 'react';
import { Avatar as TamaguiAvatar } from 'tamagui';

interface AvatarProps {
    profileIconId: number;
}

const Avatar = ({ profileIconId }: AvatarProps) => (
    <TamaguiAvatar circular size="$10">
        <TamaguiAvatar.Image
            accessibilityLabel="Profile Icon"
            src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`}
        />
        <TamaguiAvatar.Fallback backgroundColor="$blue10" />
    </TamaguiAvatar>
);

export default Avatar;
