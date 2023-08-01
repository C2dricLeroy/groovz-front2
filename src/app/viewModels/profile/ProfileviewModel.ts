import {useEffect, useState} from "react";
import {User} from "@/models/User";

interface IUser {
    userName: string;
    follows: string;
    followers: string;
}

export default function useProfileViewModel() {
    const [user, setUser] = useState<IUser | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");

    async function handleUpdateName() {
        if (newName && newName.trim() !== "") {
            await User.updateName(newName);
            setUser(prevUser => {
                if (prevUser === null) {
                    return null;
                } else {
                    return {...prevUser, userName: newName}
                }
            });
            setShowModal(false);
        } else {
            alert("User name cannot be empty");
        }
    }

    function handleOpenModal() {
        alert("Warning, your userName is the only way for your friends to find you on Groovz. Changing your name should be well considered decision");
        setShowModal(true);
    }

    function handleNameChange(e: any) {
        setNewName(e.target.value);
    }

    function handleCloseModal(e: any) {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    }

    useEffect(() => {
        async function fetchUser() {
            const name = await User.getUserName();
            const follows = await User.getFollows();
            const followers = await User.getFollowers();

            setUser({
                userName: name.userName,
                follows: follows,
                followers: followers
            });
        }
        fetchUser();
    }, []);

    return {
        user,
        setUser,
        newName,
        setNewName,
        showModal,
        setShowModal,
        handleUpdateName,
        handleOpenModal,
        handleCloseModal,
        handleNameChange
    }
}