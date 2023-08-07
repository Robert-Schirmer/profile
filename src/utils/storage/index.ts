import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export const getAllImageSrc = async (path: string): Promise<string[]> => {
  const storage = getStorage();

  const listRef = ref(storage, path);
  const list = await listAll(listRef);
  const srcs = await Promise.all(list.items.map(getDownloadURL));

  return srcs;
};
