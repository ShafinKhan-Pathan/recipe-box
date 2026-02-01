const RecipeCardSkeleton = () => {
  return (
    <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-white/10 rounded-full" />
          <div className="h-6 w-16 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;