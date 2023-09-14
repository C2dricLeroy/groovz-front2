import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";


export default function useSignupViewModel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();
    const accountStatus = 1;
    const createdAt = new Date(Date.now());
    const isAdmin = false;
    const isSuspended = false;

    let validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const validatePassword = () => {
        let passwordRegexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,200}$/;
        let validPassword = password.match(passwordRegexp);

        if ((password.length >= 8 && password.length <= 200) && validPassword) {
            setPasswordError(false);
            console.log('valid')
        } else if (password.length === 0){

        } else {
            setPasswordError(true);
            console.log('invalid')
        }
    }

    const signupSubmit = async () => {

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
                if (typeof window !== 'undefined') {
                    router.push('/login');
                }

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
