import { db, storage } from "../../FireBase/config";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const uploadImage = async (image, path) => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const imageId = path + response._bodyBlob._data.name;
    const imageRef = ref(storage, imageId);
    const uploadImage = await uploadBytes(imageRef, blob);
    const imageUri = await getDownloadURL(uploadImage.ref);
    return imageUri;
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const writeDataToFirestore = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);

    return docRef.id;
  } catch (error) {
    return error;
  }
};

const getDataFromFirestore = async () => {
  const dbRef = await collection(db, "posts");
  onSnapshot(
    dbRef,
    (data) => (dataE = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  );
};
