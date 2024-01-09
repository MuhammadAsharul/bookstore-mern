import { useState, useEffect } from "react";
import axios from "axios";
import { BackButton } from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check Console");
        console.log(error);
      });
  }, [id]);
  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please Check Console");
        enqueueSnackbar("An error happened. Please Check Console", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
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
            onClick={handleEditBook}
          >
            Edit Book
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBooks;
