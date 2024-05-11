import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { TbReportAnalytics } from "react-icons/tb";
import { Button } from './ui/button';
import {  Post } from './RedditInputForm';
import TruncateText from './TruncateText';

interface PostCardProps {
    post: any;
  }

const SentimentAnalysis: React.FC<PostCardProps> = ({ post }) => {



    const getSentimentColor = (sentiment: string|null) => {
        switch (sentiment&&sentiment.toLowerCase()) {
          case "positive":
            return "bg-green-500 text-white";
          case "negative":
            return "bg-red-500 text-white";
          case "neutral":
            return "bg-yellow-500 text-white";
          default:
            return "";
        }
      };
    
      const getOpennessColor = (openness: string|null) => {
        switch (openness&&openness.toLowerCase()) {
          case "yes":
            return "bg-green-500 text-white";
          case "no":
            return "bg-red-500 text-white";
          case "maybe":
            return "bg-yellow-500 text-white";
          default:
            return "";
        }
      };
    
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant={"outline"} size={"sm"} className="flex gap-2">
        <TbReportAnalytics /> View Sentiment analysis
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Sentiment Analysis</DialogTitle>
        <DialogDescription>
          Explore the sentiment analysis insights!
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 py-4">
      {post.title &&  <div className="flex items-baseline gap-5">
          <p className="font-semibold ">Title: </p>
          <p className="text-sm">{post.title}</p>
        </div>}
        {post.text && (
          <div className="flex items-baseline gap-5 ">
            <p className="font-semibold ">Content: </p>
            <p className="text-sm max-h-44 overflow-y-scroll"><TruncateText text={post.text} maxLength={200}/></p>
          </div>
        )}
        <div className="flex items-baseline gap-5">
          <p className="font-semibold">Sentiment: </p>
          <p
            className={`text-sm rounded p-1 px-3 ${getSentimentColor(
              post.sentiment.Sentiment
            )}`}
          >
            {post.sentiment.Sentiment}
          </p>
        </div>
        <div className="flex items-baseline gap-5">
          <p className="font-semibold ">
            Openness to Clinical Trials:{" "}
          </p>
          <p
            className={`text-sm rounded p-1 px-3 ${getOpennessColor(
              post.sentiment["Openness to Clinical Trials"]
            )}`}
          >
            {post.sentiment["Openness to Clinical Trials"]}
          </p>
        </div>
        <div className="flex items-baseline gap-5">
          <p className="font-semibold ">Analysis: </p>
          <p className="text-sm">{post.sentiment.Analysis}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default SentimentAnalysis