import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../Redux//api/MoviesApi";
import { toast } from "react-toastify";
import bg_img from "../../assets/Banner.jpg";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div
      className="relative h-[100vh] -mt-3 -mb-3 bg-cover"
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
    >
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center "
        >
          {m?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[5rem] h-full  bg-white-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>

              <button
                className="text-red-500"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
export default AllComments;
