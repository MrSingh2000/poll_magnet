import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { updateLoading } from '../redux/features/loaderSlice';
import { pollsCollection } from '../firebase/collections';
import { fireStoredb } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseUpdatePoll } from '../firebase/functions';
import { isAlreadyVoted, showToast } from '../helpers';
import BarGraph from '../components/BarGraph';
import Loader from '../components/Loader';

function SharePoll() {
    const { id } = useParams();
    const loading = useSelector((store) => store.loading.value);
    const dispatch = useDispatch();
    const userDetails = useSelector((store) => store.user);
    const [data, setData] = useState(null);

    let voted = useMemo(() => {
        if (data)
            return isAlreadyVoted({ data }, userDetails.userId);
    }, [data]);


    useEffect(() => {
        const fetchPoll = async () => {
            dispatch(updateLoading(true));
            try {
                const docRef = doc(fireStoredb, 'polls', id);
                const docSnap = await getDoc(docRef);

                console.log("data: ", docSnap.data())

                if (docSnap.exists()) {
                    // Document exists, return its data
                    setData(docSnap.data());
                } else {
                    // Document does not exist
                    console.log("No such document!");
                    showToast("No such poll exists.", 'error');
                }
                dispatch(updateLoading(false));

            } catch (error) {
                console.log('error in fetching poll info: ', error);
                showToast(error.errMessage, 'error');
                dispatch(updateLoading(false));

            }
        }

        fetchPoll();

    }, [id]);

    const handleVoting = (optionIndex) => {
        if (!userDetails.email) {
            showToast("Please login to vote.", "error");
            return;
        }
        dispatch(updateLoading(true));
        firebaseUpdatePoll(optionIndex, id, userDetails.userId)
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
        <div className='container w-full p-3 md:w-1/2 m-auto'>
            <div
                className="container bg-[#f5f5f5b0] rounded-xl grow p-5 h-fit w-full overflow-y-hidden"
            >
                <p className="font-semibold text-2xl py-3">
                    {data?.question}?
                    {voted && (<span className="px-3 pb-1 text-xs rounded-full text-green-600 bg-green-200 relative bottom-4 left-2">
                        Voted
                    </span>)}
                </p>
                {voted && (<BarGraph pollInfo={data?.pollInfo} />)}

                {!voted ? (<div>
                    <form>
                        <ul className="option-list">
                            {
                                data?.pollInfo.map((pollItem, index) => {

                                    return (
                                        <>
                                            <li key={pollItem?.data[0].name + index}>
                                                <input type="radio" name="selector" id={pollItem?.data[0].name + index} />
                                                <label htmlFor={pollItem?.data[0].name + index} onClick={(e) => {
                                                    e.preventDefault(); // Prevent default action
                                                    e.stopPropagation(); // Stop event propagation
                                                    handleVoting(index);
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
        </div>

    )
}

export default SharePoll