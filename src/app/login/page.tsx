import LoginForm from "@/features/login/components/LoginForm";

export const metadata = {
	title: `ログイン | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const LoginPage: React.FC = () => {
    return (
        <LoginForm/>
    );
}

export default LoginPage;
