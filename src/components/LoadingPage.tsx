/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Alexandre Chetrit <chetrit.pro@hotmail.com>
*/

import { Box, Spinner } from '@chakra-ui/react';

function LoadingPage() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      width={'100vw'}
    >
      <Spinner
        thickness={'2px'}
        speed={'0.65s'}
        size={'xl'}
      />
    </Box>
  );
}

export default LoadingPage
