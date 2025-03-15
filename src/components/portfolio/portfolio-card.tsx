"use client";

import { Button } from "@/components/ui/button";
import { Portfolio } from "@/lib/github";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PortfolioCardProps {
  project: Portfolio;
  delay: number;
  visible: boolean;
}

export function PortfolioCard({ project, delay, visible }: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("/portfolio-placeholder.jpg");

  // Try to load a project-specific image
  useEffect(() => {
    const img = new Image();
    img.src = `/portfolio/${project.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    img.onload = () => {
      setImageUrl(img.src);
      setImageLoaded(true);
    };
    // Use placeholder image if specific image fails to load
    img.onerror = () => {
      setImageLoaded(true);
    };
  }, [project.name]);

  // Format date
  const formattedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow transition-all hover:border-primary hover:shadow-md ${visible ? `animate-slide-up delay-${delay}` : 'opacity-0'}`}>
      <div className="h-48 bg-muted rounded-t-lg relative overflow-hidden">
        {imageLoaded ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        )}
        {project.language && (
          <div className="absolute top-4 right-4 bg-background/90 px-2 py-1 text-xs font-medium rounded-md border border-border">
            {project.language}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-background/40 to-background/80">
          <div className="text-center p-4">
            <h3 className="text-xl font-bold text-primary mb-2">{project.name}</h3>
            <p className="text-sm opacity-80">Created: {formattedDate}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        
        {/* Topics/Tags */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-3">
            {project.topics.slice(0, 3).map((topic) => (
              <span 
                key={topic} 
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">+{project.topics.length - 3}</span>
            )}
          </div>
        )}
        
        <div className="pt-4 flex justify-between">
          {project.demoUrl ? (
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="hover:border-primary transition-all transform hover:scale-105 hover:glow-on-hover"
            >
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="hover:border-primary transition-all transform hover:scale-105 hover:glow-on-hover"
          >
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}