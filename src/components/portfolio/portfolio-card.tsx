"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/lib/github";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

export function PortfolioCard({ project }: { project: Portfolio }) {
  // Format the date to a more readable format
  const updatedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Card className="flex flex-col h-full border border-muted bg-background shadow-sm hover:shadow-md transition-all cursor-glow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          
          {project.language && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {project.language}
            </span>
          )}
        </div>
        
        {/* Organization info */}
        {project.isOrg && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Image 
              src={project.ownerAvatar} 
              alt={project.owner} 
              width={16} 
              height={16} 
              className="rounded-full" 
            />
            <a 
              href={project.ownerUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-primary transition-colors"
            >
              {project.owner}
            </a>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {project.topics.slice(0, 3).map((topic) => (
              <span 
                key={topic} 
                className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                +{project.topics.length - 3}
              </span>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col gap-2">
        <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {project.stars > 0 && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v6"/></svg>
                {project.forks}
              </span>
            )}
          </div>
          <span>Updated {updatedDate}</span>
        </div>
        <div className="flex gap-2 w-full mt-2">
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:border-primary"
          >
            <a href={project.url} target="_blank" rel="noreferrer">
              <FaGithub className="mr-1" /> 
              Code
            </a>
          </Button>
          
          {project.demoUrl && (
            <Button 
              asChild 
              variant="default" 
              size="sm" 
              className="flex-1"
            >
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <FaExternalLinkAlt className="mr-1" /> 
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}