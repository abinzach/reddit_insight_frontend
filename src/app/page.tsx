"use client"
import BackendLoading from "@/components/BackendLoading";
import ScrapingForm from "@/components/RedditInputForm";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [isBackendLoading, setIsBackendLoading] = useState<boolean | undefined>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsBackendLoading(true);
        const response = await axios.get("https://reddit-insight-backend.onrender.com");
        console.log("Response:", response.data);
        setIsBackendLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

    
  if(isBackendLoading)
    return <BackendLoading/>
  return (
    <div className="bg-gray-50 p-10 w-full min-h-screen flex justify-center items-center">
      <ScrapingForm />
    </div>
  );
}
