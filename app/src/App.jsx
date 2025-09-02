import { useState } from "react";

export default function RepoFinder() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRepos = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        query
      )}&sort=stars&order=desc`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          // Uncomment if using a token:
          // Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        },
      }
    );

    const data = await res.json();
    setRepos(data.items || []);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">GitHub Repo Finder</h1>
      <div className="search-box">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repos (e.g. react language:js stars:>500)"
        />
        <button className="search-btn" onClick={searchRepos}>
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-card">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              {repo.full_name}
            </a>
            <p className="repo-desc">{repo.description}</p>
            <p className="repo-stats">
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
