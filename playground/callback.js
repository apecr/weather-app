const getUser = (id, callback) => {
  const user = {
    id,
    name: 'Vikram'
  };
  setTimeout(() => callback(user), 3000);
};


getUser(32, console.log);