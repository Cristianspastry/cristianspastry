import { getFirestore } from "firebase/firestore";
import { app } from "@/infrastructure/firebase";

export const firestore = getFirestore(app);
