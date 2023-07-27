import React from 'react';

import { useAppSelector } from '@/hooks';

const CollectPage = () => {
  const {
    images: { secure_base_url, poster_sizes },
  } = useAppSelector((state) => state.configuration);

  return (
    <>
      <h1>Temporary page</h1>
    </>
  );
};

export default CollectPage;
