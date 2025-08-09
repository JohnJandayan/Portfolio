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
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
  };
};

type GitHubOrg = {
  login: string;
  url: string;
  repos_url: string;
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
  owner: string;
  ownerUrl: string;
  ownerAvatar: string;
  isOrg: boolean;
};

// Function to get user's organizations
async function getUserOrgs(username: string): Promise<GitHubOrg[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/orgs`, {
      headers: {
        // Add your GitHub token here for higher rate limits if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      // Refresh data at most every hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub organizations:', error);
    return [];
  }
}

// Function to get repos from an organization
async function getOrgRepos(orgName: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/orgs/${orgName}/repos?sort=updated&per_page=20`, {
      headers: {
        // Add your GitHub token here for higher rate limits if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      // Refresh data at most every hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories for org: ${orgName}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching repos for org ${orgName}:`, error);
    return [];
  }
}

// Function to filter repos for portfolio display
function filterRepos(repos: GitHubRepo[]): GitHubRepo[] {
  // List of repositories to exclude (case-insensitive)
  const excludedRepos = [
    'portfolio', 
    'my professional portfolio', 
    'johnjandayan.github.io',
    'my-professional-portfolio'
  ];
  
  return repos.filter(repo => {
    // Normalize the repo name by converting to lowercase
    const normalizedRepoName = repo.name.toLowerCase();
    
    // Check if this repo should be excluded
    return !excludedRepos.some(excluded => 
      normalizedRepoName === excluded || 
      normalizedRepoName.includes(excluded)
    ) && 
      !normalizedRepoName.includes('private') && 
      (repo.description || repo.topics.length > 0);
  });
}

// Main function to get projects from user and organizations
export async function getGitHubProjects(username: string): Promise<Portfolio[]> {
  try {
    // Collect all repositories
    let allRepos: GitHubRepo[] = [];
    
    // 1. First, get user's personal repositories
    const userReposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
      headers: {
        // Add your GitHub token here for higher rate limits if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }
    });

    if (!userReposResponse.ok) {
      throw new Error('Failed to fetch user repositories');
    }
    
    const userRepos: GitHubRepo[] = await userReposResponse.json();
    allRepos = allRepos.concat(userRepos);
    
    // 2. Get user's organizations
    const orgs = await getUserOrgs(username);
    
    // 3. For each organization, get its repositories
    for (const org of orgs) {
      const orgRepos = await getOrgRepos(org.login);
      allRepos = allRepos.concat(orgRepos);
    }
    
    // 4. Filter and format all repositories
    return filterRepos(allRepos)
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
        owner: repo.owner.login,
        ownerUrl: repo.owner.html_url,
        ownerAvatar: repo.owner.avatar_url,
        isOrg: repo.owner.type === 'Organization'
      }))
      .slice(0, 10);  // Show up to 10 projects (increased from 6)
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}