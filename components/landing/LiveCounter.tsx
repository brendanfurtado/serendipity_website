"use client";

import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";

interface LiveCounterProps {
  className?: string;
  prefix?: string;
  suffix?: string;
  fallbackCount?: number;
}

export function LiveCounter({
  className = "",
  prefix = "Join",
  suffix = "on the waitlist",
  fallbackCount = 500,
}: LiveCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/waitlist/count");

        if (!response.ok) {
          console.error(
            "Error response from count API:",
            response.status,
            response.statusText
          );
          throw new Error(
            `Failed to fetch count: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data && typeof data.count === "number") {
          setCount(data.count);
          setError(false);
        } else {
          console.error("Invalid data format from count API:", data);
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching signup count:", err);
        setError(true);

        // Try again in 2 seconds if we've tried less than 3 times
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, [retryCount]);

  // If there's a manually set count in local storage (for testing), use that
  useEffect(() => {
    const storedCount = localStorage.getItem("debug_waitlist_count");
    if (storedCount) {
      try {
        const parsedCount = parseInt(storedCount, 10);
        if (!isNaN(parsedCount)) {
          setCount(parsedCount);
          setError(false);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error parsing stored count:", e);
      }
    }
  }, []);

  // Display loading state, error state, or count
  return (
    <div
      className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}
    >
      <Users className="h-4 w-4 text-violet-500" />
      <span>
        {prefix}{" "}
        <span className="font-medium">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : error || count === null ? (
            `${fallbackCount}+`
          ) : (
            count.toLocaleString()
          )}
        </span>{" "}
        {suffix}
      </span>
    </div>
  );
}

export default LiveCounter;
