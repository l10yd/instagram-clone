import { useState } from "react";
import useShowToast from "./useShowToast";

interface UsePreviewImgResult {
  selectedFile: string | null; // Assuming reader.result is a base64 string
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
}

//превью загруженной картинки в Edit Profile
const usePreviewImg = (): UsePreviewImgResult => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024; // 2 мегабайта

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      // файл слишком большой - ошибка
      if (file.size > maxFileSizeInBytes) {
        showToast(
          "Ошибка",
          "Размер файла должен быть меньше 2 мегабайт",
          "error"
        );
        setSelectedFile(null);
        return;
      }
      // превращает файл в ссылку
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string); // Assuming reader.result is a base64 string
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Ошибка", "Выберите картинку", "error");
      setSelectedFile(null);
    }
  };

  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
