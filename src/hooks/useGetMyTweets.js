import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllTweets } from "../redux/tweetSlice";
import { TWEET_API_END_POINT } from "../utils/constant";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector((store) => store.tweet);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMyTweets = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true,
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (err) {
            console.error("Error fetching tweets:", err);
            setError("Failed to fetch your tweets.");
        } finally {
            setLoading(false);
        }
    }, [dispatch, id]);

    const followingTweetHandler = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
                withCredentials: true,
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (err) {
            console.error("Error fetching following tweets:", err);
            setError("Failed to fetch following tweets.");
        } finally {
            setLoading(false);
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [isActive, refresh, fetchMyTweets, followingTweetHandler]);

    // Return useful data for UI
    return {
        loading,
        error
    };
};

export default useGetMyTweets;
