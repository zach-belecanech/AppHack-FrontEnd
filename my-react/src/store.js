import { create } from "zustand"

export const useDataStore = create((set, get) => ({
    studentid: -1,
    setid: (id) => set({studentid: id}),
}))