export const checkSizeLocalStorage = () => {
  let totalBytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) return;
    const value = localStorage.getItem(key);

    if (!value) return;
    totalBytes += (key.length + value.length) * 2; // Учитывает юникод для символов
  }

  const totalSizeKB = totalBytes / 1024;
  console.log(`Размер данных в localStorage: ${totalSizeKB} KB`);
  return totalSizeKB;
};
