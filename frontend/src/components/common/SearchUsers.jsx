import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";

const SearchUsers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setShowResults(!!searchQuery.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { data: searchResults, isLoading } = useQuery({
        queryKey: ["searchUsers", debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery.trim()) return [];

            try {
                const res = await fetch(`/api/users/search?q=${encodeURIComponent(debouncedQuery)}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        enabled: !!debouncedQuery.trim(),
    });

    const clearSearch = () => {
        setSearchQuery("");
        setDebouncedQuery("");
        setShowResults(false);
    };

    const handleInputFocus = () => {
        if (searchQuery.trim()) {
            setShowResults(true);
        }
    };

    return (
        <div className='w-full mb-4 relative' ref={searchRef}>
            <label className="input input-bordered flex items-center gap-2 bg-base-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50">
                <IoSearch className='h-4 w-4 opacity-70' />
                <input
                    type='text'
                    className='grow text-sm bg-transparent border-none outline-none'
                    placeholder='Search users...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleInputFocus}
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className='btn btn-ghost btn-sm btn-circle opacity-70 hover:opacity-100'
                    >
                        <IoClose className='h-4 w-4' />
                    </button>
                )}
            </label>

            {showResults && debouncedQuery && (
                <div className='dropdown-content absolute top-full left-0 right-0 mt-1 bg-base-100 border border-base-300 rounded-box max-h-64 overflow-y-auto z-50 shadow-xl'>
                    {isLoading && (
                        <div className='p-4 text-center'>
                            <LoadingSpinner size='sm' />
                        </div>
                    )}

                    {!isLoading && searchResults?.length === 0 && (
                        <div className='p-4 text-center text-base-content/60 text-sm'>
                            No users found for "{debouncedQuery}"
                        </div>
                    )}

                    {!isLoading && searchResults?.length > 0 && (
                        <ul className='menu menu-compact p-2 w-full'>
                            {searchResults.map((user) => (
                                <li key={user._id}>
                                    <Link
                                        to={`/profile/${user.username}`}
                                        className='flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors'
                                        onClick={clearSearch}
                                    >
                                        <div className='avatar'>
                                            <div className='w-8 rounded-full'>
                                                <img
                                                    src={user.profileImg || "/avatar-placeholder.png"}
                                                    alt={user.fullName}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col min-w-0 flex-1'>
                                            <span className='font-semibold truncate text-sm'>
                                                {user.fullName}
                                            </span>
                                            <span className='text-xs text-base-content/60 truncate'>
                                                @{user.username}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchUsers;
