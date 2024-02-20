import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { pollsCollection } from '../firebase/collections';
import { useDispatch, useSelector } from 'react-redux';
import BarGraph from '../components/BarGraph';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { updateLoading } from '../redux/features/loaderSlice';
import { clearLocalStorage, showToast } from '../helpers';
import PieChart from '../components/PieChart';
import { MdDeleteOutline } from "react-icons/md";
import { firebaseDeletePoll } from '../firebase/functions';
import { IoLogOutOutline } from "react-icons/io5";
import { updateUser } from '../redux/features/userSlice';

function AllPolls({ polls }) {
    const userDetails = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleDeletePoll = (pollId) => {
        dispatch(updateLoading(true));
        firebaseDeletePoll(pollId, userDetails.userId)
            .then((response) => {
                showToast("Poll deleted.");
                dispatch(updateLoading(false));
            }).catch((error) => {
                showToast(error, 'error');
                dispatch(updateLoading(false));
            })
    }

    return (
        <>
            <div className='container w-full m-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    polls.map((item, index) => {
                        return (
                            <>
                                <div key={index} className='container bg-indigo-100 rounded-xl grow p-5 h-[85vh] w-full overflow-y-hidden'>
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='font-semibold text-2xl py-3 '>{item.data.question}?</p>
                                        <MdDeleteOutline className='cursor-pointer bg-white rounded-full p-3 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-500 delay-0' size={50} onClick={() => handleDeletePoll(item.id)} />
                                    </div>
                                    <BarGraph pollInfo={item.data.pollInfo} />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

function Statistics({ polls }) {

    const [pollStats, setPollStats] = useState({
        totalVotes: 0,
        uniqueUsers: 0,
        repeatedUsers: 0,
    })

    useEffect(() => {

        const calculateStats = () => {
            // total votes over all polls
            let totalVotes = 0;

            let totalUser = [];

            for (let i = 0; i < polls.length; i++) {
                // total votes
                for (let j = 0; j < polls[i].data.pollInfo.length; j++) {
                    console.log('jere: ', polls[i].data.pollInfo[j].data)
                    totalVotes += polls[i].data.pollInfo[j].data[0].likes;
                }
                totalUser = [...totalUser, ...polls[i].data.users];
            }

            // Initialize an empty object to store counts
            const countMap = {};

            // Iterate over the array
            totalUser.forEach(item => {
                // Increment the count for each item
                countMap[item] = (countMap[item] || 0) + 1;
            });

            let uniqueUsers = 0, repeatedUsers = 0;

            Object.entries(countMap).forEach(([item, count]) => {
                if (count > 1)
                    repeatedUsers++;
                else
                    uniqueUsers++;
            });

            setPollStats({
                totalVotes,
                uniqueUsers,
                repeatedUsers
            })
        }

        calculateStats();

    }, [polls])


    return (
        <div className='py-3'>
            <div className='text-xl p-2'>
                <p><span className='font-bold'>Total Votes: </span>{pollStats.totalVotes}</p>
                <p><span className='font-bold'>Total Polls: </span>{polls.length}</p>
            </div>
            {pollStats.totalVotes > 0 && <PieChart pollStats={pollStats} />}
        </div>
    )
}

function Dashboard() {
    const userDetails = useSelector((store) => store.user);
    const loading = useSelector((store) => store.loading.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const q = useMemo(() => query(pollsCollection, where('userId', '==', userDetails.userId)), [userDetails.userId]);

    // user's polls
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        // get docs
        const getPolls = async () => {
            dispatch(updateLoading(true)); // Set loading to true before fetching data
            try {
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const documents = [];
                    snapshot.forEach((doc) => {
                        documents.push({ id: doc.id, data: doc.data() });
                    })
                    setPolls(documents);
                    dispatch(updateLoading(false));
                })
                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching documents: ", error);
                showToast(error, "error");
                // Handle error here, such as displaying an error message to the user
            }

        }
        getPolls();

    }, [q])

    const handleLogOut = () => {
        clearLocalStorage();
        dispatch(updateUser({
            userId: "",
            authToken: "",
            refreshToken: "",
            email: "",
        }))
        navigate('/');
    }

    return loading ? <Loader /> : (
        <div className='container w-full m-auto'>
            <div className='container flex justify-between p-2 py-4'>
                <div>
                    <p className='font-semibold text-2xl flex items-center gap-3'>
                        <span>
                            Dashboard
                        </span>
                        <span>
                            <IoLogOutOutline onClick={handleLogOut} className='cursor-pointer ' />
                        </span>
                    </p>
                    <p>
                        {userDetails.email}
                    </p>
                </div>

                <Link to={'/createPoll'}>
                    <button type="button" className="py-1 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                        Create Poll
                    </button>
                </Link>

            </div>
            <Statistics polls={polls} />
            <AllPolls polls={polls} />
        </div>
    )
}

export default Dashboard