// This file will handle GitHub API integration

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
};

export type Portfolio = {
  id: number;
  name: string;
  description: string;
  url: string;
  demoUrl: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  language: string | null;
};

export async function getGitHubProjects(username: string): Promise<Portfolio[]> {
  try {
    // Fetch user's public repositories
    const response = await fetch(`https://api.github.com/users/JohnJandayan/repos?sort=updated&per_page=20`, {
      headers: {
        // Add your GitHub token here for higher rate limits if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      // Refresh data at most every hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter for repos that might be portfolio projects
    return repos
      .filter(repo => {
        // List of repositories to exclude (case-insensitive)
        const excludedRepos = [
          'portfolio', 
          'my professional portfolio', 
          'johnjandayan.github.io',
          'my-professional-portfolio'  // Add hyphenated version
        ];
        
        // Normalize the repo name by converting to lowercase
        const normalizedRepoName = repo.name.toLowerCase();
        
        // Check if this repo should be excluded
        return !excludedRepos.some(excluded => 
          normalizedRepoName === excluded || 
          normalizedRepoName.includes(excluded)
        ) && 
          !normalizedRepoName.includes('private') && 
          (repo.description || repo.topics.length > 0);
      })
      // Sort by updated date (most recent first)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map(repo => ({
        id: repo.id,
        name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: repo.description || 'A cool project I worked on',
        url: repo.html_url,
        demoUrl: repo.homepage,
        topics: repo.topics,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        language: repo.language,
      }))
      .slice(0, 6);  // Show up to 6 projects
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}