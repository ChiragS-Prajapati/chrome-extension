/** @format */

import CryptoJS from "crypto-js";

//secret generator function
export function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

//encryption key
export const secretPass = "james";

//encrption function
export const EcryptData = (secret) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(secret),
    secretPass
  ).toString();
  return data;
};

//decryption function
export const DecryptData = (secret) => {
  const bytes = CryptoJS.AES.decrypt(secret, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};
