import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoder = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <Skeleton className="w-[400px] h-[300px]" />
        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
        </div>
      </div>
      <div>
        <Skeleton className="w-[400px] h-[300px]" />
        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
        </div>
      </div>
      <div>
        <Skeleton className="w-[400px] h-[300px]" />
        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoder;
