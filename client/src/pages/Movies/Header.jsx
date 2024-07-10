import SliderUtil from "../../utils/SliderUtil";
import { useGetNewMoviesQuery } from "../../Redux/api/MoviesApi";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex justify-evenly items-center ">
      <nav className="">
        <Link
          to="/"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:w-[80%] mr-0 md:mr-2">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
