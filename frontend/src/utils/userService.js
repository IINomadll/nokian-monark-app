const STORAGE_KEY = "loggedAdminUser";

const userService = {
  save: (user) => sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)),
  load: () => {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  exists: () => !!sessionStorage.getItem(STORAGE_KEY),
  remove: () => sessionStorage.removeItem(STORAGE_KEY),
};

export default userService;
