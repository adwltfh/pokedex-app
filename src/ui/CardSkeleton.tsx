interface CardSkeletonProps {
  count: number;
}

export const CardSkeletonItem = () => (
  <div className="rounded-2xl p-4 bg-white/5 animate-pulse w-40 h-57.5 flex flex-col items-center justify-center gap-3">
    <div className="w-20 h-20 rounded-full bg-white/10" />
    <div className="w-16 h-3 rounded-full bg-white/10" />
    <div className="w-12 h-3 rounded-full bg-white/10" />
  </div>
);

const CardSkeleton = ({ count }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[...Array(count)].map((_, i) => (
        <CardSkeletonItem key={i} />
      ))}
    </div>
  );
};

export default CardSkeleton;
