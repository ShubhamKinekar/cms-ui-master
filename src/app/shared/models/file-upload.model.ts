export class FileUpload {
  file?: File;
  progress = 0;
  status = false;
  isValid? = false;
  id = '';
  name = '';
  filePath = '';

  constructor(file?: File, isValid?: boolean) {
    this.file = file;
    this.isValid = isValid;
  }
}
