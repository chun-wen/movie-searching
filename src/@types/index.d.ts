declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '@lucky-canvas/react' {
  export interface Block {
    padding: string;
    background: string;
    [key: string]: any;
  }

  export interface Prizes {
    prizes:{
      range? : number;
      fonts:{
        text: string;
      }[]
    }[]
    background: string;
  }

  export interface Buttons {
    buttons:{
      radius: number | string;
      pointer?: boolean;
      background?: string;
      fonts?:{
        text: string;
        top?: string | number;
      }[]
    }[];
  }

  export interface LuckyWheelProps {
    // Define the LuckyWheelProps type based on your needs
    width: string;
    height: string;
    blocks: Block[];
    prizes: Prize[];
    buttons: Button[];
    onStart: () => void;
    onEnd: (prize: any) => void;
    ref: any;
  }

  export const LuckyWheel: React.FC<LuckyWheelProps>;
}

