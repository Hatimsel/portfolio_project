import axios from "axios";

const AuthPage = (props) => {
    const onSubmit = (e) => {
      e.preventDefault();
      // const { username, password } = e.target[0];
      const username = e.target.username.value;
      const password = e.target.password.value;
      axios.post(
        'http://localhost:3001/authenticate/',
        { username, password }
      )
      .then(r => props.onAuth({ ...r.data, secret: password }))
      .catch((err) => console.log(err));
    };
  
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome 👋</div>
  
          <div className="form-subtitle">Set a username and a password to get started</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <div className="password-label">Password</div>
            <input className="auth-input" name="password" type="password" required />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
};

export default AuthPage;
  