import path from 'path';
import { URL } from 'url';

/**
 * Custom Sass importer function
 * @param {string} url - The import path
 * @param {string} prev - The file importing the resource
 */
function globSASS() {

  console.log('Пример имплементации canonicalize для импорта файла');
  
  return {
    canonicalize(url, context) {
      const fileUrl = new URL(url);
      console.log(`Url`, url);
      console.log(`Canonicalize url`, fileUrl);
      console.log(`Canonicalize context:`, context);
      return fileUrl;
      return url
    },
    load(canonicalUrl) {
      console.log(`Загрузка файла: ${canonicalUrl}`);
      return null; // Вернуть null, чтобы использовать стандартное поведение
    },
  };
}

export default globSASS;
// export { globSASS }
