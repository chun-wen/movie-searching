declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '@lucky-canvas/react' {
import React from 'react';

    // Declare the LuckyWheel component here
  export const LuckyWheel: React.FC<JSX.Element>;
}
