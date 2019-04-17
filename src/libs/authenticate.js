module.exports = async actions => {
  let token = localStorage.getItem("token");

  // validate token
  if (token) {
    const valid = await actions.validateToken({ token });
    token = valid ? token : null;
  }

  // get a new token, save to cookie
  if (!token) {
    const session = await actions.generateToken();
    localStorage.setItem("token", session.id);
    token = session.id;
  }

  // refresh token and return user
  return actions.authenticate({token}).catch(err => null)
};
