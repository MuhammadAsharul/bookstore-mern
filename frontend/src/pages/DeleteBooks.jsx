import { useState } from "react";
import axios from "axios";
import { BackButton } from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
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
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Are you sure you want to delete?
            </span>
          </div>
          <div className="my-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
              onClick={handleDeleteBook}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBooks;
