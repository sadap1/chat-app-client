export const host = "http://localhost:5000" || 'https://chat-app-server-7su1.onrender.com';
export const signInRoute = `${host}/api/auth/signin`;
export const signUpRoute = `${host}/api/auth/signup`;
export const getContactsRoute = `${host}/api/auth/getcontacts`;
export const logoutRoute = `${host}/api/auth/logout`;
export const sendMsgRoute = `${host}/api/messages/sendMsg`;
export const fetchMsgRoute = `${host}/api/messages/fetchMsg`;