import { db, storage } from "../../FireBase/config";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addPost } from "./postsReucer";

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
    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
      create: Date.now(),
      comments: [],
    });

    return { status: "Ok", message: docRef.id };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

export const getDataFromFirestore = () => async (dispatch) => {
  try {
    const dbRef = collection(db, "posts");
    const q = query(dbRef, orderBy("create", "asc"));
    onSnapshot(q, (posts) =>
      dispatch(
        addPost(
          posts.docs.map((post) => {
            // console.log(post);

            return { id: post.id, ...post.data() };
          })
        )
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateDataOnFirestore = async (comment, id) => {
  try {
    const date = Date.now();
    const dbRef = doc(db, "posts", id);
    await updateDoc(dbRef, {
      comments: arrayUnion(
        JSON.stringify({
          ...comment,
          date,
        })
      ),
    });
    return { status: "Ok", message: date };
  } catch (error) {
    console.log(error);
    return { status: "error", message: error.message };
  }
};
