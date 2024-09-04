import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PollForm = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", votes: 0 }]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", votes: 0 }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/poll/create`,
        {
          question,
          options,
        }
      );

      // console.log("Poll created:", response.data);

      // Update polls state with the newly created poll
      setPolls([...polls, response.data]);

      // Reset form fields
      setQuestion("");
      setOptions([{ text: "", votes: 0 }]);

      // Show success message
      toast.success("Poll created successfully");
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/poll/get`
        );
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/poll/delete/${id}`
      );
      if (response?.data?.success) {
        setPolls(polls.filter((poll) => poll._id !== id));
        toast.success("Poll deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="question"
          >
            Question:
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your question"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="options"
          >
            Options:
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex mb-4 items-center">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Option ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Option
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Poll
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {polls.map((poll) => (
              <tr key={poll._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {poll.question}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <ul className="mt-2">
                    {poll.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="text-gray-600">
                        {option.text} - {option.votes} votes
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button
                    onClick={() => handleDelete(poll._id)}
                    className="px-4 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PollForm;
