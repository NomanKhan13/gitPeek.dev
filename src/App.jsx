import { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  MapPin,
  Link,
  Twitter,
  BriefcaseBusiness,
  Loader,
} from 'lucide-react';
import { getUserRepos } from '../utils';
import ProfileCard from './components/ProfileCard';
import IdlePrompt from './components/IdlePrompt';
import LoadingSkeleton from './components/LoadingSkeleton';
import clsx from 'clsx';

const API_ENDPOINT = 'https://api.github.com/users';

function App() {
  const [userData, setUserData] = useState('');
  const [userRepos, setUserRepos] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState('idle');
  const [visibleRepos, setVisibleRepos] = useState(5);
  const loadMoreRepos = async () => {
    // comment for now

    // if (visibleRepos % 30 === 0) {
    //   const userRepos = await getUserRepos(
    //     userData.repos_url,
    //     visibleRepos / 30
    //   );
    //   setUserRepos(userRepos);
    // }
    setVisibleRepos((prevState) => prevState + 5);
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
    if (!username) {
      setUserData("");
      setIsLoading("idle")
      return;
    };
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
    <div className={clsx("text-gray-800 p-4 w-full max-w-xl mx-auto min-h-screen", isDark ? "bg-[#141D2E]" : "bg-[#f5f7ff]")}>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">
          gitPeek.dev
        </h1>
        <button onClick={() => setIsDark(prevMode => !prevMode)} className="flex gap-2 items-center text-gray-700 uppercase text-sm">
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
          className={clsx("block mb-1 font-medium", isDark ? "text-gray-300" : "text-gray-700")}
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

      {isLoading === 'idle' ? (
        <IdlePrompt />
      ) : isLoading === 'loading' ? (
        <Loader className='animate-spin mx-auto mt-20' />
      ) : (
        <ProfileCard
          userData={userData}
          userRepos={userRepos}
          visibleRepos={visibleRepos}
          loadMoreRepos={loadMoreRepos}
          isDark={isDark}
        />
      )}

    </div>
  );
}

export default App;
