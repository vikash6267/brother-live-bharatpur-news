import React, { useState, useEffect } from "react";
import axios from "axios";

const PolllAns = () => {
  const [polls, setPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [showPercentage, setShowPercentage] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/poll/get`
        );
        setPolls(response.data);

        // Load voted polls from localStorage
        const storedVotedPolls =
          JSON.parse(localStorage.getItem("votedPolls")) || [];
        setVotedPolls(new Set(storedVotedPolls));
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionId) => {
    // if (votedPolls.has(pollId)) {
    //   alert("You have already voted on this poll.");
    //   return;
    // }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/poll/vote/${pollId}`,
        {
          optionId,
        }
      );

      const updatedPolls = polls.map((poll) => {
        if (poll._id === pollId) {
          const totalVotes = poll.options.reduce(
            (acc, curr) => acc + curr.votes,
            0
          );
          const updatedOptions = poll.options.map((option) => {
            if (option._id === optionId) {
              return {
                ...option,
                votes: option.votes + 1,
                percentage: ((option.votes + 1) / (totalVotes + 1)) * 100,
              };
            } else {
              return {
                ...option,
                percentage: (option.votes / (totalVotes + 1)) * 100,
              };
            }
          });
          return {
            ...poll,
            options: updatedOptions,
          };
        }
        return poll;
      });
      setPolls(updatedPolls);

      // Update voted polls in state and localStorage
      const newVotedPolls = new Set(votedPolls);
      newVotedPolls.add(pollId);
      setVotedPolls(newVotedPolls);
      localStorage.setItem("votedPolls", JSON.stringify([...newVotedPolls]));

      setShowPercentage(optionId); // Show percentage temporarily
      setTimeout(() => setShowPercentage(""), 5000); // Hide percentage after 5 seconds
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center uppercase my-10">
          Let's Vote
        </h2>
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
            <ul>
              {poll.options.map((option) => (
                <li
                  key={option._id}
                  className={`py-2 cursor-pointer mb-5 ${
                    votedPolls.has(poll._id)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-300"
                  }`}
                  onClick={() => handleVote(poll._id, option._id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option.text}</span>
                    <span className="text-gray-600">{option.votes} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-yellow-500 h-4 rounded-full transition-width duration-300 ease-in-out"
                      style={{
                        width: `${option.percentage || 0}%`,
                      }}
                    ></div>
                  </div>
                  {option.percentage !== undefined && (
                    <span
                      className={`text-gray-600 text-sm ${
                        showPercentage === option._id ? "" : "hidden"
                      }`}
                    >
                      ({option.percentage.toFixed(2)}%)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolllAns;
