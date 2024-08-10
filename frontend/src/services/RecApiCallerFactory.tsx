import RecBaseApiCaller from "./RecApiCaller";

class RecApiCallerFactory {
  constructor() {
  }

  getApiImplementation(dictionaryType) {
    const apiCallerService = new RecBaseApiCaller();
    apiCallerService.setControllerPath(dictionaryType.toString());
    return apiCallerService;
  }
}

export default RecApiCallerFactory;
