

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// export const validatePassword = (password: string): boolean => {
//     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
// };

export const validatePassword = (password: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{6,}$/.test(password);
};