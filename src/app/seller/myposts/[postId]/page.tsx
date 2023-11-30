import { getSingleData } from "@/lib/apiData/apiData";
import NotFound from "../../not-found";
import ImageGallery from "@/components/custom/ImageGallery";

interface PostIdParams {
  params: {
    postId: string;
  };
}
const PostId: React.FC<PostIdParams> = async ({ params }) => {
  const { postId } = params;
  const data = await getSingleData(postId);
  if (data.msg === "success") {
    return (
      <div>
        <ImageGallery data={data} />
        <div className="pt-10">
          <h2 className="text-2xl font-semibold">{data?.product?.title}</h2>
          <p>{data?.product?.desc}</p>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default PostId;
