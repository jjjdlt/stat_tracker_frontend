import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '~/app/components/Container';
import { ScreenContent } from '~/app/components/ScreenContent';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <ScreenContent path="screens/details.tsx" title={`Showing details for user ${name}`} />
      </Container>
    </>
  );
}
