"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { Badge } from "./ui/badge";
import {  FaReddit, FaSearch } from "react-icons/fa";
import { Label } from "./ui/label";
import RedditPostCard from "./RedditPostCard";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { MdClose } from "react-icons/md";
import {motion} from "framer-motion"
import BackendLoading from "./BackendLoading";

export interface Post {
  title: string;
  text: string;
  author: string;
  sentiment: Sentiment;
  personalized_message: string;
  comments: Comment[];
}

export interface Sentiment {
  Sentiment: string;
  "Openness to Clinical Trials": string;
  Analysis: string;
}

export interface Comment {
  text: string;
  sentiment: Sentiment;
  personalized_message: string;
  author:string;

}

const loadingStates = [
  {
    text: "Connecting with the Reddit API",
  },
  {
    text: "Analyzing Reddit posts and comments",
  },
  {
    text: "Exploring new insights",
  },
  {
    text: "Evaluating sentiment and interest levels",
  },
  {
    text: "Crafting personalized messages for engagement",
  },
];
const ScrapingForm: React.FC = () => {
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const [newSubreddit, setNewSubreddit] = useState<string>("");
  const [healthCondition, setHealthCondition] = useState<string>("");
  const [responseData, setResponseData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const addSubreddit = () => {
    if (newSubreddit.trim() !== "") {
      setSubreddits([...subreddits, newSubreddit.trim()]);
      setNewSubreddit("");
    }
  };



  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("https://reddit-insight-backend.onrender.com/scrape", {
        subreddits,
        healthCondition,
      });
      setResponseData(response.data.response_data);
      setIsLoading(false);
      console.log("Data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteSubreddit = (subredditToDelete:string) => {
    setSubreddits(subreddits.filter((subreddit) => subreddit !== subredditToDelete));
  };


  return (
    <motion.div layout className="flex items-start gap-5">
      <motion.div layout className=" min-w-[400px] w-[600px] p-10 rounded-xl bg-white border border-gray-200">
        <Label className="text-gray-600">Subreddit </Label>
        <p className="text-gray-400 text-xs mb-1">
          {" "}
          Enter the name of the reddit communities you want to scrape.{" "}
        </p>
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Enter a subreddit and click on +"
            value={newSubreddit}
            onChange={(e) => setNewSubreddit(e.target.value)}
          />
          <Button
          variant={"outline"}
            className="text-gray-600 py-2 px-4 "
            onClick={addSubreddit}
          >
            <FiPlus  /> Add
          </Button>
        </div>
        <div className="my-3 gap-2 flex w-full overflow-x-scroll">
       
            {subreddits.map((subreddit, index) => (
              <div key={subreddit} className="flex  items-center">
                <Badge className="gap-2 flex">
                  <FaReddit />
                  <span>r/{subreddit}</span>
                </Badge>
                <button
                  className="text-gray-700 hover:text-red-700"
                  onClick={() => handleDeleteSubreddit(subreddit)}
                >
                  <MdClose/>
                </button>
              </div>
            ))}
         
        </div>
        <div className="mt-4">
          <Label className="text-gray-600">Health condition </Label>
          <p className="text-gray-400 text-xs mb-1">
            {" "}
            Enter the health condition relevant to the clinical trial you are
            interested in exploring.
          </p>

          <Input
            type="text"
            placeholder="Enter health condition"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
          />
        </div>
        <Button
          className="mt-4 w-full flex gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          <FaSearch /> Find
        </Button>
      </motion.div>

      <motion.div layout className="flex flex-col gap-5  overflow-y-scroll">
        {responseData.map((post, index) => (
          <RedditPostCard post={post} key={index} />
        ))}
      </motion.div>
      {isLoading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={15000}
        />
      )}
    </motion.div>
  );
};

export default ScrapingForm;
