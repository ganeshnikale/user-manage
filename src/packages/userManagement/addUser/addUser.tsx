import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { createUser } from '../../../store/slice/addUserSlice';
import type { User } from "@tsTypes/userType";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




const AddUser = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { userData, status, error } = useSelector((state: RootState) => state.users.createdUser);

    const [show, setShow] = useState<boolean>(false);


    const nameRef = useRef<HTMLInputElement>(null);
    const jobRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = nameRef.current?.value.trim() || "";
        const job = jobRef.current?.value.trim() || "";

        if (!name || !job) {
            alert("Please enter both name and job.");
            return;
        }

        const userData: User = { name, job };
        dispatch(createUser(userData));
        clearInput(nameRef);
        clearInput(jobRef);
        setShow(true);
    };

    const clearInput = (refName: any) => {
        if (refName?.current) {
            refName.current.value = "";
        }


    };

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-3 ">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Enter Name</label>
                        <input type="text" placeholder="Name" id="name" className="form-control" ref={nameRef} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Enter Job</label>
                        <input type="text" placeholder="Job" className="form-control" ref={jobRef} />
                    </div>

                    <button type="submit" className="btn btn-primary">Add User</button>
                </form>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Woohoo, you are added user successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body> Name: {userData.name} Job{userData.job}, id: {userData.id} createdAt:{userData.createdAt}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddUser;