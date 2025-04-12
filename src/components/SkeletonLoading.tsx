interface SkeletonLoadingProps {
  rounded?: 'xs' | 'sm' | 'lg' | 'full' | null;
}

export default function SkeletonLoading({
  rounded = null,
}: SkeletonLoadingProps) {
  return (
    <div
      className={`bg-navy-blue/60 absolute top-0 right-0 h-full w-full animate-pulse rounded-${rounded}`}
    />
  );
}
