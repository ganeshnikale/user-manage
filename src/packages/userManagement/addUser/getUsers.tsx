import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { getUsers } from '../../../store/slice/addUserSlice';
import type { User, userData } from "@tsTypes/userType";



const AllUsers = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { usersList, status, error } = useSelector((state: RootState) => state.users.allUsers);
    const [pageIndex, setPageIndex] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(1)

    useEffect(() => {
        if (status === 'fulfilled' && usersList?.total_pages) {
            setPageIndex(Array.from({ length: usersList.total_pages }, (_, i) => i + 1));
        }
    }, [status, usersList?.total_pages]);

    useEffect(() => {
        dispatch(getUsers(selectedIndex));
    }, [dispatch, selectedIndex]);

    const nextPage = (pageNo: number) => {
        setSelectedIndex((prev) => pageNo);
        dispatch(getUsers(selectedIndex));
    }

    const movePrevious = () => {
        setSelectedIndex((prev) => prev - 1);
        dispatch(getUsers(selectedIndex));
    }

    const moveNext = () => {
        setSelectedIndex((prev) => prev + 1);
        dispatch(getUsers(selectedIndex));
    }



    return (<div>
        <h1>all user</h1>
        {status === "loading" && <h4>Loading</h4>}
        {!error === null && <h4> somthing has failed</h4>}



        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" aria-label="Previous" onClick={() => movePrevious()} disabled={selectedIndex === pageIndex[0] ? true : false}>
                        <span aria-hidden="true">&laquo; </span>
                    </button>
                </li>
                {pageIndex.map((pageNo) => {
                    return (
                        <li className="page-item"><a className={selectedIndex === pageNo ? "page-link active" : "page-link"} onClick={() => nextPage(pageNo)}>{pageNo}</a></li>
                    )
                })}

                <li className="page-item">
                    <button className="page-link" aria-label="Next" onClick={() => moveNext()} disabled={selectedIndex === pageIndex[pageIndex.length - 1] ? true : false}>
                        <span aria-hidden="true">&raquo; </span>
                    </button>
                </li>

            </ul>
        </nav>




        <table className="table table-striped ">
            <tbody>
                {status === "fulfilled" && error === null && usersList?.data.map((user: userData) => {
                    return (
                        <tr key={user.id} className="v-align-middle">
                            <td>{user.id}</td>
                            <td><img src={user.avatar} /></td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    </div>)


}


export default AllUsers