import {React, useState, useEffect} from 'react';

/****** This component handles authentication of users *******/
const SignupAndLogin = () => {
    const [authTab, setAuthTab] = useState('login');
    const [loginData, setLoginData] = useState({'email':'', 'pwd':'', 'auth': false, 'todos':[]});
    const [loginError, setLoginError] = useState(false);
    const [signupData, setSignupData] = useState({'email':'', 'pwd':'', 'auth': false, 'todos':[]});
    const [isLoading, setIsLoading] = useState(true);

    /*** Handle submission of sign-up data of users *****/
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        /****** Check if user has already signed-up. If not, then store user credentials in local storage ******/
        let userData = localStorage.getItem("todoListUserData");    
        if(userData === null){
            localStorage.setItem("todoListUserData",JSON.stringify([signupData]));
        }
        else{
            let userData = JSON.parse(localStorage.getItem("todoListUserData"));
            let duplicateUser = false;
            userData.forEach(user => {
                if(user.email === signupData.email){
                    duplicateUser = true;
                }
            })
            if(!duplicateUser){
                userData = [...userData, signupData];
                localStorage.setItem("todoListUserData",JSON.stringify(userData));
            }
        }
        setSignupData({'email':'', 'pwd':'', 'auth': false, 'todos':[]});
        setAuthTab('login');
        /****** Check if user has already signed-up. If not, then store user credentials in local storage ******/
    }
    /*** Handle submission of sign-up data of users *****/

    /*** Handle submission of log-in data of users *****/
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        let userData = localStorage.getItem("todoListUserData");
        if(userData === null){      //Error if user does not exist
            setLoginError(true);
        }
        else{   //Verify user's credentials from local storage data
            let userExists = false;
            userData = JSON.parse(userData);
            userData.forEach(user => {
                if(user.email === loginData.email && user.pwd === loginData.pwd){
                    userExists = true;
                    user.auth = true;
                }
            })
            if(userExists){     //Successful login
                localStorage.setItem("todoListUserData", JSON.stringify(userData));
                window.location.pathname = "/todos";
            }
            else{
                setLoginError(true);
                setLoginData({'email':'', 'pwd':'', 'auth': false, 'todos':[]});
            }
        }
    }
    /*** Handle submission of log-in data of users *****/

    /**** On authentication page, check if user is logged in. 
    ** If already loggedin, take user to their todos page *****/
    useEffect(() => {
        let userData = localStorage.getItem("todoListUserData");
        if(userData !== null){
            userData = JSON.parse(userData);
            let isUserAuthenticated = false;
            userData.forEach(user => {
                if(user.auth === true){
                    isUserAuthenticated = true;
                }
            })
            isUserAuthenticated ? window.location.pathname = "/todos" : setIsLoading(false);
        }
        else{
            setIsLoading(false);
        }
    }, [])
    

    /*** Update signup data ***/
    const handleSignupChange = (e) => {
        setSignupData({...signupData,[e.target.id]:e.target.value});
    }
    /*** Update signup data ***/

    /*** Update Login data ***/
    const handleLoginChange = (e) => {
        setLoginData({...loginData,[e.target.id]:e.target.value});
    }
    /*** Update Login data ***/

    /*** Html of Input form on Login tab ****/
    const loginForm = (
        <form action="#" className="login" onSubmit={handleLoginSubmit}>
            <div className="field">
                <input id="email" type="text" onChange={handleLoginChange} placeholder="Email Address" value={loginData.email || ''} required />
            </div>
            <div className="field">
                <input id="pwd" type="password" onChange={handleLoginChange} placeholder="Password" value={loginData.pwd || ''} required />
            </div>
            {
                loginError ? <div className="error"><p>User does not exist</p></div> : ''
            }
            <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
                Not a member? <a href="">Signup now</a>
            </div>
        </form> 
    );
    /*** Html of Input form on Login tab ****/

    /*** Html of Input form on Signup tab ****/
    const signupForm = (
        <form action="#" className="signup" onSubmit={handleSignupSubmit}>
            <div className="field">
                <input id="email" onChange={handleSignupChange} type="text" placeholder="Email Address" value={signupData.email || ''} required />
            </div>
            <div className="field">
                <input id="pwd" onChange={handleSignupChange} type="password" placeholder="Password" value={signupData.pwd || ''} required />
            </div>
            <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
            </div>
        </form>
    );
    /*** Html of Input form on Signup tab ****/

    /**** Html of the whole authentical page *****/
    const authenticationHtml = (
        <>
            <div className="wrapper">
                <div className="titles">
                    {authTab === 'login' ? 
                        <div className="title-login">Login Form</div> : 
                        <div className="title-signup">Signup Form</div>
                    }
                </div>

                <div className="form-container">
                    <div className="slide-controls">
                        <label htmlFor="login" onClick={() => setAuthTab('login')}
                            className={"slide slide-login " + (authTab === 'login' ? "active" : "")}
                        >
                            Login
                        </label>
                        <label htmlFor="signup" onClick={() => setAuthTab('signup')}
                            className={"slide slide-signup " + (authTab === 'login' ? "" : "active")}>
                            Signup
                        </label>
                        <div className="slider-tab"></div>
                    </div>

                    <div className="form-inner">
                        { authTab === 'login' ? loginForm :  signupForm }
                    </div>
                </div>
            </div>
        </>
    );
    /**** Html of the whole authentical page *****/

    return (
        <> {isLoading ? '' : authenticationHtml}</>    
    )
}
/****** This component handles authentication of users *******/

export default SignupAndLogin;