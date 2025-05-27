import SVGComponent from '../../../../components/SVGComponent';

export default function AddCategoryIcon({
  fill,
  width,
  height,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <SVGComponent
      fill={fill as string}
      width={width as string}
      height={height as string}
    >
      <path d="M56 32c-2.813 0-5.496.507-8 1.392v-6.725H26.667V32H16V21.333h5.333V0H0v21.333h10.667v42.664h16v10.67h14.266A23.918 23.918 0 0 0 56 80c13.256-.005 23.995-10.744 24-24-.005-13.261-10.744-24-24-24ZM32.157 53.333h-5.49v5.334H16.003L16 37.328h10.667V48h6.725a23.888 23.888 0 0 0-1.235 5.333ZM56 74.355C45.864 74.33 37.664 66.13 37.64 56c.024-10.136 8.224-18.336 18.36-18.36 10.13.024 18.33 8.224 18.355 18.36C74.33 66.13 66.13 74.33 56 74.355Z" />
      <path d="M58.672 53.333V42.667h-5.339v10.666H42.667v5.334h10.666v10.666h5.339V58.667h10.661v-5.334H58.672Z" />
    </SVGComponent>
  );
}
