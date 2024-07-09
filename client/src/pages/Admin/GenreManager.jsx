import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from "../../Redux/Api/genreApi";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const GenreManager = () => {
  const { data: genres, refetch } = useFetchGenresQuery();

  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const createGenreHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a Genre name");
    }
    try {
      const res = await createGenre({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name}is created successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const updateGenreHandler = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Please enter a Genre name");
    }

    try {
      const res = await updateGenre({
        _id: selectedGenre._id,
        name: updatingName,
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        setUpdatingName("");
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Updating genre failed, try again.");
    }
  };

  const deleteGenreHandler = async () => {
    try {
      const res = await deleteGenre(selectedGenre._id).unwrap();

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      toast.error("Genre deletion failed. Tray again.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="ml-[10rem] flex flex-col items-center">
        <div className="flex flex-col mt-32">
          <h1 className="h-12 font-bold text-xl ">Manage Genres</h1>
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={createGenreHandler}
          />

          <br />

          <div className="flex flex-wrap">
            {genres?.map((genre) => (
              <div key={genre._id}>
                <button
                  className="bg-white border border-pink-500 text-pink-500 font-semibold text-lg py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedGenre(genre);
                      setUpdatingName(genre.name);
                    }
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={updateGenreHandler}
              buttonText="Update"
              handleDelete={deleteGenreHandler}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GenreManager;
