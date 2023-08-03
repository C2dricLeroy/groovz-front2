import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios/index";

export default function useSigninViewModel() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()

    const signinSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_HTTP + '/user/signin', {
                email,
                password
            });
            localStorage.setItem('userToken', response.data.token);
            router.push('/feed');
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setError('Invalid email or password. Please try again.');
            }
        }
    };

    return {
        signinSubmit,
        setEmail,
        email,
        showPassword,
        password,
        setPassword,
        setShowPassword,
        error


    }
}