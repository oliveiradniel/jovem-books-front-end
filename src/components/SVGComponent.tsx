interface SVGComponent {
  fill: string;
  children: React.ReactNode;
}

export default function SVGComponent({ fill, children }: SVGComponent) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill="none">
      <g
        fill={fill}
        clipPath="url(#a)"
        className="transition-all duration-300 ease-in-out"
      >
        {children}
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h80v80H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
