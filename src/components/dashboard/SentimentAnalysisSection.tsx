import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SentimentAnalysisSectionProps {
  title: string;
  description: string;
  score: number;
  category: string;
  graphUrl?: string;
  isLoading?: boolean;
  error?: string;
}

const SentimentAnalysisSection = ({
  title,
  description,
  score,
  category,
  graphUrl,
  isLoading = false,
  error,
}: SentimentAnalysisSectionProps) => {
  // Helper function to determine sentiment category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "mixed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Helper function to render the score with appropriate color
  const renderScore = (score: number) => {
    let color = "text-gray-500";
    if (score >= 0.7) color = "text-green-600";
    else if (score >= 0.5) color = "text-blue-600";
    else if (score >= 0.3) color = "text-yellow-600";
    else color = "text-red-600";

    return (
      <span className={`text-2xl font-bold ${color}`}>
        {(score * 100).toFixed(1)}%
      </span>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading analysis...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Sentiment Score
                </p>
                {renderScore(score)}
              </div>
              <Badge className={getCategoryColor(category)}>{category}</Badge>
            </div>

            {graphUrl ? (
              <div className="relative h-48 w-full mt-4 rounded-md overflow-hidden border border-border">
                <Image
                  src={graphUrl}
                  alt={`${title} graph`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-48 w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">No graph available</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisSection;
