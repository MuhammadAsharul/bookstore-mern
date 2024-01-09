import { useState } from "react";
import axios from "axios";
import { BackButton } from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <input
              type="text"
              className="border-2 border-gray-500 py-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <input
              type="text"
              className="border-2 border-gray-500 py-2 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <input
              type="text"
              className="border-2 border-gray-500 py-2 w-full"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <button
            className="bg-sky-400 text-white p-2 rounded"
            onClick={handleSaveBook}
          >
            Create Book
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;
