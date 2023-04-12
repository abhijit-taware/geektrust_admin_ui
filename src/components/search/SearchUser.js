export const searchForUsers=(search,userData)=>{
    return userData.map((user) => {
        if (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
        ) {
           user.visibility = true;
           return user;
        }
        user.visibility = false;
        return user;
      });
}