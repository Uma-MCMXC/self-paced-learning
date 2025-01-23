export const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[!@#$%^&*-_(),.?":{}|<>])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return "Password must be at least 8 characters long and include at least one symbol or special character.";
    }

    return null; // คืนค่า `null` หากไม่มีปัญหา
};
