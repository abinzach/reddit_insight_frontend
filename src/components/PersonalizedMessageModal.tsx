"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { TiMessages } from 'react-icons/ti';
import { PiRedditLogo } from 'react-icons/pi';

interface PostCardProps {
  personalized_message: string;
}

const PersonalizedMessage: React.FC<PostCardProps> = ({ personalized_message }) => {
  const [editedMessage, setEditedMessage] = useState<string>(personalized_message);

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMessage(event.target.value);
  };

  const handleSendButtonClick = () => {
    // Logic to send the edited message
    console.log("Message sent:", editedMessage);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="flex gap-2">
          <TiMessages /> View Personalized message
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px] max-h-[900px]">
        <DialogHeader>
          <DialogTitle>Personalized Message</DialogTitle>
          <DialogDescription>
            This is an AI generated message, personalized for the author of this post or comment.
          </DialogDescription>
        </DialogHeader>
        <textarea
          value={editedMessage}
          onChange={handleMessageChange}
          className="w-full text-sm h-full p-2 border border-gray-300 rounded-md resize-none"
          rows={15}
          placeholder="Type your personalized message here..."
        ></textarea>
       <DialogFooter>
       <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="flex gap-2">
          <PiRedditLogo /> Send Reddit message
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px] max-h-[900px]">
        <DialogHeader>
          <DialogTitle>Feature Locked </DialogTitle>
          <DialogDescription>
          Sorry, this feature is currently disabled.
          </DialogDescription>
        </DialogHeader>

      </DialogContent>
     
    </Dialog>
      </DialogFooter>
      </DialogContent>
     
    </Dialog>
  );
};

export default PersonalizedMessage;
