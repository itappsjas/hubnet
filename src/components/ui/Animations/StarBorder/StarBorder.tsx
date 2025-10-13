import React from 'react';

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  const Component = as || 'button';

  return React.createElement(
    Component,
    {
      className: `relative inline-block overflow-hidden rounded-[20px] ${className}`,
      style: {
        padding: `${thickness}px 0`,
        ...rest.style
      },
      ...rest
    },
    React.createElement('div', {
      className: "absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
      style: {
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }
    }),
    React.createElement('div', {
      className: "absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
      style: {
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }
    }),
    React.createElement('div', {
      className: "relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]"
    }, children)
  );
};

export default StarBorder;
