import { getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { pollsCollection } from "../firebase/collections";
import BarGraph from "../components/BarGraph";
import { firebaseUpdatePoll } from "../firebase/functions";
import { useDispatch, useSelector } from "react-redux";
import { isAlreadyVoted, showToast } from "../helpers";
import Loader from "../components/Loader";
import { updateLoading } from "../redux/features/loaderSlice";

function Polls() {
    const [allPolls, setAllPolls] = useState([]);
    const userDetails = useSelector((store) => store.user);
    const loading = useSelector((store) => store.loading.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(updateLoading(true));
            try {
                const unsubscribe = onSnapshot(pollsCollection, (snapshot) => {
                    const updatedPolls = [];
                    snapshot.forEach((doc) => {
                        updatedPolls.push({ id: doc.id, data: doc.data() });
                    });
                    setAllPolls(updatedPolls);
                    dispatch(updateLoading(false));
                });
                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching polls: ", error);
                showToast(error, 'error');
                dispatch(updateLoading(false));
            }
        }

        fetchData();
    }, []);

    const handleVoting = (optionIndex, pollId) => {
        dispatch(updateLoading(true));
        firebaseUpdatePoll(optionIndex, pollId, userDetails.userId)
            .then((res) => {
                console.log("update poll res: ", res);
                dispatch(updateLoading(false));
                showToast("Voted successfully.");
            })
            .catch((err) => {
                console.log("update poll error: ", err);
                dispatch(updateLoading(false));
                showToast(err, 'error');
            })
    }

    return loading ? <Loader /> : (
        <div className="container w-full m-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPolls.map((item, index) => {
                const voted = isAlreadyVoted(item, userDetails.userId);

                return (
                    <>
                        <div
                            key={index}
                            className="container bg-[#f5f5f5b0] rounded-xl grow p-5 h-fit w-full overflow-y-hidden"
                        >
                            <p className="font-semibold text-2xl py-3">
                                {item.data.question}?
                                {voted && (<span className="px-3 pb-1 text-xs rounded-full text-green-600 bg-green-200 relative bottom-4 left-2">
                                    Voted
                                </span>)}
                            </p>
                            {voted && (<BarGraph pollInfo={item.data.pollInfo} />)}

                            {!voted ? (<div>
                                <form>
                                    <ul className="option-list">
                                        {
                                            item.data.pollInfo.map((pollItem, index) => {

                                                return (
                                                    <>
                                                        <li key={pollItem.data[0].name + index}>
                                                            <input type="radio" name="selector" id={pollItem.data[0].name + index} />
                                                            <label htmlFor={pollItem.data[0].name + index} onClick={(e) => {
                                                                e.preventDefault(); // Prevent default action
                                                                e.stopPropagation(); // Stop event propagation
                                                                handleVoting(index, item.id);
                                                            }}>{pollItem.data[0].name}</label>
                                                            <div className="check"></div>
                                                        </li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul>
                                </form>
                            </div>) : null}

                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default Polls;
