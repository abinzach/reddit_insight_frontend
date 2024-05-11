"use client"
import React, { useState } from "react";
import { Post } from "./RedditInputForm";
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
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
import RedditCommentCard from "./RedditCommentCard";


interface PostCardProps {
  post: Post;
}

const RedditPostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
    <div className="bg-white w-full min-w-full px-6  py-4 border-gray-200 border rounded-lg overflow-hidden ">
      <div className="flex justify-between">
        <div className="flex text-gray-500 items-baseline gap-3 text-sm">
          <FaUser />
          <span className=" text-sm font-semibold">{post.author}</span>
        </div>
        <div className="flex gap-3 items-baseline">
          {getSentimentIcon(post.sentiment.Sentiment)}
          {getOpennessIcon(post.sentiment["Openness to Clinical Trials"])}
        </div>
      </div>
      <div className="">
        <div className="font-bold mb-2">{post.title}</div>
        <TruncateText text={post.text} maxLength={600} />
      </div>
      <div className="flex w-full justify-between mt-5">
        <div className="flex gap-2">
          <SentimentAnalysis post={post}/>
          <PersonalizedMessage personalized_message={post.personalized_message}/>
        </div>
        <Button variant={"link"} size={"sm"} className="flex gap-2" onClick={toggleComments}>
          <MdOutlineInsertComment /> {post.comments.length} Comments {showComments ? <FaChevronUp/> : <FaChevronDown/>}
        </Button>
      </div>
      {showComments && (
        <div className="mt-4 pl-10 flex flex-col gap-3  overflow-y-scroll">
          {/* Render comments here */}
          {post.comments.map((comment, index) => (
            <RedditCommentCard key={index} comment={comment}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default RedditPostCard;
