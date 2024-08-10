import BaseApiCaller, {API_BASE_URL} from "../api/BaseApiCaller"; 


class RecBaseApiCaller extends BaseApiCaller {
  constructor() {
    super();
  }

  setControllerPath(controllerPath) {
    this.controllerPath = controllerPath;
  }

  getFullPath(path) {
    return `${API_BASE_URL}/api/${this.controllerPath}/${path}`;
  }

  addItem(dto) {
    return this.post("", dto)
    .then((response) => response);
  }

  updateItem(id, dto) {
    return this.put(id, dto)
    .then((response) => response);
  }

  deleteItem(uniqueId) {
    return this.delete("", uniqueId)
    .then((response) => response);
  }


  getItem(uniqueId) {
    return this.get(uniqueId.toString())
      .then((response) => JSON.stringify(response.data));
  }
 
  getAll() {
    return this.get("")      
      .then((response) => response.data);
  }

}

export default RecBaseApiCaller;
