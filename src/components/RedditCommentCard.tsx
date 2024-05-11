import React from "react";
import { Comment, Post } from "./RedditInputForm";
import { FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { Button } from "./ui/button";
import { MdOutlineInsertComment } from "react-icons/md";
import TruncateText from "./TruncateText";

import { IoMdHappy } from "react-icons/io";
import { IoMdSad } from "react-icons/io";
import { FaRegFaceMeh } from "react-icons/fa6";
import { PiThumbsDownLight, PiThumbsUpLight } from "react-icons/pi";
import SentimentAnalysis from "./SentimentAnalysisModal";
import PersonalizedMessage from "./PersonalizedMessageModal";


interface CommentCardProps {
  comment: Comment;
}

const RedditCommentCard: React.FC<CommentCardProps> = ({ comment }) => {


    const getSentimentIcon = (sentiment: string|null) => {
        switch (sentiment&&sentiment.toLowerCase()) {
          case "positive":
            return <IoMdHappy size={18} className="text-green-500" />;
          case "negative":
            return <IoMdSad className="text-red-500" />;
          case "neutral":
            return <FaRegFaceMeh className="text-yellow-500" />;
          default:
            return null;
        }
      };
    
      const getOpennessIcon = (openness: string|null) => {
        switch (openness&&openness.toLowerCase()) {
          case "yes":
            return (
              <div className="flex gap-1 items-center">
                <PiThumbsUpLight className="text-green-500" />
                <PiThumbsUpLight className="text-green-500" />
              </div>
            );
          case "no":
            return <PiThumbsDownLight className="text-red-500" />;
          case "maybe":
            return <PiThumbsUpLight className="text-yellow-500" />;
          default:
            return null;
        }
      };
  
  return (
    <div className="bg-white px-6  py-4 border-gray-200 border rounded-lg overflow-hidden w-full">
      <div className="flex justify-between">
      <div className="flex text-gray-500 items-baseline gap-3 text-sm">
        <FaUser />
        <span className=" text-sm font-semibold">{comment.author}</span>
      </div>
      <div className="flex gap-3 items-baseline">
        {getSentimentIcon(comment.sentiment.Sentiment)}
        {getOpennessIcon(comment.sentiment["Openness to Clinical Trials"])}

      </div>
      </div>
      <div className="mt-2">
        <TruncateText text={comment.text} maxLength={600} />
      </div>
      <div className="flex w-full justify-between mt-5">
        <div className="flex gap-2">
          <SentimentAnalysis post={comment}/>
           <PersonalizedMessage personalized_message={comment.personalized_message}/>
        </div>
      </div>
    </div>
  );
};

export default RedditCommentCard;
