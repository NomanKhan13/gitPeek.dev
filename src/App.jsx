import { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  MapPin,
  Link,
  Twitter,
  BriefcaseBusiness,
} from 'lucide-react';
import { getUserRepos } from '../utils';

const API_ENDPOINT = 'https://api.github.com/users';

function App() {
  const [userData, setUserData] = useState('');
  const [userRepos, setUserRepos] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState('idle');
  const [visibleRepos, setVisibleRepos] = useState(5);
  const loadMoreRepos = async () => {
    if (visibleRepos % 30 === 0) {
      const userRepos = await getUserRepos(
        userData.repos_url,
        visibleRepos / 30
      );
      setUserRepos(userRepos);
    }
    setVisibleRepos((prevState) => prevState + 5);
  };

  const dateFormatter = (rawDate) => {
    const date = new Date(rawDate);
    const formatedDate = date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formatedDate;
  };

  useEffect(() => {
    if (!userData) return;

    const fetchRepos = async () => {
      const userRepos = await getUserRepos(userData.repos_url);
      setUserRepos(userRepos);
    };

    fetchRepos();
  }, [userData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const username = e.target.elements['user-search'].value.trim();
    try {
      setIsLoading('loading');
      const res = await fetch(`${API_ENDPOINT}/${username}`);
      if (!res.ok) throw new Error('Error while fetching');
      const data = await res.json();
      setUserData(data);
      // console.log(data);
    } catch (err) {
      console.log('Something went wrong');
    } finally {
      setIsLoading('loaded');
    }
  };

  return (
    <div className="text-gray-800 bg-[#f5f7ff] p-4 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">
          gitPeek.dev
        </h1>
        <button className="flex gap-2 items-center text-gray-700 uppercase text-sm">
          <span>{isDark ? 'light' : 'dark'}</span>
          {isDark ? (
            <Sun size={18} className="text-yellow-500" />
          ) : (
            <Moon size={18} className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="my-6">
        <label
          htmlFor="user-search"
          className="block mb-1 font-medium text-gray-700"
        >
          GitHub Username
        </label>
        <input
          type="search"
          id="user-search"
          name="user-search"
          placeholder="e.g. torvalds or nomankhan13"
          className="bg-white w-full p-2 rounded-md outline-none ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-400"
        />
      </form>

      {isLoading == 'idle' ? null : isLoading == 'loaded' ? (
        <div>
          {/* Profile Card */}
          <div className="grid gap-y-6 gap-x-6 grid-cols-[4.5rem_1fr] px-4 py-8 text-sm bg-white rounded-md shadow-md">
            <img
              src={userData.avatar_url}
              alt="Noman Khan's GitHub profile picture"
              className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {userData.name}
              </h2>
              <a
                href="https://github.com/NomanKhan13"
                target="_blank"
                className="italic text-blue-600 hover:underline"
              >
                @{userData.login}
              </a>
              <p className="text-sm text-gray-500">
                Joined {dateFormatter(userData.created_at)}
              </p>
            </div>

            <p className="text-gray-700 col-span-2">
              {userData.bio || 'No bio available'}
            </p>

            <ul className="flex justify-between text-gray-800 bg-gray-200 p-4 rounded-md col-span-2">
              <li className="flex flex-col items-center">
                <span className="text-gray-600 text-center">Repos</span>
                <span className="font-medium text-center">
                  {userData.public_repos}
                </span>
              </li>
              <li className="flex flex-col items-center">
                <span className="text-gray-600 text-center">Followers</span>
                <span className="font-medium text-center">
                  {userData.followers}
                </span>
              </li>
              <li className="flex flex-col items-center">
                <span className="text-gray-600 text-center">Following</span>
                <span className="font-medium text-center">
                  {userData.following}
                </span>
              </li>
            </ul>

            <ul className="text-gray-700 col-span-2 grid grid-cols-2 gap-4">
              <li className="flex gap-2 items-center">
                <MapPin className="text-gray-500" />{' '}
                <span>{userData.location || 'Not Available'}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Link className="text-gray-500" />
                <span className="text-gray-500 italic">Not Available</span>
              </li>
              <li className="flex gap-2 items-center">
                <Twitter className="text-blue-400" />
                {userData.twitter_username ? (
                  <a
                    href="https://twitter.com/nomanstwt"
                    target="_blank"
                    className="italic text-blue-600 hover:underline"
                  >
                    @{userData.twitter_username}
                  </a>
                ) : (
                  <span className="italic text-gray-600">Not Available</span>
                )}
              </li>
              <li className="flex gap-2 items-center">
                <BriefcaseBusiness className="text-gray-500" />
                <span className="text-gray-500 italic">
                  {userData.company || 'Not Available'}
                </span>
              </li>
            </ul>
          </div>

          {/* Repositories */}
          <div className="bg-white px-4 py-6 rounded-md shadow-md mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Repositories
            </h3>

            {userRepos.length === 0 ? (
              'No Repos'
            ) : (
              <div className="grid gap-4">
                {console.log(userRepos)}
                {userRepos.slice(0, visibleRepos).map((repo) => (
                  <div
                    key={repo.id}
                    className="text-gray-800 bg-gray-200 p-4 rounded-md"
                  >
                    <h4 className="text-blue-700 font-semibold">{repo.name}</h4>
                    <p className="text-gray-700">
                      A simple weather app using OpenWeather API.
                    </p>
                    <p className="text-gray-500 text-sm">
                      Last updated: {dateFormatter(repo.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={loadMoreRepos}
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors p-2 w-full mt-6"
            >
              View More Repositories
            </button>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default App;
