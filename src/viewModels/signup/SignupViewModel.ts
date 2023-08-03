import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";


export default function useSignupViewModel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const accountStatus = 1;
    const createdAt = new Date(Date.now());
    const isAdmin = false;
    const isSuspended = false;

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    const signupSubmit = async () => {
        await validateEmail();
        await validatePassword();

        if (emailError || passwordError) {
            return;
        }

        axios.post( process.env.NEXT_PUBLIC_SERVER_HTTP + '/user/signup', {
            username,
            password,
            email,
            accountStatus,
            isAdmin,
            isSuspended,
            createdAt
        })
            .then((response) => {
                const router = useRouter();
                router.push('/login');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return {
        signupSubmit,
        validatePassword,
        validateEmail,
        username,
        setUsername,
        showPassword,
        setShowPassword,
        passwordError,
        setPassword,
        password,
        emailError,
        setEmail,
        email
    }
}