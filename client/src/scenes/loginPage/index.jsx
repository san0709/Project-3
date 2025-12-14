import Form from "./Form";

const LoginPage = () => {
    return (
        <div className="h-full bg-background-default dark:bg-background-dark">
            <div className="w-full bg-background-alt dark:bg-background-darkAlt p-4 text-center">
                <h1 className="font-bold text-3xl text-primary">Sociopedia</h1>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto p-8 my-8 bg-background-alt dark:bg-background-darkAlt rounded-xl shadow-lg">
                <h3 className="font-medium text-lg mb-6 dark:text-neutral-light">
                    Welcome to Sociopedia, the Social Media for Sociopaths!
                </h3>
                <Form />
            </div>
        </div>
    );
};

export default LoginPage;
