import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MessageSquare, ThumbsUp } from "lucide-react"

const TrendingTopics =()=>{

    return (
          <div className="flex items-center justify-between gap-10">
                <Card>
                <CardHeader>
                    <CardTitle className="flrx item-center">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {trendingTopics.map((topic) => (
                        <div key={topic.id} className="flex flex-col space-y-2 p-4 rounded-lg hover:bg-muted cursor-pointer">
                        <h3 className="font-medium">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">{topic.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{topic.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{topic.comments}</span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
        </div>
      )
    }
    
// below will be created on the backend
const trendingTopics = [
    {
      id: 1,
      title: "Major Economic Policy Changes Announced",
      excerpt: "Government announces new measures to strengthen the Naira...",
      likes: "1.2k",
      comments: "458",
    },
    {
      id: 2,
      title: "Super Eagles' AFCON Journey",
      excerpt: "Nigeria's national team performance analysis and highlights...",
      likes: "2.3k",
      comments: "892",
    },
    {
      id: 3,
      title: "New Tech Hub Opens in Lagos",
      excerpt: "Major technology company establishes presence in Nigeria...",
      likes: "945",
      comments: "234",
    },
]

export default TrendingTopics