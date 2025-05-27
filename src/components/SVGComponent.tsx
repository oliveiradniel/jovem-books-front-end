interface SVGComponent {
  fill: string;
  width: string;
  height: string;
  children: React.ReactNode;
}

export default function SVGComponent({
  fill,
  width,
  height,
  children,
}: SVGComponent) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
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
