import {
    MapPin,
    Link,
    Twitter,
    BriefcaseBusiness,
} from 'lucide-react';
import { dateFormatter } from '../../utils';
import { useEffect } from 'react';
import clsx from 'clsx';

const ProfileCard = ({ userData, userRepos, visibleRepos, loadMoreRepos, isDark }) => {

    useEffect(() => {
        if (!userData) return;
        document.title = `${userData?.name || userData.login} | gitPeek.dev`;

        return () => document.title = "gitPeek.dev";
    }, [userData])

    return (
        <div>
            {/* Profile Card */}
            <div className={clsx("grid gap-y-6 gap-x-6 grid-cols-[4.5rem_1fr] px-4 py-8 text-sm rounded-md shadow-md", isDark ? "bg-[#1e2b48]" : "bg-white")}>
                <img
                    src={userData.avatar_url}
                    alt="Noman Khan's GitHub profile picture"
                    className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
                />
                <div>
                    <h2 className={clsx("text-xl font-semibold", isDark ? "text-gray-300" : "text-gray-800")}>
                        {userData.name}
                    </h2>
                    <a
                        href={userData.html_url}
                        target="_blank"
                        className="italic text-blue-600 hover:underline"
                    >
                        @{userData.login}
                    </a>
                    <p className={clsx("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                        Joined {dateFormatter(userData.created_at)}
                    </p>
                </div>

                <p className={clsx("col-span-2", isDark ? "text-gray-300" : "text-gray-700")}>
                    {userData.bio || 'No bio available'}
                </p>

                <ul className={clsx(
                    "flex justify-between p-4 rounded-md col-span-2",
                    isDark ? "text-gray-300 bg-[#111827]" : "text-gray-800 bg-gray-200"
                )}>
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

                <ul className={clsx(
                    "col-span-2 grid grid-cols-2 gap-4",
                    isDark ? "text-gray-400" : "text-gray-700"
                )}>
                    <li className="flex gap-2 items-center">
                        <MapPin className={clsx(isDark ? "text-gray-500" : "text-gray-500")} />
                        <span>{userData.location || 'Not Available'}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <Link className={clsx(isDark ? "text-gray-500" : "text-gray-500")} />
                        <span className={clsx("italic", isDark ? "text-gray-600" : "text-gray-500")}>Not Available</span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <Twitter className="text-blue-400" />
                        {userData.twitter_username ? (
                            <a
                                href={`https://twitter.com/${userData.twitter_username}`}
                                target="_blank"
                                className="italic hover:underline"
                            >
                                <span className={clsx(isDark ? "text-blue-400" : "text-blue-600")}>
                                    @{userData.twitter_username}
                                </span>
                            </a>
                        ) : (
                            <span className={clsx("italic", isDark ? "text-gray-600" : "text-gray-500")}>Not Available</span>
                        )}
                    </li>
                    <li className="flex gap-2 items-center">
                        <BriefcaseBusiness className={clsx(isDark ? "text-gray-500" : "text-gray-500")} />
                        <span className={clsx("italic", isDark ? "text-gray-600" : "text-gray-500")}>
                            {userData.company || 'Not Available'}
                        </span>
                    </li>
                </ul>

            </div>

            {/* Repositories */}
            <div className={clsx("px-4 py-6 rounded-md shadow-md mt-8", isDark ? "bg-[#1e2b48]" : "bg-white")}>
                <h3 className={clsx("text-xl font-semibold mb-4", isDark ? "text-gray-300" : "text-gray-800")}>
                    Repositories
                </h3>

                {userRepos.length === 0 ? (
                    <p className={clsx(isDark ? "text-gray-400" : "text-gray-600")}>No Repos</p>
                ) : (
                    <div className="grid gap-4">
                        {userRepos.slice(0, visibleRepos).map((repo) => (
                            <div
                                key={repo.id}
                                className={clsx("p-4 rounded-md", isDark ? "bg-[#111827] text-gray-200" : "bg-gray-200 text-gray-800")}
                            >
                                <h4 className={clsx("font-semibold", isDark ? "text-blue-400" : "text-blue-700")}>{repo.name}</h4>
                                <p className={clsx(isDark ? "text-gray-400" : "text-gray-700")}>
                                    {repo.description || 'No description'}
                                </p>
                                <p className={clsx("text-sm", isDark ? "text-gray-500" : "text-gray-500")}>
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
    )
}

export default ProfileCard;